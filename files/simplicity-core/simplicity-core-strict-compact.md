# Simplicity-Core Rulebook - Strict / Compact

Compact derivative of `simplicity-core/simplicity-core-strict-full.md`.
Rule IDs are stable and retain the same meaning.

## Scope

- Tier-1 complexity admission and scope-discipline rules for agentic coding.
- Complements TigerStyle: Simplicity-Core decides whether new machinery should exist;
  TigerStyle governs how admitted machinery is implemented.
- Owns active refusal behavior when proposed solutions exceed current requirements.

Boundary note: Maintainability owns long-term coupling and ownership; Change-Risk owns rollout;
Epistemics owns general evidence quality; tier-1 domain rulebooks own their domains.

Definitions:

- Complexity means any added abstraction, dependency, option, persistent state, framework,
  generator, indirection, concurrency path, compatibility layer, migration path, workflow, or tool.
- Current requirement means present-task behavior or active safety, security, contract,
  robustness, reproducibility, correctness, or user-facing constraints.

## Admission Control

**SIMPLE-ADMIT-001** - Complexity MUST be admitted only for current requirements.

**SIMPLE-ADMIT-002** - The smallest sufficient change MUST be preferred.

**SIMPLE-ADMIT-003** - Existing mechanisms MUST be reused before new mechanisms are introduced.

**SIMPLE-ADMIT-004** - Complexity justification MUST be proportional to introduced surface area.

## Refusal and Scope Control

**SIMPLE-NO-001** - Agents MUST push back on unnecessary complexity.

**SIMPLE-NO-002** - Unrequested adjacent work MUST be deferred.

**SIMPLE-NO-003** - Work MUST stop when acceptance criteria are satisfied.

## Abstraction and Generality

**SIMPLE-ABS-001** - A single current use MUST NOT create a general abstraction.

**SIMPLE-ABS-002** - Indirection MUST reduce net complexity.

**SIMPLE-ABS-003** - Generic names and extension points MUST be earned by current variation.

## Options, Configuration, and Modes

**SIMPLE-OPT-001** - New options MUST have current consumers, operators, or boundary need.

**SIMPLE-OPT-002** - Option combinations MUST be bounded and reviewable.

**SIMPLE-OPT-003** - Defaults MUST not conceal complexity debt.

## Dependencies and Tooling

**SIMPLE-DEP-001** - Dependencies MUST remove more complexity than they add.

**SIMPLE-DEP-002** - Tooling MUST not be added for rare or simple tasks.

## State, Persistence, and Data Shape

**SIMPLE-STATE-001** - State MUST have a current owner and lifecycle.

**SIMPLE-STATE-002** - Derived state MUST be avoided unless recomputation is insufficient.

**SIMPLE-STATE-003** - Migration paths MUST not be invented for non-persistent changes.

## Locality, Deletion, and Reversibility

**SIMPLE-LOCAL-001** - Changes MUST stay at the narrowest effective seam.

**SIMPLE-LOCAL-002** - Deletion and reuse MUST be considered before addition.

**SIMPLE-LOCAL-003** - Temporary complexity MUST include a removal trigger.

## Exceptions and Precedence

**SIMPLE-EXCEPT-001** - Complexity exceptions MUST be explicit, owned, and time-bounded.

**SIMPLE-EXCEPT-002** - Simplicity MUST NOT override tier-1 safety, security, or contract duties.

## Review Checklist

- Every new abstraction, option, dependency, state, or broad refactor has current need.
- A smaller local alternative was considered or used.
- Unnecessary proposed complexity was rejected, narrowed, or deferred.
- Unrequested adjacent work is absent or explicitly required for the task.
- No general abstraction is introduced from one current use.
- New knobs have current consumers, operators, boundary need, or operational need.
- New dependencies remove more complexity than they add.
- New state has owner, lifecycle, and invalidation or removal semantics.
- Changes stay at the narrowest effective seam.
- Temporary complexity has a removal trigger.
- Exceptions are explicit, owned, and time-bounded.
- Simplicity does not bypass safety, security, contract, or correctness duties.
