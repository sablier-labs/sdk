import * as path from "node:path";
import type { Sablier } from "@src/types";
import * as fs from "fs-extra";
import { log } from "./logger";

const ROOT_DIR = path.join(__dirname, "..", "..");
const DEPLOYMENTS_DIR = path.join(ROOT_DIR, "deployments");

if (!fs.existsSync(path.join(ROOT_DIR, "package.json"))) {
  throw new Error("ROOT_DIR is not set correctly");
}

/**
 * @example
 * deployments/
 * ├── lockup/
 * │ └── v2.0/
 * │   └── broadcasts/
 * │     └── mainnet.json
 * └── lockup/
 *   └── v1.2/
 *     └── core/
 *       └── broadcasts/
 *         └── mainnet.json
 */
export function checkBroadcast(
  release: Sablier.EVM.Release,
  chain: Sablier.EVM.Chain,
  innerPath?: string,
): string | null {
  let chainType = "";
  let chainPath = "";

  if (chain.isZK && !isBroadcastsUnified(release)) {
    // Earlier versions use separate broadcasts-zk directory
    chainType = "broadcasts-zk";
    chainPath = path.join(chainType, chain.slug);
  } else {
    chainType = "broadcasts";
    chainPath = path.join(chainType, `${chain.slug}.json`); // JSON file
  }

  const basePath = path.join(DEPLOYMENTS_DIR, release.protocol, release.version);
  const pathToCheck = path.join(basePath, innerPath ?? "", chainPath);

  if (!fs.existsSync(pathToCheck)) {
    const relativePath = path.relative(ROOT_DIR, pathToCheck);
    log("info", {
      msg: `No broadcasts for ${chain.slug} at ${relativePath}`,
      release,
    });
    return null;
  }

  return pathToCheck;
}

export function getDeploymentsDir(): string {
  return DEPLOYMENTS_DIR;
}

/**
 * @notice Determines if a release uses the same broadcast directory for ZK and non-ZK chains.
 *
 * Previously, deployments on ZK chains used to be made using Hardhat, while deployments on non-ZK chains used Foundry.
 * This resulted in separate broadcast structures. In the release versions checked here we switched to Foundry for
 * every chain, so the broadcast output is now unified.
 */
export function isBroadcastsUnified(release: Sablier.EVM.Release): boolean {
  const majorVersion = Number(release.version[1]);
  return (
    (release.protocol === "airdrops" && majorVersion >= 2) ||
    (release.protocol === "flow" && majorVersion >= 2) ||
    (release.protocol === "lockup" && majorVersion >= 3)
  );
}
