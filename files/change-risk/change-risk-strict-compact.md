# Change-Risk Heuristics - Strict / Compact

Compact derivative of `change-risk/change-risk-strict-full.md`.
Rule IDs are stable and retain the same meaning.

## Scope

- Cross-stack release-safety heuristics for staged rollout, rollback readiness,
  and migration-safe progression.
- Review-enforceable change-risk checks across success, failure, and degraded rollout paths.

Boundary note: Contract-Core owns compatibility semantics, Observability owns signal quality,
and Security-Core owns security-sensitive controls.

## Change Shape and Gates

**CHRISK-SHAPE-001** - High-risk changes MUST be decomposed into independently reversible steps.

**CHRISK-SHAPE-002** - First exposure of risky changes MUST be intentionally bounded.

**CHRISK-SHAPE-003** - Rollout strategy MUST include explicit stop and hold conditions.

**CHRISK-GATE-001** - Rollout progression MUST be gated by observable safety signals.

**CHRISK-GATE-002** - Promotion decisions MUST record evidence, not just intent.

**CHRISK-GATE-003** - Risk-significant unknowns MUST halt automatic progression.

## Rollback and Migration

**CHRISK-ROLL-001** - Risky changes MUST have a tested rollback or neutralization path.

**CHRISK-ROLL-002** - Rollback execution ownership and triggers MUST be explicit.

**CHRISK-MIG-001** - Mixed-version operation risk MUST be evaluated for staged changes.

**CHRISK-MIG-003** - Irreversible migrations MUST have explicit risk acceptance and contingency.

## Exceptions and Precedence

**CHRISK-EXCEPT-001** - Temporary rollout-risk exceptions MUST be explicit, owned, and time-bounded.

**CHRISK-EXCEPT-002** - Exception paths MUST preserve cross-guide precedence.

## Review Checklist

- Risky changes are decomposed and first exposure is bounded.
- Rollout progression has explicit gate, stop, and hold conditions.
- Promotion decisions include reviewer-visible evidence.
- Ambiguous/missing safety signals halt automatic progression.
- Rollback path is tested, owned, and does not violate tier-1 constraints.
- Mixed-version and migration risks are explicitly evaluated.
- Irreversible changes include explicit contingency and risk acceptance.
- Exceptions are explicit, owned, and time-bounded.
