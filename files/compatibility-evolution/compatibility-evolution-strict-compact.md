# Compatibility Evolution Heuristics - Strict / Compact

Compact derivative of `compatibility-evolution/compatibility-evolution-strict-full.md`.
Rule IDs are stable and retain the same meaning.

## Scope

- Cross-stack heuristics for compatibility-safe boundary evolution,
  deprecation choreography, and migration clarity.

Boundary note: Contract-Core owns semantics; Change-Risk owns release governance;
this guide owns compatibility-evolution quality heuristics.

## Core Rules

**COMPAT-BASE-001** - Changes at compatibility boundaries MUST state compatibility intent explicitly.

**COMPAT-BASE-002** - Potential breaking effects MUST be detected before release.

**COMPAT-DEPR-001** - Deprecations MUST include timeline, owner, and consumer migration path.

**COMPAT-DEPR-003** - Deprecation windows MUST be honored unless an explicit exception is approved.

**COMPAT-VER-001** - Versioning signals MUST align with real compatibility impact.

**COMPAT-VER-002** - Coexisting versions or behaviors MUST have explicit sunset conditions.

**COMPAT-CONS-001** - High-impact consumer compatibility risks MUST be explicitly dispositioned.

## Review Checklist

- Compatibility intent and break analysis are explicit for boundary changes.
- Deprecation timelines, owners, and migration paths are defined.
- Version/sunset semantics match actual compatibility impact.
- Consumer-impact risks are validated and dispositioned.
