# `.pi/guides.json` v2 Proposal

This document proposes a next-step shape for repo baseline guide configuration.

The guiding principle is:

- `.pi/guides.json` remains the repo-level source of truth;
- profile definitions live in the package registry;
- session and task overlays stay transient by default;
- the extension merges all scopes into one effective activation state per turn.

## Design Goals

The repo config should:

- stay simple for common cases;
- remain commit-friendly and deterministic;
- support richer baseline behavior over time;
- avoid storing session or one-turn state by default;
- reference guide and profile ids, not file paths.

## Current v1 Shape

Today the file is intentionally small.

```json
{
  "version": 1,
  "profile": "core",
  "mode": "compact",
  "additions": [],
  "removals": [],
  "variants": {}
}
```

This already works well for baseline guide selection.
What it cannot yet express clearly is:

- repo baseline behavior hints;
- richer baseline metadata;
- future defaults for session and task overlays;
- clearer separation between baseline activation and transient overlays.

## Proposed v2 Shape

A first-pass v2 shape could look like this:

```json
{
  "version": 2,
  "baseline": {
    "profile": "frontend",
    "mode": "compact",
    "additions": ["change-risk"],
    "removals": [],
    "variants": {
      "uistyle": "strict-compact"
    },
    "behavior": {
      "write_policy": "normal",
      "tool_mode": "normal",
      "response_contract": "default"
    }
  },
  "defaults": {
    "session_profile": null,
    "task_profile": null
  }
}
```

This is still compact, but it creates cleaner room for growth.

## Proposed Top-level Fields

### `version`

Schema version for repo config.

### `baseline`

Required repo baseline activation state.
This replaces the current flat top-level profile and guide fields.

### `defaults`

Optional repo-local defaults for transient activation.
These are not active overlays by themselves.
They are only defaults or hints the extension may offer when the repo starts.

This field should remain conservative.
It should not silently activate surprising transient modes.

## `baseline` Fields

### Minimal profile-based example

```json
{
  "baseline": {
    "profile": "core"
  }
}
```

### Full example

```json
{
  "baseline": {
    "profile": "backend",
    "mode": "compact",
    "additions": ["privacy"],
    "removals": [],
    "variants": {
      "security-core": "strict-compact"
    },
    "behavior": {
      "write_policy": "normal",
      "tool_mode": "normal",
      "response_contract": "default"
    }
  }
}
```

### Candidate fields

- `profile`: baseline profile id
- `guides`: explicit baseline guide ids as an alternative to `profile`
- `mode`: baseline mode override
- `additions`: extra baseline guides
- `removals`: removed baseline guides
- `variants`: explicit guide variant overrides
- `behavior`: repo baseline runtime behavior hints

The same mutual-exclusion rule should remain:

- choose either `profile` or `guides`, not both.

## `behavior` Fields

Repo baseline behavior should stay small and operationally crisp.

First-pass fields:

```json
{
  "behavior": {
    "write_policy": "normal",
    "tool_mode": "normal",
    "response_contract": "default"
  }
}
```

These fields are intentionally aligned with the profile schema proposal.
Repo config can override profile defaults when the repository needs a stricter or more specific
baseline.

## `defaults` Fields

A conservative first-pass shape:

```json
{
  "defaults": {
    "session_profile": null,
    "task_profile": null
  }
}
```

Use cases:

- a repo can suggest a default session stance for common work;
- a repo can suggest a common task overlay for certain prompt templates;
- the extension can show these as recommendations, not silently force them.

My recommendation is to keep this optional and advisory first.

## Merge Semantics

The repo config should contribute only the baseline layer.
It should not directly store live session or task state.

Recommended merge order:

1. repo baseline from `.pi/guides.json`
2. session overlay from extension session state
3. task overlay from one-turn activation state

### Behavior merge

For behavior fields:

- task override wins
- session override wins over baseline
- baseline wins over profile default
- profile default wins over package default

### Guide merge

For guides:

- resolve baseline profile or explicit guides
- apply baseline additions and removals
- apply higher-scope overlays after that

## Backward Compatibility

A safe migration path would be:

### Phase 1

Continue supporting `version: 1` exactly as today.

### Phase 2

Add `version: 2` support alongside `version: 1`.

### Phase 3

Teach `/guide-init` to emit `version: 2` only when the extension fully supports it.

This avoids breaking existing repos.

## Why Nest Under `baseline`

This shape makes scope boundaries explicit.

Without nesting, future growth risks turning the file into a flat mix of:

- durable baseline state
- transient activation hints
- behavior flags
- recommendations

Nesting keeps the intent readable and preserves a clean mental model.

## Recommended First Implementation Slice

If we implement v2 incrementally, the first useful slice is:

- support `baseline.profile`
- support `baseline.mode`
- support `baseline.additions`
- support `baseline.removals`
- support `baseline.variants`
- support `baseline.behavior.write_policy`
- ignore `defaults` initially if needed

That keeps the first runtime slice small while preparing the config format for richer activation.

## Design Principle

`.pi/guides.json` should continue to describe the durable repo baseline only.
It may gain richer nested baseline fields, but it should not become the storage location for live
session overlays or one-turn task overlays.
