import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { ExtensionAPI, ExtensionCommandContext, ExtensionContext } from "@mariozechner/pi-coding-agent";

type GuideMode = "compact" | "full";
type PrecedenceId = "rulebook" | "heuristics" | "playbook" | "framework";

type VariantRecord = {
	path: string;
	size: GuideMode;
	strictness: string;
};

type GuideRecord = {
	title: string;
	archetype: string;
	precedence: PrecedenceId;
	summary: string;
	tags?: string[];
	defaults: Record<GuideMode, string>;
	variants: Record<string, VariantRecord>;
	skill?: { name: string; manualOnly?: boolean } | null;
};

type GuideRegistry = {
	version: 1;
	precedence: Array<{ id: PrecedenceId; rank: number }>;
	guides: Record<string, GuideRecord>;
};

type ProfileRecord = {
	title: string;
	description?: string;
	guides: string[];
	mode?: GuideMode;
};

type ProfileRegistry = {
	version: 1;
	profiles: Record<string, ProfileRecord>;
};

type GuideConfig = {
	version: 1;
	profile?: string;
	guides?: string[];
	mode?: GuideMode;
	additions?: string[];
	removals?: string[];
	variants?: Record<string, string>;
};

type ResolvedGuide = {
	id: string;
	title: string;
	precedence: PrecedenceId;
	precedenceRank: number;
	variant: string;
	relativePath: string;
	absolutePath: string;
	summary: string;
};

type ResolvedState =
	| {
		active: false;
		status: string;
		reason: string;
		configPath: string;
	  }
	| {
		active: true;
		status: string;
		configPath: string;
		profile: string | null;
		profileTitle: string | null;
		mode: GuideMode;
		guides: ResolvedGuide[];
	  };

const PACKAGE_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY_PATH = resolve(PACKAGE_ROOT, "registry", "guides.json");
const PROFILES_PATH = resolve(PACKAGE_ROOT, "registry", "profiles.json");
const TEMPLATE_GUIDES_PATH = resolve(PACKAGE_ROOT, "templates", "guides.json.example");
const TEMPLATE_AGENTS_PATH = resolve(PACKAGE_ROOT, "templates", "repo-AGENTS.md");
const GUIDE_CONFIG_RELATIVE_PATH = join(".pi", "guides.json");
const GUIDE_STATUS_KEY = "pi-guides:status";
const GUIDE_WIDGET_KEY = "pi-guides:widget";
const BEGIN_HEADER = "<!-- BEGIN MANAGED GUIDE HEADER -->";
const END_HEADER = "<!-- END MANAGED GUIDE HEADER -->";

let registryCache: GuideRegistry | null = null;
let profilesCache: ProfileRegistry | null = null;

async function readJsonFile<T>(path: string): Promise<T> {
	const raw = await readFile(path, "utf8");
	return JSON.parse(raw) as T;
}

async function fileExists(path: string): Promise<boolean> {
	try {
		await stat(path);
		return true;
	} catch {
		return false;
	}
}

async function loadRegistry(): Promise<GuideRegistry> {
	if (!registryCache) {
		registryCache = await readJsonFile<GuideRegistry>(REGISTRY_PATH);
	}
	return registryCache;
}

async function loadProfiles(): Promise<ProfileRegistry> {
	if (!profilesCache) {
		profilesCache = await readJsonFile<ProfileRegistry>(PROFILES_PATH);
	}
	return profilesCache;
}

function dedupe(values: string[]): string[] {
	const seen = new Set<string>();
	const result: string[] = [];
	for (const value of values) {
		if (!seen.has(value)) {
			seen.add(value);
			result.push(value);
		}
	}
	return result;
}

function fallbackVariantOrder(mode: GuideMode): string[] {
	if (mode === "compact") {
		return ["strict-compact", "pragmatic-compact", "strict-full", "pragmatic-full"];
	}
	return ["strict-full", "pragmatic-full", "strict-compact", "pragmatic-compact"];
}

function pickVariant(guide: GuideRecord, mode: GuideMode, explicitVariant?: string): string {
	if (explicitVariant) {
		if (!guide.variants[explicitVariant]) {
			throw new Error(`Unknown variant '${explicitVariant}' for guide '${guide.title}'`);
		}
		return explicitVariant;
	}

	const preferred = guide.defaults[mode];
	if (preferred && guide.variants[preferred]) {
		return preferred;
	}

	for (const candidate of fallbackVariantOrder(mode)) {
		if (guide.variants[candidate]) {
			return candidate;
		}
	}

	throw new Error(`Guide '${guide.title}' has no usable variant for mode '${mode}'`);
}

function renderStatus(state: ResolvedState): string {
	if (!state.active) {
		return "guides: off";
	}
	const profile = state.profile ?? "custom";
	return `guides: ${profile} (${state.mode})`;
}

function resolveSourceIds(config: GuideConfig, profiles: ProfileRegistry): {
	profile: string | null;
	profileTitle: string | null;
	mode: GuideMode;
	ids: string[];
} {
	if (config.profile && config.guides) {
		throw new Error(".pi/guides.json cannot define both 'profile' and 'guides'");
	}

	if (!config.profile && !config.guides) {
		throw new Error(".pi/guides.json must define either 'profile' or 'guides'");
	}

	if (config.profile) {
		const profile = profiles.profiles[config.profile];
		if (!profile) {
			throw new Error(`Unknown profile '${config.profile}'`);
		}
		const ids = dedupe([
			...profile.guides,
			...(config.additions ?? []),
		]).filter((id) => !(config.removals ?? []).includes(id));
		return {
			profile: config.profile,
			profileTitle: profile.title,
			mode: config.mode ?? profile.mode ?? "compact",
			ids,
		};
	}

	return {
		profile: null,
		profileTitle: null,
		mode: config.mode ?? "compact",
		ids: dedupe(config.guides ?? []),
	};
}

async function resolveState(cwd: string): Promise<ResolvedState> {
	const configPath = resolve(cwd, GUIDE_CONFIG_RELATIVE_PATH);
	if (!(await fileExists(configPath))) {
		return {
			active: false,
			status: "guides: off",
			reason: `No ${GUIDE_CONFIG_RELATIVE_PATH} found`,
			configPath,
		};
	}

	try {
		const [registry, profiles, config] = await Promise.all([
			loadRegistry(),
			loadProfiles(),
			readJsonFile<GuideConfig>(configPath),
		]);

		if (config.version !== 1) {
			throw new Error(`Unsupported guides config version '${String(config.version)}'`);
		}

		const source = resolveSourceIds(config, profiles);
		const precedenceRanks = new Map(registry.precedence.map((entry) => [entry.id, entry.rank]));
		const guides = await Promise.all(
			source.ids.map(async (id, index) => {
				const guide = registry.guides[id];
				if (!guide) {
					throw new Error(`Unknown guide id '${id}'`);
				}

				const variant = pickVariant(guide, source.mode, config.variants?.[id]);
				const variantRecord = guide.variants[variant];
				const absolutePath = resolve(PACKAGE_ROOT, variantRecord.path);
				if (!(await fileExists(absolutePath))) {
					throw new Error(`Guide file does not exist: ${variantRecord.path}`);
				}

				return {
					index,
					guide: {
						id,
						title: guide.title,
						precedence: guide.precedence,
						precedenceRank: precedenceRanks.get(guide.precedence) ?? Number.MAX_SAFE_INTEGER,
						variant,
						relativePath: variantRecord.path,
						absolutePath,
						summary: guide.summary,
					},
				};
			}),
		);

		guides.sort((a, b) => {
			if (a.guide.precedenceRank !== b.guide.precedenceRank) {
				return a.guide.precedenceRank - b.guide.precedenceRank;
			}
			return a.index - b.index;
		});

		const resolved: ResolvedState = {
			active: true,
			status: "",
			configPath,
			profile: source.profile,
			profileTitle: source.profileTitle,
			mode: source.mode,
			guides: guides.map((entry) => entry.guide),
		};
		resolved.status = renderStatus(resolved);
		return resolved;
	} catch (error) {
		return {
			active: false,
			status: "guides: error",
			reason: error instanceof Error ? error.message : String(error),
			configPath,
		};
	}
}

async function buildInjectedPrompt(state: Extract<ResolvedState, { active: true }>, registry: GuideRegistry): Promise<string> {
	const contents = await Promise.all(
		state.guides.map(async (guide) => ({
			guide,
			content: await readFile(guide.absolutePath, "utf8"),
		})),
	);

	const precedence = registry.precedence
		.slice()
		.sort((a, b) => a.rank - b.rank)
		.map((entry) => entry.id)
		.join(" > ");

	const guideList = state.guides
		.map((guide) => `- ${guide.id} (${guide.variant}) -> ${guide.relativePath}`)
		.join("\n");

	const body = contents
		.map(({ guide, content }) => {
			return [
				`### Guide: ${guide.title}`,
				`- id: ${guide.id}`,
				`- variant: ${guide.variant}`,
				`- precedence: ${guide.precedence}`,
				`- source: ${guide.relativePath}`,
				"",
				content.trim(),
			].join("\n");
		})
		.join("\n\n");

	return [
		"## Active Guide System",
		"",
		`Profile: ${state.profile ?? "custom"}`,
		`Mode: ${state.mode}`,
		`Precedence: ${precedence}`,
		"",
		"Apply the active guides below as binding policy for this turn.",
		"When doing implementation work, explicitly verify negative, error, and boundary paths, not only happy paths.",
		"In final summaries, prefer concise rule-application traces that reference the relevant guide ids or rule ids.",
		"",
		"### Active Guides",
		guideList,
		"",
		body,
	].join("\n");
}

function setStatus(ctx: ExtensionContext, state: ResolvedState): void {
	ctx.ui.setStatus(GUIDE_STATUS_KEY, renderStatus(state));
}

function clearUi(ctx: ExtensionContext): void {
	ctx.ui.setStatus(GUIDE_STATUS_KEY, undefined);
	ctx.ui.setWidget(GUIDE_WIDGET_KEY, undefined);
}

async function refreshStatus(ctx: ExtensionContext): Promise<ResolvedState> {
	const state = await resolveState(ctx.cwd);
	setStatus(ctx, state);
	return state;
}

function widgetLines(state: ResolvedState): string[] {
	if (!state.active) {
		return [
			"pi guides",
			`status: ${state.status}`,
			`reason: ${state.reason}`,
			`config: ${state.configPath}`,
		];
	}

	const lines = [
		"pi guides",
		`status: ${state.status}`,
		`config: ${state.configPath}`,
		`profile: ${state.profile ?? "custom"}${state.profileTitle ? ` (${state.profileTitle})` : ""}`,
		`mode: ${state.mode}`,
		"active:",
	];
	for (const guide of state.guides) {
		lines.push(`- ${guide.id} (${guide.variant}) -> ${guide.relativePath}`);
	}
	return lines;
}

async function ensureParentDir(path: string): Promise<void> {
	await mkdir(dirname(path), { recursive: true });
}

async function syncAgentsFile(cwd: string): Promise<"created" | "updated" | "skipped"> {
	const targetPath = resolve(cwd, "AGENTS.md");
	const template = await readFile(TEMPLATE_AGENTS_PATH, "utf8");

	if (!(await fileExists(targetPath))) {
		await writeFile(targetPath, template, "utf8");
		return "created";
	}

	const current = await readFile(targetPath, "utf8");
	const beginCount = current.split(BEGIN_HEADER).length - 1;
	const endCount = current.split(END_HEADER).length - 1;
	if (beginCount !== 1 || endCount !== 1) {
		return "skipped";
	}

	const templateStart = template.indexOf(BEGIN_HEADER);
	const templateEnd = template.indexOf(END_HEADER);
	const targetStart = current.indexOf(BEGIN_HEADER);
	const targetEnd = current.indexOf(END_HEADER);
	if (templateStart < 0 || templateEnd < 0 || targetStart < 0 || targetEnd < 0) {
		return "skipped";
	}

	const templateHeader = template.slice(templateStart, templateEnd + END_HEADER.length);
	const updated = current.slice(0, targetStart) + templateHeader + current.slice(targetEnd + END_HEADER.length);
	if (updated === current) {
		return "updated";
	}

	await writeFile(targetPath, updated, "utf8");
	return "updated";
}

async function runGuideInit(ctx: ExtensionCommandContext): Promise<void> {
	const configPath = resolve(ctx.cwd, GUIDE_CONFIG_RELATIVE_PATH);
	const agentsPath = resolve(ctx.cwd, "AGENTS.md");
	let created = 0;

	if (!(await fileExists(configPath))) {
		await ensureParentDir(configPath);
		await writeFile(configPath, await readFile(TEMPLATE_GUIDES_PATH, "utf8"), "utf8");
		created += 1;
	}

	if (!(await fileExists(agentsPath))) {
		await writeFile(agentsPath, await readFile(TEMPLATE_AGENTS_PATH, "utf8"), "utf8");
		created += 1;
	}

	if (created === 0) {
		ctx.ui.notify("guide-init: nothing created; files already exist", "info");
		return;
	}

	ctx.ui.notify("guide-init: wrote repo guide files; reloading runtime", "success");
	await ctx.reload();
}

async function runGuideSync(ctx: ExtensionCommandContext): Promise<void> {
	const result = await syncAgentsFile(ctx.cwd);
	if (result === "skipped") {
		ctx.ui.notify("guide-sync: AGENTS.md exists but does not contain the managed header block", "warning");
		return;
	}

	ctx.ui.notify(`guide-sync: ${result} AGENTS.md; reloading runtime`, "success");
	await ctx.reload();
}

export default function guideSystemExtension(pi: ExtensionAPI) {
	pi.registerCommand("guides", {
		description: "Show resolved pi guide state for this repository",
		handler: async (_args, ctx) => {
			const state = await refreshStatus(ctx);
			ctx.ui.setWidget(GUIDE_WIDGET_KEY, widgetLines(state));
			ctx.ui.notify(renderStatus(state), state.active ? "info" : "warning");
		},
	});

	pi.registerCommand("guide-init", {
		description: "Initialize .pi/guides.json and repo AGENTS.md from package templates",
		handler: async (_args, ctx) => {
			await runGuideInit(ctx);
		},
	});

	pi.registerCommand("guide-sync", {
		description: "Refresh the managed header block in repo AGENTS.md from the package template",
		handler: async (_args, ctx) => {
			await runGuideSync(ctx);
		},
	});

	pi.on("session_start", async (_event, ctx) => {
		const state = await refreshStatus(ctx);
		if (!state.active && state.status === "guides: error") {
			ctx.ui.notify(`pi guides: ${state.reason}`, "warning");
		}
	});

	pi.on("before_agent_start", async (event, ctx) => {
		const state = await refreshStatus(ctx);
		if (!state.active) {
			return;
		}

		const registry = await loadRegistry();
		const injectedPrompt = await buildInjectedPrompt(state, registry);
		return {
			systemPrompt: `${event.systemPrompt}\n\n${injectedPrompt}`,
		};
	});

	pi.on("session_shutdown", async (_event, ctx) => {
		clearUi(ctx);
	});
}
