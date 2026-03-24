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

function dirs(path: string): string[] {
  return readdirSync(path).filter((f) => statSync(join(path, f)).isDirectory());
}

function parseVersion(version: string): number[] {
  return version.replace(VERSION_PREFIX, "").split(".").map(Number);
}

function compareVersions(a: number[], b: number[]): number {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const diff = (a[i] ?? 0) - (b[i] ?? 0);
    if (diff !== 0) {
      return diff;
    }
  }
  return 0;
}

function findLatestVersion(protocol: string): number[] | undefined {
  const dir = join(RELEASES_DIR, protocol);
  if (!existsSync(dir)) {
    return undefined;
  }

  for (const version of readdirSync(dir)) {
    const indexPath = join(dir, version, "index.ts");
    if (existsSync(indexPath) && readFileSync(indexPath, "utf-8").includes("isLatest: true")) {
      return parseVersion(version);
    }
  }
  return undefined;
}

function isOlderThanLatest(
  version: string,
  latest: number[] | undefined,
  releaseDir: string
): boolean {
  if (!latest) {
    return false;
  }
  const indexPath = join(releaseDir, "index.ts");
  if (!existsSync(indexPath)) {
    return false;
  }
  return compareVersions(parseVersion(version), latest) < 0;
}

/** Serialize a value as a TypeScript literal with bare keys and trailing commas. */
function toTs(value: unknown, depth = 0): string {
  if (value === null || value === undefined) {
    return String(value);
  }
  if (typeof value === "string") {
    return JSON.stringify(value);
  }
  if (typeof value !== "object") {
    return String(value);
  }

  const pad = "  ".repeat(depth + 1);
  const closePad = "  ".repeat(depth);

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "[]";
    }
    return `[\n${value.map((v) => `${pad}${toTs(v, depth + 1)}`).join(",\n")},\n${closePad}]`;
  }

  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length === 0) {
    return "{}";
  }
  return `{\n${entries.map(([k, v]) => `${pad}${k}: ${toTs(v, depth + 1)}`).join(",\n")},\n${closePad}}`;
}

let generated = 0;
let skipped = 0;

for (const protocol of dirs(ABI_DIR)) {
  const latestVersion = findLatestVersion(protocol);

  for (const version of dirs(join(ABI_DIR, protocol))) {
    const releaseDir = join(RELEASES_DIR, protocol, version);
    if (!existsSync(releaseDir) || isOlderThanLatest(version, latestVersion, releaseDir)) {
      skipped++;
      continue;
    }

    const targetDir = join(releaseDir, "abi");
    mkdirSync(targetDir, { recursive: true });

    for (const file of readdirSync(join(ABI_DIR, protocol, version)).filter((f) =>
      f.endsWith(".json")
    )) {
      const contractName = basename(file, ".json");
      const exportName = `${contractName.charAt(0).toLowerCase()}${contractName.slice(1)}Abi`;
      const abi = JSON.parse(readFileSync(join(ABI_DIR, protocol, version, file), "utf-8"));

      writeFileSync(
        join(targetDir, `${contractName}.ts`),
        `export const ${exportName} = ${toTs(abi)} as const;\n`
      );
      generated++;
    }
  }
}

console.log(`Generated ${generated} TypeScript ABI files (${skipped} versions skipped)`);
