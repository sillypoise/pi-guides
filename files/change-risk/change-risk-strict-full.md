# Change-Risk Heuristics - Strict / Full

Version: 0.1 (draft)
Date: February 2026

This guide defines enforceable change-risk heuristics for safe, reversible delivery.

It is domain-heuristics-tier guidance and does not override tier-1 rulebooks.

## Corpus Grounding (2026-02 Initial)

- Source selection freeze: `files/derivations/change-risk-source-selection-2026-02-19.md`
- Derivation worksheet: `files/derivations/change-risk-derivation-2026-02-19.md`
- Source provenance: `files/sources/change-risk/README.md`

Frozen source IDs for this pass: `R001`, `R002`, `R003`, `R004`, `R005`, `R006`, `R014`.

---

## Scope

- In scope:
  - Cross-stack heuristics for change shaping, progressive rollout, rollback readiness,
    and migration-safe sequencing.
  - Review-enforceable release-safety constraints for normal, failed, and degraded rollout paths.
- Out of scope:
  - CI/CD vendor syntax and deployment command procedures.
  - Platform-specific rollout tool configuration workflows.
  - Contract semantic compatibility ownership (`contract-core`).
  - Telemetry schema/signal-quality ownership (`observability`).

---

## Keywords (RFC 2119)

- MUST / SHALL: absolute requirement.
- MUST NOT / SHALL NOT: absolute prohibition.
- SHOULD: strong recommendation; deviations require explicit rationale.

## Definitions

- High-risk change: a change with plausible impact to availability, integrity, security posture,
  correctness, or broad user workflows if it fails.
- Safety signal: reviewer-visible evidence used to decide progression, hold, or rollback.
- Automatic progression: rollout advancement that occurs without an explicit fresh human decision at
  each stage.

---

## Change Shaping and Blast-Radius Control (SHAPE)

### CHRISK-SHAPE-001 - High-risk changes MUST be decomposed into independently reversible steps.

A change that can impact availability, integrity, security posture, or broad user workflows MUST NOT
ship as a single irreversible unit.

Rationale: decomposed changes reduce incident blast radius and improve recovery speed.

### CHRISK-SHAPE-002 - First exposure of risky changes MUST be intentionally bounded.

Initial rollout scope MUST be limited by cohort, geography, tenancy, traffic percentage,
or an equivalent explicit boundary.

Rationale: bounded first exposure constrains unknown-failure impact.

### CHRISK-SHAPE-003 - Rollout strategy MUST include explicit stop and hold conditions.

Promotion criteria and rollback/hold triggers MUST be defined before production progression.

Rationale: no-stop-condition rollouts drift into unsafe continuation under uncertainty.

---

## Progressive Verification and Gates (GATE)

### CHRISK-GATE-001 - Rollout progression MUST be gated by observable safety signals.

Progression decisions MUST reference explicit safety checks for correctness, errors, latency,
and other risk-relevant outcomes for the changed scope.

Rationale: ungated progression turns partial uncertainty into full-scale incidents.

### CHRISK-GATE-002 - Promotion decisions MUST record evidence, not just intent.

Release evidence MUST be reviewer-visible and tied to the change stage being promoted.

Rationale: evidence-free promotion decisions are difficult to audit and correct.

### CHRISK-GATE-003 - Risk-significant unknowns MUST halt automatic progression.

When key safety signals are missing, contradictory, or non-diagnostic, rollout MUST pause until
risk posture is re-established.

Rationale: ambiguous telemetry and unknown state are leading indicators of escalation risk.

---

## Rollback Readiness and Reversibility (ROLL)

### CHRISK-ROLL-001 - Risky changes MUST have a tested rollback or neutralization path.

Rollback, kill-switch, or equivalent neutralization mechanism MUST exist and be validated before
full rollout.

Rationale: untested rollback assumptions frequently fail under incident pressure.

### CHRISK-ROLL-002 - Rollback execution ownership and triggers MUST be explicit.

Teams MUST define who can trigger rollback, under what conditions, and through which approved path.

Rationale: unclear authority and trigger criteria increase recovery latency.

### CHRISK-ROLL-003 - Recovery paths MUST avoid introducing broader secondary risk.

Rollback and hotfix actions MUST NOT bypass tier-1 safety and security constraints.

Rationale: emergency remediation can create larger follow-on failures when unbounded.

---

## Migration and Mixed-Version Safety (MIG)

### CHRISK-MIG-001 - Mixed-version operation risk MUST be evaluated for staged changes.

When producers and consumers, or callers and callees, may run different versions, compatibility
assumptions and failure modes MUST be explicitly checked.

Rationale: mixed-version transitions are a common source of hidden breakage.

### CHRISK-MIG-002 - Data and schema transitions MUST include safe coexistence windows.

Migrations MUST support bounded coexistence where old and new representations can operate safely
during rollout and rollback windows.

Rationale: no-coexistence migrations create brittle cutovers with high rollback failure risk.

### CHRISK-MIG-003 - Irreversible migrations MUST have explicit risk acceptance and contingency.

If a migration cannot be rolled back, change records MUST include owner-approved risk acceptance and
contingency actions for degraded operation.

Rationale: irreversible changes require stronger pre-commit governance.

---

## Release-State Clarity and Decision Evidence (EVID)

### CHRISK-EVID-001 - Release state MUST be explicitly identifiable at each rollout stage.

Teams MUST be able to distinguish pre-change, in-progress, and post-change operational states.

Rationale: unclear release state extends triage time and rollback uncertainty.

### CHRISK-EVID-002 - Change records MUST describe expected impact and failure domains.

Expected behavior changes, affected surfaces, and plausible failure domains MUST be documented before
full exposure.

Rationale: explicit impact framing improves detection quality and response coordination.

### CHRISK-EVID-003 - Release decisions MUST include disposition for unresolved risk items.

Known unresolved risks in changed scope MUST be fixed, mitigated, or explicitly accepted with owner
and review date.

Rationale: silent risk carryover increases incident likelihood and accountability gaps.

---

## Exceptions and Boundary Ownership (EXCEPT)

### CHRISK-EXCEPT-001 - Temporary rollout-risk exceptions MUST be explicit, owned, and time-bounded.

Any exception to a change-risk rule MUST include rationale, owner, expiry or review date,
and compensating controls.

Rationale: undocumented exceptions become permanent operational debt.

### CHRISK-EXCEPT-002 - Exception paths MUST preserve cross-guide precedence.

Change-risk exceptions MUST NOT override tier-1 rulebooks (`tigerstyle`, `security-core`,
`contract-core`) and SHOULD reference related deference points.

Rationale: precedence violations create conflicting obligations and unsafe shortcuts.

---

## Boundary Rules

- Contract-Core owns semantic compatibility invariants and boundary contract semantics.
- Observability owns signal quality, telemetry semantics, and diagnosability quality requirements.
- Security-Core owns security-sensitive rollout controls and fail-closed behavior.
- Change-Risk owns rollout strategy, blast-radius control, progression gates,
  rollback readiness, and migration-safety heuristics.
- Lower-tier playbooks/framework guides own deployment tool procedures and platform-specific mechanics.

When guidance conflicts:

1. Tier-1 rulebooks (`tigerstyle`, `security-core`, `contract-core`, language rulebooks)
2. Domain heuristics (`uistyle`, `diataxis`, `writing`, `observability`, `change-risk`, others)
3. Implementation playbooks
4. Framework/library guides

---

## Review Checklist (Required)

For meaningful release-risk changes, verify:

- Boundary path: high-risk changes are decomposed and first exposure is intentionally bounded.
- Gate path: rollout progression has explicit promotion and stop conditions.
- Gate path: promotion decisions reference reviewer-visible evidence.
- Error path: ambiguous or missing safety signals halt progression pending re-evaluation.
- Rollback path: rollback or neutralization is defined, tested, and operationally owned.
- Rollback path: recovery actions preserve tier-1 safety/security constraints.
- Migration path: mixed-version compatibility risks are explicitly evaluated.
- Migration path: irreversible changes include risk acceptance and contingency actions.
- Release-state path: pre-change/in-change/post-change states are diagnosable.
- Exception path: temporary risk exceptions are explicit, owned, and time-bounded.
