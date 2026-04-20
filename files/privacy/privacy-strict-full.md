# Privacy Heuristics - Strict / Full

Version: 0.1 (draft)
Date: February 2026

This guide defines enforceable privacy heuristics for data minimization, lifecycle control,
and privacy-safe handling across product and platform changes.

It is domain-heuristics-tier guidance and does not override tier-1 rulebooks.

## Corpus Grounding (2026-02 Initial)

- Source selection freeze: `files/derivations/privacy-source-selection-2026-02-23.md`
- Derivation worksheet: `files/derivations/privacy-derivation-2026-02-23.md`
- Source provenance: `files/sources/privacy/README.md`

Frozen source IDs for this pass: `PR001`, `PR002`, `PR003`, `PR004`, `PR005`, `PR006`, `PR010`.

---

## Scope

- In scope:
  - privacy heuristics for minimization, purpose limitation, retention/deletion discipline,
    consent-state handling, and privacy-safe default behavior.
  - review-enforceable expectations for personal-data lifecycle and disclosure controls.
- Out of scope:
  - jurisdiction-specific legal interpretation and policy drafting.
  - encryption/key-management implementation details (`security-core` ownership).
  - telemetry schema implementation mechanics (`observability` and lower-tier playbook ownership).

---

## Keywords (RFC 2119)

- MUST / SHALL: absolute requirement.
- MUST NOT / SHALL NOT: absolute prohibition.
- SHOULD: strong recommendation; deviations require explicit rationale.

## Definitions

- Personal data: information relating to an identified or identifiable person.
- Processing purpose: explicit reason data is collected, transformed, stored, or shared.
- Privacy-critical path: workflow where personal data collection, exposure, retention,
  or transfer materially affects user privacy risk.

---

## Data Minimization and Purpose Limitation (MIN)

### PRIV-MIN-001 - Privacy-critical paths MUST collect only data needed for explicit purpose.

Collection fields MUST map to a reviewer-visible processing purpose.

### PRIV-MIN-002 - New personal-data fields MUST include explicit purpose and owner.

Unowned or unstated-purpose personal-data additions MUST be rejected.

### PRIV-MIN-003 - Personal data MUST NOT be reused for materially different purpose without explicit re-authorization path.

Purpose expansion MUST include documented approval and user-impact rationale.

---

## Retention, Deletion, and Lifecycle Controls (RET)

### PRIV-RET-001 - Personal-data classes MUST have explicit retention boundaries.

Retention expectations MUST include trigger condition and disposal behavior.

### PRIV-RET-002 - Deletion and expiry behavior MUST be testable and auditable.

Data lifecycle controls MUST provide reviewer-visible evidence for deletion-path correctness.

### PRIV-RET-003 - Privacy exceptions to retention/deletion defaults MUST be explicit, owned, and time-bounded.

Exceptions MUST include rationale, owner, and review/expiry conditions.

---

## Access, Disclosure, and Propagation Boundaries (ACC)

### PRIV-ACC-001 - Access to personal data MUST be least-privilege and purpose-scoped.

Broad, convenience-based access grants to personal data MUST NOT be default behavior.

### PRIV-ACC-002 - Personal data propagation across boundaries MUST preserve privacy constraints.

Boundary transfers (service, queue, export, or analytics path) MUST retain purpose and handling constraints.

### PRIV-ACC-003 - External disclosure of personal data MUST have explicit legal/policy basis and review trace.

Disclosure paths MUST include reviewer-visible decision and owner.

---

## Logging, Telemetry, and Derived Data Safety (TEL)

### PRIV-TEL-001 - Logs and telemetry MUST avoid raw personal data unless explicitly required.

Sensitive values SHOULD be redacted, tokenized, or transformed for operational use.

### PRIV-TEL-002 - Privacy-preserving transforms MUST be reversible only by explicitly authorized paths.

Transforms used for diagnostics/analytics MUST prevent broad re-identification by default.

### PRIV-TEL-003 - Derived datasets MUST be evaluated for re-identification risk before wider use.

Aggregation and pseudonymization claims MUST include explicit residual-risk assessment.

---

## User Control and Consent-State Integrity (USR)

### PRIV-USR-001 - User privacy controls MUST have predictable, default-safe behavior.

When consent or preference state is unknown, processing MUST fail closed for non-essential uses.

### PRIV-USR-002 - Consent and preference changes MUST propagate within documented bounds.

Update lag windows MUST be explicit and bounded for privacy-critical paths.

### PRIV-USR-003 - Consent-state failures MUST be observable and explicitly dispositioned.

Failures to apply user privacy choices MUST be treated as privacy defects.

---

## Boundary Rules

- Security-Core owns cryptographic controls, secret handling, and exploit-surface invariants.
- Contract-Core owns interface/compatibility semantics for input/output contracts.
- Observability owns signal semantics and diagnosability quality; Privacy owns personal-data handling constraints.
- Change-Risk owns rollout governance and migration safety process; Privacy defines privacy-risk gating expectations only.
- UIStyle owns interface quality heuristics; Privacy owns consent/control semantics and data-handling constraints.
- Lower-tier playbooks/framework guides own vendor/tool-specific implementation procedures.

When guidance conflicts:

1. Tier-1 rulebooks (`tigerstyle`, `security-core`, `contract-core`, `robustness-core`, `reproducibility-core`, language rulebooks)
2. Domain heuristics (`uistyle`, `diataxis`, `writing`, `observability`, `change-risk`, `epistemics`, `performance`, `privacy`, others)
3. Implementation playbooks
4. Framework/library guides

---

## Review Checklist (Required)

- Minimization path: new/changed personal-data fields have explicit purpose and owner.
- Retention path: personal-data classes define retention trigger and disposal behavior.
- Deletion path: deletion/expiry behavior is testable and reviewer-visible.
- Access path: access grants are least-privilege and purpose-scoped.
- Boundary path: boundary transfers preserve privacy constraints.
- Telemetry path: logs/metrics/traces avoid raw personal data by default.
- Consent path: unknown consent state fails closed for non-essential processing.
- Exception path: privacy exceptions are explicit, owned, and time-bounded.
