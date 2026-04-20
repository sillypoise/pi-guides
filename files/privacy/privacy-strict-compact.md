# Privacy Heuristics - Strict / Compact

Compact derivative of `privacy/privacy-strict-full.md`.
Rule IDs are stable and retain the same meaning.

## Scope

- Cross-stack privacy heuristics for minimization, retention/deletion,
  access/disclosure boundaries, and consent-state integrity.

Boundary note: Security-Core owns cryptographic/secret controls; Observability owns signal
semantics; Change-Risk owns rollout governance; tier-1 rulebooks remain non-overridable.

## Core Rules

**PRIV-MIN-001** - Privacy-critical paths MUST collect only data needed for explicit purpose.

**PRIV-MIN-002** - New personal-data fields MUST include explicit purpose and owner.

**PRIV-RET-001** - Personal-data classes MUST have explicit retention boundaries.

**PRIV-RET-002** - Deletion and expiry behavior MUST be testable and auditable.

**PRIV-ACC-001** - Access to personal data MUST be least-privilege and purpose-scoped.

**PRIV-TEL-001** - Logs and telemetry MUST avoid raw personal data unless explicitly required.

**PRIV-USR-001** - User privacy controls MUST have predictable, default-safe behavior.

**PRIV-USR-003** - Consent-state failures MUST be observable and explicitly dispositioned.

**PRIV-RET-003** - Privacy exceptions to retention/deletion defaults MUST be explicit, owned, and time-bounded.

## Review Checklist

- New or changed personal-data fields have explicit purpose and owner.
- Retention trigger and disposal behavior are explicit for personal-data classes.
- Deletion/expiry behavior is testable and reviewer-visible.
- Access and sharing are least-privilege and purpose-scoped.
- Logs/telemetry avoid raw personal data by default.
- Unknown consent state fails closed for non-essential processing.
- Privacy exceptions are explicit, owned, and time-bounded.
