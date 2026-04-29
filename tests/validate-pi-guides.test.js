import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const TEST_DIRECTORY_PATH = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT_PATH = resolve(TEST_DIRECTORY_PATH, "..");
const VALIDATOR_PATH = resolve(REPO_ROOT_PATH, "bin", "validate-pi-guides");
const BEGIN_HEADER = "<!-- BEGIN MANAGED GUIDE HEADER -->";
const END_HEADER = "<!-- END MANAGED GUIDE HEADER -->";
const FIXTURE_RELATIVE_PATHS = [
  "package.json",
  "README.md",
  "registry/guides.json",
  "registry/profiles.json",
  "schemas/guides.schema.json",
  "schemas/profiles.schema.json",
  "templates/repo-AGENTS.md",
  "templates/guides.json.example",
  "templates/settings.json.example",
  "extensions/guide-system.ts",
  "prompts/guide-review.md",
  "files/tigerstyle-strict-compact.md",
  "files/tigerstyle-strict-full.md",
  "files/security-core/security-core-strict-compact.md",
  "files/security-core/security-core-strict-full.md",
  "files/contract-core/contract-core-strict-compact.md",
  "files/contract-core/contract-core-strict-full.md",
  "files/robustness-core/robustness-core-strict-compact.md",
  "files/robustness-core/robustness-core-strict-full.md",
  "files/reproducibility-core/reproducibility-core-strict-compact.md",
  "files/reproducibility-core/reproducibility-core-strict-full.md",
  "files/ui/uistyle-strict-compact.md",
  "files/ui/uistyle-strict-full.md",
  "files/observability/observability-strict-compact.md",
  "files/observability/observability-strict-full.md",
  "files/change-risk/change-risk-strict-compact.md",
  "files/change-risk/change-risk-strict-full.md",
  "files/epistemics/epistemics-strict-compact.md",
  "files/epistemics/epistemics-strict-full.md",
  "files/performance/performance-strict-compact.md",
  "files/performance/performance-strict-full.md",
  "files/privacy/privacy-strict-compact.md",
  "files/privacy/privacy-strict-full.md",
  "files/operability/operability-strict-compact.md",
  "files/operability/operability-strict-full.md",
  "files/maintainability/maintainability-strict-compact.md",
  "files/maintainability/maintainability-strict-full.md",
  "files/legacy-evolution-mode/legacy-evolution-mode-strict-compact.md",
  "files/legacy-evolution-mode/legacy-evolution-mode-strict-full.md",
  "files/incremental-refactoring-strategy/incremental-refactoring-strategy-strict-compact.md",
  "files/incremental-refactoring-strategy/incremental-refactoring-strategy-strict-full.md",
  "files/compatibility-evolution/compatibility-evolution-strict-compact.md",
  "files/compatibility-evolution/compatibility-evolution-strict-full.md",
  "files/diataxis/diataxis-strict-compact.md",
  "files/diataxis/diataxis-strict-full.md",
  "files/testing/testing-pragmatic-compact.md",
  "files/testing/testing-pragmatic-full.md",
  "files/writing/writing-strict-compact.md",
  "files/writing/writing-strict-full.md",
  "files/argument-structure/argument-structure-pragmatic-compact.md",
  "files/argument-structure/argument-structure-pragmatic-full.md",
  "files/creative-constraints/creative-constraints-strict-compact.md",
  "files/creative-constraints/creative-constraints-strict-full.md",
  "files/novelty-budgeting/novelty-budgeting-strict-compact.md",
  "files/novelty-budgeting/novelty-budgeting-strict-full.md",
  "files/counter-intuition-and-left-turn-thinking/counter-intuition-and-left-turn-thinking-strict-compact.md",
  "files/counter-intuition-and-left-turn-thinking/counter-intuition-and-left-turn-thinking-strict-full.md",
  "files/anki-authoring/anki-authoring-strict-compact.md",
  "files/anki-authoring/anki-authoring-strict-full.md",
  "bin/validate-pi-guides",
  ".pi/guides.json",
  ".pi/settings.json",
];

function writeFixtureFile(fixtureRootPath, relativePath, content) {
  const targetPath = resolve(fixtureRootPath, relativePath);
  mkdirSync(dirname(targetPath), { recursive: true });
  writeFileSync(targetPath, content, "utf8");
}

function createFixtureRootPath() {
  const fixtureRootPath = mkdtempSync(join(tmpdir(), "pi-guides-validator-"));

  for (const relativePath of FIXTURE_RELATIVE_PATHS) {
    const sourcePath = resolve(REPO_ROOT_PATH, relativePath);
    writeFixtureFile(fixtureRootPath, relativePath, readFileSync(sourcePath, "utf8"));
  }

  return fixtureRootPath;
}

function runValidator(fixtureRootPath) {
  return spawnSync(process.execPath, [VALIDATOR_PATH], {
    cwd: fixtureRootPath,
    encoding: "utf8",
  });
}

function withFixture(runCase) {
  const fixtureRootPath = createFixtureRootPath();

  try {
    runCase(fixtureRootPath);
  } finally {
    rmSync(fixtureRootPath, { recursive: true, force: true });
  }
}

// Goal: cover valid, error, and boundary CLI paths without adding external test tools.
test("validate-pi-guides passes for a valid repository fixture", () => {
  withFixture((fixtureRootPath) => {
    const result = runValidator(fixtureRootPath);

    assert.equal(result.status, 0);
    assert.match(result.stdout, /pi-guides validation passed/);
    assert.equal(result.stderr, "");
  });
});

test("validate-pi-guides reports malformed JSON with a file-specific error", () => {
  withFixture((fixtureRootPath) => {
    writeFixtureFile(fixtureRootPath, "registry/profiles.json", "{\n");

    const result = runValidator(fixtureRootPath);

    assert.equal(result.status, 1);
    assert.match(result.stderr, /registry\/profiles\.json:/);
    assert.match(result.stderr, /pi-guides validation failed:/);
  });
});

test("validate-pi-guides rejects compact defaults that point at full variants", () => {
  withFixture((fixtureRootPath) => {
    const guidesPath = resolve(fixtureRootPath, "registry", "guides.json");
    const guidesRegistry = JSON.parse(readFileSync(guidesPath, "utf8"));

    guidesRegistry.guides.tigerstyle.defaults.compact = "strict-full";
    writeFixtureFile(
      fixtureRootPath,
      "registry/guides.json",
      JSON.stringify(guidesRegistry, null, 2),
    );

    const result = runValidator(fixtureRootPath);

    assert.equal(result.status, 1);
    assert.match(
      result.stderr,
      /Guide 'tigerstyle' defaults\.compact must reference a 'compact' variant/,
    );
  });
});

test("validate-pi-guides rejects reversed managed header markers", () => {
  withFixture((fixtureRootPath) => {
    const malformedTemplate = [
      "# Repo Agent Context",
      "",
      END_HEADER,
      "Managed header body.",
      BEGIN_HEADER,
      "",
    ].join("\n");

    writeFixtureFile(fixtureRootPath, "templates/repo-AGENTS.md", malformedTemplate);

    const result = runValidator(fixtureRootPath);

    assert.equal(result.status, 1);
    assert.match(
      result.stderr,
      /templates\/repo-AGENTS\.md must place the BEGIN marker before the END marker/,
    );
  });
});
