# Contract-Core Rulebook - Strict / Full

Version: 0.1 (draft)
Date: February 2026

This rulebook defines enforceable contract invariants for boundary behavior and compatibility.

It is tier-1 rulebook guidance and complements TigerStyle and Security-Core.

## Corpus Grounding (2026-02 Initial)

- Source selection freeze: `files/derivations/contract-core-source-selection-2026-02-19.md`
- Derivation worksheet: `files/derivations/contract-core-derivation-2026-02-19.md`
- Source provenance: `files/sources/contract-core/README.md`

Frozen source IDs for this pass: `C003`, `C004`, `C005`, `C001`, `C007`, `C008`, `C017`.

---

## Scope

- In scope:
  - Contract semantics for boundary inputs/outputs/errors, preconditions/postconditions, invariant
    preservation, and compatibility evolution.
  - Review-enforceable constraints that apply across stacks and transports.
  - Boundary contract semantics only; internal function assertion density and local code-style
    concerns remain TigerStyle-owned.
- Out of scope:
  - Naming/style/readability rules (TigerStyle ownership).
  - Security policy controls (Security-Core ownership).
  - Framework/tool-specific migration procedures and rollout mechanics.

---

## Keywords (RFC 2119)

- MUST / SHALL: absolute requirement.
- MUST NOT / SHALL NOT: absolute prohibition.
- SHOULD: strong recommendation; deviations require explicit rationale.

## Definitions

- Externally consumed boundary: any interface relied on outside the immediate implementation unit
  (for example, service API, event schema, persisted record shape, public package API).
- Conditionally compatible: compatible only under explicit constraints (for example, minimum client
  version, feature flag state, or bounded rollout phase).
- Contract delta documentation: reviewer-visible summary of before/after changes to input/output/error
  semantics, compatibility class, and migration impact.
- Mixed-version compatibility path: behavior checks where producers/consumers or callers/callees run
  different contract versions during transition.

---

## Contract Declaration and Ownership (DECL)

### CONTRACT-DECL-001 - Every externally consumed boundary MUST have an explicit contract.

The contract MUST define accepted input shape, required fields and constraints, output shape,
and error surface for normal and failure paths.

Rationale: implicit boundaries create integration ambiguity and fragile coupling.

### CONTRACT-DECL-002 - Contract ownership MUST be explicit.

Each boundary contract MUST identify a stable owner (team or component) responsible for change
review, compatibility decisions, and deprecation outcomes.

Ownership MUST be recorded in a reviewer-visible artifact colocated with the contract definition.

Rationale: ownerless contracts drift and accumulate unmanaged breaking changes.

### CONTRACT-DECL-003 - Contract terms MUST separate normative requirements from examples.

Normative behavior MUST be distinguishable from illustrative examples and non-normative notes.

Rationale: ambiguous specification language causes inconsistent implementations.

### CONTRACT-DECL-004 - Contract artifacts MUST include a minimum required field set.

Reviewer-visible contract artifacts MUST include, at minimum:

- boundary identifier and brief purpose,
- owner,
- version or compatibility signaling method,
- input contract,
- output contract,
- error contract,
- compatibility classification policy for changes,
- deprecation or migration expectations.

Rationale: incomplete artifacts produce inconsistent review quality and hidden compatibility risk.

---

## Preconditions, Postconditions, and Invariants (INV)

### CONTRACT-INV-001 - Preconditions MUST be explicit and validated before state mutation or side effects.

Validation MUST happen before contract execution mutates durable state, performs privileged actions,
or triggers irreversible external effects.

Rationale: delayed precondition checks produce partial effects and undefined behavior.

### CONTRACT-INV-002 - Postconditions MUST be observable and testable.

A successful contract execution MUST have verifiable outcomes that match declared guarantees.

Rationale: untestable outcomes make contract compliance unverifiable.

### CONTRACT-INV-003 - Invariants MUST hold across success and failure paths.

Failure handling MUST NOT leave durable state in a contract-invalid intermediate form.

Rationale: invariant violations in error paths are a common corruption source.

### CONTRACT-INV-004 - Contract checks MUST fail deterministically.

Given equivalent inputs and state, contract validation and failure mode selection MUST be stable
and predictable.

Rationale: non-deterministic contract outcomes break caller expectations and recovery logic.

---

## Error Contracts and Failure Semantics (ERR)

### CONTRACT-ERR-001 - Error classes MUST be explicit and stable for callers.

Error categories exposed across boundaries MUST have documented semantics and compatibility treatment.

Rationale: unstable error semantics force brittle caller-specific parsing and fallback logic.

### CONTRACT-ERR-002 - Contract violations MUST return bounded, non-ambiguous failure signals.

Failure signals MUST identify violation class without requiring implementation-specific introspection.

Rationale: ambiguous failures increase integration and triage cost.

### CONTRACT-ERR-003 - Error contracts MUST NOT leak incompatible internal state assumptions.

Callers MUST NOT be required to depend on incidental internals to interpret recoverability or retryability.

Rationale: leaked internals produce hidden coupling and break with internal refactors.

---

## Compatibility and Version Evolution (COMP)

### CONTRACT-COMP-001 - Backward compatibility impact MUST be classified for contract changes.

Each contract change MUST be labeled as non-breaking, conditionally compatible, or breaking, with
explicit justification.

Rationale: unclassified change impact obscures risk and undermines safe evolution.

### CONTRACT-COMP-002 - Breaking changes MUST provide an explicit migration path or controlled cutover plan.

Breaking changes MUST NOT be introduced without a documented transition or release-gated cutover strategy.

Rationale: migrationless breakage causes avoidable outages and coordination failures.

### CONTRACT-COMP-003 - Additive changes MUST preserve behavior for existing consumers.

New optional fields, variants, and capabilities MUST NOT change semantics relied on by existing callers.

Rationale: additive-in-name-only changes can still be operationally breaking.

### CONTRACT-COMP-004 - Version signaling MUST reflect compatibility semantics.

Version identifiers and compatibility labels SHOULD align with the actual boundary impact of changes.

Rationale: misleading version signals defeat change-risk evaluation.

---

## Schema and Data-Shape Evolution Safety (SCHEMA)

### CONTRACT-SCHEMA-001 - Schema evolution MUST preserve compatibility expectations in both producer and consumer directions.

Changes to requiredness, type, cardinality, or semantic meaning MUST be evaluated for forward and
backward interoperability impact.

Rationale: one-direction compatibility assumptions often fail in mixed-version fleets.

### CONTRACT-SCHEMA-002 - Removed or repurposed fields MUST have explicit deprecation lifecycle.

Field removal or semantic repurposing MUST include a deprecation window, replacement guidance,
and cleanup criteria.

Rationale: silent field churn breaks downstream consumers and analytics pipelines.

### CONTRACT-SCHEMA-003 - Unknown or future fields SHOULD be handled without unsafe failure where policy permits.

When strict rejection is not required, parsers and handlers SHOULD tolerate additive unknown fields.

If security policy requires strict rejection for a boundary, Security-Core fail-closed requirements
take precedence.

Rationale: tolerant readers reduce fragility during staged upgrades.

---

## Contract Change Review and Evidence (CHG)

### CONTRACT-CHG-001 - Contract-changing pull requests MUST include explicit contract delta documentation.

The delta MUST describe input/output/error changes, compatibility classification, and migration impact.

Delta documentation MUST appear in reviewer-visible change artifacts (for example, contract file diff,
spec change note, or PR section linked to the contract).

Rationale: reviewers cannot validate boundary safety when contract deltas are implicit.

### CONTRACT-CHG-002 - Boundary and negative-path checks MUST be included for contract changes.

Validation MUST include at least one incompatible-input path and one mixed-version compatibility path.

Rationale: happy-path-only checks miss most contract breakage risk.

### CONTRACT-CHG-003 - Contract exceptions MUST be explicit, owned, and time-bounded.

Temporary compatibility or contract violations MUST include owner, risk acceptance rationale,
and expiry or removal criteria.

Rationale: undocumented exceptions become permanent hidden risk.

---

## Boundary Rules

- TigerStyle owns naming, style, and general code clarity constraints.
- Security-Core owns trust-policy and security-control requirements.
- Contract-Core owns semantic boundary behavior and compatibility invariants.
- Future Change-Risk and Compatibility-Evolution heuristics may add governance guidance,
  but do not override tier-1 contract invariants.
- Lower-tier playbooks/framework guides own transport/tool-specific implementation details.

When guidance conflicts:

1. Tier-1 rulebooks (`tigerstyle`, `security-core`, `contract-core`, language rulebooks)
2. Domain heuristics (`uistyle`, `diataxis`, `writing`, `observability`, others)
3. Implementation playbooks
4. Framework/library guides

---

## Review Checklist (Required)

For contract-relevant changes, verify:

- Boundary path: contract changes are explicit and owner-reviewed.
- Boundary path: contract ownership is explicit in a reviewer-visible contract artifact.
- Boundary path: minimum contract artifact fields are present (owner, input/output/errors,
  compatibility/version signaling, and deprecation or migration expectations).
- Error path: failure classes and caller-visible error semantics remain stable or are migration-noted.
- Compatibility path: change impact classification is present and justified.
- Compatibility path: breaking changes include migration or controlled cutover detail.
- Compatibility path: classification explicitly checks enum narrowing, optional-to-required shifts,
  semantic default changes, and field repurposing.
- Schema path: forward/backward compatibility implications are evaluated for mixed versions.
- Negative path: incompatible input and mixed-version checks are present, not only happy-path tests.
- Exception path: any temporary contract deviation is explicit, owned, and time-bounded.
