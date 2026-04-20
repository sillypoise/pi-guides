# Context Activation Engine

This document captures the target design for `pi-guides` as a pi-native context activation
engine.

## Design Goal

On every turn, the extension should answer:

> Given this repo, this session state, and this current task, what behavior and context should be
> active right now, and what operational guardrails should be enforced?

This is intentionally broader than markdown guide concatenation.
The extension is the runtime orchestrator for policy activation, repo context, temporary overlays,
UI visibility, and operational safety.

## Core Roles

### Guides

Guides are the smallest reusable policy units.
They hold durable normative or heuristic content.

Examples:

- `tigerstyle`
- `security-core`
- `contract-core`
- `robustness-core`
- `uistyle`
- `change-risk`

Guides answer:

- What rules or principles exist?
- What archetype is this content?
- What precedence does it have?
- Which variants exist?

### Profiles

Profiles are named activation presets.
They are not policy text themselves.
They bundle guides, default mode, and future behavior recommendations.

Examples:

- `core`
- `frontend`
- `backend`
- `review`
- `migration`
- `debug`

Profiles answer:

- What stance or operating mode is active?
- Which guides should be active together?
- Which mode should be preferred?
- Which prompts or skills are good fits?
- Which runtime guardrails should tighten or relax?

### Skills

Skills are deep, on-demand procedures.
They are the right home for multi-step workflows, checklists, helper assets, and optional scripts.

Examples:

- `guide-review`
- `migration-planning`
- `compatibility-audit`
- `docs-diataxis-review`

Skills answer:

- What detailed process should the agent follow for this kind of task?
- What deeper references or scripts should be available on demand?

### Prompt templates

Prompt templates are thin task launchers.
They should express task intent and deliverable shape, not duplicate the guide corpus.

Examples:

- `/review`
- `/design`
- `/debug`
- `/docs`
- `/migrate`

Prompt templates answer:

- What task is the user initiating right now?
- What one-turn overlay should activate?
- What output shape is desired?

### Repo `AGENTS.md`

`AGENTS.md` remains the home for repo-local facts.
It should contain architecture, commands, workflow notes, and repo-specific constraints.
It should not become the canonical guide selector again.

### Extension code

The extension is the activation engine.
It resolves and enforces everything above.

The extension owns:

- config resolution
- precedence ordering
- scope merging
- prompt injection
- UI/status visibility
- session state
- task overlays
- operational guardrails

## Scope Model

The intended activation stack has three main scopes.

### 1. Repo baseline

Source of truth:

- `.pi/guides.json`
- `AGENTS.md`

This layer captures the durable default for a repository.
It should be stable and commit-friendly.

### 2. Session overlay

Session overlays are temporary working stances.
They should live in extension-managed session state, not repo config.

Example session overlays:

- review
- migration
- debug
- docs-authoring

Candidate commands:

- `/guide-session <profile-id>`
- `/guide-session clear`

### 3. Task or prompt overlay

Task overlays are one-turn intent activations.
They should come from prompt templates or explicit commands, not durable repo config.

Example task overlays:

- `/review`
- `/design`
- `/debug`
- `/docs`
- `/migrate`

Candidate commands:

- `/guide-next <profile-id>`
- prompt-template-driven one-turn activation

## Always-on vs On-demand

Pi gives us multiple primitives, so not every kind of guidance should live in always-on prompt
text.

### Good always-on candidates

Use always-on guide text for compact, durable, cross-task constraints.

Examples:

- TigerStyle
- Security-Core
- Contract-Core
- Robustness-Core
- Reproducibility-Core

### Good conditional always-on candidates

Use these when the repo domain clearly needs them.

Examples:

- UIStyle
- Observability
- Performance
- Privacy
- Maintainability

### Better as overlays, skills, or prompts

These are often highly valuable but are too situational for universal always-on injection.

Examples:

- Change-Risk
- Legacy-Evolution-Mode
- Incremental-Refactoring-Strategy
- Compatibility-Evolution
- Diataxis
- Anki-Authoring
- Novelty-Budgeting
- Counter-Intuition-and-Left-Turn-Thinking

## Hard Enforcement vs Soft Steering

The extension should enforce crisp operational constraints in code and steer judgment-heavy behavior
with guides.

### Hard-enforce in extension code

Only enforce behaviors that are operationally crisp.

Examples:

- read-only review mode
- confirmation for destructive shell commands
- path protections
- broad-edit confirmation in migration mode
- clear active-state status and widgets

### Soft-steer with guides, profiles, skills, and prompts

Use content for semantic behavior that requires judgment.

Examples:

- epistemic quality
- maintainability heuristics
- documentation architecture
- observability philosophy
- compatibility reasoning
- change-risk reasoning

## Framework and library guidance

Framework-specific guidance should normally live in the framework or library layer, but still split
between always-on and on-demand pieces.

### Framework guide as compact baseline

If a repo is fundamentally built around a framework, a compact framework guide can be part of the
repo baseline profile.

Examples:

- Next.js guide in a Next.js repo
- Tailwind guide in a Tailwind-heavy frontend repo
- TanStack Query guide in a data-heavy React app where it shapes architecture daily

### Skill for deep procedures

Framework procedures and non-trivial workflows should become skills.

Examples:

- Next.js routing and rendering audit skill
- Tailwind design-token migration skill
- TanStack Query cache-key review skill

### Prompt templates for task entry

Framework tasks are excellent prompt-template entry points.

Examples:

- `/nextjs-route-review`
- `/tailwind-refactor`
- `/query-cache-audit`

### Rule of thumb

Treat framework guidance as always-on only when it changes normal day-to-day code decisions.
Treat it as on-demand when it is specialized, procedural, or only relevant to certain tasks.

## Intended Runtime Responsibilities

The extension should eventually become a policy activation engine with these responsibilities.

### Resolution

- Load repo baseline from `.pi/guides.json`.
- Merge session overlays.
- Merge task overlays.
- Resolve precedence and mode.
- Select the final active guide set.

### Injection

- Inject compact always-on guides by default.
- Allow overlays to switch to fuller variants when appropriate.
- Keep active context inspectable via `/guides` and status widgets.

### Enforcement

- Apply scope-specific tool restrictions where crisp.
- Confirm dangerous operations when relevant.
- Surface active operating mode clearly.

### Recommendations

- Suggest useful prompts and skills for the active profile.
- Keep optional deep workflows out of the always-on prompt when possible.

## Design Principle

The end state is:

- guides define reusable policy atoms;
- profiles define named activation presets;
- skills define deep procedures;
- prompt templates define task entry points;
- repo `AGENTS.md` defines local facts;
- the extension resolves and enforces the active behavior per repo, per session, and per prompt.
