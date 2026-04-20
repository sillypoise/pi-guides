# Incremental Refactoring Strategy Heuristics - Strict / Full

Version: 0.1 (draft)
Date: February 2026

This guide defines enforceable heuristics for sequencing structural improvements through
risk-bounded increments instead of high-risk rewrites.

It is domain-heuristics-tier guidance and does not override tier-1 rulebooks.

## Corpus Grounding (2026-02 Initial)

- Source selection freeze: `files/derivations/incremental-refactoring-strategy-source-selection-2026-02-24.md`
- Derivation worksheet: `files/derivations/incremental-refactoring-strategy-derivation-2026-02-24.md`
- Source provenance: `files/sources/incremental-refactoring-strategy/README.md`

Frozen source IDs for this pass: `IR001`, `IR002`, `IR003`, `IR004`, `IR005`, `IR006`, `IR010`.

---

## Scope

- In scope:
  - refactor sequencing heuristics, characterization-first changes, and strangler-style migration strategy.
  - sequence quality after an entry seam or target boundary has already been identified.
  - review-enforceable constraints for reducing structural change risk and preserving behavior confidence.
- Out of scope:
  - framework-specific migration command recipes.
  - CI/CD orchestration details.
  - release progression governance (`change-risk` ownership).

---

## Keywords (RFC 2119)

- MUST / SHALL: absolute requirement.
- MUST NOT / SHALL NOT: absolute prohibition.
- SHOULD: strong recommendation; deviations require explicit rationale.

## Definitions

- Refactoring increment: bounded structural change unit with clear verification boundary.
- Characterization test: test capturing existing behavior before structural transformation.
- Strangler path: staged replacement pattern where new implementation gradually absorbs old behavior.

---

## Sequencing and Scope Control (SEQ)

### REFACTOR-SEQ-001 - Structural refactors MUST be broken into reviewable increments.

Monolithic structural rewrites SHOULD be decomposed into bounded change units.

### REFACTOR-SEQ-002 - Each increment MUST declare expected structural gain and risk.

Unstated intent increments SHOULD be rewritten before execution.

### REFACTOR-SEQ-003 - Sequence plans MUST preserve delivery continuity.

Refactor sequencing SHOULD avoid blocking all product delivery behind one transformation.

### REFACTOR-SEQ-004 - Refactor sequence plans MUST declare entry seam or target boundary before first increment.

If entry seam selection is unresolved, legacy-evolution-mode discovery guidance SHOULD be applied first.

---

## Behavior Confidence and Safeguards (SAFE)

### REFACTOR-SAFE-001 - Critical behavior MUST be characterized before structural relocation or replacement.

Changes without behavior baselines for critical paths MUST be blocked.

### REFACTOR-SAFE-002 - Assertions used during refactoring MUST target externally meaningful behavior.

Internal-only checks SHOULD not replace user/system-observable behavior checks.

### REFACTOR-SAFE-003 - Unintended behavior divergence during refactor increments MUST be dispositioned explicitly.

Divergence MUST be fixed, mitigated, or accepted with owner and review date.

---

## Migration Paths and Coexistence States (MIG)

### REFACTOR-MIG-001 - Coexistence states between old/new implementations MUST be explicit and bounded.

Dual-write, dual-read, or parallel execution phases MUST include entry/exit conditions.

### REFACTOR-MIG-002 - Strangler or replacement paths MUST include observability checkpoints.

Progress and risk signals SHOULD be reviewer-visible at each migration stage.

### REFACTOR-MIG-003 - Temporary adapters/shims MUST have decommission triggers.

Bridge layers SHOULD NOT become permanent by omission.

---

## Refactoring Debt and Follow-Through (DEBT)

### REFACTOR-DEBT-001 - Deferred structural debt from refactor sequencing MUST be tracked with closure criteria.

Debt records SHOULD include owner and trigger for completion.

### REFACTOR-DEBT-002 - Repeated rollback or pause points in same refactor area MUST trigger strategy reassessment.

Persistent churn SHOULD prompt scope or sequencing redesign.

### REFACTOR-DEBT-003 - Refactor outcome quality MUST be evaluated against stated structural goals.

Missed goals SHOULD be explicitly dispositioned, not assumed complete.

---

## Boundary Rules

- Change-Risk owns rollout progression and release governance.
- Maintainability owns broad coupling/complexity/ownership heuristics.
- Testing playbooks own concrete test implementation mechanics.
- Legacy-Evolution-Mode owns seam discovery and uncertainty-handling when entry boundary is not yet clear.
- Incremental Refactoring Strategy owns structural change sequencing and coexistence strategy heuristics.

When guidance conflicts:

1. Tier-1 rulebooks (`tigerstyle`, `security-core`, `contract-core`, `robustness-core`, `reproducibility-core`, language rulebooks)
2. Domain heuristics (`uistyle`, `diataxis`, `writing`, `observability`, `change-risk`, `epistemics`, `performance`, `privacy`, `anki-authoring`, `operability`, `maintainability`, `legacy-evolution-mode`, `incremental-refactoring-strategy`, others)
3. Implementation playbooks
4. Framework/library guides

---

## Review Checklist (Required)

- Sequence path: structural work is decomposed into bounded increments.
- Entry path: entry seam or target boundary is explicit before first increment.
- Intent path: each increment states expected gain and risk.
- Safety path: critical behavior has characterization baseline before structural change.
- Divergence path: unintended behavior divergence is explicitly dispositioned.
- Migration path: coexistence states have entry/exit and observability checkpoints.
- Decommission path: temporary adapters/shims have removal triggers.
- Debt path: deferred structural debt has owner and closure criteria.
- Outcome path: stated structural goals are evaluated and dispositioned.
