# pi-guides

A pi-native guide system packaged as a pi package.

## Status

This repository is an incremental port of the earlier OpenCode guide workflow into pi primitives.

Current v0.1 scope:

- registry-driven guide activation via a pi extension
- repo-local guide config in `.pi/guides.json`
- repo-local prose/context in `AGENTS.md`
- profile registry in `registry/profiles.json`
- guide registry in `registry/guides.json`
- bootstrap/sync templates for consumer repos
- only the base, language-agnostic TigerStyle variants
  - `files/tigerstyle-strict-compact.md`
  - `files/tigerstyle-strict-full.md`

Not included yet:

- language-specific TigerStyle variants
- framework/library guides
- skills for optional deep guide families
- session-scoped overrides
- custom compaction behavior
- hosted JSON schema URLs

---

## Why this exists

OpenCode used an instruction-loading model built around a shared selector file, repo overlays, and an `instructions` array in `opencode.json`.

Pi has different native primitives:

- `AGENTS.md` for repo-local context
- extensions for deterministic runtime logic
- prompt templates for reusable task steering
- pi packages for installation and distribution

This repository adopts the pi-native model instead of trying to recreate OpenCode verbatim.

---

## Core architecture

### 1. Repo-local guide config: `.pi/guides.json`

This is the canonical machine-readable activation file.

It defines:

- active profile or direct guide list
- preferred mode (`compact` or `full`)
- explicit additions/removals
- explicit variant overrides

### 2. Repo-local prose/context: `AGENTS.md`

This remains a normal pi context file.

It is for:

- repo facts
- commands
- workflow expectations
- repo-specific constraints

It is **not** the canonical guide-selection manifest.

### 3. Package extension: `extensions/guide-system.ts`

This is the activation engine.

Pi provides the built-in extension hook `before_agent_start`.
This package implements a custom extension that subscribes to that hook.

The extension:

- reads `.pi/guides.json`
- resolves profiles using `registry/profiles.json`
- resolves guide variants using `registry/guides.json`
- loads the selected markdown guide files
- appends the resolved guide content to the effective system prompt
- exposes helper commands
- shows active guide status in the footer

### 4. Package distribution: `package.json`

This repo is a pi package repository.
It is intended to be installed:

- globally via `pi install ...`, or
- project-locally via `.pi/settings.json`

---

## Repository layout

```text
package.json
README.md
AGENTS.md

extensions/
  guide-system.ts

files/
  tigerstyle-strict-compact.md
  tigerstyle-strict-full.md

registry/
  guides.json
  profiles.json

templates/
  repo-AGENTS.md
  guides.json.example
  settings.json.example

schemas/
  guides.schema.json
  profiles.schema.json

prompts/
  guide-review.md

bin/
  validate-pi-guides

.pi/
  settings.json
  guides.json
```

---

## Installation

### Global install

Example:

```json
{
  "packages": [
    "npm:@sillypoise/pi-guides@0.1.0"
  ]
}
```

You can place that in `~/.pi/agent/settings.json`, or install through `pi install`.

### Project-local install

In a repo consuming this package:

```json
{
  "packages": [
    "npm:@sillypoise/pi-guides@0.1.0"
  ]
}
```

Place that in `.pi/settings.json`.

### Local development in this repo

This repository self-hosts its own package during development.

`.pi/settings.json` contains:

```json
{
  "packages": [".."]
}
```

Because `.pi/settings.json` is inside `.pi/`, the relative path `..` resolves to the repository root.
That lets pi load this local package while working in this repository.

---

## Repo activation contract

A consuming repository should normally have:

### `.pi/guides.json`

Minimal example:

```json
{
  "version": 1,
  "profile": "core",
  "mode": "compact",
  "additions": [],
  "removals": [],
  "variants": {}
}
```

### `AGENTS.md`

Generated from `templates/repo-AGENTS.md` or created manually following the same contract.

Important rule:

- `.pi/guides.json` = machine-readable guide selection
- `AGENTS.md` = human-readable repo context

---

## Commands provided by the extension

### `/guides`

Shows the currently resolved guide state in a widget and updates footer status.

### `/guide-init`

Scaffolds missing repo files from package templates:

- `.pi/guides.json`
- `AGENTS.md`

This command is conservative:

- it does not overwrite existing files
- it does not attempt complex AGENTS migrations yet
- it does not write `.pi/settings.json` for consumer repos because the package source may differ between local, npm, and git installs

### `/guide-sync`

Refreshes only the managed header block inside `AGENTS.md`.

It will:

- create `AGENTS.md` from the template if missing
- update the managed header block if the markers are present exactly once
- refuse risky rewrites if the marker contract is missing or malformed

---

## Guide registry contract

`registry/guides.json` is the machine-canonical guide registry.

The extension reads this file at runtime.
It should not parse `VARIANTS.md`-style prose.

Each guide entry defines:

- stable guide id
- title
- precedence tier
- summary
- defaults for compact/full resolution
- available variants and their file paths

Current v0.1 registry contains only one guide family:

- `tigerstyle`

---

## Profile registry contract

`registry/profiles.json` is the machine-canonical profile registry.

Current v0.1 profile set:

- `core`

This currently expands to:

- `tigerstyle`

Profiles are intentionally simple in v0.1:

- no inheritance
- no dynamic composition rules
- no hidden expansions

---

## Resolution rules

At runtime the extension resolves guides like this:

1. Load `.pi/guides.json`
2. Expand either:
   - `profile`, or
   - direct `guides`
3. Apply `additions`
4. Apply `removals`
5. Resolve each guide to a concrete variant
6. Order resolved guides by registry precedence
7. Inject the active guide set into the system prompt in `before_agent_start`

### Variant resolution order

If `mode` is `compact`, resolution prefers:

1. `strict-compact`
2. `pragmatic-compact`
3. `strict-full`
4. `pragmatic-full`

If `mode` is `full`, resolution prefers:

1. `strict-full`
2. `pragmatic-full`
3. `strict-compact`
4. `pragmatic-compact`

Explicit `variants.<guide-id>` overrides take precedence over the mode default.

---

## Validation

Run:

```bash
./bin/validate-pi-guides
```

Current validation checks:

- `package.json` has pi-package metadata
- registry files are valid JSON
- guide variant paths exist
- profile guide references are valid
- template managed header markers exist exactly once
- key runtime files exist

---

## Why only base TigerStyle for now

This package is being built incrementally.

For the initial pi-native port, only the language-agnostic TigerStyle base has been brought over.
That keeps the contract smaller while the extension, repo activation model, and documentation stabilize.

Language-specific TigerStyle variants and broader guide families can be added later without changing the core architecture:

- add guide files
- register them in `registry/guides.json`
- optionally add profiles in `registry/profiles.json`
- document them in this repository

---

## Development notes

When changing any of the following, update the docs and rerun validation:

- `extensions/guide-system.ts`
- `registry/guides.json`
- `registry/profiles.json`
- `templates/repo-AGENTS.md`
- `schemas/*.json`

If you change a contract, document the new behavior in this README and keep the template/registry/runtime logic aligned.
