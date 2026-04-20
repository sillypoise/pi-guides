# OpenCode to pi Port Matrix

This document tracks what from `sp-opencode-guides/files/` has already been brought into
`pi-guides`, what should come next, and what should wait for real repo pressure.

The goal is not to import everything mechanically.
The goal is to preserve the pi-native placement model:

- guides for durable, reusable policy atoms;
- profiles for named activation stances;
- skills for deep procedures;
- prompt templates for thin task launchers;
- extension code for enforceable runtime behavior.

## Status labels

- `ported` — already imported into `sp-ctx/files/` and registered in the pi catalog.
- `import-next` — strong next candidate for import.
- `later` — likely useful, but should wait for adoption pressure.
- `skill-first` — better introduced first as a skill, overlay, or launcher rather than always-on.
- `defer` — intentionally postponed for now.
- `no-port` — OpenCode-specific bundle/provenance content that should not become active pi guide content.

## Current port principle

Import when the family is:

1. language-agnostic or broadly reusable,
2. durable enough for repeated cross-task use,
3. a good fit for pi guide/profile semantics,
4. justified by current repo dogfooding.

Defer when the family is:

1. strongly language-specific,
2. framework- or vendor-specific,
3. highly procedural and better as a skill,
4. niche enough that it should wait for real usage.

## Already ported foundation

| Family | Status | Notes |
|---|---|---|
| `tigerstyle` | ported | Strict compact/full only. Pragmatic variants still deferred. |
| `security-core` | ported | Baseline language-agnostic rulebook. |
| `contract-core` | ported | Baseline language-agnostic rulebook. |
| `robustness-core` | ported | Baseline language-agnostic rulebook. |
| `reproducibility-core` | ported | Baseline language-agnostic rulebook. |
| `uistyle` | ported | Language-agnostic frontend/UI heuristic layer. |
| `observability` | ported | Language-agnostic heuristics. |
| `change-risk` | ported | Language-agnostic heuristics; often overlay-friendly. |
| `epistemics` | ported | Language-agnostic heuristics. |
| `performance` | ported | Language-agnostic heuristics. |
| `privacy` | ported | Language-agnostic heuristics. |
| `operability` | ported | Language-agnostic heuristics. |
| `maintainability` | ported | Language-agnostic heuristics. |
| `legacy-evolution-mode` | ported | Language-agnostic migration heuristic layer. |
| `incremental-refactoring-strategy` | ported | Language-agnostic migration heuristic layer. |
| `compatibility-evolution` | ported | Language-agnostic compatibility heuristic layer. |
| `diataxis` | ported | Documentation architecture heuristic layer. |
| `testing` | ported | Pragmatic testing guide. |

## Remaining language-agnostic families

| Family | Source archetype | Status | Best pi fit | Candidate profile impact | Notes |
|---|---|---|---|---|---|
| `writing` | heuristics | import-next | guide | add to `docs` baseline and `docs-authoring` overlay | Strong complement to `diataxis`. Broadly useful for README, docs, design notes, and release writing. |
| `argument-structure` | playbook | later | skill-first | future `design` or proposal-oriented overlay/skill | Strong for proposals and decision docs, but too situational for always-on baselines at first. |
| `anki-authoring` | heuristics | defer | skill-first | none yet | Coherent but niche; wait for a real Anki authoring use case. |
| `counter-intuition-and-left-turn-thinking` | heuristics | later | skill-first | future design/ideation overlay | Interesting stance guide, but not strong baseline material yet. |
| `creative-constraints` | heuristics | later | skill-first | future design/ideation overlay | Better as explicit constrained-exploration workflow than always-on guidance. |
| `novelty-budgeting` | heuristics | later | skill-first | future design/release overlay | Useful for significant novelty-heavy changes, but not baseline-first. |
| `tigerstyle-pragmatic` | rulebook | defer | guide | none yet | Would add a second major TigerStyle axis. Defer until strict/pragmatic need is clear. |

## Language-specific TigerStyle families

| Tranche | Inventory | Status | Best pi fit | Candidate profile impact | Notes |
|---|---|---|---|---|---|
| Language-specific TigerStyle | `c`, `cpp`, `go`, `python`, `rust`, `swift`, `typescript`, `zig` | defer | guide | repo-specific baseline profiles later | Import on demand when real repos need them. Do not bulk-port yet. |
| React-specific TigerStyle | `react/tigerstyle-react-*` | defer | guide | future frontend/react baselines | Defer until React-heavy repo adoption creates pressure. |

## Framework and library playbooks

| Tranche | Inventory | Status | Best pi fit | Candidate profile impact | Notes |
|---|---|---|---|---|---|
| Frontend core playbooks | `css`, `nextjs`, `react`, `tailwindcss`, `zod` | later | guide + skill + prompt | future `frontend` refinement | Strong future tranche once consumer repos need them. |
| Frontend library tranche | `base-ui`, `react-aria`, `shadcn`, `tanstack-*`, `effect-ts`, `remeda` | later | guide + skill | repo-specific overlays or baselines later | Valuable, but too stack-specific to import ahead of adoption. |
| Runtime/backend tranche | `node`, `bun`, `express`, `h3`, `hapi` | later | guide + skill | future backend refinements | Import when service repos actually need them. |
| Data/infra tranche | `terraform`, `redis`, `valkey`, `kafka`, `mongodb`, `dynamodb` | later | guide + skill | domain-specific baselines later | Wait for actual consumer repos and operational pressure. |
| Product/platform tranche | `stripe`, `supabase`, `polar`, `ffmpeg` | later | guide + skill | repo-specific overlays later | Useful but specialized. |

## Vendor/provider and platform playbooks

| Tranche | Inventory | Status | Best pi fit | Candidate profile impact | Notes |
|---|---|---|---|---|---|
| AI/provider tranche | `ai-sdk`, `openai-*`, `claude-*` | defer | guide + skill | none yet | These may matter later, but they would broaden package scope significantly. |
| Cloudflare tranche | `cloudflare-*` | defer | guide + skill | none yet | Large vendor-specific surface. Do not import without real repo demand. |
| Expo/mobile tranche | `expo-eas`, `expo-runtime`, `react-native-*` | defer | guide + skill | none yet | Wait for mobile repo adoption. |

## OpenCode-specific artifacts not to port as active guides

| Artifact class | Inventory | Status | Notes |
|---|---|---|---|
| OpenCode selector/runtime files | `files/AGENTS.md`, `files/VARIANTS.md`, `files/opencode.json`, `files/GUIDE_SYSTEM.md` | no-port | These informed the pi-native design but should not be reintroduced as active pi runtime artifacts. |
| Provenance and derivation files | `files/derivations/*`, `files/sources/*`, `GUIDE_*_WORKSHEET.md`, `GUIDE_FORMALIZATION_CHECKLIST.md` | no-port | Keep as historical derivation/provenance references only when useful. |
| OpenCode bundle metadata | `files/GUIDE_BUNDLE.json`, `files/GUIDE_INDEX.json` | no-port | Superseded by pi-native registries and package metadata. |

## Immediate recommendation

### Next import

1. `writing`

### Next after that, if usage justifies it

2. `argument-structure`

### Profile recommendation for `writing`

Do **not** create a brand-new profile just for `writing` yet.

Instead:

- import `writing` as a guide family,
- add it to the `docs` baseline profile,
- add it to the `docs-authoring` overlay profile.

Rationale:

- `writing` complements `diataxis` directly;
- it improves documentation quality without changing general coding baselines;
- it is useful in docs-heavy repos and docs-focused sessions, but not necessarily worth making
  always-on in `core` or `coreplus`.

## Revisit triggers

Revisit deferred tranches when one of these becomes true:

- a consumer repo needs the guidance repeatedly,
- a missing family keeps showing up in repo-local `AGENTS.md` notes,
- a workflow would benefit more from a skill or prompt than more always-on guide text,
- baseline profiles are stable enough that a framework- or language-specific refinement is now
  worth the additional surface area.
