# Activation State Model

This document proposes how repo, session, and task activation state should merge inside the
`pi-guides` extension.

## Design Goal

On each turn, the extension should compute one effective activation state from three scopes:

1. repo baseline
2. session overlay
3. task overlay

The extension then uses that effective state to:

- resolve active guides and profiles
- inject context
- expose status and widget output
- enforce operational guardrails
- recommend relevant prompts and skills

## Scope Responsibilities

### Repo baseline

The repo baseline is durable and commit-friendly.
It is the default activation state for a repository.

Primary source:

- `.pi/guides.json`

Supporting repo context:

- `AGENTS.md`

This scope should define:

- baseline profile or explicit guide list
- baseline mode
- baseline additions and removals
- explicit guide overrides
- future repo-level behavior settings if needed

### Session overlay

The session overlay is temporary.
It should represent the user's current working stance.
It should not rewrite repo config by default.

Examples:

- review
- migration
- debug
- docs-authoring
- release

This scope should define:

- temporary overlay profile id
- optional mode override
- optional extra guide additions or removals
- temporary behavior flags

Storage:

- extension-managed session state

Candidate commands:

- `/guide-session <profile-id>`
- `/guide-session clear`

### Task overlay

The task overlay is one-turn activation state.
It should be applied to the next prompt only, or to the currently expanded prompt.

Examples:

- review this diff
- design this system
- debug this failure
- write docs for this feature

This scope should define:

- one-turn overlay profile id
- one-turn mode override
- optional behavior flags
- optional response contract or output-shape hints

Sources:

- prompt templates
- explicit command such as `/guide-next <profile-id>`
- future structured metadata if needed

## Merge Principle

The extension should not treat all scopes equally.
The merge should be layered and explicit.

Recommended precedence by scope:

1. repo baseline
2. session overlay
3. task overlay

Higher scopes narrow or augment lower scopes for the current turn.
They should not silently rewrite the lower-scope persisted source of truth.

## Source of Truth Rules

### Repo source of truth

`.pi/guides.json` remains the source of truth for repo baseline activation.
Profiles do not replace this file.
Profiles are registry-defined presets that the file can reference.

That means:

- profile definitions live in the guide package registry
- repo selection lives in `.pi/guides.json`
- the extension resolves the file against the profile registry

### Session source of truth

Session overlays live only in extension session state unless the user explicitly persists them.

### Task source of truth

Task overlays live only for one turn unless the user explicitly promotes them to session scope.

## Effective State Shape

The extension should compute an internal effective state similar to this shape:

```json
{
  "repo": {
    "profile": "frontend",
    "mode": "compact"
  },
  "session": {
    "profile": "migration",
    "mode": null
  },
  "task": {
    "profile": "review",
    "mode": null
  },
  "effective": {
    "profiles": ["frontend", "migration", "review"],
    "guides": [
      "tigerstyle",
      "uistyle",
      "maintainability",
      "change-risk",
      "legacy-evolution-mode",
      "compatibility-evolution",
      "epistemics"
    ],
    "mode": "compact",
    "behavior": {
      "write_policy": "read-only",
      "response_contract": "review-findings"
    }
  }
}
```

This is an internal model, not necessarily the persisted schema.

## Merge Semantics by Field

### Profiles

Profiles should stack by scope.

Recommended behavior:

- repo baseline contributes its baseline profile
- session overlay adds or swaps in a temporary overlay profile
- task overlay adds or swaps in a one-turn overlay profile

The extension then resolves the union in precedence order.

### Guides

Guides should be derived from resolved profiles plus explicit additions and removals.

Recommended algorithm:

1. resolve baseline profile guides
2. apply baseline additions and removals
3. resolve session overlay profile guides
4. apply session additions and removals
5. resolve task overlay profile guides
6. apply task additions and removals
7. deduplicate
8. sort by guide precedence

### Mode

Mode should use highest-scope explicit value.

Recommended behavior:

- task mode override wins
- session mode override wins over repo mode
- repo mode wins over profile defaults
- profile defaults win over package default

### Behavior flags

Behavior flags should merge by explicit override, with higher scope winning.

Examples:

- repo baseline says `write_policy = normal`
- session overlay says `write_policy = confirm-broad-edits`
- task overlay says `write_policy = read-only`

Effective result:

- `read-only`

### Recommendations

Recommended prompts and skills should be additive.

The extension can show:

- prompts suggested by active profiles
- skills suggested by active profiles

This is advisory, not enforced.

## Persistence Rules

### Persisted by default

- repo baseline only

### Not persisted by default

- session overlay
- task overlay

### Explicit persist actions

Candidate future commands:

- persist current session profile to repo baseline
- promote task overlay to session overlay
- clear session overlay

These should be explicit commands, never implicit side effects.

## Example Turn

Assume:

- repo baseline profile = `frontend`
- session overlay profile = `migration`
- task overlay profile = `review`

Expected effect:

- baseline frontend context remains active
- migration context adds change-risk and staged-change reasoning
- review context makes the turn read-only and biases toward issue finding

The task overlay should not rewrite repo config.
The session overlay should not rewrite repo config.
Only the effective state for the current turn changes.

## Candidate UI Model

`/guides` should eventually show all three scopes separately.

Example sections:

- repo baseline
- session overlay
- task overlay
- effective active guides
- effective behavior flags
- recommended prompts
- recommended skills

This keeps activation inspectable.

## Design Principle

Profiles do not override `.pi/guides.json` as the repo source of truth.
Instead:

- `.pi/guides.json` selects the repo baseline;
- profile definitions live in the package registry;
- session and task overlays live in transient extension state;
- the extension merges all scopes into one effective activation state per turn.
