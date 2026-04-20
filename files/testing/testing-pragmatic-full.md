# Testing Playbook - Pragmatic / Full

Version: 0.1 (draft)
Date: February 2026

This playbook defines practical defaults for test strategy and test-change workflows
that keep behavior confidence high while controlling maintenance cost.

It is implementation-playbook-tier guidance and cannot override tier-1 rulebooks
or tier-2 domain heuristics.

## Corpus Grounding (2026-02 Initial)

- Source selection freeze: `files/derivations/testing-source-selection-2026-02-24.md`
- Derivation worksheet: `files/derivations/testing-derivation-2026-02-24.md`
- Source provenance: `files/sources/testing/README.md`

Frozen source IDs for this pass: `TS001`, `TS002`, `TS003`, `TS004`, `TS005`, `TS006`, `TS010`.

---

## Scope

- In scope:
  - practical testing strategy defaults for unit/integration/contract/regression coverage.
  - test-change workflows for confidence, failure triage, and flakiness control.
- Out of scope:
  - language/framework-specific test API details.
  - CI vendor syntax and pipeline wiring.
  - release progression policy (`change-risk` ownership).

---

## Keywords (RFC 2119)

- MUST / SHALL: absolute requirement.
- MUST NOT / SHALL NOT: absolute prohibition.
- SHOULD: strong recommendation; deviations require explicit rationale.

---

## Coverage Strategy Defaults (COV)

### TEST-COV-001 - Behavior-changing work MUST include tests at the closest meaningful boundary.

Choose unit tests for local logic, integration tests for boundary interactions,
and contract tests for producer/consumer assumptions.

### TEST-COV-002 - Critical failure paths MUST have explicit test coverage.

Error, timeout, permission-denied, and malformed-input paths SHOULD be included where relevant.

### TEST-COV-003 - Test additions SHOULD optimize for signal density over raw count.

Prefer fewer high-value tests over many low-discrimination assertions.

---

## Determinism and Flake Resistance (DET)

### TEST-DET-001 - Tests MUST be deterministic with controlled time, randomness, and external state.

Non-deterministic dependencies SHOULD be isolated with fakes, fixtures, or deterministic seeds.

### TEST-DET-002 - Flaky tests MUST be treated as defects, not accepted background noise.

Flake suppression without root-cause disposition SHOULD be avoided.

### TEST-DET-003 - Shared fixture state MUST NOT leak across tests.

Tests MUST remain order-independent and parallel-safe where feasible.

---

## Contract and Interface Confidence (CON)

### TEST-CON-001 - Interface assumptions between components SHOULD be tested at boundaries.

Serialization formats, schema evolution, and status/error semantics SHOULD be covered.

### TEST-CON-002 - Backward compatibility expectations MUST have regression checks when relevant.

Breaking behavior changes SHOULD include migration notes and explicit contract-test updates.

### TEST-CON-003 - Test doubles MUST preserve critical behavioral semantics.

Oversimplified mocks that hide important failures SHOULD be replaced with higher-fidelity tests.

---

## Test Review and Change Workflow (REV)

### TEST-REV-001 - Failing tests during change work MUST have explicit disposition.

Each failure MUST be fixed, re-baselined with rationale, or linked to known issue owner.

### TEST-REV-002 - New tests MUST be readable enough to explain intent and failure meaning.

Opaque assertions with unclear intent SHOULD be refactored for diagnosis clarity.

### TEST-REV-003 - Test debt introduced by delivery constraints MUST be tracked.

Deferred test coverage SHOULD have owner and closure trigger.

---

## Boundary Rules

- Tier-1 rulebooks own safety, security, contract, robustness, and reproducibility invariants.
- Change-Risk owns release progression and rollback governance.
- Maintainability heuristics own coupling/complexity/ownership quality.
- Testing playbook owns practical test strategy and execution defaults.
- Framework/library guides own API-level testing mechanics.

When guidance conflicts:

1. Tier-1 rulebooks (`tigerstyle`, `security-core`, `contract-core`, `robustness-core`, `reproducibility-core`, language rulebooks)
2. Domain heuristics (`uistyle`, `diataxis`, `writing`, `observability`, `change-risk`, `epistemics`, `performance`, `privacy`, `anki-authoring`, `operability`, `maintainability`, others)
3. Implementation playbooks (`testing`, `cssstyle`, `argument-structure`, others)
4. Framework/library guides

---

## Review Checklist (Required)

- Coverage path: behavior-changing work has tests at the closest meaningful boundary.
- Failure path: critical negative/error paths are tested where relevant.
- Determinism path: time/random/external-state dependencies are controlled.
- Flake path: flaky tests are dispositioned with root-cause handling plan.
- Contract path: boundary/interface assumptions have adequate contract checks.
- Review path: new tests are readable and diagnostic.
- Debt path: deferred coverage has owner and closure trigger.
