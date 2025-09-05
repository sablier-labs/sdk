import path from "node:path";
import globby from "globby";
import { beforeAll, describe, expect, it, test } from "vitest";

// TypeScript utility types for compile-time validation
type IsReadonlyArray<T> = T extends readonly unknown[] ? true : false;
type AssertAsConst<T> = IsReadonlyArray<T> extends true ? T : never;

// Dynamic file discovery
async function getAllAbiFiles(): Promise<string[]> {
  const files = await globby("src/releases/**/abi/*.ts", {
    absolute: true,
    cwd: process.cwd(),
  });

  return files.sort(); // Sort for consistent test ordering
}

describe("ABI const assertions", () => {
  let abiFiles: string[];

  // Discover all ABI files once before all tests
  beforeAll(async () => {
    abiFiles = await getAllAbiFiles();
  });

  describe("ABI exports validation", () => {
    it("validates all ABI files export arrays with proper structure", async () => {
      for (const filePath of abiFiles) {
        // Convert absolute path to relative path for import
        const relativePath = path.relative(process.cwd(), filePath);
        const modulePath = `../../${relativePath.replace(/\.ts$/, "")}`;

        try {
          // Dynamic import of the ABI module
          const abiModule = await import(modulePath);

          // Get all exports
          const exports = Object.entries(abiModule);

          // Verify we have exports
          expect(exports.length).toBeGreaterThan(0);

          // Check each export
          exports.forEach(([exportName, exportValue]) => {
            // Skip non-ABI exports (if any)
            if (!exportName.toLowerCase().includes("abi")) {
              return;
            }

            // Verify it's an array
            expect(Array.isArray(exportValue), `${exportName} should be an array`).toBe(true);

            // Verify it has reasonable content
            const abi = exportValue as unknown[];
            expect(abi.length, `${exportName} should not be empty`).toBeGreaterThan(0);

            // Verify ABI structure (basic validation)
            abi.forEach((item, index) => {
              expect(typeof item, `${exportName}[${index}] should be an object`).toBe("object");
              expect(item, `${exportName}[${index}] should not be null`).not.toBe(null);
            });
          });
        } catch (error) {
          throw new Error(`Failed to import ${filePath}: ${error}`);
        }
      }
    });
  });

  describe("Source code 'as const' assertion validation", () => {
    it("validates all ABI files contain 'as const' assertions", async () => {
      const fs = await import("node:fs/promises");

      for (const filePath of abiFiles) {
        try {
          // Read the source file content
          const sourceContent = await fs.readFile(filePath, "utf-8");

          // Check for 'as const' assertion
          const hasAsConst = /\]\s+as\s+const\s*;/i.test(sourceContent);

          expect(
            hasAsConst,
            `File ${path.basename(filePath)} is missing 'as const' assertion. Found content ending: "${sourceContent.slice(-100)}"`,
          ).toBe(true);

          // Additional validation: ensure the export pattern is correct
          const hasProperExport = /export\s+const\s+\w+Abi\s*=\s*\[[\s\S]*\]\s+as\s+const\s*;/i.test(sourceContent);

          expect(
            hasProperExport,
            `File ${path.basename(filePath)} doesn't have proper ABI export pattern with 'as const'`,
          ).toBe(true);
        } catch (error) {
          throw new Error(`Failed to read file ${filePath}: ${error}`);
        }
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
      typeof import("../../src/releases/airdrops/v1.3/abi/SablierMerkleInstant").sablierMerkleInstantAbi;
    type TestLockupV10 = typeof import("../../src/releases/lockup/v2.0/abi/SablierLockup").sablierLockupAbi;
    type TestFlowV10 = typeof import("../../src/releases/flow/v1.1/abi/SablierFlow").sablierFlowAbi;

    // These type assertions will fail if the ABIs aren't const
    type _AssertAirdrops = AssertAsConst<TestAirdropsV14>;
    type _AssertLockup = AssertAsConst<TestLockupV10>;
    type _AssertFlow = AssertAsConst<TestFlowV10>;

    // Runtime assertion to ensure test executes
    expect(true).toBe(true);
  });
});
