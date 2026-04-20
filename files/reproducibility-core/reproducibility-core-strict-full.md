# Reproducibility-Core Rulebook - Strict / Full

Version: 0.1 (draft)
Date: February 2026

This rulebook defines enforceable reproducibility invariants for environment, build, test, and artifact traceability.

It is tier-1 rulebook guidance and does not override other tier-1 rulebooks.

## Corpus Grounding (2026-02 Initial)

- Source selection freeze: `files/derivations/reproducibility-core-source-selection-2026-02-19.md`
- Derivation worksheet: `files/derivations/reproducibility-core-derivation-2026-02-19.md`
- Source provenance: `files/sources/reproducibility-core/README.md`

---

## Scope

- In scope:
  - deterministic environment/dependency intent, reproducible build and test behavior,
    and artifact provenance traceability.
- Out of scope:
  - CI vendor syntax and platform-specific pipeline recipes.
  - rollout progression policy (`change-risk` ownership).

---

## Keywords (RFC 2119)

- MUST / SHALL: absolute requirement.
- MUST NOT / SHALL NOT: absolute prohibition.
- SHOULD: strong recommendation; deviations require explicit rationale.

## Definitions

- Reproducible outcome: equivalent inputs and environment yield equivalent declared outputs.
- Environment intent: explicit declaration of runtime/toolchain/dependency assumptions.
- Provenance record: reviewer-visible metadata linking artifacts to source, build context, and inputs.

---

## Environment and Dependency Determinism (ENV)

### REPRO-ENV-001 - Environment intent MUST be explicit and reviewable.

Runtime, toolchain, and critical configuration assumptions MUST be represented in versioned artifacts.

### REPRO-ENV-002 - Dependency resolution intent MUST be deterministic.

Dependency versions and resolution behavior MUST be pinned or otherwise constrained to deterministic outcomes.

### REPRO-ENV-003 - Environment drift in critical paths MUST be detectable.

Critical execution paths MUST include checks or metadata sufficient to detect meaningful drift.

---

## Build and Test Reproducibility (EXEC)

### REPRO-EXEC-001 - Build outputs MUST be reproducible from declared inputs.

Given equivalent source, dependencies, and environment intent, build outputs MUST NOT vary unexpectedly.

### REPRO-EXEC-002 - Non-deterministic build factors MUST be explicitly controlled.

Timestamp, ordering, and host-specific variability sources MUST be normalized or declared.

### REPRO-EXEC-003 - Repeated test runs under equivalent conditions MUST produce stable pass/fail behavior.

Flaky critical-path tests MUST be treated as defects and triaged explicitly.

---

## Artifact Traceability and Provenance (TRACE)

### REPRO-TRACE-001 - Release artifacts MUST have reviewer-visible provenance records.

Records MUST link artifacts to source revision, dependency intent, and build context.

### REPRO-TRACE-002 - Artifact identity MUST be stable and tamper-evident.

Artifact identifiers and integrity metadata MUST support reproducibility and verification checks.

### REPRO-TRACE-003 - Reproduction steps for critical artifacts MUST be documented.

Critical artifact paths MUST include minimal steps to reproduce build/test outcomes.

---

## Exceptions and Precedence (EXCEPT)

### REPRO-EXCEPT-001 - Temporary reproducibility exceptions MUST be explicit, owned, and time-bounded.

Exceptions MUST include rationale, owner, review/expiry date, and compensating controls.

### REPRO-EXCEPT-002 - Exceptions MUST NOT override tier-1 safety/security/contract constraints.

Reproducibility exceptions MUST NOT bypass TigerStyle, Security-Core, or Contract-Core requirements.

---

## Boundary Rules

- Change-Risk owns rollout progression and operational release controls.
- Robustness-Core owns runtime failure, concurrency, and integrity invariants.
- Reproducibility-Core owns deterministic environment/build/test and artifact traceability invariants.
- Lower-tier playbooks/framework guides own CI/platform-specific implementation mechanics.

When guidance conflicts:

1. Tier-1 rulebooks (`tigerstyle`, `security-core`, `contract-core`, `robustness-core`, `reproducibility-core`, language rulebooks)
2. Domain heuristics (`uistyle`, `diataxis`, `writing`, `observability`, `change-risk`, `epistemics`, others)
3. Implementation playbooks
4. Framework/library guides

---

## Review Checklist (Required)

- Environment path: runtime/toolchain/config assumptions are explicit and reviewable.
- Dependency path: dependency intent is deterministic and pinned/constrained.
- Build path: equivalent inputs yield stable outputs; non-deterministic factors are controlled.
- Test path: repeated test execution under equivalent conditions is stable or explicitly triaged.
- Traceability path: release artifacts have provenance records linking source and build context.
- Traceability path: artifact identity/integrity metadata supports verification.
- Exception path: temporary exceptions are explicit, owned, and time-bounded.
- Exception path: exceptions do not override tier-1 safety, security, or contract constraints.
