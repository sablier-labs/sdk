import * as fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import globby from "globby";
import { beforeAll, describe, expect, it, test } from "vitest";

// TypeScript utility types for compile-time validation
type IsReadonlyArray<T> = T extends readonly unknown[] ? true : false;
type AssertTrue<T extends true> = T;

const PROJECT_ROOT = process.cwd();
const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const ABI_FILE_PATTERNS = [
  "src/evm/releases/**/abi/*.ts",
  "src/evm/comptroller/**/abi/*.ts",
] as const;
const JSON_ABI_PATTERN = "abi/**/*.json";

function isAbiArray(value: unknown): value is readonly unknown[] {
  return Array.isArray(value);
}

function getRelativePath(filePath: string): string {
  return path.relative(PROJECT_ROOT, filePath);
}

function getAbiExports(abiModule: Record<string, unknown>) {
  return Object.entries(abiModule).filter(([exportName]) => exportName.endsWith("Abi"));
}

function normalizeAbi(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(normalizeAbi);
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, innerValue]) => [key, normalizeAbi(innerValue)])
    );
  }

  return value;
}

function canonicalizeAbi(abi: readonly unknown[]) {
  return abi
    .map((item) => normalizeAbi(item))
    .sort((left, right) => JSON.stringify(left).localeCompare(JSON.stringify(right)));
}

function getAllAbiFiles() {
  return getSortedMatches(ABI_FILE_PATTERNS);
}

function getAllPublishedAbiJsonFiles() {
  return getSortedMatches(JSON_ABI_PATTERN);
}

function getModuleSpecifier(filePath: string): string {
  const relativePath = path.relative(TEST_DIR, filePath).replace(/\.ts$/, "");
  const moduleSpecifier = relativePath.split(path.sep).join("/");

  return moduleSpecifier.startsWith(".") ? moduleSpecifier : `./${moduleSpecifier}`;
}

function importAbiModule(filePath: string): Promise<Record<string, unknown>> {
  return import(getModuleSpecifier(filePath));
}

async function readJsonAbi(filePath: string): Promise<unknown> {
  return JSON.parse(await fs.readFile(filePath, "utf-8"));
}

async function getSortedMatches(patterns: string | readonly string[]) {
  return (
    await globby(patterns, {
      absolute: true,
      cwd: PROJECT_ROOT,
    })
  ).sort();
}

function getPublishedAbiTsPath(jsonPath: string): string {
  const relativePath = getRelativePath(jsonPath);
  const parts = relativePath.split(path.sep);

  if (parts[0] !== "abi") {
    throw new Error(`Unsupported ABI path outside abi/: ${relativePath}`);
  }

  if (parts[1] === "comptroller") {
    if (parts.length !== 4) {
      throw new Error(`Unsupported comptroller ABI path: ${relativePath}`);
    }

    return path.join(
      PROJECT_ROOT,
      "src",
      "evm",
      "comptroller",
      parts[2],
      "abi",
      parts[3].replace(/\.json$/, ".ts")
    );
  }

  if (parts.length !== 4) {
    throw new Error(`Unsupported release ABI path: ${relativePath}`);
  }

  return path.join(
    PROJECT_ROOT,
    "src",
    "evm",
    "releases",
    parts[1],
    parts[2],
    "abi",
    parts[3].replace(/\.json$/, ".ts")
  );
}

describe("ABI const assertions", () => {
  let abiFiles: string[] = [];
  let jsonAbiFiles: string[] = [];

  // Discover all ABI files once before all tests
  beforeAll(async () => {
    abiFiles = await getAllAbiFiles();
    jsonAbiFiles = await getAllPublishedAbiJsonFiles();
  });

  describe("ABI exports validation", () => {
    it("validates all ABI files export arrays with proper structure", async () => {
      expect(abiFiles.length).toBeGreaterThan(0);

      for (const filePath of abiFiles) {
        const abiModule = await importAbiModule(filePath);
        const abiExports = getAbiExports(abiModule);

        expect(
          abiExports.length,
          `${getRelativePath(filePath)} should export at least one *Abi constant`
        ).toBeGreaterThan(0);

        for (const [exportName, exportValue] of abiExports) {
          expect(isAbiArray(exportValue), `${exportName} should be an array`).toBe(true);

          if (!isAbiArray(exportValue)) {
            continue;
          }

          expect(exportValue.length, `${exportName} should not be empty`).toBeGreaterThan(0);

          for (const [index, item] of exportValue.entries()) {
            expect(typeof item, `${exportName}[${index}] should be an object`).toBe("object");
            expect(item, `${exportName}[${index}] should not be null`).not.toBe(null);
          }
        }
      }
    });

    it("matches all published ABI JSON files against their TypeScript ABIs", async () => {
      expect(jsonAbiFiles.length).toBeGreaterThan(0);
      const mismatches: string[] = [];

      for (const jsonPath of jsonAbiFiles) {
        const tsPath = getPublishedAbiTsPath(jsonPath);
        const jsonAbi = await readJsonAbi(jsonPath);
        const jsonRelativePath = getRelativePath(jsonPath);
        const tsRelativePath = getRelativePath(tsPath);

        expect(isAbiArray(jsonAbi), `${jsonRelativePath} should contain an ABI array`).toBe(true);

        if (!isAbiArray(jsonAbi)) {
          mismatches.push(`${jsonRelativePath}: published ABI is not an array`);
          continue;
        }

        try {
          await fs.access(tsPath);
        } catch {
          mismatches.push(`${jsonRelativePath}: missing TypeScript ABI at ${tsRelativePath}`);
          continue;
        }

        const abiModule = await importAbiModule(tsPath);
        const abiExports = getAbiExports(abiModule);

        if (abiExports.length !== 1) {
          mismatches.push(
            `${jsonRelativePath}: expected exactly one *Abi export in ${tsRelativePath}, found ${abiExports.length}`
          );
          continue;
        }

        const [, tsAbi] = abiExports[0]!;

        if (!isAbiArray(tsAbi)) {
          mismatches.push(`${tsRelativePath}: exported ABI is not an array`);
          continue;
        }

        if (!isDeepStrictEqual(canonicalizeAbi(tsAbi), canonicalizeAbi(jsonAbi))) {
          mismatches.push(`${jsonRelativePath}: mismatch with ${tsRelativePath}`);
        }
      }

      expect(
        mismatches,
        mismatches.join("\n") || "all published ABI JSON files should match their TypeScript ABIs"
      ).toStrictEqual([]);
    });
  });

  describe("Source code 'as const' assertion validation", () => {
    it("validates all ABI files contain 'as const' assertions", async () => {
      expect(abiFiles.length).toBeGreaterThan(0);

      for (const filePath of abiFiles) {
        const sourceContent = await fs.readFile(filePath, "utf-8");
        const hasAsConst = /\]\s+as\s+const\s*;/i.test(sourceContent);

        expect(
          hasAsConst,
          `File ${path.basename(filePath)} is missing 'as const' assertion. Found content ending: "${sourceContent.slice(-100)}"`
        ).toBe(true);

        const hasProperExport = /export\s+const\s+\w+Abi\s*=\s*\[[\s\S]*\]\s+as\s+const\s*;/i.test(
          sourceContent
        );

        expect(
          hasProperExport,
          `File ${path.basename(filePath)} doesn't have proper ABI export pattern with 'as const'`
        ).toBe(true);
      }
    });
  });
});

// Type-level compile-time validation tests
describe("Type-level const validation", () => {
  // Import some representative ABI files for type checking
  test("Sample ABI files have correct const assertions", () => {
    // These imports will fail at compile time if ABIs don't have proper 'as const'
    type TestAirdropsV14 =
      typeof import("../../../src/evm/releases/airdrops/v1.3/abi/SablierMerkleInstant.js").sablierMerkleInstantAbi;
    type TestLockupV10 =
      typeof import("../../../src/evm/releases/lockup/v2.0/abi/SablierLockup.js").sablierLockupAbi;
    type TestFlowV10 =
      typeof import("../../../src/evm/releases/flow/v1.1/abi/SablierFlow.js").sablierFlowAbi;

    // These type assertions will fail at compile time if the ABIs aren't readonly
    type _AssertAirdrops = AssertTrue<IsReadonlyArray<TestAirdropsV14>>;
    type _AssertLockup = AssertTrue<IsReadonlyArray<TestLockupV10>>;
    type _AssertFlow = AssertTrue<IsReadonlyArray<TestFlowV10>>;

    // Runtime assertion to ensure test executes
    expect(true).toBe(true);
  });
});
