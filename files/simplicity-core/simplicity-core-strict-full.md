# Simplicity-Core Rulebook - Strict / Full

Version: 0.1 (draft)
Date: May 2026

This rulebook defines enforceable complexity admission and scope discipline for agentic coding.

It is tier-1 rulebook guidance and complements TigerStyle by deciding whether new machinery should
exist before TigerStyle governs how that machinery is implemented.

---

## Scope

- In scope:
  - complexity admission before adding abstractions, options, dependencies, state, workflows,
    generators, frameworks, compatibility layers, or broad refactors;
  - refusal behavior when a proposed solution exceeds current requirements;
  - smallest-sufficient-change discipline for implementation and review;
  - stop conditions that prevent task completion from turning into adjacent-system expansion.
- Out of scope:
  - local coding style, assertions, and bounded implementation mechanics (TigerStyle ownership);
  - long-term coupling, ownership, and comprehension review (Maintainability ownership);
  - rollout gates, rollback, and migration governance (Change-Risk ownership);
  - general evidence and confidence quality (Epistemics ownership).

---

## Keywords (RFC 2119)

- MUST / SHALL: absolute requirement.
- MUST NOT / SHALL NOT: absolute prohibition.
- SHOULD: strong recommendation; deviations require explicit rationale.

## Definitions

- Complexity: any added abstraction, dependency, configuration option, persistent state,
  generalized framework, generator, indirection, concurrency path, compatibility layer, migration
  path, workflow, or tool.
- Current requirement: behavior explicitly requested for the present task or required to satisfy
  active safety, security, contract, robustness, reproducibility, correctness, or user-facing
  constraints in changed scope.
- Speculative future: hypothetical need without a committed consumer, failing test, active contract,
  measured bottleneck, security requirement, or explicit product requirement.
- Smallest sufficient change: the narrowest change that satisfies current requirements and active
  tier-1 constraints without introducing unnecessary moving parts.
- Complexity admission note: reviewer-visible explanation for admitted complexity, including the
  current requirement, rejected simpler alternative, and containment or removal expectation.
- Refusal: explicit pushback that declines, narrows, or defers unnecessary complexity.

---

## Admission Control (ADMIT)

### SIMPLE-ADMIT-001 - Complexity MUST be admitted only for current requirements.

New complexity MUST NOT be justified by speculative futures, possible later reuse, or aesthetic
preference.

If complexity is admitted, the change MUST identify the current requirement that makes it necessary.

Rationale: agentic work tends to generalize from imagined futures, creating permanent obligations
without present value.

### SIMPLE-ADMIT-002 - The smallest sufficient change MUST be preferred.

Before adding new machinery, the agent MUST consider a smaller local change that uses existing
structure.

If the smaller change is rejected, the rejection reason MUST be explicit.

Rationale: simple local changes are easier to review, test, revert, and delete.

### SIMPLE-ADMIT-003 - Existing mechanisms MUST be reused before new mechanisms are introduced.

A new mechanism MUST NOT duplicate an existing capability unless the existing capability is
insufficient for a stated current requirement or violates active tier-1 constraints.

Rationale: parallel mechanisms create selection burden, drift, and inconsistent behavior.

### SIMPLE-ADMIT-004 - Complexity justification MUST be proportional to introduced surface area.

Changes that add public API, configuration, persistence, concurrency, dependencies, or generated
code MUST include stronger justification than purely local implementation changes.

Rationale: externally visible and stateful complexity has higher carrying cost and removal risk.

---

## Refusal and Scope Control (NO)

### SIMPLE-NO-001 - Agents MUST push back on unnecessary complexity.

When a proposed solution exceeds current requirements, the agent MUST say so and offer a simpler
alternative or a narrower next step.

Rationale: the desired behavior is not passive minimalism; it is active resistance to complexity
creep.

### SIMPLE-NO-002 - Unrequested adjacent work MUST be deferred.

"While we are here" refactors, rewrites, cleanups, schema changes, tool changes, and documentation
expansions MUST NOT be included unless they are necessary for the current requirement.

Rationale: adjacent work hides risk and turns bounded tasks into open-ended projects.

### SIMPLE-NO-003 - Work MUST stop when acceptance criteria are satisfied.

After the task is solved and validation has run, the agent MUST NOT continue broadening scope unless
a failing check or explicit user instruction creates a new current requirement.

Rationale: many complexity increases happen after the original task is already complete.

---

## Abstraction and Generality (ABS)

### SIMPLE-ABS-001 - A single current use MUST NOT create a general abstraction.

Abstractions, frameworks, registries, plugin systems, strategy objects, and generic helpers MUST be
backed by repeated current use or a concrete boundary requirement.

Rationale: one example is evidence for one solution, not evidence for a reusable pattern.

### SIMPLE-ABS-002 - Indirection MUST reduce net complexity.

New indirection MUST shorten the reviewer path, isolate concrete volatility, or remove duplicated
logic in current changed scope.

Rationale: indirection without local payoff makes behavior harder to trace.

### SIMPLE-ABS-003 - Generic names and extension points MUST be earned by current variation.

Names such as manager, engine, framework, provider, adapter, strategy, and generic extension points
MUST NOT be introduced unless current variation requires them.

Rationale: broad names invite speculative design and obscure the actual domain responsibility.

---

## Options, Configuration, and Modes (OPT)

### SIMPLE-OPT-001 - New options MUST have current distinct consumers or operators.

Configuration knobs, modes, flags, environment variables, and user-facing settings MUST NOT be added
for hypothetical future tuning or speculative compatibility.

Rationale: every option creates a state space that must be documented, tested, supported, and
understood.

### SIMPLE-OPT-002 - Option combinations MUST be bounded and reviewable.

If an option is necessary, its interactions with existing options MUST be explicit and small enough
for direct review.

Rationale: combinatorial configuration complexity hides defects in untested states.

### SIMPLE-OPT-003 - Defaults MUST not conceal complexity debt.

A defaulted option still counts as added complexity and MUST satisfy the same admission rules as a
required option.

Rationale: hidden knobs carry support cost even when most callers do not set them.

---

## Dependencies and Tooling (DEP)

### SIMPLE-DEP-001 - Dependencies MUST remove more complexity than they add.

A new dependency MUST replace a larger current burden and MUST NOT duplicate existing local or
platform capability.

Rationale: dependencies import API surface, supply risk, version drift, and operational constraints.

### SIMPLE-DEP-002 - Tooling MUST not be added for rare or simple tasks.

Generators, scaffolds, build tools, linters, formatters, and custom scripts MUST be justified by
repeated current work or a concrete correctness requirement.

Rationale: toolchains become permanent systems even when introduced for one-time convenience.

---

## State, Persistence, and Data Shape (STATE)

### SIMPLE-STATE-001 - State MUST have a current owner and lifecycle.

New persistent state, caches, indexes, queues, and derived data MUST declare who owns it, when it is
updated, and when it is removed or invalidated.

Rationale: state is among the highest-cost forms of complexity because it can diverge from reality.

### SIMPLE-STATE-002 - Derived state MUST be avoided unless recomputation is insufficient.

Caches, denormalized fields, mirrors, and duplicated registries MUST be justified by measured cost,
contract need, or boundary constraint.

Rationale: duplicated state creates synchronization and invalidation obligations.

### SIMPLE-STATE-003 - Migration paths MUST not be invented for non-persistent changes.

Migration machinery MUST only be introduced when durable data, external contracts, or staged
rollout constraints require it.

Rationale: unnecessary migration paths create complexity without reducing real transition risk.

---

## Locality, Deletion, and Reversibility (LOCAL)

### SIMPLE-LOCAL-001 - Changes MUST stay at the narrowest effective seam.

Implementation should touch the fewest files, interfaces, and concepts compatible with the current
requirement and active tier-1 constraints.

Rationale: locality lowers review burden and keeps rollback simple.

### SIMPLE-LOCAL-002 - Deletion and reuse MUST be considered before addition.

Before adding new code or configuration, the agent MUST check whether deletion, reuse, or a smaller
edit can satisfy the current requirement.

Rationale: the cheapest complexity is the complexity that never enters the system.

### SIMPLE-LOCAL-003 - Temporary complexity MUST include a removal trigger.

If temporary scaffolding, compatibility code, feature flags, or transitional paths are introduced,
the change MUST state the condition for removal.

Rationale: temporary complexity becomes permanent unless its exit is part of admission.

---

## Exceptions and Precedence (EXCEPT)

### SIMPLE-EXCEPT-001 - Complexity exceptions MUST be explicit, owned, and time-bounded.

Exceptions MUST include current requirement, owner, risk rationale, and expiry or removal criteria.

Rationale: unmanaged exceptions become normalized complexity debt.

### SIMPLE-EXCEPT-002 - Simplicity MUST NOT override tier-1 safety, security, or contract duties.

The least complex solution is acceptable only when it satisfies active safety, security, contract,
robustness, reproducibility, correctness, and user-facing requirements.

Rationale: under-building critical safeguards is false simplicity.

---

## Boundary Rules

- TigerStyle owns code-level safety, explicitness, assertion, naming, and implementation discipline.
- Security-Core owns security controls, secrets, trust boundaries, and fail-closed behavior.
- Contract-Core owns boundary contracts, error semantics, and compatibility invariants.
- Robustness-Core owns runtime failure, concurrency, and integrity invariants.
- Maintainability owns long-term coupling, ownership, and comprehension review.
- Change-Risk owns rollout progression, rollback, and migration governance.
- Epistemics owns general claim quality, confidence, assumptions, and decision evidence.
- Simplicity-Core owns admission control for new complexity and active refusal behavior.

When guidance conflicts:

1. Safety, security, contract, and correctness requirements remain mandatory.
2. Among solutions that satisfy mandatory requirements, the least complex sufficient solution wins.
3. Added complexity must be justified by current need, not speculative future value.

---

## Review Checklist (Required)

- Admission path: every new abstraction, option, dependency, state, or broad refactor has
  current need.
- Admission path: a smaller local alternative was considered or used.
- Refusal path: unnecessary proposed complexity was rejected, narrowed, or deferred.
- Scope path: unrequested adjacent work is absent or explicitly required for the task.
- Abstraction path: no general abstraction is introduced from one current use.
- Options path: new knobs have current distinct consumers or operational need.
- Dependency path: new dependencies remove more complexity than they add.
- State path: new state has owner, lifecycle, and invalidation or removal semantics.
- Locality path: changes stay at the narrowest effective seam.
- Exit path: temporary complexity has a removal trigger.
- Exception path: exceptions are explicit, owned, and time-bounded.
- Precedence path: simplicity does not bypass safety, security, contract, or correctness duties.
