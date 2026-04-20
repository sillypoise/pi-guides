# Profile Schema v2 Proposal

This document proposes a richer profile contract for the `pi-guides` activation engine.

The current profile model is intentionally minimal.
It mainly maps profile ids to guide ids.
That is sufficient for repo baseline activation, but not for the longer-term vision of repo,
session, and task scoped activation.

## Design Goal

Profiles should become named activation presets.
They should define not only guide bundles, but also the intended operating stance for the
activation engine.

This proposal is still a design document.
It does not yet define the committed runtime schema.

## What Profiles Are

Profiles are not guides.
Profiles are not repo config files.
Profiles are registry-defined presets that can be activated at repo, session, or task scope.

Profiles should be able to describe:

- which guides are bundled
- which mode to prefer
- which scope they are meant for
- which runtime behavior flags they imply
- which prompts and skills are good fits

## Proposed Profile Fields

### Required core fields

```json
{
  "title": "Migration",
  "scope": "overlay",
  "guides": [
    "change-risk",
    "legacy-evolution-mode",
    "compatibility-evolution"
  ]
}
```

Fields:

- `title`: human-readable name
- `scope`: `baseline`, `overlay`, or `any`
- `guides`: guide ids included by the profile

### Recommended optional fields

```json
{
  "title": "Migration",
  "description": "Staged modernization and compatibility-sensitive change planning.",
  "scope": "overlay",
  "mode": "compact",
  "guides": [
    "change-risk",
    "legacy-evolution-mode",
    "incremental-refactoring-strategy",
    "compatibility-evolution"
  ],
  "behavior": {
    "write_policy": "confirm-broad-edits",
    "response_contract": "stages-risks-rollbacks",
    "tool_mode": "normal"
  },
  "recommendations": {
    "prompts": ["migrate", "design"],
    "skills": ["migration-planning", "compatibility-audit", "refactor-staging"]
  },
  "tags": ["migration", "legacy", "compatibility"]
}
```

Fields:

- `description`: short human-readable purpose
- `mode`: preferred guide size or activation mode
- `behavior`: runtime policy hints for the extension
- `recommendations`: prompts and skills to surface in UI
- `tags`: lightweight categorization metadata

## Scope Semantics

### `baseline`

Use for durable repo defaults.
These profiles are suitable for `.pi/guides.json` baseline selection.

Examples:

- `core`
- `frontend`
- `backend`
- `docs`

### `overlay`

Use for temporary session or task stances.
These profiles should usually not be committed as repo baseline defaults.

Examples:

- `review`
- `migration`
- `debug`
- `release`

### `any`

Use when a profile is reasonable both as a baseline and as an overlay.
This should be used sparingly.

## Behavior Fields

Behavior fields should remain small and operationally crisp.
They are not meant to encode semantic judgment.

Candidate fields:

```json
{
  "behavior": {
    "write_policy": "normal",
    "tool_mode": "normal",
    "response_contract": "default"
  }
}
```

### `write_policy`

Candidate values:

- `normal`
- `confirm-broad-edits`
- `confirm-all-writes`
- `read-only`

Use cases:

- review profile -> `read-only`
- migration profile -> `confirm-broad-edits`

### `tool_mode`

Candidate values:

- `normal`
- `conservative`

Use cases:

- security-sensitive overlay -> `conservative`
- review overlay -> `conservative`

This is intentionally coarse at first.

### `response_contract`

Candidate values:

- `default`
- `review-findings`
- `stages-risks-rollbacks`
- `diagnosis-hypotheses-tests`
- `decision-options-tradeoffs`

Use cases:

- review profile -> `review-findings`
- migration profile -> `stages-risks-rollbacks`
- debug profile -> `diagnosis-hypotheses-tests`
- design profile -> `decision-options-tradeoffs`

This is not strict output validation.
It is a steering and UI hint for the extension.

## Recommendations Fields

Profiles should be able to suggest useful prompts and skills without forcing them.

```json
{
  "recommendations": {
    "prompts": ["review", "design"],
    "skills": ["guide-review"]
  }
}
```

These recommendations can power:

- `/guides` widget hints
- future profile-specific UI
- future activation suggestions

## Example Profiles

### Baseline profile example

```json
{
  "core": {
    "title": "Core",
    "description": "Minimal cross-repo coding baseline.",
    "scope": "baseline",
    "mode": "compact",
    "guides": ["tigerstyle"],
    "behavior": {
      "write_policy": "normal",
      "tool_mode": "normal",
      "response_contract": "default"
    },
    "recommendations": {
      "prompts": [],
      "skills": []
    },
    "tags": ["baseline", "minimal"]
  }
}
```

### Overlay profile example

```json
{
  "review": {
    "title": "Review",
    "description": "Read-only analysis and issue-finding stance.",
    "scope": "overlay",
    "mode": "compact",
    "guides": ["change-risk", "epistemics", "maintainability"],
    "behavior": {
      "write_policy": "read-only",
      "tool_mode": "conservative",
      "response_contract": "review-findings"
    },
    "recommendations": {
      "prompts": ["review"],
      "skills": ["guide-review"]
    },
    "tags": ["overlay", "review", "analysis"]
  }
}
```

## Relationship to `.pi/guides.json`

Profiles do not replace `.pi/guides.json`.
The file remains the repo baseline source of truth.

The relationship is:

- profile registry defines reusable presets
- `.pi/guides.json` chooses which preset a repo baseline uses
- session and task overlays choose temporary presets in extension state
- the extension merges all active presets per turn

## Relationship to Guide Registry

Profiles should continue to reference guide ids, not file paths.

That means:

- guide registry owns file mapping and precedence metadata
- profile registry owns named activation presets
- repo config owns baseline selection

This keeps the contract stable even when file layout changes.

## Suggested Migration Strategy

### Phase 1

Keep current profile schema working.
Add optional fields in a backward-compatible way.

### Phase 2

Teach the extension to read:

- `scope`
- `mode`
- `behavior`
- `recommendations`

without changing the current baseline command flow.

### Phase 3

Add session and task overlay commands that use overlay profiles.

## Design Principle

A profile should express a named operating stance for the activation engine.
It should bundle policy, preferred mode, and operational hints, while leaving repo baseline
selection in `.pi/guides.json` and keeping guide definitions in the guide registry.
