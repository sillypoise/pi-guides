# Legacy Evolution Mode Heuristics - Strict / Full

Version: 0.1 (draft)
Date: February 2026

This guide defines enforceable heuristics for safely evolving high-entropy existing systems
without rewrite-first bias.

It is domain-heuristics-tier guidance and does not override tier-1 rulebooks.

## Corpus Grounding (2026-02 Initial)

- Source selection freeze: `files/derivations/legacy-evolution-mode-source-selection-2026-02-24.md`
- Derivation worksheet: `files/derivations/legacy-evolution-mode-derivation-2026-02-24.md`
- Source provenance: `files/sources/legacy-evolution-mode/README.md`

Frozen source IDs for this pass: `LE001`, `LE002`, `LE003`, `LE004`, `LE005`, `LE006`, `LE010`.

---

## Scope

- In scope:
  - seam-first entry strategy and assumption-surfacing for changes in legacy systems.
  - uncertainty-aware risk controls when behavior confidence is low.
  - review-enforceable constraints for reducing risk while improving maintainability over time.
- Out of scope:
  - greenfield architecture guidance.
  - framework-specific migration tooling commands.
  - organization-specific release governance (`change-risk` ownership).

---

## Keywords (RFC 2119)

- MUST / SHALL: absolute requirement.
- MUST NOT / SHALL NOT: absolute prohibition.
- SHOULD: strong recommendation; deviations require explicit rationale.

## Definitions

- Legacy system: system with high coupling, unclear boundaries, or low confidence in current behavior.
- Seam: point where behavior can be observed, tested, or replaced without full rewrites.
- Characterization evidence: test or artifact that captures current behavior before structural change.
- Unknown-behavior zone: legacy scope where behavior, dependencies, or side effects are not yet well characterized.

---

## Change Entry and Seam Strategy (SEAM)

### LEG-SEAM-001 - Legacy changes MUST identify a concrete seam before structural modification.

Direct deep rewrites without an explicit seam SHOULD be rejected.

### LEG-SEAM-002 - Existing behavior assumptions MUST be made explicit before replacing logic.

Implicit behavior dependencies MUST be surfaced for review.

### LEG-SEAM-003 - Seam placement MUST minimize cross-module blast radius.

Seams that force broad unrelated changes SHOULD be redesigned.

---

## Behavior Preservation and Risk Control (BEH)

### LEG-BEH-001 - Legacy refactors MUST establish characterization evidence for critical paths.

Critical behavior MUST be captured before structural replacement.

### LEG-BEH-002 - Intended behavior changes MUST be explicitly separated from structural cleanup.

Mixed intent changes SHOULD be split for safer review and rollback.

### LEG-BEH-003 - Unverified behavior divergence in changed legacy scope MUST be dispositioned.

Divergence MUST be fixed, mitigated, or accepted with owner and review date.

---

## Uncertainty-Aware Safety Controls (UNC)

### LEG-UNC-001 - Changes in unknown-behavior zones MUST add explicit safety guardrails before deeper modification.

Guardrails MAY include protective checks, scoped toggles, containment boundaries, or temporary observability aids.

### LEG-UNC-002 - High-risk legacy touchpoints MUST use conservative change budgets.

Large multi-surface edits in low-confidence areas SHOULD be split into smaller, verifiable units.

### LEG-UNC-003 - Emergency fixes in legacy scope MUST include explicit stabilization follow-up.

Fast patches SHOULD record unresolved uncertainty and include owner plus follow-up trigger.

---

## Knowledge Capture and Transfer (KNOW)

### LEG-KNOW-001 - Legacy assumptions discovered during changes MUST be captured for future work.

High-risk hidden assumptions SHOULD be documented in reviewer-visible artifacts.

### LEG-KNOW-002 - Recovery-critical legacy knowledge MUST avoid single-person dependency.

Critical context SHOULD be shareable through artifacts, not memory alone.

### LEG-KNOW-003 - Repeated incident-prone legacy hotspots MUST trigger explicit simplification follow-up.

Hotspots SHOULD be tracked with owner and revisit condition.

---

## Boundary Rules

- Change-Risk owns rollout progression and release governance.
- Maintainability owns coupling/complexity/ownership heuristics broadly.
- Testing playbooks own concrete characterization and regression implementation mechanics.
- Incremental Refactoring Strategy owns staged sequencing/coexistence choreography after entry seam is chosen.
- Legacy Evolution Mode owns seam-first legacy change entry strategy and uncertainty-aware adaptation heuristics.

When guidance conflicts:

1. Tier-1 rulebooks (`tigerstyle`, `security-core`, `contract-core`, `robustness-core`, `reproducibility-core`, language rulebooks)
2. Domain heuristics (`uistyle`, `diataxis`, `writing`, `observability`, `change-risk`, `epistemics`, `performance`, `privacy`, `anki-authoring`, `operability`, `maintainability`, `legacy-evolution-mode`, others)
3. Implementation playbooks
4. Framework/library guides

---

## Review Checklist (Required)

- Seam path: concrete seam is identified before structural legacy change.
- Behavior path: characterization evidence exists for critical paths.
- Intent path: behavior changes and structural cleanup are explicitly separated.
- Uncertainty path: unknown-behavior zones include explicit safety guardrails before deeper changes.
- Budget path: low-confidence legacy touchpoints use conservative change budgets.
- Stabilization path: emergency legacy fixes include explicit follow-up owner and trigger.
- Knowledge path: newly discovered risky assumptions are captured and shareable.
- Divergence path: unverified behavior divergence is dispositioned.
