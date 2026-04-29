# Anki Authoring Heuristics - Strict / Full

Version: 0.1 (draft)
Date: February 2026

This guide defines enforceable heuristics for authoring high-quality study cards that
improve active recall, discrimination, and long-term retention.

It is domain-heuristics-tier guidance and does not override tier-1 rulebooks.

## Corpus Grounding (2026-02 Initial)

- Source selection freeze: `files/derivations/anki-authoring-source-selection-2026-02-24.md`
- Derivation worksheet: `files/derivations/anki-authoring-derivation-2026-02-24.md`
- Source provenance: `files/sources/anki-authoring/README.md`

Frozen source IDs for this pass: `AK001`, `AK002`, `AK003`, `AK004`, `AK005`, `AK006`, `AK010`.

---

## Scope

- In scope:
  - card-authoring heuristics for cloze and short-answer style prompts,
    including retrieval strength, cue quality, context support, and revision discipline.
  - review-enforceable card-quality checks for ambiguity, interference risk, and memorability.
- Out of scope:
  - file/output schema mechanics and ingest pipelines (repo-specific ownership).
  - scheduler parameter tuning and deck-level algorithm configuration.
  - product-specific tag/deck taxonomy governance.

---

## Keywords (RFC 2119)

- MUST / SHALL: absolute requirement.
- MUST NOT / SHALL NOT: absolute prohibition.
- SHOULD: strong recommendation; deviations require explicit rationale.

## Definitions

- Retrieval target: the exact idea the learner must reconstruct from memory.
- Cue burden: amount of answer information leaked by surrounding prompt context.
- Interference pair: two cards whose answers or cues are likely to be confused.

---

## Retrieval Target Design (TARGET)

### ANKI-TARGET-001 - Each card MUST test exactly one retrieval target.

Cards that require multiple independent answers MUST be split or restructured.

### ANKI-TARGET-002 - Retrieval targets MUST be meaningful for future reasoning or decisions.

Cards MUST NOT encode trivia that does not materially support understanding or execution.

### ANKI-TARGET-003 - Prompt wording MUST make answer scope explicit.

Ambiguous scope prompts (for example, unclear time, context, or variant) MUST be rewritten.

### ANKI-TARGET-004 - Prompts MUST be answerable without hidden private context.

Cards that depend on unstated assumptions known only to the author MUST be revised.

---

## Cloze Quality and Cue Control (CLZ)

### ANKI-CLZ-001 - Clozes MUST hide semantically central terms, not incidental wording.

Cloze spans SHOULD target terms that constrain understanding, not stylistic filler.

### ANKI-CLZ-002 - Prompt cues MUST NOT reveal the answer through local redundancy.

High-cue constructions that make recall optional MUST be rewritten.

### ANKI-CLZ-003 - Multi-cloze cards MUST be justified by one coherent mechanism.

If clozes test unrelated facts, the note MUST be split into separate cards.

---

## Context Support and Disambiguation (CTX)

### ANKI-CTX-001 - Support context MUST reduce plausible misinterpretation.

Context SHOULD include assumptions, boundary conditions, or contrastive framing when needed.

### ANKI-CTX-002 - Examples MUST be minimal but sufficient to ground recall.

Examples SHOULD show at least one canonical usage or failure mode when mechanism recall is tested.

### ANKI-CTX-003 - Support context MUST NOT introduce unrelated new learning objectives.

Context expansion beyond the retrieval target MUST be deferred to separate cards.

---

## Set-Level Interference and Coverage (SET)

### ANKI-SET-001 - Easily-confused concepts MUST be explicitly contrastable.

Card sets SHOULD include disambiguating prompts for high-confusion pairs.

### ANKI-SET-002 - Prerequisite terms MUST be available before dependent cards.

If dependent cards assume undefined terms, prerequisite glossary cards SHOULD be added.

### ANKI-SET-003 - Card sets MUST avoid near-duplicate prompts that rehearse wording over understanding.

Near-duplicate cards SHOULD be merged or rewritten to test distinct retrieval targets.

---

## Quality Control and Revision Loops (REV)

### ANKI-REV-001 - Authoring runs MUST include explicit low-value card cuts.

Cards that are tautological, obvious, or weakly actionable MUST be removed.

### ANKI-REV-002 - Card quality issues MUST be dispositioned as rewrite, split, or drop.

Unresolved quality defects MUST NOT be silently carried into final output.

### ANKI-REV-003 - Post-generation audits MUST report retrieval-risk indicators.

At minimum, audits SHOULD report ambiguity risks, multi-cloze density, and redundancy hotspots.

---

## Boundary Rules

- TigerStyle owns universal writing/coding explicitness and correctness constraints.
- Epistemics owns confidence/evidence quality and uncertainty disclosure discipline.
- Contract-Core owns structured data contract semantics for card artifacts.
- Repo-local pipeline guides own schema/output mechanics and storage sync behavior.
- Anki Authoring owns retrieval-quality heuristics for card prompts and support context.

When guidance conflicts:

1. Tier-1 rulebooks (`tigerstyle`, `security-core`, `contract-core`, `robustness-core`, `reproducibility-core`, language rulebooks)
2. Domain heuristics (`uistyle`, `diataxis`, `writing`, `observability`, `change-risk`, `epistemics`, `performance`, `privacy`, `anki-authoring`, others)
3. Implementation playbooks
4. Framework/library guides

---

## Review Checklist (Required)

- Target path: each card tests one explicit retrieval target.
- Cue path: cloze or prompt cues do not leak answers via redundancy.
- Scope path: prompt wording defines a clear answer boundary.
- Answerability path: prompts are solvable without hidden author-only assumptions.
- Context path: support context clarifies assumptions/contrast without scope creep.
- Interference path: confusion-prone concepts have contrastive coverage.
- Prerequisite path: undefined required terms have glossary coverage or explicit rationale.
- Redundancy path: near-duplicate cards are merged or rewritten.
- Revision path: low-value cards are cut; quality defects are dispositioned.
