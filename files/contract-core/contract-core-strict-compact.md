# Contract-Core Rulebook - Strict / Compact

Compact derivative of `contract-core/contract-core-strict-full.md`.
Rule IDs are stable and retain the same meaning.

## Scope

- Tier-1 contract invariants for boundary inputs/outputs/errors, compatibility, and schema evolution.
- Stack-agnostic and review-enforceable semantics.

Boundary note: TigerStyle owns naming/style clarity, Security-Core owns security policy controls.

## Contract Definition

**CONTRACT-DECL-001** - Every externally consumed boundary MUST have an explicit contract.

**CONTRACT-DECL-002** - Contract ownership MUST be explicit.

**CONTRACT-DECL-003** - Contract terms MUST separate normative requirements from examples.

**CONTRACT-DECL-004** - Contract artifacts MUST include a minimum required field set.

## Invariants and Failures

**CONTRACT-INV-001** - Preconditions MUST be explicit and validated before state mutation or side effects.

**CONTRACT-INV-003** - Invariants MUST hold across success and failure paths.

**CONTRACT-ERR-001** - Error classes MUST be explicit and stable for callers.

**CONTRACT-ERR-002** - Contract violations MUST return bounded, non-ambiguous failure signals.

## Compatibility and Schema Evolution

**CONTRACT-COMP-001** - Backward compatibility impact MUST be classified for contract changes.

**CONTRACT-COMP-002** - Breaking changes MUST provide an explicit migration path or controlled cutover plan.

**CONTRACT-COMP-003** - Additive changes MUST preserve behavior for existing consumers.

**CONTRACT-SCHEMA-001** - Schema evolution MUST preserve compatibility expectations in both producer and consumer directions.

**CONTRACT-SCHEMA-002** - Removed or repurposed fields MUST have explicit deprecation lifecycle.

## Change Review

**CONTRACT-CHG-001** - Contract-changing pull requests MUST include explicit contract delta documentation.

**CONTRACT-CHG-002** - Boundary and negative-path checks MUST be included for contract changes.

**CONTRACT-CHG-003** - Contract exceptions MUST be explicit, owned, and time-bounded.

## Review Checklist

- Contract delta, ownership, and compatibility classification are explicit.
- Ownership is recorded in a reviewer-visible contract artifact.
- Minimum contract artifact fields are present (owner, input/output/errors,
  compatibility/version signaling, and deprecation or migration expectations).
- Breaking changes include migration or controlled cutover detail.
- Compatibility classification checks enum narrowing, optional-to-required shifts,
  semantic default changes, and field repurposing.
- Error semantics remain stable or are migration-noted.
- Schema evolution includes mixed-version forward/backward compatibility checks.
- Negative-path and incompatible-input checks are present, not only happy paths.
- Temporary exceptions are explicit, owned, and time-bounded.
