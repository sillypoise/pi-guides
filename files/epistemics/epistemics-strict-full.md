# Epistemics Heuristics - Strict / Full

Version: 0.1 (draft)
Date: February 2026

This guide defines enforceable epistemic heuristics for evidence-backed, uncertainty-aware engineering decisions.

It is domain-heuristics-tier guidance and does not override tier-1 rulebooks.

## Corpus Grounding (2026-02 Initial)

- Source selection freeze: `files/derivations/epistemics-source-selection-2026-02-19.md`
- Derivation worksheet: `files/derivations/epistemics-derivation-2026-02-19.md`
- Source provenance: `files/sources/epistemics/README.md`

Frozen source IDs for this pass: `E001`, `E002`, `E003`, `E004`, `E005`, `E006`, `E012`.

---

## Scope

- In scope:
  - Reasoning-quality heuristics for claims, evidence, confidence, assumptions, and uncertainty.
  - Review-visible epistemic controls across planning, implementation, incidents, and rollout decisions.
- Out of scope:
  - Sentence-level writing style and rhetoric mechanics.
  - Documentation mode architecture and page-type structure.
  - Contract semantics, security policy controls, and rollout governance ownership.

---

## Keywords (RFC 2119)

- MUST / SHALL: absolute requirement.
- MUST NOT / SHALL NOT: absolute prohibition.
- SHOULD: strong recommendation; deviations require explicit rationale.

## Definitions

- Claim: a statement used to justify design, implementation, or release decisions.
- Evidence: reviewer-visible support for a claim (for example, tests, measurements, traces,
  incidents, benchmarks, analysis artifacts).
- Confidence label: explicit confidence statement attached to a claim or decision.
- Unknown: unresolved variable that can materially change expected outcomes.
- Significant decision: a decision with plausible impact on safety, security, correctness,
  compatibility, reliability, or broad user outcomes.

---

## Claim and Evidence Quality (CLAIM)

### EPI-CLAIM-001 - Material claims MUST be backed by reviewer-visible evidence.

Claims that influence architecture, risk, or release decisions MUST reference supporting evidence.

Rationale: unsupported claims create hidden risk and low-quality decisions.

### EPI-CLAIM-002 - Claims MUST distinguish observed facts from inferred conclusions.

Observed facts, interpretations, and hypotheses MUST be explicitly separated.

Rationale: fact/inference conflation increases misdiagnosis and rework.

### EPI-CLAIM-003 - Counter-evidence MUST be acknowledged for contested decisions.

When relevant contradictory evidence exists, decision records MUST note it and explain disposition.

Rationale: ignoring disconfirming evidence amplifies confirmation bias.

---

## Confidence and Uncertainty Calibration (CONF)

### EPI-CONF-001 - Decision-significant claims MUST include explicit confidence labels.

Confidence statements MUST be tied to available evidence quality and known unknowns.

Rationale: unlabeled certainty makes risk posture opaque.

### EPI-CONF-002 - High-confidence claims MUST NOT rely on weak or proxy-only evidence.

High confidence without strong support MUST be downgraded or supported with better evidence.

Rationale: overconfidence from weak evidence is a common incident precursor.

### EPI-CONF-003 - Unknowns with material impact MUST be tracked explicitly.

Unknowns that can change release, security, correctness, or reliability outcomes MUST be listed with
owner and next check point.

Rationale: hidden uncertainty undermines safe execution.

---

## Assumptions and Alternatives (ASSUMP)

### EPI-ASSUMP-001 - Decision-critical assumptions MUST be explicit and testable.

Assumptions MUST include validation method and invalidation signals where feasible.

Rationale: untested assumptions silently convert into systemic fragility.

### EPI-ASSUMP-002 - Significant decisions MUST consider at least one plausible alternative.

Alternatives MAY be brief but MUST show why the selected option is preferred under current evidence.

Rationale: single-option framing narrows reasoning quality and hides tradeoffs.

### EPI-ASSUMP-003 - Assumption invalidation MUST trigger re-evaluation.

When key assumptions fail, affected decisions MUST be revisited with updated evidence.

Rationale: stale assumptions propagate avoidable defects and incidents.

---

## Decision Traceability and Re-evaluation (TRACE)

### EPI-TRACE-001 - Decision records MUST include rationale and evidence references.

Records MUST make it possible for reviewers to reconstruct why a decision was made.

Rationale: untraceable decisions reduce accountability and learning.

### EPI-TRACE-002 - High-uncertainty decisions MUST define re-check triggers.

Re-check triggers MUST include concrete signals, thresholds, or dates for review.

Rationale: no revisit trigger leaves risky assumptions unchallenged.

### EPI-TRACE-003 - Post-outcome review MUST compare expectations with actual results.

For significant changes, teams MUST capture outcome deltas and confidence calibration lessons.

Rationale: calibration improves only when predictions are checked against outcomes.

---

## Exceptions and Epistemic Debt (EXCEPT)

### EPI-EXCEPT-001 - Temporary epistemic exceptions MUST be explicit, owned, and time-bounded.

Any exception (for example, acting under high uncertainty with limited evidence) MUST include
rationale, owner, and review/expiry conditions.

Rationale: undocumented epistemic debt accumulates hidden decision risk.

### EPI-EXCEPT-002 - Exceptions MUST NOT override tier-1 safety or security constraints.

Epistemic uncertainty MUST NOT be used to bypass tier-1 requirements.

Rationale: uncertainty management cannot justify violating hard safety baselines.

---

## Boundary Rules

- TigerStyle owns coding correctness/safety and language-level rulebooks.
- Security-Core owns security-policy and fail-safe security controls.
- Contract-Core owns boundary contract and compatibility semantics.
- Change-Risk owns rollout governance and migration-risk controls.
- Writing owns prose quality and style mechanics.
- Diataxis owns documentation mode architecture.
- Epistemics owns claim/evidence/confidence/assumption quality constraints.

When guidance conflicts:

1. Tier-1 rulebooks (`tigerstyle`, `security-core`, `contract-core`, language rulebooks)
2. Domain heuristics (`uistyle`, `diataxis`, `writing`, `observability`, `change-risk`, `epistemics`, others)
3. Implementation playbooks
4. Framework/library guides

---

## Review Checklist (Required)

For meaningful reasoning-significant changes, verify:

- Claim path: material claims reference reviewer-visible evidence.
- Claim path: facts, inferences, and hypotheses are explicitly separated.
- Claim path: contested claims include counter-evidence acknowledgment and disposition.
- Confidence path: decision-significant claims have explicit confidence labels.
- Confidence path: high-confidence claims are not supported only by weak/proxy evidence.
- Assumption path: decision-critical assumptions are explicit and have validation/invalidation intent.
- Alternative path: at least one plausible alternative is considered for significant decisions.
- Unknowns path: material unknowns are explicit with owner and next check point.
- Traceability path: rationale and evidence references are sufficient to reconstruct decisions.
- Re-check path: high-uncertainty decisions include revisit triggers.
- Exception path: temporary epistemic exceptions are explicit, owned, and time-bounded.
