# Security-Core Rulebook - Strict / Compact

Compact derivative of `security-core/security-core-strict-full.md`.
Rule IDs are stable and retain the same meaning.

## Scope

- Security-specific, review-enforceable invariants for boundary trust, auth, secrets,
  failure behavior, supply-chain baseline, and security telemetry.
- Stack-agnostic and tier-1 rulebook oriented.

## Trust Boundaries

**SECCORE-BOUND-001** - All untrusted inputs MUST be validated at the first trust boundary.

**SECCORE-BOUND-003** - Security controls MUST fail closed at trust boundaries.

**SECCORE-BOUND-004** - Sensitive operations MUST NOT rely on client-provided authority claims.

## Authentication and Authorization

**SECCORE-AUTH-001** - Every privileged operation MUST have explicit authorization checks.

**SECCORE-AUTH-002** - Authorization MUST be resource-scoped and action-scoped.

**SECCORE-AUTH-003** - Session and token trust MUST be bounded by validation and expiry controls.

**SECCORE-AUTH-004** - Privilege elevation paths MUST require explicit re-authorization.

## Secrets and Sensitive Data

**SECCORE-SECR-001** - Secrets MUST NOT be stored or transmitted in plaintext in uncontrolled channels.

**SECCORE-SECR-002** - Secret material MUST be excluded from logs, traces, metrics labels, and error payloads.

**SECCORE-SECR-003** - Secret access MUST be scoped to minimum required runtime surface.

**SECCORE-SECR-004** - Sensitive data exposure MUST be minimized by default.

**SECCORE-SECR-005** - Sensitive data at rest and in transit MUST have confidentiality and integrity protection.

## Cryptography and Key Trust

**SECCORE-CRYPTO-001** - Security-critical cryptography MUST use vetted libraries and approved primitives.

**SECCORE-CRYPTO-002** - Security tokens and integrity-sensitive state MUST be cryptographically protected.

**SECCORE-CRYPTO-003** - Key lifecycle controls MUST be explicit.

## Failure Behavior

**SECCORE-FAIL-001** - Security-relevant failures MUST default to deny and alertable error paths.

**SECCORE-FAIL-002** - Error responses MUST NOT reveal exploit-enabling internal detail.

**SECCORE-FAIL-003** - Recovery paths MUST preserve security posture.

**SECCORE-FAIL-004** - Diagnostic and administrative bypass paths MUST be disabled by default.

## Supply and Detection

**SECCORE-SUPPLY-001** - Third-party dependencies MUST have integrity and provenance controls.

**SECCORE-SUPPLY-003** - Dynamic code execution from untrusted sources MUST NOT be permitted by default.

## Security Configuration Integrity

**SECCORE-CONFIG-001** - Security-relevant configuration MUST be explicit, versioned, and reviewable.

**SECCORE-CONFIG-002** - Insecure overrides MUST be explicitly scoped and temporary.

**SECCORE-DETECT-001** - Security-relevant decisions MUST emit auditable events.

**SECCORE-DETECT-003** - Monitoring pipelines MUST treat missing security telemetry as a defect.

## Exceptions and Release Disposition

**SECCORE-EXCEPT-001** - Security exceptions MUST be explicit, time-bounded, and owned.

**SECCORE-EXCEPT-002** - Known exploitable findings in changed scope MUST have explicit release disposition.

## Review Checklist

- Security checks fail closed and privileged paths enforce explicit authorization.
- Errors avoid leaking exploit-enabling internals.
- Secrets are absent from telemetry and error payloads.
- Sensitive data in transit/at rest has explicit confidentiality and integrity protection.
- Cryptography and key lifecycle controls are explicit and non-bespoke.
- Security-impacting defaults/overrides are explicit, reviewable, and temporary when reduced.
- Security exceptions and exploitable findings have explicit disposition.
- Dependency and dynamic execution risks are constrained.
- Security-relevant events are emitted with usable context.
