#!/usr/bin/env bun

/**
 * Generates TypeScript ABI files from JSON ABI files.
 *
 * Scans `abi/<protocol>/<version>/*.json` and writes corresponding TypeScript
 * files to `src/evm/releases/<protocol>/<version>/abi/<ContractName>.ts`.
 *
 * Only generates for the latest version of each protocol.
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const ABI_DIR = join(ROOT, "abi");
const RELEASES_DIR = join(ROOT, "src", "evm", "releases");
const VERSION_PREFIX = /^v/;

type GenerationSummary = {
  generated: number;
  skippedVersions: number;
};

function listDirectories(path: string): string[] {
  return readdirSync(path).filter((entry) => statSync(join(path, entry)).isDirectory());
}

function listJsonFiles(path: string): string[] {
  return readdirSync(path).filter((entry) => entry.endsWith(".json"));
}

function compareVersions(a: string, b: string): number {
  const aParts = a.replace(VERSION_PREFIX, "").split(".").map(Number);
  const bParts = b.replace(VERSION_PREFIX, "").split(".").map(Number);

  for (let index = 0; index < Math.max(aParts.length, bParts.length); index++) {
    const difference = (aParts[index] ?? 0) - (bParts[index] ?? 0);
    if (difference !== 0) {
      return difference;
    }
  }

  return 0;
}

function findLatestVersion(protocol: string): string | undefined {
  const protocolReleasesDir = join(RELEASES_DIR, protocol);
  if (!existsSync(protocolReleasesDir)) {
    return undefined;
  }

  return listDirectories(protocolReleasesDir).find((version) => {
    const indexPath = join(protocolReleasesDir, version, "index.ts");
    return existsSync(indexPath) && readFileSync(indexPath, "utf-8").includes("isLatest: true");
  });
}

function shouldSkipVersion(
  protocol: string,
  version: string,
  latestVersion: string | undefined
): boolean {
  const releaseDir = join(RELEASES_DIR, protocol, version);
  if (!existsSync(releaseDir)) {
    return true;
  }

  if (!latestVersion) {
    return false;
  }

  const indexPath = join(releaseDir, "index.ts");
  if (!existsSync(indexPath)) {
    return false;
  }

  return compareVersions(version, latestVersion) < 0;
}

/** Serialize a value as a TypeScript literal with bare keys and trailing commas. */
function toTypeScriptLiteral(value: unknown, depth = 0): string {
  if (value === null || value === undefined) {
    return String(value);
  }
  if (typeof value === "string") {
    return JSON.stringify(value);
  }
  if (typeof value !== "object") {
    return String(value);
  }

  const nextIndent = "  ".repeat(depth + 1);
  const currentIndent = "  ".repeat(depth);

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "[]";
    }

    const items = value.map((item) => `${nextIndent}${toTypeScriptLiteral(item, depth + 1)}`);
    return `[\n${items.join(",\n")},\n${currentIndent}]`;
  }

  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length === 0) {
    return "{}";
  }

  const properties = entries.map(
    ([key, entryValue]) => `${nextIndent}${key}: ${toTypeScriptLiteral(entryValue, depth + 1)}`
  );
  return `{\n${properties.join(",\n")},\n${currentIndent}}`;
}

function getExportName(contractName: string): string {
  return `${contractName.charAt(0).toLowerCase()}${contractName.slice(1)}Abi`;
}

function generateVersionAbis(protocol: string, version: string): number {
  const sourceDir = join(ABI_DIR, protocol, version);
  const targetDir = join(RELEASES_DIR, protocol, version, "abi");
  mkdirSync(targetDir, { recursive: true });

  let generated = 0;

  for (const file of listJsonFiles(sourceDir)) {
    const contractName = basename(file, ".json");
    const exportName = getExportName(contractName);
    const abiPath = join(sourceDir, file);
    const abi = JSON.parse(readFileSync(abiPath, "utf-8"));
    const targetPath = join(targetDir, `${contractName}.ts`);

    writeFileSync(
      targetPath,
      `export const ${exportName} = ${toTypeScriptLiteral(abi)} as const;\n`
    );
    generated++;
  }

  return generated;
}

function generateProtocolAbis(protocol: string): GenerationSummary {
  const latestVersion = findLatestVersion(protocol);
  let generated = 0;
  let skippedVersions = 0;

  for (const version of listDirectories(join(ABI_DIR, protocol))) {
    if (shouldSkipVersion(protocol, version, latestVersion)) {
      skippedVersions++;
      continue;
    }

    generated += generateVersionAbis(protocol, version);
  }

  return { generated, skippedVersions };
}

function main(): void {
  let generated = 0;
  let skippedVersions = 0;

  for (const protocol of listDirectories(ABI_DIR)) {
    const summary = generateProtocolAbis(protocol);
    generated += summary.generated;
    skippedVersions += summary.skippedVersions;
  }

  console.log(`Generated ${generated} TypeScript ABI files (${skippedVersions} versions skipped)`);
}

main();
