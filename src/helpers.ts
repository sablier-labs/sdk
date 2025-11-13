import _ from "lodash";
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
export function compareVersions(a: Sablier.EVM.Version, b: Sablier.EVM.Version): number {
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
export function getContractExplorerURL(explorerURL: string, contractAddress: Sablier.EVM.Address) {
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
export function isVersionBefore(version: Sablier.EVM.Version, before: Sablier.EVM.Version): boolean {
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
export function isVersionAfter(version: Sablier.EVM.Version, after: Sablier.EVM.Version): boolean {
  return compareVersions(version, after) > 0;
}

export function sortChains<T extends { name: string }>(chains: T[]): T[] {
  return chains.sort((a, b) => a.name.localeCompare(b.name));
}

export function getNestedValues<T extends Record<string, unknown>>(obj: T): string[] {
  return _.flatMap(obj, (value) => {
    if (_.isObject(value) && !_.isArray(value)) {
      return getNestedValues(value as Record<string, unknown>);
    }
    return _.isString(value) ? value : [];
  });
}

/**
 * Truncate an Ethereum or Solana address for display purposes.
 * @param address - The address to truncate (Ethereum 0x-prefixed or Solana base58)
 * @param chars - Number of characters to show on each side (default: 4)
 * @returns Truncated address in format "0xcafe...beef" or "DYw8...NSKK" or original if too short
 * @example
 * truncateAddress("0x1234567890abcdef1234567890abcdef12345678") // "0x1234...5678"
 * truncateAddress("0x1234567890abcdef1234567890abcdef12345678", 6) // "0x123456...345678"
 * truncateAddress("DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK") // "DYw8...NSKK"
 * truncateAddress("0x123") // "0x123" (too short, returns original)
 */
export function truncateAddress(address: string, chars = 4): string {
  // Return original if empty
  if (!address) {
    return address;
  }

  // Handle Ethereum addresses (0x-prefixed)
  if (address.startsWith("0x")) {
    // Calculate minimum length needed: "0x" + chars on each side
    const minLength = 2 + chars * 2;

    // Return original if too short to truncate meaningfully
    if (address.length <= minLength) {
      return address;
    }

    // Extract prefix (0x + first chars) and suffix (last chars)
    const prefix = address.slice(0, 2 + chars);
    const suffix = address.slice(-chars);

    return `${prefix}...${suffix}`;
  }

  // Handle Solana and other addresses (no 0x prefix)
  // Calculate minimum length needed: chars on each side
  const minLength = chars * 2;

  // Return original if too short to truncate meaningfully
  if (address.length <= minLength) {
    return address;
  }

  // Extract prefix (first chars) and suffix (last chars)
  const prefix = address.slice(0, chars);
  const suffix = address.slice(-chars);

  return `${prefix}...${suffix}`;
}
