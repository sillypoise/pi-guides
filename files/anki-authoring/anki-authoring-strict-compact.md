# Anki Authoring Heuristics - Strict / Compact

Compact derivative of `anki-authoring/anki-authoring-strict-full.md`.
Rule IDs are stable and retain the same meaning.

## Scope

- Cross-stack heuristics for high-quality card authoring focused on active recall,
  cue control, disambiguation, and retention-oriented revision.

Boundary note: repo-local guides own output schemas/pipelines; this guide owns retrieval-quality heuristics.

## Core Rules

**ANKI-TARGET-001** - Each card MUST test exactly one retrieval target.

**ANKI-TARGET-003** - Prompt wording MUST make answer scope explicit.

**ANKI-TARGET-004** - Prompts MUST be answerable without hidden private context.

**ANKI-CLZ-001** - Clozes MUST hide semantically central terms, not incidental wording.

**ANKI-CLZ-002** - Prompt cues MUST NOT reveal the answer through local redundancy.

**ANKI-CLZ-003** - Multi-cloze cards MUST be justified by one coherent mechanism.

**ANKI-CTX-003** - Support context MUST NOT introduce unrelated new learning objectives.

**ANKI-SET-001** - Easily-confused concepts MUST be explicitly contrastable.

**ANKI-SET-003** - Card sets MUST avoid near-duplicate prompts that rehearse wording over understanding.

**ANKI-REV-001** - Authoring runs MUST include explicit low-value card cuts.

## Review Checklist

- Each card tests one retrieval target with clear answer scope.
- Prompts are answerable without hidden author-only assumptions.
- Prompt cues do not make recall optional.
- Multi-cloze cards represent one coherent mechanism.
- Context disambiguates without adding unrelated objectives.
- Confusable concepts are contrasted; near-duplicates are removed.
- Low-value cards are explicitly cut or rewritten.
