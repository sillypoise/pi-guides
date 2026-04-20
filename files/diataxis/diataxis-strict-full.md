# Diataxis Rulebook - Strict / Full

Version: 0.1 (draft)
Date: February 2026

This rulebook defines enforceable documentation-structure heuristics derived from the Diataxis corpus.

It is domain-heuristics-tier guidance and does not override TigerStyle base/language rulebooks.

## Corpus Grounding (2026-02 Refresh)

- Primary corpus: `corpus/diataxis/*.md`
- Source provenance: `files/sources/diataxis/README.md`
- Derivation worksheet: `files/derivations/diataxis-derivation-2026-02-17.md`

---

## Scope

- In scope:
  - Documentation mode classification and boundaries.
  - Page purpose, structure, and language constraints for tutorial/how-to guide/reference/explanation.
  - Information architecture and iterative workflow guidance for doc sets.
- Out of scope:
  - Product- or framework-specific API implementation guidance.
  - Visual brand design and component styling concerns.

---

## Keywords (RFC 2119)

- MUST / SHALL: absolute requirement.
- MUST NOT / SHALL NOT: absolute prohibition.
- SHOULD: strong recommendation; deviations require explicit rationale.

---

## Core Model (CORE)

### DIATAXIS-CORE-001 - Every page MUST have exactly one primary mode.

Allowed primary modes are: tutorial, how-to guide, reference, explanation.

Rationale: each mode serves a different user need and writing obligation.

### DIATAXIS-CORE-002 - Page intent MUST match user need before content is drafted.

Use user need labels explicitly: learning, goal completion, information lookup, understanding.

Rationale: mode confusion starts when purpose is implicit.

### DIATAXIS-CORE-003 - Mixed-mode pages MUST be split or rewritten.

If one page attempts to teach, troubleshoot, enumerate APIs, and discuss rationale at once, it MUST be decomposed.

Rationale: mixed obligations degrade task success for all user states.

### DIATAXIS-CORE-004 - Cross-links SHOULD connect adjacent mode needs.

Link tutorials to how-to guides and explanation, and link how-to guides to reference, without importing those sections inline.

Rationale: users move between needs over time; cross-links preserve flow without mode bleed.

---

## Compass Classification (COMPASS)

### DIATAXIS-COMPASS-001 - Classification MUST pass the two-axis test.

Authors MUST classify by both axes before finalizing placement:

- action vs cognition
- acquisition vs application

Rationale: this is the minimum deterministic check for correct mode assignment.

### DIATAXIS-COMPASS-002 - Action + acquisition MUST map to tutorial.

If content guides hands-on learning under managed conditions, it MUST be a tutorial.

Rationale: study-oriented action guidance belongs in tutorials.

### DIATAXIS-COMPASS-003 - Action + application MUST map to how-to guide.

If content guides competent users toward a real-world task outcome, it MUST be a how-to guide.

Rationale: work-oriented action guidance belongs in how-to guides.

### DIATAXIS-COMPASS-004 - Cognition + application MUST map to reference.

If content provides factual machinery details for use during work, it MUST be reference.

Rationale: in-work lookup needs neutral facts, not discussion.

### DIATAXIS-COMPASS-005 - Cognition + acquisition MUST map to explanation.

If content deepens understanding away from immediate task execution, it MUST be explanation.

Rationale: study-oriented cognition is explanatory, not operational.

---

## Tutorial Rules (TUT)

### DIATAXIS-TUT-001 - Tutorials MUST provide a safe, guided learning path.

Tutorials MUST define start state, expected checkpoints, and completion state.

Rationale: managed learning requires a clear, reliable journey.

### DIATAXIS-TUT-002 - Tutorials MUST optimize for learner success, not feature coverage.

Non-essential branches, alternatives, and advanced options MUST NOT interrupt the core lesson path.

Rationale: lesson reliability is more important than exhaustive coverage.

### DIATAXIS-TUT-003 - Tutorials MUST keep explanation minimal and linked out.

Long rationale and conceptual deep-dives MUST be moved to explanation pages.

Rationale: explanatory digressions break learning flow.

### DIATAXIS-TUT-004 - Tutorials MUST include concrete expected results early and often.

Each major action SHOULD produce an observable output or state change.

Rationale: frequent visible feedback reinforces learning and confidence.

---

## How-to Rules (HOWTO)

### DIATAXIS-HOWTO-001 - How-to guides MUST be goal-oriented and task-addressed.

Titles and opening text MUST state the practical outcome ("How to <goal>").

### DIATAXIS-HOWTO-002 - How-to guides MUST assume baseline competence.

How-to content MUST NOT reteach fundamentals that belong in tutorials.

### DIATAXIS-HOWTO-003 - How-to guides MUST keep action primary.

Explanatory essays and exhaustive API inventories MUST be linked, not embedded.

Rationale: work guidance must stay executable and focused.

### DIATAXIS-HOWTO-004 - How-to guides SHOULD represent real-world branching.

When outcomes depend on context, conditional steps (if/then paths) SHOULD be explicit.

Rationale: real-world tasks require conditional decisions.

---

## Reference Rules (REF)

### DIATAXIS-REF-001 - Reference MUST describe and only describe.

Reference pages MUST focus on accurate, neutral, factual description.

### DIATAXIS-REF-002 - Reference MUST mirror the structure of the described machinery.

Hierarchy, naming, and grouping SHOULD align with product/API structure where possible.

### DIATAXIS-REF-003 - Reference MUST adopt consistent patterns and formats.

Repeated entities (commands, fields, options, errors) MUST use stable templates.

### DIATAXIS-REF-004 - Reference MUST separate interpretation from facts.

Rationale and tradeoff discussion MUST be moved to explanation pages.

---

## Explanation Rules (EXPL)

### DIATAXIS-EXPL-001 - Explanation MUST focus on understanding, not execution.

Explanation pages MUST address why, context, implications, and alternatives.

### DIATAXIS-EXPL-002 - Explanation MAY include opinion and perspective.

Opinions SHOULD be framed, bounded, and connected to explicit reasoning.

### DIATAXIS-EXPL-003 - Explanation MUST avoid procedural step chains.

Step-by-step actionable procedures MUST be moved to how-to guide or tutorial pages.

### DIATAXIS-EXPL-004 - Explanation SHOULD make conceptual connections.

Cross-topic links, historical context, and design tradeoffs SHOULD be used to build understanding webs.

---

## Boundary Rules (BOUND)

### DIATAXIS-BOUND-001 - Tutorial and how-to guide content MUST NOT be conflated.

Learning-path guidance and work-task guidance MUST be separate pages or sections with explicit boundaries.

### DIATAXIS-BOUND-002 - Reference and explanation content MUST NOT be conflated.

Reference facts and explanatory discussion MUST be separated by page intent.

### DIATAXIS-BOUND-003 - Boundary violations MUST trigger immediate triage.

When a page fails compass classification, maintainers MUST choose one mode and relocate conflicting content.

### DIATAXIS-BOUND-004 - Navigation labels MUST signal mode.

Section labels and page titles SHOULD clearly communicate tutorial/how-to guide/reference/explanation intent.

---

## Architecture and Hierarchy Rules (IA)

### DIATAXIS-IA-001 - Structure MUST follow user needs, not internal org charts.

Information architecture MUST optimize for user-facing tasks, learning paths, lookup, and understanding.

### DIATAXIS-IA-002 - Complex hierarchies MAY add dimensions, but mode boundaries MUST remain intact.

If docs are partitioned by audience/platform/topic, each partition MUST still enforce mode separation.

### DIATAXIS-IA-003 - Landing pages SHOULD be contextual overviews, not raw link dumps.

Contents pages SHOULD introduce scope and help users choose the next page intentionally.

### DIATAXIS-IA-004 - Long lists SHOULD be grouped into smaller meaningful sets.

Large unstructured lists SHOULD be split by user intent or topic to reduce scanning cost.

---

## Workflow Rules (WORK)

### DIATAXIS-WORK-001 - Improvements MUST be iterative and publishable in small units.

Prefer one concrete quality improvement per cycle over large speculative rewrites.

### DIATAXIS-WORK-002 - Teams MUST NOT create empty four-mode skeletons.

Top-level mode sections with little or no content MUST NOT be created as a placeholder strategy.

### DIATAXIS-WORK-003 - Structure SHOULD emerge from content improvement.

Reorganization SHOULD follow repeated local fixes and clear mode separation pressure.

### DIATAXIS-WORK-004 - Every edit cycle SHOULD run a compass check.

For changed pages, confirm mode, boundary compliance, and correct cross-linking before merge.

---

## Quality Rules (QUALITY)

### DIATAXIS-QUALITY-001 - Functional quality is required baseline.

Documentation MUST remain accurate, consistent, and sufficiently complete for its declared scope.

### DIATAXIS-QUALITY-002 - Deep quality SHOULD be evaluated explicitly.

Reviewers SHOULD assess flow, fitness to user needs, and overall readability in addition to correctness.

### DIATAXIS-QUALITY-003 - Diataxis checks MUST be used to expose quality gaps.

When mode separation work reveals missing facts or broken steps, those gaps MUST be tracked and fixed.

---

## Review Checklist (Required)

For meaningful documentation changes, verify:

- Boundary path: page passes compass classification and has one primary mode.
- Boundary path: no tutorial/how-to guide or reference/explanation conflation remains in modified sections.
- Error path: if procedural steps fail, recovery guidance or references are present in the correct mode.
- Error path: if factual claims are changed, reference accuracy was re-checked.
- Structure path: landing pages provide context and mode-signaling labels.
- Workflow path: change is incremental and does not introduce empty structural placeholders.

---

## References

- https://diataxis.fr/
- `corpus/diataxis/start-here.md`
- `corpus/diataxis/the-compass.md`
- `corpus/diataxis/tutorials.md`
- `corpus/diataxis/how-to-guides.md`
- `corpus/diataxis/reference.md`
- `corpus/diataxis/explanation.md`
- `corpus/diataxis/workflow.md`
- `corpus/diataxis/complex-hierarchies.md`
- `corpus/diataxis/quality.md`
