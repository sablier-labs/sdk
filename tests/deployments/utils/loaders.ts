import { checkBroadcast } from "@src/internal/helpers";
import type { Sablier } from "@src/types";
import * as fs from "fs-extra";
import globby from "globby";
import { isBroadcastsUnified } from "../../helpers/broadcasts";
import type { StandardBroadcast, ZKBroadcast } from "../../types";

export async function loadBroadcast<T extends StandardBroadcast | ZKBroadcast[]>(
  release: Sablier.Release,
  chain: Sablier.Chain,
  componentName?: string,
): Promise<T | null> {
  if (chain.isZK && !isBroadcastsUnified(release)) {
    return (await loadZK(release, chain, componentName)) as T;
  } else {
    return (await loadStandard(release, chain, componentName)) as T;
  }
}

async function loadStandard(
  release: Sablier.Release,
  chain: Sablier.Chain,
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
  release: Sablier.Release,
  chain: Sablier.Chain,
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
