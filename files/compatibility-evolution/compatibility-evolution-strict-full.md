# Compatibility Evolution Heuristics - Strict / Full

Version: 0.1 (draft)
Date: February 2026

This guide defines enforceable heuristics for evolving APIs, schemas, and integration boundaries
with predictable compatibility behavior.

It is domain-heuristics-tier guidance and does not override tier-1 rulebooks.

## Corpus Grounding (2026-02 Initial)

- Source selection freeze: `files/derivations/compatibility-evolution-source-selection-2026-02-24.md`
- Derivation worksheet: `files/derivations/compatibility-evolution-derivation-2026-02-24.md`
- Source provenance: `files/sources/compatibility-evolution/README.md`

Frozen source IDs for this pass: `CE001`, `CE002`, `CE003`, `CE004`, `CE005`, `CE006`, `CE010`.

---

## Scope

- In scope:
  - backward-compatibility defaults, deprecation choreography, migration clarity, and consumer-impact control.
  - review-enforceable compatibility checks across APIs, schemas, events, and behavioral contracts.
- Out of scope:
  - protocol/framework-specific versioning command details.
  - release progression policy (`change-risk` ownership).
  - low-level serialization implementation mechanics.

---

## Keywords (RFC 2119)

- MUST / SHALL: absolute requirement.
- MUST NOT / SHALL NOT: absolute prohibition.
- SHOULD: strong recommendation; deviations require explicit rationale.

## Definitions

- Compatibility boundary: interface where downstream systems depend on behavior or data contract.
- Breaking change: change that can make previously valid consumer behavior fail.
- Deprecation window: bounded period where old behavior is supported while migration proceeds.

---

## Compatibility Defaults and Break Detection (BASE)

### COMPAT-BASE-001 - Changes at compatibility boundaries MUST state compatibility intent explicitly.

Boundary changes MUST declare whether they are backward-compatible, conditionally compatible, or breaking.

### COMPAT-BASE-002 - Potential breaking effects MUST be detected before release.

Compatibility-risk changes SHOULD include reviewer-visible break analysis.

### COMPAT-BASE-003 - Silent behavioral re-interpretation at compatibility boundaries MUST be avoided.

If behavior semantics change, migration and versioning context MUST be explicit.

---

## Deprecation and Migration Choreography (DEPR)

### COMPAT-DEPR-001 - Deprecations MUST include timeline, owner, and consumer migration path.

Unscheduled or ownerless deprecations SHOULD be blocked.

### COMPAT-DEPR-002 - Migration guidance MUST preserve user-facing continuity expectations.

Consumer-visible impacts SHOULD include fallback or staged migration options.

### COMPAT-DEPR-003 - Deprecation windows MUST be honored unless an explicit exception is approved.

Window-shortening exceptions MUST include rationale and stakeholder impact disposition.

---

## Version and Evolution Semantics (VER)

### COMPAT-VER-001 - Versioning signals MUST align with real compatibility impact.

Version markers SHOULD NOT imply compatibility that does not exist.

### COMPAT-VER-002 - Coexisting versions or behaviors MUST have explicit sunset conditions.

Parallel compatibility states MUST include owner and removal trigger.

### COMPAT-VER-003 - Compatibility assumptions shared across teams MUST be documented.

Cross-team assumptions SHOULD be reviewer-visible to avoid drift.

---

## Consumer Protection and Risk Disposition (CONS)

### COMPAT-CONS-001 - High-impact consumer compatibility risks MUST be explicitly dispositioned.

Risks MUST be fixed, mitigated, or accepted with owner and review date.

### COMPAT-CONS-002 - Compatibility-risk changes SHOULD include validation against representative consumer use paths.

Validation SHOULD cover critical adoption paths, not only producer-side assumptions.

### COMPAT-CONS-003 - Repeated consumer-break incidents in same boundary MUST trigger boundary redesign review.

Persistent break patterns SHOULD prompt structural compatibility strategy reassessment.

---

## Boundary Rules

- Contract-Core owns contract semantics and invariants at boundaries.
- Change-Risk owns rollout progression and release governance policy.
- Testing playbooks own concrete compatibility-test implementation mechanics.
- Compatibility Evolution owns deprecation/migration choreography and compatibility-impact heuristics.

When guidance conflicts:

1. Tier-1 rulebooks (`tigerstyle`, `security-core`, `contract-core`, `robustness-core`, `reproducibility-core`, language rulebooks)
2. Domain heuristics (`uistyle`, `diataxis`, `writing`, `observability`, `change-risk`, `epistemics`, `performance`, `privacy`, `anki-authoring`, `operability`, `maintainability`, `legacy-evolution-mode`, `incremental-refactoring-strategy`, `compatibility-evolution`, others)
3. Implementation playbooks
4. Framework/library guides

---

## Review Checklist (Required)

- Intent path: compatibility intent is explicit for boundary changes.
- Break path: potential breaking effects are analyzed before release.
- Semantics path: behavioral reinterpretation is not silent.
- Deprecation path: timeline, owner, and migration path are explicit.
- Window path: deprecation windows and exceptions are explicitly governed.
- Version path: version signals match real compatibility impact.
- Consumer path: representative consumer use paths are validated.
- Incident path: repeated break patterns trigger boundary redesign review.
