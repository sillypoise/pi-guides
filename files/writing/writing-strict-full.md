# Writing Heuristics - Strict / Full

Version: 0.1 (draft)
Date: February 2026

This guide defines enforceable prose-quality heuristics for technical and professional writing.

It is domain-heuristics-tier guidance and does not override TigerStyle base/language rulebooks.

## Corpus Grounding (2026-02 Split)

- Primary corpus: `corpus/writing/`
- Source provenance: `files/sources/writing/README.md`
- Derivation worksheet: `files/derivations/writing-derivation-2026-02-18.md`
- Taxonomy freeze: `files/derivations/writing-split-taxonomy-2026-02-18.md`

---

## Scope

- In scope:
  - Sentence- and paragraph-level clarity, flow, and revision defaults.
  - Audience trust, tone control, and anti-obfuscation practices.
  - Review checks for common writing failure paths.
- Out of scope:
  - Diataxis mode architecture (tutorial/how-to guide/reference/explanation).
  - Minto-style decision-document structure playbook.
  - Creative-writing craft and literary aesthetics.

---

## Keywords (RFC 2119)

- MUST / SHALL: absolute requirement.
- MUST NOT / SHALL NOT: absolute prohibition.
- SHOULD: strong recommendation; deviations require explicit rationale.

---

## Clarity and Concision (CLAR)

### WRIT-CLAR-001 - Sentences MUST prioritize direct, concrete meaning.

Use specific subjects, specific verbs, and concrete nouns before abstract phrasing.

Rationale: readers process concrete propositions faster than abstract restatements.

### WRIT-CLAR-002 - Unnecessary words MUST be removed.

Writers MUST cut filler phrasing, throat-clearing intros, and duplicated qualifiers.

Rationale: clutter increases reader effort without adding information.

### WRIT-CLAR-003 - Jargon MUST be defined or replaced.

If domain-specific terminology is required, define it at first use in plain language.

Rationale: undefined jargon breaks comprehension for adjacent audiences.

### WRIT-CLAR-004 - Active voice SHOULD be the default.

Passive voice is acceptable when actor identity is unknown, irrelevant, or intentionally deemphasized.

Rationale: active voice usually makes agency and action explicit.

### WRIT-CLAR-005 - Claims MUST not overstate certainty.

Absolute claims require explicit evidence; otherwise use bounded language.

Rationale: precision in confidence preserves trust.

---

## Cohesion and Flow (FLOW)

### WRIT-FLOW-001 - Paragraphs MUST have one controlling point.

Each paragraph SHOULD open with a clear point or orienting sentence.

Rationale: readers need stable local intent before details.

### WRIT-FLOW-002 - Adjacent sentences MUST connect logically.

Writers MUST maintain clear linkages using continuity of subject, cause, contrast, or sequence.

Rationale: local discontinuity forces readers to reconstruct missing logic.

### WRIT-FLOW-003 - List items MUST be parallel in function.

In one list, items MUST be the same kind (steps, reasons, requirements, options).

Rationale: mixed list semantics hide structure and weaken recall.

### WRIT-FLOW-004 - Emphasis SHOULD be intentional.

Put high-importance information at structural emphasis positions (section openings, sentence ends, summaries).

Rationale: readers remember emphasized positions disproportionately.

### WRIT-FLOW-005 - Transition language MUST match actual logic.

Do not use contrast transitions for additive points or causal transitions for correlation only.

Rationale: misleading transitions create false reasoning.

---

## Voice and Audience Contract (VOICE)

### WRIT-VOICE-001 - Tone MUST match audience and task stakes.

Use neutral-professional tone for normative docs; allow selective warmth where it improves comprehension.

Rationale: mismatch between tone and purpose reduces credibility.

### WRIT-VOICE-002 - Writer intent MUST not outrun reader need.

Avoid performance prose, insider signaling, or ornamental digressions in task-oriented documentation.

Rationale: documentation exists to serve reader outcomes, not author display.

### WRIT-VOICE-003 - Examples SHOULD reflect realistic usage.

Use examples that represent typical constraints and likely failure points.

Rationale: unrealistic examples create false confidence.

### WRIT-VOICE-004 - Humor and informality MAY be used sparingly.

Humor MUST NOT obscure requirements, error handling, or safety-relevant instructions.

Rationale: style flourishes cannot compromise operational clarity.

---

## Revision Workflow (REV)

### WRIT-REV-001 - Drafting and revision MUST be separate passes.

Writers SHOULD generate content first, then perform focused revision for clarity and structure.

Rationale: mixing ideation and editing lowers quality of both.

### WRIT-REV-002 - Every significant draft MUST include a reduction pass.

Perform at least one pass dedicated to shortening and simplification without losing meaning.

Rationale: concision is produced by revision, not by first-draft intent.

### WRIT-REV-003 - Revision MUST test reader failure paths.

Writers MUST check where a reader could misread scope, sequence, or responsibility.

Rationale: most doc defects are ambiguity defects.

### WRIT-REV-004 - Editorial feedback SHOULD be integrated by default.

Rejecting substantive edits requires explicit rationale tied to correctness or audience fit.

Rationale: external editorial review catches blind spots the writer cannot see.

### WRIT-REV-005 - Mechanical correctness MUST be verified before merge.

Spelling, grammar, terminology consistency, and broken references MUST be fixed.

Rationale: avoidable defects erode reader trust and increase support load.

---

## Fairness and Transparency (ETH)

### WRIT-ETH-001 - Writing MUST not hide uncertainty.

When evidence is partial or assumptions are active, state them explicitly.

Rationale: hidden uncertainty creates operational risk.

### WRIT-ETH-002 - Arguments MUST represent tradeoffs honestly.

Do not omit material drawbacks when recommending an approach.

Rationale: one-sided framing degrades decision quality.

### WRIT-ETH-003 - Complexity MUST not be masked by vague language.

If a process is complex, state complexity clearly and segment it instead of euphemizing it.

Rationale: false simplicity creates implementation failure.

### WRIT-ETH-004 - Source-attributed guidance SHOULD preserve intent.

When deriving guidance from source corpora, keep source meaning while adapting wording for enforceability.

Rationale: derivation quality depends on faithful compression.

---

## Boundary Rules

- Diataxis owns document-mode intent and boundary enforcement.
- This writing guide owns prose quality and revision discipline.
- `argument-structure` owns decision/proposal logic scaffolding.

When guidance conflicts:

1. TigerStyle base/language rulebooks
2. Domain heuristics (`diataxis`, `writing`)
3. Playbooks (`argument-structure`)

---

## Review Checklist (Required)

For meaningful writing changes, verify:

- Error path: key claims remain accurate after concision edits.
- Error path: uncertainty, assumptions, and constraints are explicit.
- Boundary path: mode architecture concerns are handled by Diataxis, not prose-only rewrites.
- Boundary path: decision-doc structure requirements are not over-applied to all pages.
- Flow path: each paragraph has one controlling point and clear linkage.
- Clarity path: jargon is defined, filler removed, and confidence level is proportional to evidence.

---

## References

- `corpus/writing/the-elements-of-style-strunk-william.md`
- `corpus/writing/on-writing-well-zinisser-willam.md`
- `corpus/writing/style-lessons-in-clarity-and-grace-williams-joseph.md`
- `corpus/writing/on-writing-king-stephen.md`
