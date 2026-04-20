# Performance Heuristics - Strict / Compact

Compact derivative of `performance/performance-strict-full.md`.
Rule IDs are stable and retain the same meaning.

## Scope

- Cross-stack heuristics for latency/tail behavior, throughput/backpressure,
  resource saturation, and regression control.

Boundary note: Observability owns signal semantics, Change-Risk owns rollout governance,
and tier-1 rulebooks remain non-overridable.

## Core Rules

**PERF-LAT-001** - Critical performance paths MUST have explicit latency expectations.

**PERF-LAT-002** - Tail-latency behavior MUST be evaluated for critical paths.

**PERF-FLOW-001** - Work intake MUST be bounded for overload-prone paths.

**PERF-FLOW-002** - Backpressure or load-shedding behavior MUST be explicit.

**PERF-RES-001** - Critical resource budgets MUST be explicit.

**PERF-RES-003** - Performance optimizations MUST NOT degrade tier-1 safety, security, or contract guarantees.

**PERF-REG-001** - Performance-significant changes MUST include before/after evidence.

**PERF-EXCEPT-001** - Temporary performance exceptions MUST be explicit, owned, and time-bounded.

**PERF-EXCEPT-002** - Performance exceptions MUST NOT override tier-1 rulebooks.

## Review Checklist

- Latency expectations and tail checks exist for critical paths.
- Intake/queue behavior is bounded under pressure.
- Backpressure/load-shedding behavior is explicit.
- Resource budgets and saturation visibility are explicit.
- Reviewer-visible before/after evidence is provided for performance-significant changes.
- Regressions and unresolved risks have explicit disposition.
- Performance work does not weaken tier-1 constraints.
- Exceptions are explicit, owned, and time-bounded.
- Exceptions do not override tier-1 rulebooks.
