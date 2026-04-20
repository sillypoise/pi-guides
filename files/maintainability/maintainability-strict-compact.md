# Maintainability Heuristics - Strict / Compact

Compact derivative of `maintainability/maintainability-strict-full.md`.
Rule IDs are stable and retain the same meaning.

## Scope

- Cross-stack heuristics for coupling control, complexity budgeting,
  ownership clarity, and long-term changeability.

Boundary note: TigerStyle/language guides own style constraints; Change-Risk owns rollout governance;
Testing playbooks own concrete test mechanics.

## Core Rules

**MAINT-COUP-001** - Changes MUST preserve or improve coupling boundaries in affected scope.

**MAINT-COUP-003** - Cyclic dependency risk in changed architecture MUST be explicitly checked.

**MAINT-COMP-001** - Complexity growth in changed scope MUST be explicit and bounded.

**MAINT-COMP-002** - Reviewer comprehension path MUST be preserved for non-trivial changes.

**MAINT-OWN-001** - Ownership boundaries for changed behavior MUST be explicit.

**MAINT-OWN-003** - Decommission and simplification opportunities in changed scope MUST be considered.

**MAINT-RISK-001** - Maintainability regressions MUST have explicit disposition.

**MAINT-RISK-003** - Known testability blind spots introduced by changes MUST be documented.

## Review Checklist

- Coupling boundaries are preserved and cycle risks are checked.
- Complexity growth is bounded and reviewable.
- Ownership boundaries and extension intent are explicit.
- Simplification opportunities and maintainability regressions are dispositioned.
