# Security-Core Rulebook - Strict / Full

Version: 0.1 (draft)
Date: February 2026

This rulebook defines enforceable security invariants for software and system delivery.

It is tier-1 rulebook guidance and complements TigerStyle base/language rulebooks.

## Corpus Grounding (2026-02 Initial)

- Source selection freeze: `files/derivations/security-core-source-selection-2026-02-18.md`
- Derivation worksheet: `files/derivations/security-core-derivation-2026-02-18.md`
- Source provenance: `files/sources/security-core/README.md`

Frozen source IDs for this pass: `S001`, `S002`, `S003`, `S004`, `S006`, `S005`, `S014`.

---

## Scope

- In scope:
  - Security-specific invariants for trust boundaries, authentication/authorization, secret handling,
    cryptographic trust, fail-safe behavior, and security-relevant auditability.
  - Review-enforceable constraints that apply across stacks and frameworks.
- Out of scope:
  - Framework/library/cloud-specific implementation procedures.
  - Scanner/tool setup details and CI wiring.
  - Compliance program operations that cannot be verified in normal code/doc review.

---

## Keywords (RFC 2119)

- MUST / SHALL: absolute requirement.
- MUST NOT / SHALL NOT: absolute prohibition.
- SHOULD: strong recommendation; deviations require explicit rationale.

---

## Trust Boundaries (BOUND)

### SECCORE-BOUND-001 - All untrusted inputs MUST be validated at the first trust boundary.

Validation MUST occur before input influences authorization decisions, query construction,
filesystem access, command execution, or outbound network requests.

Rationale: delayed validation enables cross-boundary taint propagation and exploit chaining.

### SECCORE-BOUND-002 - Trust transitions MUST be explicit in code and architecture.

Components crossing trust boundaries MUST define accepted input shapes and rejection behavior.

Rationale: implicit trust assumptions create hidden attack surfaces.

### SECCORE-BOUND-003 - Security controls MUST fail closed at trust boundaries.

If policy checks cannot be evaluated, access MUST be denied by default.

Rationale: fail-open behavior turns operational faults into security bypasses.

### SECCORE-BOUND-004 - Sensitive operations MUST NOT rely on client-provided authority claims.

Privilege and identity claims from clients MUST be verified server-side before use.

Rationale: client-controlled authority is attacker-controlled authority.

---

## Authentication and Authorization (AUTH)

### SECCORE-AUTH-001 - Every privileged operation MUST have explicit authorization checks.

Authorization checks MUST use authoritative server-side context and least-privilege policy.

Rationale: missing checks are direct privilege escalation paths.

### SECCORE-AUTH-002 - Authorization MUST be resource-scoped and action-scoped.

Checks MUST validate both operation type and resource scope; global allow defaults MUST NOT be used
for scoped resources.

Rationale: coarse grants create horizontal and vertical access violations.

### SECCORE-AUTH-003 - Session and token trust MUST be bounded by validation and expiry controls.

Token/session material MUST be validated for integrity, audience, and expiry before privileged use.

Rationale: stale or malformed credentials are common bypass vectors.

### SECCORE-AUTH-004 - Privilege elevation paths MUST require explicit re-authorization.

Operations that increase privilege or expand access scope MUST re-check authorization at the point of elevation.

Rationale: step-up boundaries are common bypass points when checks are only performed at session start.

---

## Secrets and Sensitive Data (SECR)

### SECCORE-SECR-001 - Secrets MUST NOT be stored or transmitted in plaintext in uncontrolled channels.

Secrets include credentials, private keys, signing material, and equivalent high-sensitivity tokens.

Rationale: plaintext exposure creates durable compromise risk.

### SECCORE-SECR-002 - Secret material MUST be excluded from logs, traces, metrics labels, and error payloads.

Redaction MUST occur before serialization to observability sinks.

Rationale: telemetry systems frequently replicate and retain leaked data.

### SECCORE-SECR-003 - Secret access MUST be scoped to minimum required runtime surface.

Components MUST NOT receive secret access unless required for their explicit role.

Rationale: minimizing secret blast radius limits incident severity.

### SECCORE-SECR-004 - Sensitive data exposure MUST be minimized by default.

Systems MUST only expose the minimum sensitive fields required for the current operation.

Rationale: reducing exposed sensitive surface lowers compromise impact and abuse opportunity.

### SECCORE-SECR-005 - Sensitive data at rest and in transit MUST have confidentiality and integrity protection.

Protection mechanisms MUST be explicit and appropriate to data sensitivity and threat context.

Rationale: unprotected storage or transport channels convert partial compromise into full data disclosure.

---

## Cryptography and Key Trust (CRYPTO)

### SECCORE-CRYPTO-001 - Security-critical cryptography MUST use vetted libraries and approved primitives.

Custom cryptographic algorithms or ad hoc cryptographic constructions MUST NOT be used for security controls.

Approved primitives MUST come from an explicit project/platform security baseline or equivalent documented standard.

Rationale: bespoke cryptography is a high-frequency source of catastrophic security failures.

### SECCORE-CRYPTO-002 - Security tokens and integrity-sensitive state MUST be cryptographically protected.

Integrity and authenticity checks MUST be applied before trust decisions based on tokens, signatures, or equivalent artifacts.

Rationale: unsigned or weakly protected trust artifacts enable forgery and tampering.

### SECCORE-CRYPTO-003 - Key lifecycle controls MUST be explicit.

Key generation, storage protection, rotation/renewal, and revocation/expiry behavior MUST be defined and enforceable.

Rationale: strong primitives fail when key lifecycle controls are undefined.

---

## Failure and Default Behavior (FAIL)

### SECCORE-FAIL-001 - Security-relevant failures MUST default to deny and alertable error paths.

Denied outcomes MUST be explicit and traceable without leaking sensitive internals.

Rationale: silent or permissive failure paths hide active compromise conditions.

### SECCORE-FAIL-002 - Error responses MUST NOT reveal exploit-enabling internal detail.

External responses MUST be minimal; sensitive internals MAY be retained only in protected telemetry.

Rationale: verbose errors increase attacker capability during probing.

### SECCORE-FAIL-003 - Recovery paths MUST preserve security posture.

Retries, fallbacks, and degradation modes MUST NOT bypass policy checks or downgrade protections.

Rationale: emergency paths are frequent sites of latent bypass logic.

### SECCORE-FAIL-004 - Diagnostic and administrative bypass paths MUST be disabled by default.

Debug-only or emergency bypass mechanisms MUST be explicitly gated and MUST NOT be active by default in production behavior.

Rationale: latent bypass switches are commonly abused as permanent backdoors.

---

## Dependency and Supply Chain Baseline (SUPPLY)

### SECCORE-SUPPLY-001 - Third-party dependencies MUST have integrity and provenance controls.

Dependencies MUST be resolved through trusted channels with verifiable origin and version intent.

Rationale: dependency trust is transitive system trust.

### SECCORE-SUPPLY-002 - Unmaintained or high-risk dependencies MUST trigger explicit risk decisions.

Risk decisions MUST reference an owner and mitigation or replacement path.

Rationale: unmanaged dependency risk accumulates into latent compromise.

### SECCORE-SUPPLY-003 - Dynamic code execution from untrusted sources MUST NOT be permitted by default.

Any required exception MUST include strict sandboxing and explicit policy approval.

Rationale: runtime code execution is a high-impact compromise primitive.

---

## Security Configuration Integrity (CONFIG)

### SECCORE-CONFIG-001 - Security-relevant configuration MUST be explicit, versioned, and reviewable.

Security-impacting defaults and overrides MUST be represented in reviewable artifacts.

Rationale: hidden or implicit security configuration changes create undetected exposure.

### SECCORE-CONFIG-002 - Insecure overrides MUST be explicitly scoped and temporary.

Any temporary reduction of security controls MUST be environment-scoped and governed by SECCORE-EXCEPT-001.

Rationale: uncontrolled overrides frequently become permanent attack surface.

---

## Security Exceptions and Release Disposition (EXCEPT)

### SECCORE-EXCEPT-001 - Security exceptions MUST be explicit, time-bounded, and owned.

Any exception to a security rule MUST include rationale, owner, expiry/review date, and compensating controls.

Rationale: undocumented or perpetual exceptions silently normalize risk.

### SECCORE-EXCEPT-002 - Known exploitable findings in changed scope MUST have explicit release disposition.

Before release, known exploitable findings affecting changed components MUST be fixed, mitigated, or explicitly accepted via SECCORE-EXCEPT-001.

Rationale: unresolved exploitable findings without disposition create predictable incident paths.

---

## Auditability and Detection (DETECT)

### SECCORE-DETECT-001 - Security-relevant decisions MUST emit auditable events.

Events SHOULD cover authentication outcomes, authorization denials, policy failures,
privileged action attempts, and key security configuration changes.

Rationale: without security event visibility, detection and forensics degrade.

### SECCORE-DETECT-002 - Security telemetry MUST preserve actor, action, and target context.

Records MUST be specific enough to reconstruct decision paths during incident analysis.

Rationale: incomplete context impedes breach triage and containment.

### SECCORE-DETECT-003 - Monitoring pipelines MUST treat missing security telemetry as a defect.

If required security events are absent, telemetry integrity failure MUST be triaged as security-significant.

Rationale: blind spots in telemetry can mask active exploit activity.

---

## Boundary Rules

- TigerStyle owns general coding safety and clarity constraints.
- Security-Core owns security-specific invariants and failure behavior.
- Privacy-family guidance (when active) owns retention/minimization policy details.
- Lower-tier playbooks/framework guides own concrete control implementation mechanics.

Clarifier:

- TigerStyle crash-on-corruption assertions apply to internal invariant violations.
- Security-Core deny-by-default rules apply to untrusted inputs, authorization uncertainty, and policy-evaluation failures.

When guidance conflicts:

1. Tier-1 rulebooks (`tigerstyle`, `security-core`, language rulebooks)
2. Domain heuristics
3. Implementation playbooks
4. Framework/library guides

---

## Review Checklist (Required)

For meaningful security-relevant changes, verify:

- Error path: policy failures deny by default and do not fail open.
- Error path: external errors do not leak exploit-enabling internals.
- Boundary path: trust transitions are explicit and validated at entry.
- Boundary path: privileged operations have explicit, scoped authorization checks.
- Data path: secrets are absent from logs/traces/error payloads.
- Data path: sensitive data in transit and at rest has explicit confidentiality/integrity protection.
- Crypto path: security-critical cryptography uses vetted primitives/libraries and explicit key lifecycle controls.
- Config path: security-relevant defaults/overrides are explicit, reviewable, and not permanently weakened.
- Exception path: unresolved exploitable findings have explicit release disposition and time-bounded ownership.
- Supply path: dependency and dynamic-execution risks are explicitly constrained.
