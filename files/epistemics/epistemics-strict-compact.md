# Epistemics Heuristics - Strict / Compact

Compact derivative of `epistemics/epistemics-strict-full.md`.
Rule IDs are stable and retain the same meaning.

## Scope

- Reasoning-quality heuristics for claim/evidence quality, confidence calibration,
  assumptions, and uncertainty handling.
- Review-enforceable checks for decision traceability and re-evaluation triggers.

Boundary note: Writing owns prose style, Diataxis owns doc-mode structure,
Contract-Core owns compatibility semantics, and Change-Risk owns rollout governance.

Definition: significant decision means a decision with plausible impact on safety, security,
correctness, compatibility, reliability, or broad user outcomes.

## Claims and Confidence

**EPI-CLAIM-001** - Material claims MUST be backed by reviewer-visible evidence.

**EPI-CLAIM-002** - Claims MUST distinguish observed facts from inferred conclusions.

**EPI-CLAIM-003** - Counter-evidence MUST be acknowledged for contested decisions.

**EPI-CONF-001** - Decision-significant claims MUST include explicit confidence labels.

**EPI-CONF-002** - High-confidence claims MUST NOT rely on weak or proxy-only evidence.

## Assumptions and Decisions

**EPI-ASSUMP-001** - Decision-critical assumptions MUST be explicit and testable.

**EPI-ASSUMP-002** - Significant decisions MUST consider at least one plausible alternative.

**EPI-ASSUMP-003** - Assumption invalidation MUST trigger re-evaluation.

**EPI-TRACE-001** - Decision records MUST include rationale and evidence references.

**EPI-TRACE-002** - High-uncertainty decisions MUST define re-check triggers.

## Exceptions and Boundaries

**EPI-EXCEPT-001** - Temporary epistemic exceptions MUST be explicit, owned, and time-bounded.

**EPI-EXCEPT-002** - Exceptions MUST NOT override tier-1 safety or security constraints.

## Review Checklist

- Material claims cite reviewer-visible evidence.
- Facts, inferences, and hypotheses are clearly separated.
- Contested claims acknowledge counter-evidence and disposition.
- Confidence labels are explicit for decision-significant claims.
- High-confidence claims are supported by strong evidence.
- Decision-critical assumptions are explicit and testable.
- Significant decisions evaluate at least one plausible alternative.
- Material unknowns are explicit with owner and next check point.
- High-uncertainty decisions include revisit triggers.
- Exceptions are explicit, owned, and time-bounded.
