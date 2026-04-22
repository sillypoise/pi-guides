# Global APPEND_SYSTEM.md Variants

These are candidate global appended system-prompt variants for pi.

Current active global file:

- `~/.pi/agent/APPEND_SYSTEM.md`

Current active variant source:

- `docs/system-prompt-variants/stronger-epistemic-writing.md`

## Variants

- `default-epistemic-writing.md`
  - Balanced default using light epistemics and writing guidance.
- `stronger-epistemic-writing.md`
  - Balanced default plus one extra evidence-quality rule for material claims.
- `terse-house-style.md`
  - Stronger brevity bias with minimal overhead.
- `coding-oriented-house-style.md`
  - Slightly more focused on implementation, uncertainty, and tradeoffs in technical work.
- `writing-oriented-house-style.md`
  - Slightly more focused on prose clarity and reader-facing communication.

## Usage

To try a variant globally, copy its contents into:

- `~/.pi/agent/APPEND_SYSTEM.md`

Use `APPEND_SYSTEM.md` rather than `SYSTEM.md` so pi's base system prompt remains intact.
