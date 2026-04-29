# Creative Constraints Heuristics - Strict / Full

Version: 0.1 (draft)
Date: February 2026

This guide defines enforceable heuristics for using intentional constraints to
improve originality, clarity, and problem-solving quality.

It is domain-heuristics-tier guidance and does not override tier-1 rulebooks.

## Corpus Grounding (2026-02 Initial)

- Source selection freeze: `files/derivations/creative-constraints-source-selection-2026-02-24.md`
- Derivation worksheet: `files/derivations/creative-constraints-derivation-2026-02-24.md`
- Source provenance: `files/sources/creative-constraints/README.md`

Frozen source IDs for this pass: `CC001`, `CC002`, `CC003`, `CC004`, `CC005`, `CC006`, `CC010`.

---

## Scope

- In scope:
  - explicit constraint design to widen option-space quality and reduce generic defaults.
  - bounded rule sets that force novel combinations without sacrificing usability.
  - reviewer-enforceable checks for constraint rationale, fitness, and exit criteria.
- Out of scope:
  - replacing safety or compatibility constraints from tier-1 rulebooks.
  - rollout governance mechanics (`change-risk` ownership).
  - novelty-allocation ceilings and quota policy (`novelty-budgeting` ownership).
  - visual style specifics (`uistyle` ownership) and sentence-level writing mechanics (`writing` ownership).

## Non-goals

- Arbitrary constraints with no user/system value mechanism.
- Constraint theater where difficulty is confused with quality.
- Permanent constraint lock-in after the intended exploration window ends.

---

## Keywords (RFC 2119)

- MUST / SHALL: absolute requirement.
- MUST NOT / SHALL NOT: absolute prohibition.
- SHOULD: strong recommendation; deviations require explicit rationale.

## Definitions

- Creative constraint: deliberate boundary on format, process, or resources used to provoke non-default solutions.
- Constraint set: small set of active constraints applied to a single exploration cycle.
- Constraint fitness: evidence that a constraint improves outcome quality versus baseline.

---

## Constraint Design and Selection (DES)

### CCON-DES-001 - Constraint-driven work MUST declare baseline and constrained variants.

Constraint proposals without baseline comparison SHOULD be rejected.

### CCON-DES-002 - Each constraint MUST state intended quality effect and failure risk.

If intended effect is unspecified, the constraint SHOULD be treated as under-defined.

### CCON-DES-003 - Constraint sets for one cycle MUST remain small and reviewer-comprehensible.

Overloaded constraint stacks SHOULD be split to keep causality traceable.

### CCON-DES-004 - Constraint artifacts MUST separate constraint mechanics from rollout controls.

Constraint design records SHOULD avoid embedding deployment progression policy.

---

## Execution and Guardrails (EXEC)

### CCON-EXEC-001 - Constraint experiments MUST preserve tier-1 safety and contract obligations.

Constraints MUST NOT justify violating security, integrity, or compatibility requirements.

### CCON-EXEC-002 - Constraint conflicts with user comprehension MUST trigger scope reduction.

If constraints materially reduce clarity or operability, the set SHOULD be simplified.

### CCON-EXEC-003 - High-impact constrained proposals MUST include fallback path.

Fallback path SHOULD identify trigger conditions and baseline reversion behavior.

---

## Evaluation and Adaptation (EVAL)

### CCON-EVAL-001 - Constraint outcomes MUST be evaluated against pre-declared success signals.

Post-hoc success definitions SHOULD be rejected.

### CCON-EVAL-002 - Constraints that repeatedly underperform baseline MUST be retired or redesigned.

Repeatedly ineffective constraints SHOULD NOT persist by habit.

### CCON-EVAL-003 - Constraint cycles MUST declare explicit exit or continuation criteria.

Open-ended experimentation SHOULD be avoided for high-risk or time-bounded work.

### CCON-EVAL-004 - Constraint-fitness conclusions MUST distinguish method effect from rollout or measurement noise.

If outcome effects are confounded, teams SHOULD record uncertainty and avoid overclaiming constraint quality.

---

## Learning and Reuse Discipline (LEARN)

### CCON-LEARN-001 - Successful constraint patterns SHOULD be captured as reusable prompts.

Reusable records SHOULD include context, effect, and known limits.

### CCON-LEARN-002 - Failed constraint patterns MUST record anti-pattern rationale.

Failure notes SHOULD identify why the constraint reduced quality.

### CCON-LEARN-003 - Repeated generic-output relapse MUST trigger constraint-method rotation.

Teams SHOULD apply a different constraint family when prior patterns no longer differentiate outcomes.

---

## Boundary Rules

- Tier-1 rulebooks own non-negotiable safety, integrity, and compatibility constraints.
- Counter-Intuition-and-Left-Turn-Thinking owns broad non-obvious option generation and inversion checks.
- Novelty-Budgeting owns novelty allocation ceilings and risk-based novelty distribution.
- Change-Risk owns rollout progression and release governance.
- UIStyle and Writing own domain expression constraints.
- Creative Constraints owns intentional constraint design, fitness checks, and constraint lifecycle rules.

When guidance conflicts:

1. Tier-1 rulebooks (`tigerstyle`, `security-core`, `contract-core`, `robustness-core`, `reproducibility-core`, language rulebooks)
2. Domain heuristics (`uistyle`, `diataxis`, `writing`, `observability`, `change-risk`, `epistemics`, `performance`, `privacy`, `anki-authoring`, `operability`, `maintainability`, `legacy-evolution-mode`, `incremental-refactoring-strategy`, `compatibility-evolution`, `counter-intuition-and-left-turn-thinking`, `creative-constraints`, `novelty-budgeting`, others)
3. Implementation playbooks
4. Framework/library guides

## Conflict Map

- `counter-intuition-and-left-turn-thinking`: owns broader contrarian option generation; this family
  specifies how deliberate constraints are designed and evaluated.
- `novelty-budgeting`: owns novelty allocation ceilings; this family focuses on constraint mechanics
  rather than novelty quota policy.
- `change-risk`: owns rollout progression; this family governs pre-rollout ideation/exploration design.
- `uistyle` and `writing`: own domain expression quality rules.
- `epistemics`: owns confidence/evidence semantics for claims made about constraint outcomes.
- Tier-1 rulebooks remain non-overridable.

---

## Review Checklist (Required)

- Design path: baseline and constrained variants are both present.
- Intent path: each active constraint has declared quality effect and risk.
- Load path: constraint set size is small enough to keep causality reviewable.
- Scope path: constraint mechanics are separated from rollout progression controls.
- Safety path: constraints do not violate tier-1 obligations.
- Comprehension path: clarity degradation triggers scope reduction.
- Fallback path: high-impact constrained proposals have explicit fallback.
- Evaluation path: pre-declared success signals are used for outcome judgment.
- Evaluation path: method effect is distinguished from rollout/measurement confounders.
- Exit path: continuation/retirement criteria are explicit.
- Learning path: reusable wins and anti-pattern failures are recorded.
