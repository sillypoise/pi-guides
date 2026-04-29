# Creative Constraints Heuristics - Strict / Compact

Compact derivative of `creative-constraints/creative-constraints-strict-full.md`.
Rule IDs are stable and retain the same meaning.

## Scope

- Cross-stack heuristics for intentional constraint design, constrained exploration,
  and constraint lifecycle quality controls.

Boundary note: tier-1 rulebooks remain non-overridable; Change-Risk owns rollout governance;
Novelty-Budgeting owns novelty-allocation policy.

## Core Rules

**CCON-DES-001** - Constraint-driven work MUST declare baseline and constrained variants.

**CCON-DES-002** - Each constraint MUST state intended quality effect and failure risk.

**CCON-DES-003** - Constraint sets for one cycle MUST remain small and reviewer-comprehensible.

**CCON-DES-004** - Constraint artifacts MUST separate constraint mechanics from rollout controls.

**CCON-EXEC-001** - Constraint experiments MUST preserve tier-1 safety and contract obligations.

**CCON-EXEC-002** - Constraint conflicts with user comprehension MUST trigger scope reduction.

**CCON-EXEC-003** - High-impact constrained proposals MUST include fallback path.

**CCON-EVAL-001** - Constraint outcomes MUST be evaluated against pre-declared success signals.

**CCON-EVAL-002** - Constraints that repeatedly underperform baseline MUST be retired or redesigned.

**CCON-EVAL-003** - Constraint cycles MUST declare explicit exit or continuation criteria.

**CCON-EVAL-004** - Constraint-fitness conclusions MUST distinguish method effect from rollout or measurement noise.

**CCON-LEARN-003** - Repeated generic-output relapse MUST trigger constraint-method rotation.

## Review Checklist

- Baseline and constrained variants are compared.
- Constraint intent/risk is explicit and set size remains reviewable.
- Constraint mechanics stay separate from rollout-control policy.
- Tier-1 safety and comprehension guardrails hold, with fallback for high-impact work.
- Evaluation uses pre-declared signals, handles confounders, and has explicit exit/retirement criteria.
