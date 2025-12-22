import * as path from "node:path";
import { checkBroadcast, getDeploymentsDir, isBroadcastsUnified } from "@src/internal/helpers";
import type { Sablier } from "@src/types";
import * as fs from "fs-extra";
import globby from "globby";
import type { StandardBroadcast, ZKBroadcast } from "../../types";

export async function loadBroadcast<T extends StandardBroadcast | ZKBroadcast[]>(
  release: Sablier.EVM.Release,
  chain: Sablier.EVM.Chain,
  componentName?: string,
): Promise<T | null> {
  if (chain.isZK && !isBroadcastsUnified(release)) {
    return (await loadZK(release, chain, componentName)) as T;
  } else {
    return (await loadStandard(release, chain, componentName)) as T;
  }
}

async function loadStandard(
  release: Sablier.EVM.Release,
  chain: Sablier.EVM.Chain,
  componentName?: string,
): Promise<StandardBroadcast | null> {
  const foundPath = await checkBroadcast(release, chain, componentName);
  if (!foundPath) {
    return null;
  }

  const broadcast = await fs.promises.readFile(foundPath, "utf8");
  return JSON.parse(broadcast);
}

/**
 * Loads ZK deployment JSON files for contract names
 */
async function loadZK(
  release: Sablier.EVM.Release,
  chain: Sablier.EVM.Chain,
  componentName?: string,
): Promise<ZKBroadcast[] | null> {
  const foundDir = await checkBroadcast(release, chain, componentName);
  if (!foundDir) {
    return null;
  }

  // Load all JSON files in the directory.
  const results: ZKBroadcast[] = [];
  const jsonFiles = await globby("*.json", { absolute: true, cwd: foundDir });
  for (const filePath of jsonFiles) {
    const broadcast = await fs.promises.readFile(filePath, "utf8");
    results.push(JSON.parse(broadcast));
  }
  return results;
}

/**
 * Loads broadcast files for comptroller for a specific chain.
 */
export async function loadComptrollerBroadcast(
  chainSlug: string,
): Promise<StandardBroadcast | null> {
  const broadcastPath = path.join(
    getDeploymentsDir(),
    "comptroller",
    "v1.0",
    "broadcasts",
    `${chainSlug}.json`,
  );

  if (!fs.existsSync(broadcastPath)) {
    return null;
  }

  const broadcast = await fs.promises.readFile(broadcastPath, "utf8");
  return JSON.parse(broadcast);
}
