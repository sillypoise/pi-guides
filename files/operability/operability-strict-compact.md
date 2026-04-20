# Operability Heuristics - Strict / Compact

Compact derivative of `operability/operability-strict-full.md`.
Rule IDs are stable and retain the same meaning.

## Scope

- Cross-stack heuristics for on-call readiness, runbook quality,
  escalation clarity, and operational recovery ergonomics.

Boundary note: Observability owns signal semantics; Change-Risk owns rollout governance;
tier-1 rulebooks remain non-overridable.

## Core Rules

**OPER-ALRT-001** - Operability-critical alerts MUST include actionable triage context.

**OPER-ALRT-003** - Alert definitions MUST include clear ownership.

**OPER-RUN-001** - Operability-critical failures MUST have reviewer-visible recovery plays.

**OPER-RUN-002** - Runbook steps MUST be executable under degraded conditions.

**OPER-RUN-003** - Risky remediation steps MUST include rollback or containment direction.

**OPER-ESC-001** - Escalation paths MUST be explicit for unresolved critical incidents.

**OPER-ESC-002** - Incident handoffs MUST preserve decision and timeline context.

**OPER-CHG-003** - Known operability gaps in changed scope MUST have explicit disposition.

## Review Checklist

- Critical alerts are actionable and owned.
- Runbooks include executable recovery plays and safe fallbacks.
- Escalation triggers and handoff context are explicit.
- Change-related operability risks and gaps are dispositioned.
