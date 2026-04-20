# Content Placement Model

This document defines where new guidance should live as the `pi-guides` activation engine grows.

The goal is not to place every new idea into always-on guide text.
The goal is to place each kind of knowledge into the pi primitive that fits it best.

## Decision Rule

When adding new guidance, ask:

1. Is this a durable rule or principle that should shape normal work repeatedly?
2. Is this a named activation stance that bundles several concerns together?
3. Is this a detailed workflow, checklist, or procedure?
4. Is this just a convenient task entry point?
5. Is this repo-local factual context rather than reusable policy?
6. Is this an operational behavior that should be enforced in runtime code?

## Primitive Map

### Guides

Use guides for durable policy atoms.

Good fit:

- normative rules
- reusable heuristics
- high-signal cross-task constraints
- compact framework guidance that affects everyday decisions

Examples:

- TigerStyle
- Security-Core
- Contract-Core
- UIStyle
- Next.js compact guide
- Tailwind compact guide
- TanStack Query compact guide

Rule of thumb:

- If it affects normal day-to-day choices, it is usually a guide.

### Profiles

Use profiles for named activation presets.

Good fit:

- repo baselines
- session overlays
- task overlays
- named bundles of guides and behavior stance

Examples:

- `core`
- `frontend`
- `backend`
- `review`
- `migration`
- `debug`

Rule of thumb:

- If it defines a stance or operating mode, it is usually a profile.

### Skills

Use skills for deep procedures and optional workflows.

Good fit:

- checklists
- audits
- migration procedures
- helper scripts
- reference packs
- framework-specific workflows that are too detailed for always-on prompts

Examples:

- Next.js routing audit
- Tailwind design-token migration
- TanStack Query cache-key and invalidation audit
- compatibility audit
- migration planning

Rule of thumb:

- If it is workflow-heavy, checklist-heavy, or procedural, it is usually a skill.

### Prompt templates

Use prompt templates for thin task launchers.

Good fit:

- one-turn task entry
- argumentized workflow launchers
- standard output-shape steering
- convenient UX around overlays and skills

Examples:

- `/review`
- `/migrate`
- `/design`
- `/nextjs-route-review`
- `/tailwind-refactor`
- `/query-cache-audit`

Rule of thumb:

- If it is just a task entry point, it is usually a prompt template.

### Repo `AGENTS.md`

Use `AGENTS.md` for repo-local facts only.

Good fit:

- architecture notes
- commands
- workflow expectations
- dangerous areas
- rollout constraints

Rule of thumb:

- If it is specific to one repository and should not be reused elsewhere, it belongs in
  `AGENTS.md`.

### Extension code

Use extension code for runtime activation and crisp operational enforcement.

Good fit:

- scope merging
- prompt injection
- status widgets
- path protections
- dangerous-command confirmation
- read-only review mode
- session and task overlay state

Rule of thumb:

- If it is a runtime behavior that can be enforced clearly, it belongs in extension code.

## Framework and Library Guidance

Framework and library guidance often spans several primitives.
That is expected.

### Compact framework guide

Use when the framework changes everyday coding behavior in that repo.

Examples:

- Next.js in a Next.js app
- Tailwind in a Tailwind-first UI codebase
- TanStack Query in a React app where server-state patterns are central daily

This usually belongs as:

- a framework or library guide
- activated by the repo baseline profile
- usually in compact form always-on

### Framework skill

Use when the framework knowledge is procedural, deep, or intermittent.

Examples:

- Next.js rendering and routing audit
- Tailwind token migration
- TanStack Query cache-key and invalidation audit

This usually belongs as:

- a skill

### Framework prompt template

Use when you want a thin task launcher for common framework work.

Examples:

- `/nextjs-route-review`
- `/tailwind-refactor`
- `/query-cache-audit`

This usually belongs as:

- a prompt template

### Framework overlay profile

Use when a temporary stance should emphasize a framework concern during a session or one task.

Examples:

- framework migration session
- framework audit task
- design-system cleanup session

This usually belongs as:

- an overlay profile

## Placement Summary

Use this quick decision rule:

- If it affects normal day-to-day choices, use a guide.
- If it defines a stance, use a profile.
- If it is workflow or checklist heavy, use a skill.
- If it is a task entry point, use a prompt template.
- If it is repo-local fact, use `AGENTS.md`.
- If it is enforceable runtime behavior, use extension code.
