# Novelty Budgeting Heuristics - Strict / Full

Version: 0.1 (draft)
Date: February 2026

This guide defines enforceable heuristics for allocating novelty intentionally so
solutions remain differentiated, understandable, and risk-aware.

It is domain-heuristics-tier guidance and does not override tier-1 rulebooks.

## Corpus Grounding (2026-02 Initial)

- Source selection freeze: `files/derivations/novelty-budgeting-source-selection-2026-02-24.md`
- Derivation worksheet: `files/derivations/novelty-budgeting-derivation-2026-02-24.md`
- Source provenance: `files/sources/novelty-budgeting/README.md`

Frozen source IDs for this pass: `NB001`, `NB002`, `NB003`, `NB004`, `NB005`, `NB006`, `NB010`.

---

## Scope

- In scope:
  - explicit novelty allocation across solution surfaces.
  - risk-adjusted novelty ceilings and staged novelty introduction.
  - reviewer-enforceable checks for coherence, fallback, and value concentration.
- Out of scope:
  - broad ideation method design (`counter-intuition-and-left-turn-thinking` ownership).
  - rollout governance mechanics (`change-risk` ownership).
  - confidence/evidence semantics (`epistemics` ownership).
  - style-level expression mandates (`uistyle` and `writing` ownership).

## Non-goals

- Maximizing novelty everywhere.
- Treating novelty as a substitute for problem-solution fit.
- Locking novelty ceilings permanently without re-evaluation.

---

## Keywords (RFC 2119)

- MUST / SHALL: absolute requirement.
- MUST NOT / SHALL NOT: absolute prohibition.
- SHOULD: strong recommendation; deviations require explicit rationale.

## Definitions

- Novelty budget: explicit allowance for unconventional choices in a given change scope.
- Novelty surface: boundary where novelty may appear (for example workflow, interaction pattern, architecture seam, communication format).
- Core path: high-risk or high-frequency path where user impact or system risk is concentrated.

---

## Budget Definition and Allocation (BUD)

### NBUD-BUD-001 - Significant changes MUST declare explicit novelty budget.

If novelty allocation is implicit, review SHOULD treat risk and coherence claims as under-specified.

### NBUD-BUD-002 - Novelty budgets MUST prioritize user/system value concentration.

Novelty SHOULD be allocated to highest-value surfaces first.

### NBUD-BUD-003 - Core paths MUST use stricter novelty ceilings than peripheral paths.

High-risk/high-frequency paths SHOULD avoid stacked unconventional changes.

### NBUD-BUD-004 - Novelty budgets MUST name surfaces and per-surface ceilings explicitly.

Unscoped "be more novel" directives SHOULD be rejected as non-reviewable.

---

## Risk and Coherence Controls (SAFE)

### NBUD-SAFE-001 - Novelty allocation MUST preserve tier-1 safety and contract obligations.

Novelty MUST NOT justify boundary, security, integrity, or compatibility violations.

### NBUD-SAFE-002 - Multi-surface novelty in one increment MUST include phased fallback plan.

Parallel high-novelty shifts without fallback SHOULD be split into staged increments.

### NBUD-SAFE-003 - Novelty-heavy decisions MUST include clear readability/comprehension checks.

If comprehension cost exceeds accepted threshold, novelty allocation SHOULD be reduced.

---

## Sequencing and Evolution (SEQ)

### NBUD-SEQ-001 - Novelty adoption SHOULD start with reversible probes on non-core paths.

Irreversible novelty on core paths SHOULD be deferred until evidence improves.

### NBUD-SEQ-002 - Novelty budgets MUST include explicit expansion and contraction triggers.

Budget changes SHOULD be driven by outcome evidence, not novelty preference alone.

### NBUD-SEQ-003 - Repeated rollback events in same novelty surface MUST trigger budget reduction.

Persistent instability SHOULD tighten novelty ceilings before further expansion.

### NBUD-SEQ-004 - Novelty-budget changes MUST NOT be used as a proxy for rollout gate approval.

Rollout progression authority remains with `change-risk` controls.

---

## Evaluation and Learning (EVAL)

### NBUD-EVAL-001 - Outcomes MUST compare novelty-budgeted variant to baseline.

Claims of differentiation benefit SHOULD be supported by explicit baseline deltas.

### NBUD-EVAL-002 - Novelty budget decisions MUST record why chosen allocation was acceptable.

Rationale SHOULD include tradeoffs between differentiation, clarity, and risk.

### NBUD-EVAL-003 - Failed novelty allocations MUST generate reusable budget anti-pattern notes.

Anti-pattern records SHOULD inform future ceiling choices for similar contexts.

### NBUD-EVAL-004 - Novelty benefit claims MUST include confidence labels aligned with `epistemics`.

Low-confidence claims SHOULD avoid aggressive budget expansion until evidence improves.

---

## Boundary Rules

- Tier-1 rulebooks own non-negotiable safety, integrity, and compatibility constraints.
- Counter-Intuition-and-Left-Turn-Thinking owns broad non-obvious option generation and inversion.
- Creative-Constraints owns deliberate constraint design/execution mechanics.
- Change-Risk owns rollout progression and release governance.
- UIStyle and Writing own domain expression constraints.
- Novelty-Budgeting owns novelty allocation ceilings, distribution strategy, and budget adaptation triggers.

When guidance conflicts:

1. Tier-1 rulebooks (`tigerstyle`, `security-core`, `contract-core`, `robustness-core`, `reproducibility-core`, language rulebooks)
2. Domain heuristics (`uistyle`, `diataxis`, `writing`, `observability`, `change-risk`, `epistemics`, `performance`, `privacy`, `anki-authoring`, `operability`, `maintainability`, `legacy-evolution-mode`, `incremental-refactoring-strategy`, `compatibility-evolution`, `counter-intuition-and-left-turn-thinking`, `creative-constraints`, `novelty-budgeting`, others)
3. Implementation playbooks
4. Framework/library guides

## Conflict Map

- `counter-intuition-and-left-turn-thinking`: owns option-space diversification; this family governs
  how much novelty is allocated where.
- `creative-constraints`: owns constraint mechanics; this family governs novelty quota policy.
- `change-risk`: owns rollout governance; this family governs pre-rollout novelty allocation discipline.
- `uistyle` and `writing`: own domain expression quality; this family does not prescribe style detail.
- `epistemics`: owns confidence/evidence semantics for novelty-benefit claims.
- Tier-1 rulebooks remain non-overridable.

---

## Review Checklist (Required)

- Budget path: explicit novelty budget is declared for significant change.
- Allocation path: novelty is concentrated on highest-value surfaces.
- Ceiling path: core paths use stricter novelty ceilings than peripheral paths.
- Surface path: novelty surfaces and per-surface ceilings are explicit.
- Safety path: novelty does not violate tier-1 obligations.
- Fallback path: multi-surface novelty has phased fallback.
- Sequence path: novelty starts reversibly and expands only with evidence.
- Trigger path: budget expansion/contraction triggers are explicit.
- Governance path: novelty-budget adjustments do not bypass rollout gate ownership.
- Rollback path: repeated rollback on same surface reduces novelty budget.
- Evaluation path: baseline deltas, confidence labels, and budget tradeoff rationale are recorded.
