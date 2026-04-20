# Robustness-Core Rulebook - Strict / Compact

Compact derivative of `robustness-core/robustness-core-strict-full.md`.
Rule IDs are stable and retain the same meaning.

## Scope

- Tier-1 invariants for explicit failure behavior, bounded retries/timeouts,
  race-safe concurrency, and corruption prevention.

Boundary note: Contract-Core owns compatibility semantics; Change-Risk owns rollout governance.

## Core Rules

**ROBUST-FAIL-001** - Critical failures MUST produce explicit, non-silent outcomes.

**ROBUST-FAIL-002** - Failure handling MUST preserve invariant safety.

**ROBUST-LOAD-001** - Timeouts MUST be explicit for remote and blocking operations.

**ROBUST-LOAD-002** - Retries MUST be bounded and backoff-controlled.

**ROBUST-LOAD-003** - Retry behavior MUST NOT amplify overload during partial failure.

**ROBUST-CONC-001** - Shared mutable state access MUST be race-safe.

**ROBUST-CONC-002** - Cancellation and shutdown MUST be explicit and leak-safe.

**ROBUST-INTEG-001** - Boundary data MUST be validated before durable state mutation.

**ROBUST-INTEG-003** - Recovery paths MUST verify post-recovery invariants.

**ROBUST-EXCEPT-001** - Temporary robustness exceptions MUST be explicit, owned, and time-bounded.

**ROBUST-EXCEPT-002** - Exceptions MUST NOT override tier-1 safety, security, or contract rules.

## Review Checklist

- Failures are explicit and non-silent.
- Retry/timeout behavior is bounded and overload-safe.
- Shared mutable state access is race-safe.
- Cancellation/shutdown paths release critical resources.
- Boundary validation occurs before durable mutation.
- Recovery verifies integrity invariants.
- Exceptions are explicit, owned, and time-bounded.
- Exceptions do not override tier-1 safety/security/contract rules.
