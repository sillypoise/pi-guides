# Package, Repo, and Session Model

This document explains which guide-system files live in the package, which live in each consumer
repository, and how runtime state is composed.

## The Three Layers

### 1. Package catalog layer

These files live only in the `pi-guides` package.
They define the reusable shared catalog.

Files:

- `registry/guides.json`
- `registry/profiles.json`
- `files/**/*.md`

Responsibilities:

- define which guides exist;
- define which profiles exist;
- define profile scope and behavior defaults;
- map guide ids to markdown files and variants.

Consumer repositories do not normally define their own catalog copies.

### 2. Repo baseline layer

This file lives in each consumer repository.
It defines the durable baseline activation for that repository.

File:

- `.pi/guides.json`

Responsibilities:

- choose the repo baseline profile or explicit guide list;
- choose the baseline mode;
- choose baseline additions, removals, and variant overrides.

This is the repo source of truth.

### 3. Session overlay layer

This state is transient and extension-managed.
It does not rewrite the repo baseline by default.

Source today:

- `/guide-session <profile-id|clear>`

Responsibilities:

- temporarily activate an overlay profile;
- temporarily change runtime behavior for the session;
- layer on top of the repo baseline rather than replace it.

## Which Files Belong Where

### Package-only files

These belong in `pi-guides` itself:

- `registry/guides.json`
- `registry/profiles.json`
- guide markdown files under `files/`
- package schemas
- extension code
- package prompts and skills

### Repo-local files

These belong in each consumer repository:

- `.pi/guides.json`
- `AGENTS.md`
- optionally `.pi/settings.json` when the repo pins the package source

A normal consumer repository should have `.pi/guides.json`, but not its own
`registry/profiles.json`.

## What Each File Means

### `registry/guides.json`

This is the guide catalog.
It answers:

- what guide ids exist;
- what precedence each guide has;
- what variants exist;
- which markdown file each variant loads.

### `registry/profiles.json`

This is the profile catalog.
It answers:

- what named activation presets exist;
- which guides each profile bundles;
- whether a profile is a baseline or overlay profile;
- which behavior defaults a profile implies.

### `.pi/guides.json`

This is the repo activation config.
It answers:

- which baseline profile this repository uses;
- which mode it prefers;
- which baseline modifications apply.

It does not define profile semantics itself.
It references package-defined profile ids.

## Command Semantics

### `/guide-profile <profile-id>`

Changes the repo baseline.

Effects:

- rewrites `.pi/guides.json`;
- persists the new baseline profile;
- reloads the runtime.

This replaces the baseline profile.
It is not a temporary overlay.

### `/guide-mode <compact|full>`

Changes the repo baseline mode.

Effects:

- rewrites `.pi/guides.json`;
- persists the new baseline mode;
- reloads the runtime.

### `/guide-session <profile-id>`

Activates a temporary session overlay.

Effects:

- does not rewrite `.pi/guides.json`;
- stores transient session state;
- overlays on top of the repo baseline.

### `/guide-session clear`

Clears the current session overlay.

Effects:

- does not rewrite `.pi/guides.json`;
- removes the transient session overlay;
- returns runtime behavior to the repo baseline.

## Baseline vs Overlay

### Baseline profile

The baseline profile is chosen by `.pi/guides.json`.
It is durable and commit-friendly.

Example:

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

This means the repository baseline is `core`.

### Session overlay profile

A session overlay profile is temporary.
It layers on top of the baseline for the current session.

Example:

- repo baseline = `core`
- session overlay = `review`

Effective runtime state becomes:

- baseline guides from `core`;
- plus overlay guides from `review`;
- plus overlay behavior such as read-only write policy.

This is additive overlay behavior, not baseline replacement.

## State Transition Table

| Action | Package catalog | Repo baseline `.pi/guides.json` | Session overlay | Effective runtime |
|---|---|---|---|---|
| `/guide-init` | unchanged | created if missing | unchanged | baseline becomes available |
| `/guide-profile core` | unchanged | set baseline to `core` | unchanged | baseline changes |
| `/guide-mode full` | unchanged | set baseline mode to `full` | unchanged | baseline mode changes |
| `/guide-session review` | unchanged | unchanged | set to `review` | baseline + review overlay |
| `/guide-session clear` | unchanged | unchanged | cleared | back to baseline only |

## Important Mental Model

Use this compact summary:

- package registry defines what exists;
- repo config chooses the baseline;
- session overlay temporarily layers on top of that baseline;
- the extension computes one effective activation state for each turn.

## Current Foundation Profiles

### Baseline profiles

- `core`
- `coreplus`
- `frontend`
- `backend`
- `docs`
- `security-sensitive`

### Overlay profiles

- `review`
- `migration`
- `debug`
- `design`
- `docs-authoring`
- `release`

## Design Principle

`/guide-profile` replaces the repo baseline.
`/guide-session` overlays on top of the repo baseline.
The package registry defines the vocabulary, while each repo's `.pi/guides.json` remains the
persistent source of truth for that repo.
