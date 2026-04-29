# Argument-Structure Playbook - Pragmatic / Full

Version: 0.1 (draft)
Date: February 2026

This playbook provides practical structure defaults for decision, proposal, and problem-analysis documents.

It is implementation-playbook-tier guidance and does not override TigerStyle or domain heuristics.

## Corpus Grounding (2026-02 Split)

- Primary corpus: `corpus/writing/the-pyramid-principle-minto-barbara.md`
- Source provenance: `files/sources/argument-structure/README.md`
- Derivation worksheet: `files/derivations/argument-structure-derivation-2026-02-18.md`
- Taxonomy freeze: `files/derivations/writing-split-taxonomy-2026-02-18.md`

---

## Scope

- In scope:
  - Structuring recommendation, strategy, and analysis documents for fast executive comprehension.
  - SCQA framing, top-down key lines, and grouping/order checks.
  - Review patterns for reasoning defects before publication.
- Out of scope:
  - Sentence-level style enforcement (handled by `writing`).
  - Diataxis mode selection and page intent architecture.
  - Universal application to all docs regardless of purpose.

---

## Applicability Gate

Apply this playbook when all are true:

- document seeks a decision, approval, or alignment,
- argument depends on grouped evidence and explicit recommendation,
- readers need quick comprehension of top-line conclusion.

Do not force this playbook on exploratory explanation pages, short references, or tutorial flows.

---

## ARG-SCQA: Build the Entry Context

Construct introductions in this sequence:

1. Situation: stable context the reader already accepts.
2. Complication: change, risk, or mismatch that matters now.
3. Question: explicit decision/problem question created by complication.
4. Answer: top-line recommendation or thesis.

Guidance:

- Keep Situation brief and concrete.
- State one primary Complication per introduction.
- Write Question as a decision question, not a topic label.
- Place Answer immediately after Question to set reading frame.

Failure checks:

- Error path: introduction lists topics but never surfaces a real question.
- Error path: recommendation appears late, forcing reader inference.

---

## ARG-PYR: Build Top-Down Pyramid

Start with one key line claim, then support it with grouped points.

Top-down sequence:

1. Key line claim (what should happen / what is true).
2. Primary support groups (why this claim holds).
3. Evidence detail under each group (facts, examples, data).

Quality checks for each level:

- Parent statement summarizes children.
- Sibling points are same-kind statements.
- Reader can ask a natural question that children answer directly.

Failure checks:

- Boundary path: siblings mix reasons, actions, and observations in one group.
- Boundary path: child points do not actually defend the parent claim.

---

## ARG-ORDER: Enforce Horizontal Logic

Within each sibling group, use one order type only:

- deductive order,
- chronological order,
- structural order,
- priority (degree) order.

Guidance:

- Deductive order for formal argument chains.
- Chronological order for process or timeline causality.
- Structural order for system/components.
- Priority order for ranked options/reasons.

Failure checks:

- Error path: order type shifts mid-group without explicit reason.
- Error path: high-priority point is buried below low-impact details.

---

## ARG-ISSUE: Problem Decomposition and Recommendation Flow

For complex problems, separate analysis from recommendation drafting.

Recommended flow:

1. Define problem boundaries and desired result.
2. Decompose into issue branches (non-overlapping where possible).
3. Evaluate branches against explicit criteria.
4. Synthesize recommendation from branch outcomes.
5. State next actions, owners, and decision implications.

Guidance:

- Record assumptions at branch level.
- Keep criteria stable across option comparison.
- Convert analysis outputs into one explicit recommendation line.

Failure checks:

- Error path: recommendation appears without traceable branch evidence.
- Boundary path: criteria change mid-analysis to fit preferred outcome.

---

## Practical Templates

### Template A: Decision Memo (Short)

- SCQA intro (4-8 lines)
- Recommendation sentence
- Three supporting reasons (same-kind)
- Risks and mitigations
- Next actions and owners

### Template B: Problem Analysis (Long)

- SCQA intro
- Problem definition and boundaries
- Issue tree or decomposition map
- Findings by branch
- Recommendation and alternatives considered
- Implementation path and review checkpoints

---

## Boundary Rules

- Diataxis still determines page mode and user-need fit.
- Writing guide still governs prose clarity and revision quality.
- This playbook governs reasoning layout for decision-oriented artifacts.

When guidance conflicts:

1. TigerStyle base/language rulebooks
2. Domain heuristics (`diataxis`, `writing`)
3. This playbook

---

## Review Checklist (Required)

For meaningful decision/proposal documents, verify:

- Error path: the introduction includes a real Question and explicit Answer.
- Error path: each recommendation claim has traceable supporting groups.
- Boundary path: sibling points are same-kind and follow one order type.
- Boundary path: this structure is used only where document purpose warrants it.
- Risk path: tradeoffs, assumptions, and limitations are explicit.
- Action path: next actions include ownership and decision implications.

---

## References

- `corpus/writing/the-pyramid-principle-minto-barbara.md`
