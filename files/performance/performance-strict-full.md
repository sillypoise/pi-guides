# Performance Heuristics - Strict / Full

Version: 0.1 (draft)
Date: February 2026

This guide defines enforceable performance heuristics for latency, throughput, and resource-efficiency quality.

It is domain-heuristics-tier guidance and does not override tier-1 rulebooks.

## Corpus Grounding (2026-02 Initial)

- Source selection freeze: `files/derivations/performance-source-selection-2026-02-19.md`
- Derivation worksheet: `files/derivations/performance-derivation-2026-02-19.md`
- Source provenance: `files/sources/performance/README.md`

Frozen source IDs for this pass: `P001`, `P002`, `P003`, `P004`, `P005`, `P006`, `P010`.

---

## Scope

- In scope:
  - performance-quality heuristics for latency/tail behavior, throughput/backpressure,
    resource saturation, and regression control.
- Out of scope:
  - telemetry schema and signal semantics (`observability` ownership).
  - rollout progression policy (`change-risk` ownership).
  - framework/runtime-specific tuning commands and vendor mechanics.

---

## Keywords (RFC 2119)

- MUST / SHALL: absolute requirement.
- MUST NOT / SHALL NOT: absolute prohibition.
- SHOULD: strong recommendation; deviations require explicit rationale.

## Definitions

- Critical performance path: a path whose latency/throughput/resource behavior materially affects
  reliability, cost, or user outcomes.
- Tail-latency risk: elevated high-percentile latency behavior that impacts user/system outcomes.
- Saturation signal: reviewer-visible evidence of constrained resources under expected or peak load.

---

## Latency and Tail Behavior (LAT)

### PERF-LAT-001 - Critical performance paths MUST have explicit latency expectations.

Latency expectations MUST include user- or system-meaningful thresholds.

### PERF-LAT-002 - Tail-latency behavior MUST be evaluated for critical paths.

Performance assessments MUST include high-percentile behavior, not only averages.

### PERF-LAT-003 - Latency regressions with material impact MUST have explicit disposition.

Regressions MUST be fixed, mitigated, or accepted with owner and review date.

---

## Throughput, Backpressure, and Overload (FLOW)

### PERF-FLOW-001 - Work intake MUST be bounded for overload-prone paths.

Critical queue and intake paths MUST define bounded behavior under pressure.

### PERF-FLOW-002 - Backpressure or load-shedding behavior MUST be explicit.

Overload behavior MUST avoid unbounded queue growth and cascading collapse.

### PERF-FLOW-003 - Throughput scaling assumptions MUST be evidence-backed.

Scaling claims MUST reference reviewer-visible measurements or validated models.

---

## Resource Efficiency and Saturation (RES)

### PERF-RES-001 - Critical resource budgets MUST be explicit.

CPU, memory, network, storage, or equivalent constraints MUST be identified for critical paths.

### PERF-RES-002 - Saturation risk MUST be monitored with actionable signals.

Performance-risk changes MUST include saturation signals adequate for triage.

### PERF-RES-003 - Performance optimizations MUST NOT degrade tier-1 safety, security, or contract guarantees.

Optimizations MUST be rejected if they require violating higher-tier constraints.

---

## Regression Control and Evidence (REG)

### PERF-REG-001 - Performance-significant changes MUST include before/after evidence.

Evidence MUST be reviewer-visible and tied to the affected path.

### PERF-REG-002 - Benchmark and test conditions MUST be stated for comparable interpretation.

Results MUST include enough context to avoid misleading comparisons.

### PERF-REG-003 - Known unresolved performance risks in changed scope MUST be explicitly dispositioned.

Unresolved risks MUST be fixed, mitigated, or accepted with owner and review date.

---

## Exceptions and Boundaries (EXCEPT)

### PERF-EXCEPT-001 - Temporary performance exceptions MUST be explicit, owned, and time-bounded.

Exceptions MUST include rationale, owner, and review/expiry conditions.

### PERF-EXCEPT-002 - Performance exceptions MUST NOT override tier-1 rulebooks.

Performance pressure MUST NOT justify bypassing safety, security, contract, robustness,
or reproducibility requirements.

---

## Boundary Rules

- Observability owns telemetry schema and signal-quality semantics.
- Change-Risk owns rollout progression and release governance.
- Robustness-Core owns failure/concurrency/integrity invariants.
- Reproducibility-Core owns deterministic environment/build/test invariants.
- Performance owns latency/throughput/resource-efficiency quality heuristics.

When guidance conflicts:

1. Tier-1 rulebooks (`tigerstyle`, `security-core`, `contract-core`, `robustness-core`, `reproducibility-core`, language rulebooks)
2. Domain heuristics (`uistyle`, `diataxis`, `writing`, `observability`, `change-risk`, `epistemics`, `performance`, others)
3. Implementation playbooks
4. Framework/library guides

---

## Review Checklist (Required)

- Latency path: critical paths have explicit latency expectations and tail checks.
- Flow path: intake and queue behavior are bounded under pressure.
- Flow path: overload behavior has explicit backpressure/load-shedding strategy.
- Resource path: critical resource budgets are explicit and saturation risk is visible.
- Evidence path: performance-significant changes include reviewer-visible before/after evidence.
- Evidence path: benchmark/test conditions are explicit enough for fair comparison.
- Regression path: material regressions/risks have explicit disposition.
- Boundary path: performance work does not weaken tier-1 constraints.
- Exception path: temporary exceptions are explicit, owned, and time-bounded.
