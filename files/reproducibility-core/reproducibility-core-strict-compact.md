# Reproducibility-Core Rulebook - Strict / Compact

Compact derivative of `reproducibility-core/reproducibility-core-strict-full.md`.
Rule IDs are stable and retain the same meaning.

## Scope

- Tier-1 invariants for deterministic environment/dependency intent,
  reproducible build/test outcomes, and artifact provenance traceability.

Boundary note: Change-Risk owns rollout governance; lower tiers own CI/platform mechanics.

## Core Rules

**REPRO-ENV-001** - Environment intent MUST be explicit and reviewable.

**REPRO-ENV-002** - Dependency resolution intent MUST be deterministic.

**REPRO-EXEC-001** - Build outputs MUST be reproducible from declared inputs.

**REPRO-EXEC-002** - Non-deterministic build factors MUST be explicitly controlled.

**REPRO-EXEC-003** - Repeated test runs under equivalent conditions MUST produce stable pass/fail behavior.

**REPRO-TRACE-001** - Release artifacts MUST have reviewer-visible provenance records.

**REPRO-TRACE-002** - Artifact identity MUST be stable and tamper-evident.

**REPRO-EXCEPT-001** - Temporary reproducibility exceptions MUST be explicit, owned, and time-bounded.

**REPRO-EXCEPT-002** - Exceptions MUST NOT override tier-1 safety/security/contract constraints.

## Review Checklist

- Environment and dependency intent are explicit and deterministic.
- Build outputs are reproducible from equivalent inputs.
- Non-deterministic build factors are controlled or declared.
- Test outcomes are stable under equivalent conditions or flakes are triaged.
- Release artifacts have reviewer-visible provenance and integrity metadata.
- Exceptions are explicit, owned, and time-bounded.
- Exceptions do not override tier-1 safety/security/contract constraints.
