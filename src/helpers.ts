import type { Sablier } from "./types";

/**
 * Compare two semantic version strings.
 * @param a - First version string (e.g., "v1.0", "v2.1")
 * @param b - Second version string (e.g., "v1.0", "v2.1")
 * @returns -1 if a < b, 0 if a === b, 1 if a > b
 * @example
 * compareVersions("v1.0", "v2.0") // -1
 * compareVersions("v2.0", "v1.0") // 1
 * compareVersions("v1.1", "v1.1") // 0
 */
export function compareVersions(a: Sablier.Version, b: Sablier.Version): number {
  const [aMajor, aMinor] = a.slice(1).split(".").map(Number);
  const [bMajor, bMinor] = b.slice(1).split(".").map(Number);

  if (aMajor !== bMajor) {
    return aMajor - bMajor;
  }
  return aMinor - bMinor;
}

/**
 * Get the explorer URL for a contract. Compatible with Etherscan, Blockscout, etc.
 * @param explorerURL - The base explorer URL, e.g. https://etherscan.io
 * @param contractAddress - The contract object
 * @returns The explorer URL for the contract, e.g. https://etherscan.io/address/0x123...
 */
export function getContractExplorerURL(explorerURL: string, contractAddress: Sablier.Address) {
  return `${explorerURL}/address/${contractAddress}`;
}

/**
 * Check if a version comes before another chronologically.
 * @param version - The version to check
 * @param before - The reference version to compare against
 * @returns true if version comes before the reference version
 * @example
 * isVersionBefore("v1.0", "v2.0") // true
 * isVersionBefore("v2.0", "v1.0") // false
 */
export function isVersionBefore(version: Sablier.Version, before: Sablier.Version): boolean {
  return compareVersions(version, before) < 0;
}

/**
 * Check if a version comes after another chronologically.
 * @param version - The version to check
 * @param after - The reference version to compare against
 * @returns true if version comes after the reference version
 * @example
 * isVersionAfter("v2.0", "v1.0") // true
 * isVersionAfter("v1.0", "v2.0") // false
 */
export function isVersionAfter(version: Sablier.Version, after: Sablier.Version): boolean {
  return compareVersions(version, after) > 0;
}

export function sortChains<T extends { name: string }>(chains: T[]): T[] {
  return chains.sort((a, b) => a.name.localeCompare(b.name));
}
