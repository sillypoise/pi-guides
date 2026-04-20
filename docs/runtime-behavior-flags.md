# Runtime Behavior Flags

This document proposes the first small set of runtime behavior flags for the `pi-guides`
extension.

These flags are the bridge between policy activation and actual runtime enforcement.
They should remain small, crisp, and operationally enforceable.

## Design Goal

Behavior flags should let profiles and repo baseline config influence runtime behavior without
trying to encode every semantic rule in code.

The extension should:

- hard-enforce what is operationally crisp;
- soft-steer what requires judgment.

## First-pass Flags

The first useful flag set is:

- `write_policy`
- `tool_mode`
- `response_contract`

These are broad enough to matter and narrow enough to implement safely.

## `write_policy`

Controls how write-like operations are treated.

Candidate values:

- `normal`
- `confirm-broad-edits`
- `confirm-all-writes`
- `read-only`

### `normal`

Default behavior.
No extra write restrictions beyond global safety checks.

### `confirm-broad-edits`

Use when changes should stay staged and deliberate.

Intended enforcement ideas:

- warn before sweeping edits across many files;
- warn before large writes;
- encourage staged plans before broad mutation.

Good fit:

- migration overlay
- release overlay

### `confirm-all-writes`

Use when any write should be explicit.

Intended enforcement ideas:

- confirm before `edit`
- confirm before `write`
- confirm before destructive bash patterns that mutate files

Good fit:

- highly sensitive repos
- risky maintenance sessions

### `read-only`

Use for review and analysis turns.

Intended enforcement ideas:

- block `edit`
- block `write`
- block destructive shell commands
- optionally allow user override through explicit confirmation later if we choose that design

Good fit:

- review overlay
- investigation-only sessions

## `tool_mode`

Controls how conservative the extension should be around tool usage.

Candidate values:

- `normal`
- `conservative`

### `normal`

Default behavior.

### `conservative`

Use when the extension should be more defensive.

Intended enforcement ideas:

- require confirmation for more shell operations;
- prefer read and inspect operations first;
- surface warnings for destructive patterns earlier.

Good fit:

- review overlay
- security-sensitive overlay
- release overlay

## `response_contract`

Controls the preferred shape of the response for the active context.
This is a steering hint, not strict output validation.

Candidate values:

- `default`
- `review-findings`
- `stages-risks-rollbacks`
- `diagnosis-hypotheses-tests`
- `decision-options-tradeoffs`

### `default`

Normal response structure.

### `review-findings`

Bias toward:

- findings first
- risks and severity
- missing tests or negative cases
- concise confidence notes

Good fit:

- review overlay

### `stages-risks-rollbacks`

Bias toward:

- staged plan
- main risks
- compatibility concerns
- rollback strategy

Good fit:

- migration overlay
- release overlay

### `diagnosis-hypotheses-tests`

Bias toward:

- observations
- hypotheses
- tests or checks
- next likely discriminators

Good fit:

- debug overlay

### `decision-options-tradeoffs`

Bias toward:

- alternatives
- assumptions
- tradeoffs
- recommended option with rationale

Good fit:

- design overlay

## Where Flags Can Be Declared

These flags may eventually come from several layers.

### Package defaults

Lowest-level defaults defined by the extension or profile registry.

### Profile defaults

A profile can express a preferred runtime stance.

Example:

- `review` -> `write_policy = read-only`
- `migration` -> `write_policy = confirm-broad-edits`

### Repo baseline overrides

`.pi/guides.json` can override profile defaults when the repo needs a stricter baseline.

### Session overrides

Session overlays can temporarily tighten or relax behavior.

### Task overrides

Task overlays can impose the most specific one-turn behavior.

## Merge Rules

Recommended precedence:

1. package default
2. profile default
3. repo baseline override
4. session override
5. task override

Higher scope wins only for the current effective activation state.
Nothing above repo scope should persist automatically.

## Implementation Order

A safe implementation order is:

### Phase 1

Implement `write_policy = read-only`.

This gives immediate value for review mode and is operationally crisp.

### Phase 2

Implement `response_contract` as prompt injection and `/guides` UI output only.

This is low risk and improves task shaping.

### Phase 3

Implement `tool_mode = conservative` and `confirm-broad-edits`.

This requires more careful tool interception design.

### Phase 4

Add broader confirmation policies if the earlier slices prove useful.

## Non-goals

These flags should not try to encode:

- semantic code-quality scoring
- framework-specific doctrine
- deep reasoning quality rules
- arbitrary freeform policy text

That guidance belongs in guides, skills, prompts, and repo context.

## Example: Review Turn

Effective active state:

```json
{
  "behavior": {
    "write_policy": "read-only",
    "tool_mode": "conservative",
    "response_contract": "review-findings"
  }
}
```

Expected runtime effect:

- edits and writes are blocked;
- shell behavior is more defensive;
- final response is shaped as findings rather than implementation steps.

## Example: Migration Session

Effective active state:

```json
{
  "behavior": {
    "write_policy": "confirm-broad-edits",
    "tool_mode": "normal",
    "response_contract": "stages-risks-rollbacks"
  }
}
```

Expected runtime effect:

- broad mutation is treated carefully;
- staged planning is encouraged;
- output emphasizes sequencing and rollback.

## Design Principle

Runtime behavior flags should remain few, explicit, and enforceable.
They are there to make the activation engine operationally real, not to replace the guide corpus.
