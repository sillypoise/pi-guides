# Incremental Refactoring Strategy Heuristics - Strict / Compact

Compact derivative of `incremental-refactoring-strategy/incremental-refactoring-strategy-strict-full.md`.
Rule IDs are stable and retain the same meaning.

## Scope

- Cross-stack heuristics for risk-bounded structural refactoring through staged increments.

Boundary note: Change-Risk owns rollout policy; Testing playbooks own test mechanics;
this guide owns sequencing/coexistence strategy quality.

## Core Rules

**REFACTOR-SEQ-001** - Structural refactors MUST be broken into reviewable increments.

**REFACTOR-SEQ-002** - Each increment MUST declare expected structural gain and risk.

**REFACTOR-SEQ-004** - Refactor sequence plans MUST declare entry seam or target boundary before first increment.

**REFACTOR-SAFE-001** - Critical behavior MUST be characterized before structural relocation or replacement.

**REFACTOR-SAFE-003** - Unintended behavior divergence during refactor increments MUST be dispositioned explicitly.

**REFACTOR-MIG-001** - Coexistence states between old/new implementations MUST be explicit and bounded.

**REFACTOR-MIG-003** - Temporary adapters/shims MUST have decommission triggers.

**REFACTOR-DEBT-001** - Deferred structural debt from refactor sequencing MUST be tracked with closure criteria.

## Review Checklist

- Structural work is sequenced into bounded increments with explicit intent.
- Entry seam or target boundary is explicit before first increment.
- Critical behavior is characterized before structural replacement.
- Coexistence phases are bounded and observable.
- Deferred refactor debt and shims have explicit closure/removal triggers.
