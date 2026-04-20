# Observability Heuristics - Strict / Compact

Compact derivative of `observability/observability-strict-full.md`.
Rule IDs are stable and retain the same meaning.

## Scope

- Cross-signal observability quality for logs, metrics, traces, and events.
- Actionable diagnosability requirements across success, failure, and degraded paths.

Boundary note: privacy/security families own telemetry data-minimization policy; this guide owns
signal quality and diagnosability.

## Signal and Context

**OBS-SIG-001** - Telemetry MUST be emitted for decisions that materially affect user-visible outcomes.

**OBS-SIG-003** - Success, failure, and degraded paths MUST have visibility.

**OBS-CTX-001** - Cross-service request flow MUST preserve correlation context.

**OBS-CTX-002** - Observability records MUST include actor, action, target, and outcome context.

## Logs and Metrics

**OBS-LOG-001** - Logs MUST be structured and machine-parseable for operational events.

**OBS-LOG-003** - Event naming and field semantics MUST be stable over time.

**OBS-MET-001** - Metrics MUST represent stable, well-defined units and semantics.

**OBS-MET-002** - Metrics labels MUST be intentionally bounded.

**OBS-MET-003** - Counter, gauge, and distribution semantics MUST NOT be conflated.

## Tracing and Change Visibility

**OBS-TRACE-001** - Critical multi-step workflows MUST expose traceable span boundaries.

**OBS-TRACE-003** - Trace context loss MUST be treated as an observability defect.

**OBS-CHG-001** - Significant behavior changes MUST be observable by design.

**OBS-CHG-002** - Rollout and rollback states MUST be diagnosable from telemetry.

## Review Checklist

- Failed and degraded paths are visible, not only happy paths.
- Correlation and trace context remain intact across boundaries.
- Logs are structured and semantically stable.
- Metrics types/units are coherent and label cardinality is bounded.
- Rollout/rollback behavior is diagnosable from emitted signals.
