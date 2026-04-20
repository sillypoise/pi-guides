# Operability Heuristics - Strict / Full

Version: 0.1 (draft)
Date: February 2026

This guide defines enforceable operability heuristics for systems that are diagnosable,
actionable, and maintainable under real operational pressure.

It is domain-heuristics-tier guidance and does not override tier-1 rulebooks.

## Corpus Grounding (2026-02 Initial)

- Source selection freeze: `files/derivations/operability-source-selection-2026-02-24.md`
- Derivation worksheet: `files/derivations/operability-derivation-2026-02-24.md`
- Source provenance: `files/sources/operability/README.md`

Frozen source IDs for this pass: `OP001`, `OP002`, `OP003`, `OP004`, `OP005`, `OP006`, `OP010`.

---

## Scope

- In scope:
  - on-call readiness, actionable diagnostics, escalation clarity, and recovery ergonomics.
  - review-enforceable constraints for runbook quality and human-operable failure handling.
- Out of scope:
  - telemetry schema semantics (`observability` ownership).
  - rollout progression policy (`change-risk` ownership).
  - vendor-specific paging/incident tooling mechanics.

---

## Keywords (RFC 2119)

- MUST / SHALL: absolute requirement.
- MUST NOT / SHALL NOT: absolute prohibition.
- SHOULD: strong recommendation; deviations require explicit rationale.

## Definitions

- Operability-critical path: workflow where failure diagnosis or recovery quality materially affects
  downtime, customer impact, or operator burden.
- Actionable alert: alert signal with enough context to start diagnosis and mitigation without guesswork.
- Recovery play: bounded sequence of steps to restore service or reduce impact.

---

## Alert Actionability and Signal-to-Action Path (ALRT)

### OPER-ALRT-001 - Operability-critical alerts MUST include actionable triage context.

Alerts MUST identify what failed, likely impact scope, and first-response direction.

### OPER-ALRT-002 - Alert severity MUST align with operational urgency.

Severity inflation or ambiguous urgency labeling MUST be corrected before release.

### OPER-ALRT-003 - Alert definitions MUST include clear ownership.

Unowned critical alerts MUST NOT ship without explicit owner assignment.

---

## Runbook Readiness and Recovery Quality (RUN)

### OPER-RUN-001 - Operability-critical failures MUST have reviewer-visible recovery plays.

Recovery plays MUST include prerequisites, steps, and success/failure exit checks.

### OPER-RUN-002 - Runbook steps MUST be executable under degraded conditions.

Runbooks that require unavailable dependencies during incidents MUST be revised.

### OPER-RUN-003 - Risky remediation steps MUST include rollback or containment direction.

High-risk actions MUST NOT be presented without safer fallback guidance.

---

## Escalation and Handoff Integrity (ESC)

### OPER-ESC-001 - Escalation paths MUST be explicit for unresolved critical incidents.

Escalation rules MUST include trigger conditions and handoff targets.

### OPER-ESC-002 - Incident handoffs MUST preserve decision and timeline context.

Handoffs MUST capture current hypothesis, mitigations attempted, and pending uncertainties.

### OPER-ESC-003 - Human single-point dependency for critical recovery MUST be avoided.

Critical recovery knowledge SHOULD be documented and shareable across on-call responders.

---

## Operational Change Readiness (CHG)

### OPER-CHG-001 - Operationally significant changes MUST include explicit failure-mode handling notes.

Change artifacts SHOULD document likely failure surfaces and first diagnostics.

### OPER-CHG-002 - New recovery dependencies MUST be disclosed before release.

Undeclared recovery dependencies that increase pager load MUST be treated as release risk.

### OPER-CHG-003 - Known operability gaps in changed scope MUST have explicit disposition.

Gaps MUST be fixed, mitigated, or accepted with owner and review date.

---

## Boundary Rules

- Observability owns telemetry semantics and diagnosability signal quality.
- Change-Risk owns rollout governance and progression policy.
- Robustness-Core owns failure/concurrency/integrity invariants.
- Operability owns operator-facing readiness, escalation clarity, and recovery ergonomics.
- Lower-tier playbooks/framework guides own tooling-specific execution mechanics.

When guidance conflicts:

1. Tier-1 rulebooks (`tigerstyle`, `security-core`, `contract-core`, `robustness-core`, `reproducibility-core`, language rulebooks)
2. Domain heuristics (`uistyle`, `diataxis`, `writing`, `observability`, `change-risk`, `epistemics`, `performance`, `privacy`, `anki-authoring`, `operability`, others)
3. Implementation playbooks
4. Framework/library guides

---

## Review Checklist (Required)

- Alert path: critical alerts include actionable triage context and explicit owner.
- Alert path: severity mapping reflects true response urgency.
- Runbook path: critical failure recovery plays are available and executable under degradation.
- Runbook path: risky remediation has rollback or containment guidance.
- Escalation path: unresolved incident escalation triggers and targets are explicit.
- Handoff path: incident handoffs preserve hypothesis, attempted mitigations, and uncertainties.
- Change path: operability-significant changes include failure-mode and recovery dependency notes.
- Gap path: unresolved operability gaps are dispositioned with owner and review date.
