#!/usr/bin/env bun

/**
 * Generates TypeScript ABI files from JSON ABI files.
 *
 * Usage:
 *   bun scripts/generate-abis.ts [protocol] [version]
 *
 * Scans `abi/<protocol>/<version>/*.json` and writes corresponding TypeScript
 * files to `src/evm/releases/<protocol>/<version>/abi/<ContractName>.ts`.
 */

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Protocol } from "../src/evm/enums.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ABI_DIR = join(ROOT, "abi");
const RELEASES_DIR = join(ROOT, "src", "evm", "releases");
const ALL_PROTOCOLS = "all";
const LATEST_VERSION = "latest";

const SUPPORTED_PROTOCOLS = [
  Protocol.Airdrops,
  Protocol.Flow,
  Protocol.Lockup,
  Protocol.Bob,
] as const;

type SupportedProtocol = (typeof SUPPORTED_PROTOCOLS)[number];
type ProtocolArgument = SupportedProtocol | typeof ALL_PROTOCOLS;
type VersionArgument = typeof LATEST_VERSION | string;
type CliOptions = {
  protocol: ProtocolArgument;
  version: VersionArgument;
};
type GenerationTarget = {
  protocol: SupportedProtocol;
  version: string;
};

function listDirectories(path: string): string[] {
  if (!existsSync(path)) {
    return [];
  }

  return readdirSync(path, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function listJsonFiles(path: string): string[] {
  return readdirSync(path, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => entry.name);
}

function getAbiVersionDir(protocol: SupportedProtocol, version: string): string {
  return join(ABI_DIR, protocol, version);
}

function getReleaseVersionDir(protocol: SupportedProtocol, version: string): string {
  return join(RELEASES_DIR, protocol, version);
}

function hasGenerationInputs(protocol: SupportedProtocol, version: string): boolean {
  return (
    existsSync(getAbiVersionDir(protocol, version)) &&
    existsSync(getReleaseVersionDir(protocol, version))
  );
}

function getUsageText(): string {
  return [
    "Usage: bun scripts/generate-abis.ts [protocol] [version]",
    `Supported protocols: ${SUPPORTED_PROTOCOLS.join(", ")}, ${ALL_PROTOCOLS}`,
    `Defaults: protocol=${ALL_PROTOCOLS}, version=${LATEST_VERSION}`,
  ].join("\n");
}

function createUsageError(message: string): Error {
  return new Error(`${message}\n\n${getUsageText()}`);
}

function createMissingVersionError(protocol: SupportedProtocol, version: string): Error {
  return new Error(
    [
      `Cannot generate ABIs for ${protocol} ${version}.`,
      `Expected ${getAbiVersionDir(protocol, version)} and ${getReleaseVersionDir(protocol, version)} to exist.`,
    ].join("\n")
  );
}

function isSupportedProtocol(value: string): value is SupportedProtocol {
  return SUPPORTED_PROTOCOLS.includes(value as SupportedProtocol);
}

function findLatestVersion(protocol: SupportedProtocol): string | undefined {
  const protocolReleasesDir = join(RELEASES_DIR, protocol);
  if (!existsSync(protocolReleasesDir)) {
    return undefined;
  }

  return listDirectories(protocolReleasesDir).find((version) => {
    const indexPath = join(protocolReleasesDir, version, "index.ts");
    return existsSync(indexPath) && readFileSync(indexPath, "utf-8").includes("isLatest: true");
  });
}

function resolveVersion(protocol: SupportedProtocol, version: VersionArgument): string {
  if (version !== LATEST_VERSION) {
    return version;
  }

  const latestVersion = findLatestVersion(protocol);
  if (!latestVersion) {
    throw new Error(`No latest release found for protocol "${protocol}".`);
  }

  return latestVersion;
}

function resolveTarget(protocol: SupportedProtocol, version: VersionArgument): GenerationTarget {
  const resolvedVersion = resolveVersion(protocol, version);

  if (!hasGenerationInputs(protocol, resolvedVersion)) {
    throw createMissingVersionError(protocol, resolvedVersion);
  }

  return { protocol, version: resolvedVersion };
}

function parseCliArgs(args: string[]): CliOptions {
  if (args.length > 2) {
    throw createUsageError("Too many arguments.");
  }

  const [rawProtocol = ALL_PROTOCOLS, rawVersion = LATEST_VERSION] = args;

  if (rawProtocol !== ALL_PROTOCOLS && !isSupportedProtocol(rawProtocol)) {
    throw createUsageError(`Invalid protocol "${rawProtocol}".`);
  }

  return {
    protocol: rawProtocol as ProtocolArgument,
    version: rawVersion,
  };
}

function resolveGenerationTargets(options: CliOptions): GenerationTarget[] {
  if (options.protocol !== ALL_PROTOCOLS) {
    return [resolveTarget(options.protocol, options.version)];
  }

  if (options.version === LATEST_VERSION) {
    return SUPPORTED_PROTOCOLS.map((protocol) => resolveTarget(protocol, options.version));
  }

  const targets = SUPPORTED_PROTOCOLS.filter((protocol) =>
    hasGenerationInputs(protocol, options.version)
  ).map((protocol) => ({
    protocol,
    version: options.version,
  }));

  if (targets.length === 0) {
    throw new Error(
      `Cannot generate ABIs for version "${options.version}" on any supported protocol.`
    );
  }

  return targets;
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

function listTsFiles(path: string): string[] {
  if (!existsSync(path)) {
    return [];
  }

  return readdirSync(path, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".ts"))
    .map((entry) => entry.name);
}

function generateVersionAbis(protocol: SupportedProtocol, version: string): number {
  const sourceDir = getAbiVersionDir(protocol, version);
  const targetDir = join(getReleaseVersionDir(protocol, version), "abi");
  mkdirSync(targetDir, { recursive: true });

  const expectedFiles = new Set(listJsonFiles(sourceDir).map((f) => basename(f, ".json") + ".ts"));

  // Prune stale .ts files that no longer have a corresponding JSON source
  for (const tsFile of listTsFiles(targetDir)) {
    if (!expectedFiles.has(tsFile)) {
      unlinkSync(join(targetDir, tsFile));
    }
  }

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

function run(args: string[] = process.argv.slice(2)): {
  generated: number;
  targets: GenerationTarget[];
} {
  const options = parseCliArgs(args);
  const targets = resolveGenerationTargets(options);

  const generated = targets.reduce(
    (total, target) => total + generateVersionAbis(target.protocol, target.version),
    0
  );

  return { generated, targets };
}

function isDirectExecution(moduleUrl: string, entrypoint = process.argv[1]): boolean {
  if (!entrypoint) {
    return false;
  }

  return fileURLToPath(moduleUrl) === resolve(entrypoint);
}

function main(args: string[] = process.argv.slice(2)): void {
  try {
    const { generated, targets } = run(args);
    const scope = targets.map(({ protocol, version }) => `${protocol}@${version}`).join(", ");
    console.log(`Generated ${generated} TypeScript ABI files for ${scope}`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

if (isDirectExecution(import.meta.url)) {
  main();
}
