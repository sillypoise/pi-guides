# Novelty Budgeting Heuristics - Strict / Compact

Compact derivative of `novelty-budgeting/novelty-budgeting-strict-full.md`.
Rule IDs are stable and retain the same meaning.

## Scope

- Cross-stack heuristics for explicit novelty ceilings, novelty distribution,
  and risk-aware novelty adaptation.

Boundary note: tier-1 rulebooks remain non-overridable; Change-Risk owns rollout governance;
Counter-Intuition owns option generation, while this family owns novelty allocation policy.

## Core Rules

**NBUD-BUD-001** - Significant changes MUST declare explicit novelty budget.

**NBUD-BUD-002** - Novelty budgets MUST prioritize user/system value concentration.

**NBUD-BUD-003** - Core paths MUST use stricter novelty ceilings than peripheral paths.

**NBUD-BUD-004** - Novelty budgets MUST name surfaces and per-surface ceilings explicitly.

**NBUD-SAFE-001** - Novelty allocation MUST preserve tier-1 safety and contract obligations.

**NBUD-SAFE-002** - Multi-surface novelty in one increment MUST include phased fallback plan.

**NBUD-SAFE-003** - Novelty-heavy decisions MUST include clear readability/comprehension checks.

**NBUD-SEQ-002** - Novelty budgets MUST include explicit expansion and contraction triggers.

**NBUD-SEQ-003** - Repeated rollback events in same novelty surface MUST trigger budget reduction.

**NBUD-SEQ-004** - Novelty-budget changes MUST NOT be used as a proxy for rollout gate approval.

**NBUD-EVAL-001** - Outcomes MUST compare novelty-budgeted variant to baseline.

**NBUD-EVAL-003** - Failed novelty allocations MUST generate reusable budget anti-pattern notes.

**NBUD-EVAL-004** - Novelty benefit claims MUST include confidence labels aligned with `epistemics`.

## Review Checklist

- Significant changes declare explicit novelty budget, surfaces, and value-focused allocation.
- Core paths keep stricter ceilings and phased fallback exists for multi-surface novelty.
- Expansion/contraction triggers are explicit, rollback patterns reduce budget, and rollout gates stay separate.
- Baseline outcome deltas, confidence labels, and anti-pattern learning are recorded.
