# Testing Playbook - Pragmatic / Compact

Compact derivative of `testing/testing-pragmatic-full.md`.
Rule IDs are stable and retain the same meaning.

## Scope

- Practical test-strategy defaults for behavior confidence,
  deterministic execution, boundary contracts, and test-debt control.

Boundary note: Change-Risk owns rollout policy; tier-1 guides remain non-overridable.

## Core Rules

**TEST-COV-001** - Behavior-changing work MUST include tests at the closest meaningful boundary.

**TEST-COV-002** - Critical failure paths MUST have explicit test coverage.

**TEST-DET-001** - Tests MUST be deterministic with controlled time, randomness, and external state.

**TEST-DET-002** - Flaky tests MUST be treated as defects, not accepted background noise.

**TEST-CON-001** - Interface assumptions between components SHOULD be tested at boundaries.

**TEST-CON-003** - Test doubles MUST preserve critical behavioral semantics.

**TEST-REV-001** - Failing tests during change work MUST have explicit disposition.

**TEST-REV-003** - Test debt introduced by delivery constraints MUST be tracked.

## Review Checklist

- Behavior and critical failure paths are tested at appropriate boundaries.
- Test determinism controls are in place; flakes are dispositioned.
- Boundary contracts and test-double fidelity are adequate.
- Deferred test coverage has owner and closure trigger.
