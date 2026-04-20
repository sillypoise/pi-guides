# Robustness-Core Rulebook - Strict / Full

Version: 0.1 (draft)
Date: February 2026

This rulebook defines enforceable robustness invariants for failure, concurrency, and integrity behavior.

It is tier-1 rulebook guidance and does not override other tier-1 rulebooks.

## Corpus Grounding (2026-02 Initial)

- Source selection freeze: `files/derivations/robustness-core-source-selection-2026-02-19.md`
- Derivation worksheet: `files/derivations/robustness-core-derivation-2026-02-19.md`
- Source provenance: `files/sources/robustness-core/README.md`

---

## Scope

- In scope:
  - universal failure semantics, retry/timeout discipline, concurrency safety, and corruption prevention.
- Out of scope:
  - contract compatibility semantics (`contract-core` ownership).
  - rollout progression and release governance (`change-risk` ownership).
  - implementation recipes for specific runtimes/frameworks/datastores.

---

## Keywords (RFC 2119)

- MUST / SHALL: absolute requirement.
- MUST NOT / SHALL NOT: absolute prohibition.
- SHOULD: strong recommendation; deviations require explicit rationale.

## Definitions

- Critical path: code path whose failure can materially impact availability, integrity, correctness,
  security, or broad user outcomes.
- Bounded retry: retry behavior with explicit cap and termination condition.
- Corruption event: invalid or partially applied state that violates declared invariants.

---

## Failure Semantics and Containment (FAIL)

### ROBUST-FAIL-001 - Critical failures MUST produce explicit, non-silent outcomes.

Critical paths MUST NOT fail silently or discard failures without caller-visible disposition.

### ROBUST-FAIL-002 - Failure handling MUST preserve invariant safety.

Failure paths MUST NOT leave state in invariant-violating intermediate forms.

### ROBUST-FAIL-003 - Failure blast radius MUST be bounded.

Fault handling MUST contain impact to the narrowest feasible scope.

---

## Timeout, Retry, and Load Discipline (LOAD)

### ROBUST-LOAD-001 - Timeouts MUST be explicit for remote and blocking operations.

Timeout budgets MUST be defined and MUST NOT rely on implicit infinite waits.

### ROBUST-LOAD-002 - Retries MUST be bounded and backoff-controlled.

Retries MUST include cap, backoff policy, and stop conditions.

### ROBUST-LOAD-003 - Retry behavior MUST NOT amplify overload during partial failure.

Systems MUST include overload-aware retry controls to avoid retry storms.

---

## Concurrency and Lifecycle Safety (CONC)

### ROBUST-CONC-001 - Shared mutable state access MUST be race-safe.

Concurrent access patterns MUST define ownership, synchronization, or isolation strategy.

### ROBUST-CONC-002 - Cancellation and shutdown MUST be explicit and leak-safe.

Critical resources MUST be released during cancellation, timeout, and shutdown paths.

### ROBUST-CONC-003 - Cross-step operations MUST define atomicity or compensation behavior.

Multi-step operations MUST specify all-or-nothing guarantees or compensating actions.

---

## Integrity and Corruption Prevention (INTEG)

### ROBUST-INTEG-001 - Boundary data MUST be validated before durable state mutation.

Invalid or malformed inputs MUST be rejected before persistence or irreversible side effects.

### ROBUST-INTEG-002 - Corruption-prone transitions MUST have recoverable checkpoints.

Critical state transitions MUST provide checkpoint or recovery semantics.

### ROBUST-INTEG-003 - Recovery paths MUST verify post-recovery invariants.

After recovery actions, systems MUST verify integrity invariants before normal progression.

---

## Exceptions and Precedence (EXCEPT)

### ROBUST-EXCEPT-001 - Temporary robustness exceptions MUST be explicit, owned, and time-bounded.

Exceptions MUST include rationale, owner, expiry/review date, and compensating controls.

### ROBUST-EXCEPT-002 - Exceptions MUST NOT override tier-1 safety, security, or contract rules.

Robustness exceptions MUST NOT bypass TigerStyle, Security-Core, or Contract-Core requirements.

---

## Boundary Rules

- TigerStyle owns base coding safety and explicit error handling patterns.
- Security-Core owns security-policy controls and fail-closed security behavior.
- Contract-Core owns boundary contracts and compatibility semantics.
- Change-Risk owns rollout governance and progression/rollback policy.
- Reproducibility-Core owns deterministic environment/build/test and provenance invariants.
- Robustness-Core owns runtime failure/concurrency/integrity invariants.

When guidance conflicts:

1. Tier-1 rulebooks (`tigerstyle`, `security-core`, `contract-core`, `robustness-core`, `reproducibility-core`, language rulebooks)
2. Domain heuristics (`uistyle`, `diataxis`, `writing`, `observability`, `change-risk`, `epistemics`, others)
3. Implementation playbooks
4. Framework/library guides

---

## Review Checklist (Required)

- Failure path: critical failures are explicit and non-silent.
- Failure path: failure handling preserves invariants and bounded blast radius.
- Load path: timeouts are explicit and retries are bounded/backoff-controlled.
- Load path: retry behavior cannot amplify partial-failure overload.
- Concurrency path: shared mutable state access is race-safe.
- Lifecycle path: cancellation/shutdown release critical resources.
- Integrity path: boundary validation occurs before durable mutation.
- Integrity path: recovery verifies post-recovery invariants.
- Exception path: temporary exceptions are explicit, owned, and time-bounded.
- Exception path: exceptions do not override tier-1 safety, security, or contract constraints.
