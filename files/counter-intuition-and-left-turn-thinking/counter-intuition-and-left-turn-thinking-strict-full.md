# Counter-Intuition and Left-Turn Thinking Heuristics - Strict / Full

Version: 0.1 (draft)
Date: February 2026

This guide defines enforceable heuristics for generating non-obvious options
while preserving safety, coherence, and user value.

It is domain-heuristics-tier guidance and does not override tier-1 rulebooks.

## Corpus Grounding (2026-02 Initial)

- Source selection freeze: `files/derivations/counter-intuition-and-left-turn-thinking-source-selection-2026-02-24.md`
- Derivation worksheet: `files/derivations/counter-intuition-and-left-turn-thinking-derivation-2026-02-24.md`
- Source provenance: `files/sources/counter-intuition-and-left-turn-thinking/README.md`

Frozen source IDs for this pass: `LT001`, `LT002`, `LT003`, `LT004`, `LT005`, `LT006`, `LT010`.

---

## Scope

- In scope:
  - deliberate generation and evaluation of non-default options.
  - inversion checks, contrarian hypothesis framing, and bounded novelty selection.
  - reviewer-enforceable guardrails for coherence, fallback readiness, and value clarity.
- Out of scope:
  - replacing baseline safety/reliability/contract constraints from tier-1 rulebooks.
  - rollout governance mechanics (`change-risk` ownership).
  - sentence-level prose style guidance (`writing` ownership).

## Non-goals

- Rewarding novelty for its own sake.
- Forcing contrarian options when the baseline is already clearly superior.
- Using this family to bypass accessibility, security, reliability, or compatibility obligations.

---

## Keywords (RFC 2119)

- MUST / SHALL: absolute requirement.
- MUST NOT / SHALL NOT: absolute prohibition.
- SHOULD: strong recommendation; deviations require explicit rationale.

## Definitions

- Left-turn option: non-obvious candidate that departs from conventional default patterns.
- Baseline option: conventional candidate used as comparison control.
- Novelty budget: explicit cap on how much of a solution can be unconventional at once.
- Coherence check: review test that confirms surprising choices still preserve user comprehension and system integrity.

---

## Option Generation and Inversion Discipline (OPT)

### LTURN-OPT-001 - Decision artifacts MUST include both baseline and left-turn options.

Evaluating only conventional or only contrarian options MUST be rejected.

### LTURN-OPT-002 - Left-turn options MUST state non-novelty value mechanism.

A left-turn proposal MUST explain expected user/system benefit beyond "different".

### LTURN-OPT-003 - High-impact decisions MUST include at least one inversion check.

Review SHOULD confirm that "what if we do the opposite" analysis was performed where risk or upside is material.

---

## Evidence and Decision Integrity (EVD)

### LTURN-EVD-001 - Contrarian claims MUST declare assumptions and disconfirming signals.

If assumptions fail and no disconfirming signal is defined, the proposal SHOULD be treated as under-specified.

### LTURN-EVD-002 - Confidence level for left-turn recommendations MUST be explicit.

Confidence labeling SHOULD align with `epistemics` confidence/evidence discipline.

### LTURN-EVD-003 - Irreversible left-turn moves without sufficient evidence MUST be staged through reversible probes first.

High-commitment novelty SHOULD be gated behind small-scope validation before broad adoption.

### LTURN-EVD-004 - Rejection criteria for left-turn options MUST be explicit before execution.

Stop conditions SHOULD define what evidence invalidates the contrarian hypothesis.

---

## Coherence and Safety Guardrails (SAFE)

### LTURN-SAFE-001 - Left-turn choices MUST NOT violate higher-tier safety, security, or contract requirements.

Novelty MUST defer to tier-1 rulebooks when constraints conflict.

### LTURN-SAFE-002 - Left-turn implementations MUST include explicit fallback path.

Fallback path SHOULD identify rollback trigger and safe baseline behavior.

### LTURN-SAFE-003 - Novelty budget for critical paths MUST be bounded.

Multi-surface novelty in high-risk contexts SHOULD be split into smaller, reviewable increments.

---

## Learning Loop and Drift Prevention (LEARN)

### LTURN-LEARN-001 - Left-turn experiments MUST record baseline comparison outcome.

Outcome artifacts SHOULD capture why the non-obvious option won or lost versus baseline.

### LTURN-LEARN-002 - Failed contrarian attempts MUST produce reusable anti-pattern notes.

Repeated failure motifs SHOULD be tracked to prevent novelty churn.

### LTURN-LEARN-003 - Recurrent generic-output relapse MUST trigger alternative ideation method.

When outputs repeatedly collapse to templates, teams SHOULD apply a new divergence constraint before next iteration.

---

## Boundary Rules

- Tier-1 rulebooks own non-negotiable safety, integrity, and contract invariants.
- Change-Risk owns rollout progression and release governance.
- Epistemics owns confidence/evidence semantics.
- UIStyle and Writing own domain-specific expression constraints.
- Counter-Intuition and Left-Turn Thinking owns structured non-obvious option generation,
  inversion discipline, and bounded novelty selection.

When guidance conflicts:

1. Tier-1 rulebooks (`tigerstyle`, `security-core`, `contract-core`, `robustness-core`, `reproducibility-core`, language rulebooks)
2. Domain heuristics (`uistyle`, `diataxis`, `writing`, `observability`, `change-risk`, `epistemics`, `performance`, `privacy`, `anki-authoring`, `operability`, `maintainability`, `legacy-evolution-mode`, `incremental-refactoring-strategy`, `compatibility-evolution`, `counter-intuition-and-left-turn-thinking`, others)
3. Implementation playbooks
4. Framework/library guides

## Conflict Map

- `epistemics`: owns confidence semantics and evidence-quality language; this guide uses those semantics
  but does not redefine them.
- `change-risk`: owns rollout progression and blast-radius governance; this guide constrains ideation and
  option selection prior to rollout decisions.
- `uistyle` and `writing`: own expression mechanics and communication quality in their domains; this
  guide constrains option-generation discipline across domains.
- Tier-1 rulebooks (`security-core`, `contract-core`, `robustness-core`, `reproducibility-core`):
  all novelty remains subordinate to these non-negotiable constraints.

---

## Review Checklist (Required)

- Option path: baseline and left-turn options are both present.
- Value path: left-turn option states concrete user/system value mechanism.
- Inversion path: high-impact decisions include inversion check.
- Evidence path: assumptions, disconfirming signals, and confidence labels are explicit.
- Rejection path: left-turn options define stop conditions before execution.
- Safety path: novelty does not violate tier-1 constraints.
- Fallback path: rollback/fallback behavior is explicit for left-turn implementations.
- Budget path: novelty is bounded on critical paths.
- Learning path: outcome comparison and anti-pattern capture are recorded.
- Drift path: repeated generic-output relapse triggers alternative ideation method.
