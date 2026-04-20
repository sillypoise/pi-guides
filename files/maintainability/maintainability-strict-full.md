# Maintainability Heuristics - Strict / Full

Version: 0.1 (draft)
Date: February 2026

This guide defines enforceable maintainability heuristics for keeping systems
changeable, understandable, and ownership-friendly over time.

It is domain-heuristics-tier guidance and does not override tier-1 rulebooks.

## Corpus Grounding (2026-02 Initial)

- Source selection freeze: `files/derivations/maintainability-source-selection-2026-02-24.md`
- Derivation worksheet: `files/derivations/maintainability-derivation-2026-02-24.md`
- Source provenance: `files/sources/maintainability/README.md`

Frozen source IDs for this pass: `MT001`, `MT002`, `MT003`, `MT004`, `MT005`, `MT006`, `MT010`.

---

## Scope

- In scope:
  - coupling pressure control, complexity budgeting, ownership clarity,
    and changeability fitness checks.
  - review-enforceable heuristics for avoiding entropy growth in evolving systems.
- Out of scope:
  - language-specific style details (TigerStyle and language rulebook ownership).
  - framework-specific refactor mechanics (`testing`/framework playbook ownership).
  - repository-specific team/process policy details.

---

## Keywords (RFC 2119)

- MUST / SHALL: absolute requirement.
- MUST NOT / SHALL NOT: absolute prohibition.
- SHOULD: strong recommendation; deviations require explicit rationale.

## Definitions

- Coupling hotspot: area where change in one concern forces broad unrelated changes.
- Complexity budget: reviewer-visible limit on branching/state/indirection burden.
- Ownership boundary: explicit responsibility boundary for behavior and changes.

---

## Coupling and Modular Changeability (COUP)

### MAINT-COUP-001 - Changes MUST preserve or improve coupling boundaries in affected scope.

Changes that increase cross-module dependency without clear justification MUST be rejected.

### MAINT-COUP-002 - Shared abstractions MUST justify their fan-in/fan-out impact.

Abstractions that centralize unrelated concerns SHOULD be split or narrowed.

### MAINT-COUP-003 - Cyclic dependency risk in changed architecture MUST be explicitly checked.

Potential cycles MUST be prevented or documented with bounded mitigation.

---

## Complexity and Cognitive Load Control (COMP)

### MAINT-COMP-001 - Complexity growth in changed scope MUST be explicit and bounded.

Increased branching/state/indirection MUST include rationale and containment plan.

### MAINT-COMP-002 - Reviewer comprehension path MUST be preserved for non-trivial changes.

Changes SHOULD keep execution flow and failure paths understandable without hidden jumps.

### MAINT-COMP-003 - Repeated special-case logic SHOULD be consolidated.

Copy-pasted divergence patterns SHOULD be refactored to reduce drift risk.

---

## Ownership and Evolution Fitness (OWN)

### MAINT-OWN-001 - Ownership boundaries for changed behavior MUST be explicit.

Ambiguous ownership in critical logic SHOULD be resolved before merge.

### MAINT-OWN-002 - New extension points MUST include explicit evolution intent.

Extension seams without expected use cases SHOULD be treated as speculative complexity.

### MAINT-OWN-003 - Decommission and simplification opportunities in changed scope MUST be considered.

Dead/obsolete paths SHOULD be removed when safe to reduce long-term maintenance burden.

---

## Maintainability Risk Disposition (RISK)

### MAINT-RISK-001 - Maintainability regressions MUST have explicit disposition.

Regressions MUST be fixed, mitigated, or accepted with owner and review date.

### MAINT-RISK-002 - Large structural changes MUST include staged risk controls.

Structural rewrites SHOULD include incremental checkpoints and rollback-aware sequencing.

### MAINT-RISK-003 - Known testability blind spots introduced by changes MUST be documented.

Blind spots SHOULD be tracked with planned closure path.

---

## Boundary Rules

- TigerStyle and language rulebooks own coding-style and language-level craftsmanship constraints.
- Contract-Core owns interface/compatibility semantics.
- Change-Risk owns rollout progression and migration governance.
- Testing playbooks own concrete test implementation mechanics.
- Maintainability owns coupling/complexity/ownership heuristics for long-term changeability.

When guidance conflicts:

1. Tier-1 rulebooks (`tigerstyle`, `security-core`, `contract-core`, `robustness-core`, `reproducibility-core`, language rulebooks)
2. Domain heuristics (`uistyle`, `diataxis`, `writing`, `observability`, `change-risk`, `epistemics`, `performance`, `privacy`, `anki-authoring`, `operability`, `maintainability`, others)
3. Implementation playbooks
4. Framework/library guides

---

## Review Checklist (Required)

- Coupling path: changed scope does not increase unrelated cross-module dependencies.
- Coupling path: shared abstraction fan-in/fan-out impact is justified.
- Complexity path: complexity growth is explicit, bounded, and justified.
- Complexity path: reviewer comprehension path remains clear for normal and failure flows.
- Ownership path: changed behaviors have explicit ownership boundaries.
- Evolution path: extension points have concrete intent; speculative seams are avoided.
- Simplification path: decommission/simplification opportunities were considered.
- Risk path: maintainability regressions and testability blind spots are dispositioned.
