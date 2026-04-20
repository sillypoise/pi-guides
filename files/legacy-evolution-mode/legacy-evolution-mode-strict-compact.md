# Legacy Evolution Mode Heuristics - Strict / Compact

Compact derivative of `legacy-evolution-mode/legacy-evolution-mode-strict-full.md`.
Rule IDs are stable and retain the same meaning.

## Scope

- Cross-stack heuristics for seam-first and uncertainty-aware change entry in existing codebases.

Boundary note: Change-Risk owns rollout governance; Testing playbooks own test mechanics;
this guide owns legacy-evolution strategy constraints.

## Core Rules

**LEG-SEAM-001** - Legacy changes MUST identify a concrete seam before structural modification.

**LEG-SEAM-003** - Seam placement MUST minimize cross-module blast radius.

**LEG-BEH-001** - Legacy refactors MUST establish characterization evidence for critical paths.

**LEG-BEH-002** - Intended behavior changes MUST be explicitly separated from structural cleanup.

**LEG-UNC-001** - Changes in unknown-behavior zones MUST add explicit safety guardrails before deeper modification.

**LEG-UNC-002** - High-risk legacy touchpoints MUST use conservative change budgets.

**LEG-UNC-003** - Emergency fixes in legacy scope MUST include explicit stabilization follow-up.

**LEG-KNOW-002** - Recovery-critical legacy knowledge MUST avoid single-person dependency.

## Review Checklist

- Seams are explicit and blast-radius-aware.
- Characterization evidence exists for critical paths.
- Structural cleanup and behavior change intent are separated.
- Unknown-behavior zones include explicit safety guardrails.
- Emergency fixes have ownered stabilization follow-up.
