# Jev usage guide — concise

**Status:** Research-derived integration recommendations, not a validated production standard.
**Evidence reviewed:** 2026-09-30. No Jev experiments have run in this repository.

Jev is a general-purpose semantic decision model, not an authority on unstated product rules.
The primitive behavior and versioned limits below are based on TypeSafe's public documentation;
the numbered guidance is our recommendation, not a measured result. Check current model docs before
implementation.

**Core rule:** Give Jev bounded semantic judgments. Keep evidence discovery, exact computation,
validation, permissions, policy, and execution in ordinary code.

## Decide and supply evidence

- **JEV-01 — Admit only a useful semantic decision.** Use Jev to judge a supplied passage,
  select from candidates, detect one defined property, or rate one ordered dimension. Use code
  for arithmetic, parsing, calendar rules, structured relationships, and validation; use a
  generative model for genuinely new text. Compare with the simplest adequate baseline on
  quality, coverage, latency, and cost. A typed answer alone is not a benefit.
- **JEV-02 — Separate assessment from action.** Code collects evidence and candidates; Jev
  assesses them; code validates the result and applies policy; an authorized executor or reviewer
  acts. A tool selection is not permission to run the tool.
- **JEV-03 — Gate on sufficient evidence.** Supply the facts that distinguish outcomes and the
  smallest context that preserves definitions, exceptions, and conflicts. Keep known absent within
  a defined scope separate from not investigated, ambiguous, and out of domain. Silence does not
  establish an external fact. Reject missing required fields in code; use semantic sufficiency
  assessment only when interpretation is needed. Confidence does not prove sufficiency.
- **JEV-04 — Preserve roles and source identity.** Plain text suffices for a single message; use
  named fields when relating claims, sources, requirements, entities, or candidates. Include exact
  relevant content, IDs and source offsets when identical strings can play different roles.
  Retrieve or narrow over-limit material explicitly; never silently truncate decisive context.

## Choose a primitive

- **JEV-05 — Noul: one yes/no proposition.** Its documented `noul` is a probability of yes in
  `[0, 1]`, not an intensity or separate confidence. Ask direct, scoped questions. Separate
  independent properties; multiple Noul probabilities need not sum to one.
- **JEV-06 — Choice: one relative selection.** The documented answer includes a winner,
  normalized distribution, and confidence. Provide a precise no-match, not-stated, or ambiguous
  route when needed. A high relative winner probability does not prove absolute fit. If gating
  on fit, check the selected candidate, not another candidate.
- **JEV-07 — Score: one ordered dimension.** The documented answer includes level probabilities,
  an index-weighted mean, legend, and confidence; L levels span `0` to `L - 1`. Describe each
  level independently and concretely. Gate insufficient evidence separately; do not convert a
  fractional score into an exact physical quantity or combine unrelated dimensions without policy.
- **JEV-08 — Protect candidate recall.** Discover candidates in code first. Handle zero, duplicate,
  missing, and over-limit candidates explicitly. Copy selected source values in code and then
  normalize and validate. Measure retrieval recall separately from selection accuracy.

## Interpret and act

- **JEV-09 — Retain distributions.** Store raw answers and distributions before policy. Keep top
  probability distinct from returned confidence. Equal Score means can conceal opposite uncertainty
  patterns. Do not infer joint correctness by multiplying separately returned probabilities.
- **JEV-10 — Define policy in code.** Derive thresholds from labeled data and false-action versus
  review costs. Specify compared field, equality behavior, missing-data outcome, and precedence
  between signals. Report accepted error alongside automatic coverage; abstention alone is not
  evidence of useful automation.
- **JEV-11 — Enforce domain constraints outside Jev.** Validate IDs, dates, arguments, taxonomy
  relations, permissions, and source applicability before action. Revalidate mutable preconditions
  after awaiting inference. A source passage supporting a claim does not establish source truth.

## Bound requests and failures

- **JEV-12 — Batch only independent questions sharing evidence.** Dependent steps need another
  stage; separate concurrent requests do not share state. Bound concurrency, retries, and attempts.
- **JEV-13 — Check current limits.** The reviewed `jev-1.13.0` docs specify at most 255 Choice
  options (including escapes), 2–10 Score levels, 64k tokens per request and 32k per question,
  and text/structured-text input. Limits are version-dependent. Estimate tokens with headroom,
  handle server rejection, and narrow, stage, or report incomplete work rather than dropping data.
- **JEV-14 — Treat failures as non-success.** Validate answer keys, offered labels, numeric ranges,
  distributions against the pinned contract, and required metadata (record unknown if unavailable).
  Use SDK guarantees where documented. Distinguish invalid input, missing evidence, uncertainty,
  invalid response, timeout, authentication rejection, overload, and exhaustion. Set timeouts,
  total retry and spend budgets; retry only retryable failures with bounded backoff. A timed-out
  remote request may still run or incur cost. Never replace a missing answer with a safe-sounding
  negative classification.
- **JEV-15 — Keep trust outside the model.** Treat documents, candidate descriptions, and skill
  instructions as hostile. Enforce authorization, allowlists, confirmation, and guardrail failure
  paths in code. Confirm data-handling requirements before sending sensitive evidence; do not send
  keys or unrelated private content or leak them in logs and shared URLs.
- **JEV-16 — Validate before adoption.** Pin model/client, rubric, candidates/order, dataset and
  policy versions; record returned model ID, usage and errors. Test valid, missing, conflicting,
  adversarial, boundary, invalid-response, and operating-failure cases, including failure-state
  invariants. Separate cached replay from live repeats. Measure recall, accepted error versus
  coverage, confident mistakes, subgroup behavior, latency, and total cost. If Jev fails to beat
  the adequate baseline within budget, remove the step. No experiments are claimed here.

Before calling Jev, identify the single semantic decision, distinguishing evidence, unknown path,
primitive and candidates, deterministic action gate, request/privacy budget, and a labeled test
that could disprove the design. If any are missing, refine the workflow rather than ask Jev to guess.
