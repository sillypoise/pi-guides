# Observability Heuristics - Strict / Full

Version: 0.1 (draft)
Date: February 2026

This guide defines enforceable observability heuristics for diagnosable, operable systems.

It is domain-heuristics-tier guidance and does not override tier-1 rulebooks.

## Corpus Grounding (2026-02 Initial)

- Source selection freeze: `files/derivations/observability-source-selection-2026-02-18.md`
- Derivation worksheet: `files/derivations/observability-derivation-2026-02-18.md`
- Source provenance: `files/sources/observability/README.md`

Frozen source IDs for this pass: `O001`, `O002`, `O003`, `O004`, `O005`, `O010`, `O016`.

---

## Scope

- In scope:
  - Cross-signal quality heuristics for logs, metrics, traces, and observability events.
  - Actionable diagnosability requirements for normal, failed, and degraded paths.
- Out of scope:
  - Vendor-specific query syntax, dashboard tooling workflows, and alert routing systems.
  - Security policy ownership (for example, rule exceptions and release security disposition).
  - Framework-specific instrumentation implementation details.

---

## Keywords (RFC 2119)

- MUST / SHALL: absolute requirement.
- MUST NOT / SHALL NOT: absolute prohibition.
- SHOULD: strong recommendation; deviations require explicit rationale.

---

## Signal Intent and Actionability (SIG)

### OBS-SIG-001 - Telemetry MUST be emitted for decisions that materially affect system outcomes.

Events MUST capture enough context to explain why important outcomes occurred.

Material outcomes include user-facing behavior and critical internal behavior (for example, reliability,
security, integrity, and cost-significant control paths).

Rationale: low-value telemetry volume without decision context does not improve diagnosability.

### OBS-SIG-002 - Observability signals MUST be action-oriented.

Signals SHOULD support an actionable question (what failed, where, for whom, and what changed).

Rationale: signals that cannot drive action increase noise and operator fatigue.

### OBS-SIG-003 - Success, failure, and degraded paths MUST have visibility.

Critical workflows MUST NOT emit telemetry for only happy-path execution.

Rationale: incident triage fails when degraded and failure behavior is invisible.

---

## Correlation and Context Continuity (CTX)

### OBS-CTX-001 - Cross-service request flow MUST preserve correlation context.

Context identifiers used for traceability MUST be propagated across synchronous and asynchronous boundaries.

Rationale: missing propagation breaks causal reconstruction across distributed systems.

### OBS-CTX-002 - Observability records MUST include actor, action, target, and outcome context.

Context fields MUST be present or explicitly marked unknown.

Rationale: incomplete context is a primary source of ambiguous incident diagnosis.

### OBS-CTX-003 - Time semantics MUST be explicit and consistent.

Recorded timestamps and duration fields MUST be unambiguous and consistent across related signals.

Rationale: inconsistent time semantics corrupt event ordering and latency analysis.

---

## Logs and Event Quality (LOG)

### OBS-LOG-001 - Logs MUST be structured and machine-parseable for operational events.

Free-form text MAY be included, but core operational fields MUST remain structured.

Rationale: unstructured logs degrade searchability, aggregation, and incident automation.

### OBS-LOG-002 - Log severity MUST reflect actionable operational importance.

Severity levels MUST NOT be used as generic verbosity labels.

Rationale: severity inflation erodes triage signal and response quality.

### OBS-LOG-003 - Event naming and field semantics MUST be stable over time.

Breaking semantic changes to key events/fields MUST be versioned or migration-noted.

Rationale: silent semantic drift breaks dashboards, detectors, and historical analysis.

### OBS-LOG-004 - Logs MUST avoid high-cardinality free-text identity fields as primary dimensions.

High-cardinality identifiers SHOULD be present when needed, but MUST NOT be the only grouping mechanism.

Rationale: unconstrained cardinality causes cost blowups and unusable aggregations.

---

## Metrics Quality and Cardinality Discipline (MET)

### OBS-MET-001 - Metrics MUST represent stable, well-defined units and semantics.

Metric names and units MUST remain consistent with their documented meaning.

Rationale: inconsistent units and semantics invalidate trend and threshold interpretation.

### OBS-MET-002 - Metrics labels MUST be intentionally bounded.

Unbounded cardinality labels (for example, raw IDs, random tokens, unbounded user input) MUST NOT be used.

Rationale: unbounded labels degrade query performance and can disable effective monitoring.

### OBS-MET-003 - Counter, gauge, and distribution semantics MUST NOT be conflated.

Metric type MUST match measured behavior (accumulation, point-in-time state, or distribution).

Rationale: type misuse leads to incorrect alert logic and invalid diagnostics.

---

## Tracing and Causal Reconstruction (TRACE)

### OBS-TRACE-001 - Critical multi-step workflows MUST expose traceable span boundaries.

Span boundaries SHOULD align with externally meaningful operations and dependency calls.

Rationale: trace utility depends on semantically useful boundaries rather than raw volume.

### OBS-TRACE-002 - Parent/child and causal relationships MUST be explicit.

Trace relationships MUST preserve execution causality and asynchronous linkage.

Rationale: broken relationship graphs prevent root-cause localization.

### OBS-TRACE-003 - Trace context loss MUST be treated as an observability defect.

When trace continuity is missing in critical paths, teams MUST triage instrumentation quality failure.

Rationale: context loss removes primary incident debugging leverage in distributed systems.

---

## Change Visibility and Regression Diagnosability (CHG)

### OBS-CHG-001 - Significant behavior changes MUST be observable by design.

Changes with user, latency, error-rate, or resource-impact risk SHOULD include explicit observability checkpoints.

Rationale: change impact cannot be safely managed without measurable visibility.

### OBS-CHG-002 - Rollout and rollback states MUST be diagnosable from telemetry.

Telemetry SHOULD make it possible to distinguish pre-change, in-change, and post-change behavior.

Rationale: ambiguous rollout state extends incident duration and raises rollback risk.

### OBS-CHG-003 - Unknown spikes in errors/latency MUST have at least one direct diagnostic path.

Critical paths MUST expose enough signals to narrow likely cause domains during triage.

Rationale: systems without direct diagnostic paths force guesswork and prolonged outage windows.

---

## Boundary Rules

- TigerStyle owns generic coding safety, error handling, and explicitness constraints.
- Security-Core owns security policy controls and security-specific detection obligations.
- Privacy/security families own data minimization/redaction policy constraints for telemetry payloads.
- Observability owns cross-signal quality and diagnosability heuristics.
- Change-Risk family owns rollout governance process; Observability owns only telemetry quality and
  diagnosability constraints for changes.
- Performance family owns latency/throughput/resource quality constraints; Observability owns only
  visibility and signal semantics needed to diagnose performance behavior.
- Lower-tier playbooks/framework guides own vendor/tool-specific implementation procedures.

When guidance conflicts:

1. Tier-1 rulebooks (`tigerstyle`, `security-core`, `contract-core`, `robustness-core`, `reproducibility-core`, language rulebooks)
2. Domain heuristics (`uistyle`, `diataxis`, `writing`, `observability`, `change-risk`, `epistemics`, `performance`)
3. Implementation playbooks
4. Framework/library guides

---

## Review Checklist (Required)

For meaningful observability-relevant changes, verify:

- Error path: failed and degraded flows emit actionable telemetry, not just happy paths.
- Boundary path: correlation context is preserved across service and async boundaries.
- Boundary path: trace relationships are explicit enough for causal reconstruction.
- Data path: logs are structured, stable, and do not depend on unbounded primary dimensions.
- Metrics path: metric units/types are consistent and labels are cardinality-bounded.
- Change path: rollout/rollback state and behavior deltas are diagnosable from emitted signals.
