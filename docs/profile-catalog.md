# First-pass Profile Catalog

This document is a first-pass profile design for the `pi-guides` activation engine.
It separates durable repo baselines from temporary overlays.

Profiles are named activation presets.
They should eventually be able to carry:

- guides
- default mode
- behavior flags
- recommended prompt templates
- recommended skills

This document is a design artifact first, not yet a registry contract.

## Profile Types

### Baseline profiles

Baseline profiles are durable repo defaults.
They belong in `.pi/guides.json`.

### Overlay profiles

Overlay profiles are temporary stances.
They belong in session state or one-turn task activation.
They should not be committed by default.

## Proposed Baseline Profiles

### `core`

Purpose:

- Minimal cross-repo coding baseline.

Always-on guides:

- `tigerstyle`

Default mode:

- `compact`

Recommended prompts:

- none required

Recommended skills:

- none required

Notes:

- This remains the default low-friction starting point.
- It should stay compact and high-signal.

### `frontend`

Purpose:

- Frontend baseline for repos with recurring UI and browser-facing work.

Always-on guides:

- `tigerstyle`
- `uistyle`
- `maintainability`
- `observability`

Default mode:

- `compact`

Recommended prompts:

- `/design`
- `/review`
- `/debug`

Recommended skills:

- `guide-review`
- `observability-audit`

Notes:

- Add framework guides only when the framework shapes daily architecture.
- A Tailwind or Next.js repo may add framework-specific compact guides here.

### `backend`

Purpose:

- Service and API baseline where contracts, failure handling, and operability matter daily.

Always-on guides:

- `tigerstyle`
- `contract-core`
- `robustness-core`
- `observability`
- `operability`

Default mode:

- `compact`

Recommended prompts:

- `/review`
- `/debug`
- `/design`

Recommended skills:

- `compatibility-audit`
- `guide-review`

Notes:

- Security and privacy may belong here for higher-sensitivity services.
- Keep the baseline focused on high-frequency concerns.

### `docs`

Purpose:

- Documentation-heavy repositories or task environments.

Always-on guides:

- `diataxis`
- `maintainability`
- `epistemics`

Default mode:

- `compact`

Recommended prompts:

- `/docs`
- `/review`

Recommended skills:

- `docs-diataxis-review`

Notes:

- This may also fit doc-focused sessions inside software repos, not only doc-only repos.

### `security-sensitive`

Purpose:

- Higher-sensitivity repos where security and reproducibility are daily concerns.

Always-on guides:

- `tigerstyle`
- `security-core`
- `contract-core`
- `reproducibility-core`
- `privacy`

Default mode:

- `compact`

Recommended prompts:

- `/review`
- `/risk`

Recommended skills:

- `risk-assessment`
- `guide-review`

Notes:

- Use when the extra always-on weight is justified by repo sensitivity.

## Proposed Overlay Profiles

### `review`

Purpose:

- Temporary read-only analysis and code review stance.

Guide additions:

- `change-risk`
- `epistemics`
- `maintainability`

Mode:

- `compact`

Behavior ideas:

- prefer read-only operation
- block or confirm edits and writes
- bias toward issue finding, negative cases, and explicit confidence

Recommended prompts:

- `/review`

Recommended skills:

- `guide-review`

Notes:

- This is one of the strongest candidates for hard runtime enforcement.

### `migration`

Purpose:

- Temporary stance for staged modernization and compatibility-sensitive change.

Guide additions:

- `change-risk`
- `legacy-evolution-mode`
- `incremental-refactoring-strategy`
- `compatibility-evolution`

Mode:

- `compact`

Behavior ideas:

- warn before sweeping rewrites
- prefer staged plans and rollback notes
- encourage seam-first edits

Recommended prompts:

- `/migrate`
- `/design`

Recommended skills:

- `migration-planning`
- `compatibility-audit`
- `refactor-staging`

Notes:

- This profile captures a lot of the original OpenCode migration intent.

### `debug`

Purpose:

- Temporary stance for diagnosis, evidence gathering, and boundary testing.

Guide additions:

- `epistemics`
- `observability`
- `robustness-core`

Mode:

- `compact`

Behavior ideas:

- bias toward observation before solution
- prefer hypotheses, tests, and disconfirming evidence
- recommend logging, instrumentation, and reproduction steps

Recommended prompts:

- `/debug`

Recommended skills:

- `observability-audit`

Notes:

- This is a good example of a session overlay that should not rewrite repo config.

### `design`

Purpose:

- Temporary stance for planning, tradeoff evaluation, and architecture discussion.

Guide additions:

- `epistemics`
- `maintainability`
- `performance`
- `novelty-budgeting`

Mode:

- `compact`

Behavior ideas:

- surface alternatives and tradeoffs
- encourage explicit assumptions and constraints
- balance novelty against risk

Recommended prompts:

- `/design`

Recommended skills:

- `risk-assessment`

Notes:

- This overlay fits planning and ideation turns especially well.

### `docs-authoring`

Purpose:

- Temporary stance for writing or restructuring docs.

Guide additions:

- `diataxis`
- `epistemics`

Mode:

- `compact`

Behavior ideas:

- keep documentation mode boundaries explicit
- bias toward reader clarity and correct document form

Recommended prompts:

- `/docs`

Recommended skills:

- `docs-diataxis-review`

Notes:

- This should work well across code repos and doc repos.

### `release`

Purpose:

- Temporary stance for release, rollout, and change verification.

Guide additions:

- `change-risk`
- `compatibility-evolution`
- `reproducibility-core`

Mode:

- `compact`

Behavior ideas:

- require explicit validation summary
- bias toward rollback and compatibility notes
- emphasize versioning and provenance checks

Recommended prompts:

- `/risk`
- `/review`

Recommended skills:

- `risk-assessment`
- `compatibility-audit`

Notes:

- This is a natural fit for release-day or rollout-day session overlays.

## Framework and Library Placement

Framework-specific guidance should usually be attached to baseline profiles only when the framework
changes daily coding behavior.
Otherwise it should be available as an overlay, skill, or prompt.

### Good baseline additions

Use framework guides in baseline profiles when the repo is deeply shaped by them.

Examples:

- Next.js in a Next.js application
- Tailwind in a Tailwind-first frontend codebase
- TanStack Query in an application where server-state patterns are central every day

### Better as overlay or skill

Use overlays or skills when the framework is real but only task-relevant sometimes.

Examples:

- migration to a new Next.js routing pattern
- Tailwind token migration
- TanStack Query cache invalidation audit

## Candidate Commands

These profiles suggest future command surfaces.

- `/guide-session <profile-id>`
- `/guide-session clear`
- `/guide-next <profile-id>`
- `/guides`

Prompt templates should remain the thin task-entry UX, while these commands control activation
state more explicitly.
