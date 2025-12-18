import { truncateEvmAddress } from "@src/evm/helpers";
import { getNestedValues as getNestedValuesInternal } from "@src/internal/utils/nested-values";
import { sortChains as sortChainsInternal } from "@src/internal/utils/sort-chains";
import { truncateSolanaAddress } from "@src/solana/helpers";
import type { Sablier } from "./types";

// Re-export platform-specific helpers
export * from "./evm/helpers";
export * from "./solana/helpers";

/** Version type supporting both EVM and Solana protocols */
type Version = Sablier.EVM.Version | Sablier.Solana.Version;

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
export function compareVersions(a: Version, b: Version): number {
  const [aMajor, aMinor] = a.slice(1).split(".").map(Number);
  const [bMajor, bMinor] = b.slice(1).split(".").map(Number);

  if (aMajor !== bMajor) {
    return aMajor - bMajor;
  }
  return aMinor - bMinor;
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
export function isVersionBefore(version: Version, before: Version): boolean {
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
export function isVersionAfter(version: Version, after: Version): boolean {
  return compareVersions(version, after) > 0;
}

export function sortChains<T extends { name: string }>(chains: T[]): T[] {
  return sortChainsInternal(chains);
}

export function getNestedValues<T extends Record<string, unknown>>(obj: T): string[] {
  return getNestedValuesInternal(obj);
}

/**
 * Truncate an Ethereum or Solana address for display purposes.
 * Automatically routes to the appropriate typed function based on address format.
 *
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
  return address.startsWith("0x")
    ? truncateEvmAddress(address as Sablier.EVM.Address, chars)
    : truncateSolanaAddress(address, chars);
}
