import test from "node:test";
import assert from "node:assert/strict";
import {
    existsSync,
    mkdtempSync,
    mkdirSync,
    readFileSync,
    rmSync,
    writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import guideSystemExtension from "../extensions/guide-system.ts";

function createPiHarness() {
    const commands = new Map();
    const events = new Map();
    const api = {
        registerCommand(name, options) {
            commands.set(name, options);
        },
        on(name, handler) {
            events.set(name, handler);
        },
    };

    guideSystemExtension(api);
    return { commands, events };
}

function createCommandContext(cwd) {
    const notifications = [];
    const widgets = [];
    const statuses = [];
    let reloadCount = 0;

    return {
        cwd,
        notifications,
        widgets,
        statuses,
        get reloadCount() {
            return reloadCount;
        },
        ui: {
            notify(message, level) {
                notifications.push({ message, level });
            },
            setStatus(key, value) {
                statuses.push({ key, value });
            },
            setWidget(key, value) {
                widgets.push({ key, value });
            },
        },
        async reload() {
            reloadCount += 1;
        },
    };
}

async function withTempRoot(runCase) {
    const rootPath = mkdtempSync(join(tmpdir(), "pi-guides-commands-"));

    try {
        await runCase(rootPath);
    } finally {
        rmSync(rootPath, { recursive: true, force: true });
    }
}

function writeGuidesConfig(rootPath, config) {
    mkdirSync(join(rootPath, ".pi"), { recursive: true });
    writeFileSync(
        join(rootPath, ".pi", "guides.json"),
        `${JSON.stringify(config, null, 2)}\n`,
        "utf8",
    );
}

function readGuidesConfig(rootPath) {
    return JSON.parse(readFileSync(join(rootPath, ".pi", "guides.json"), "utf8"));
}

const { commands } = createPiHarness();
const guideInit = commands.get("guide-init");
const guideSync = commands.get("guide-sync");
const guideProfile = commands.get("guide-profile");
const guideMode = commands.get("guide-mode");

if (!guideInit || !guideSync || !guideProfile || !guideMode) {
    throw new Error("expected guide commands to be registered");
}

test("guide-init --no-settings bootstraps repo-local files without project settings", async () => {
    await withTempRoot(async (rootPath) => {
        const ctx = createCommandContext(rootPath);

        await guideInit.handler("--no-settings", ctx);

        assert.equal(ctx.reloadCount, 1);
        assert.equal(readFileSync(join(rootPath, ".pi", "guides.json"), "utf8").length > 0, true);
        assert.equal(readFileSync(join(rootPath, "AGENTS.md"), "utf8").length > 0, true);
        assert.equal(existsSync(join(rootPath, ".pi", "settings.json")), false);

        const widgetLines = ctx.widgets.at(-1)?.value;
        assert.ok(Array.isArray(widgetLines));
        assert.ok(widgetLines.includes("setup mode: global package assumed"));
        assert.ok(widgetLines.includes("settings: skipped by request"));
    });
});

test("guide-init with explicit package source writes project settings and widget guidance", async () => {
    await withTempRoot(async (rootPath) => {
        const ctx = createCommandContext(rootPath);
        const packageSource = "git:github.com/sillypoise/pi-guides@v0.1.0";

        await guideInit.handler(packageSource, ctx);

        assert.equal(ctx.reloadCount, 1);
        const settings = JSON.parse(readFileSync(join(rootPath, ".pi", "settings.json"), "utf8"));
        assert.deepEqual(settings, { packages: [packageSource] });

        const widgetLines = ctx.widgets.at(-1)?.value;
        assert.ok(Array.isArray(widgetLines));
        assert.ok(widgetLines.includes("setup mode: repo-pinned package"));
        assert.ok(widgetLines.includes(`settings source: ${packageSource}`));
        assert.ok(widgetLines.includes("next:"));
    });
});

test("guide-init rejects unknown options and shows usage widget", async () => {
    await withTempRoot(async (rootPath) => {
        const ctx = createCommandContext(rootPath);

        await guideInit.handler("--wat", ctx);

        assert.equal(ctx.reloadCount, 0);
        assert.ok(ctx.notifications.some((entry) => entry.message.includes("unknown option '--wat'")));

        const widgetLines = ctx.widgets.at(-1)?.value;
        assert.ok(Array.isArray(widgetLines));
        assert.ok(widgetLines.includes("usage: /guide-init [package-source] [--no-settings]"));
    });
});

test("guide-sync reports unchanged without reloading", async () => {
    await withTempRoot(async (rootPath) => {
        const createCtx = createCommandContext(rootPath);
        await guideSync.handler("", createCtx);

        const unchangedCtx = createCommandContext(rootPath);
        await guideSync.handler("", unchangedCtx);

        assert.equal(unchangedCtx.reloadCount, 0);
        const widgetLines = unchangedCtx.widgets.at(-1)?.value;
        assert.ok(Array.isArray(widgetLines));
        assert.ok(widgetLines.includes("result: unchanged"));
    });
});

test("guide-profile no-op does not rewrite or reload", async () => {
    await withTempRoot(async (rootPath) => {
        writeGuidesConfig(rootPath, {
            version: 1,
            profile: "core",
            mode: "compact",
            additions: [],
            removals: [],
            variants: {},
        });
        const beforeContent = readFileSync(join(rootPath, ".pi", "guides.json"), "utf8");
        const ctx = createCommandContext(rootPath);

        await guideProfile.handler("core", ctx);

        const afterContent = readFileSync(join(rootPath, ".pi", "guides.json"), "utf8");
        assert.equal(ctx.reloadCount, 0);
        assert.equal(afterContent, beforeContent);
        assert.ok(ctx.notifications.some((entry) => entry.message.includes("already persisted")));
    });
});

test("guide-mode no-op does not rewrite or reload", async () => {
    await withTempRoot(async (rootPath) => {
        writeGuidesConfig(rootPath, {
            version: 1,
            profile: "core",
            mode: "full",
            additions: [],
            removals: [],
            variants: {},
        });
        const beforeContent = readFileSync(join(rootPath, ".pi", "guides.json"), "utf8");
        const ctx = createCommandContext(rootPath);

        await guideMode.handler("full", ctx);

        const afterContent = readFileSync(join(rootPath, ".pi", "guides.json"), "utf8");
        assert.equal(ctx.reloadCount, 0);
        assert.equal(afterContent, beforeContent);
        assert.ok(ctx.notifications.some((entry) => entry.message.includes("already persisted")));
    });
});

test("guide-mode persists an explicit mode when the config relied on a profile default", async () => {
    await withTempRoot(async (rootPath) => {
        writeGuidesConfig(rootPath, {
            version: 1,
            profile: "core",
            additions: [],
            removals: [],
            variants: {},
        });
        const ctx = createCommandContext(rootPath);

        await guideMode.handler("compact", ctx);

        const config = readGuidesConfig(rootPath);
        assert.equal(ctx.reloadCount, 1);
        assert.equal(config.mode, "compact");
    });
});
