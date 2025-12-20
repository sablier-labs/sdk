import { Protocol as EvmProtocol } from "@src/evm/enums";
import type { PayableEvmProtocol } from "@src/evm/helpers";
import { isEvmReleasePayable, resolveEvmStreamId, truncateEvmAddress } from "@src/evm/helpers";
import { getNestedValues as getNestedValuesInternal } from "@src/internal/utils/nested-values";
import { sortChains as sortChainsInternal } from "@src/internal/utils/sort-chains";
import { SOLANA_CHAIN_IDS } from "@src/solana/chains/data";
import { resolveSolanaStreamId, truncateSolanaAddress } from "@src/solana/helpers";
import type { Sablier } from "./types";

/** EVM-only protocols that don't exist on Solana */
const EVM_ONLY_PROTOCOLS = new Set([EvmProtocol.Flow, EvmProtocol.Legacy]);

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

/**
 * Check if a protocol release charges ETH fees on withdraw/claim operations.
 *
 * Starting from specific versions, Sablier contracts charge a small ETH fee when
 * recipients withdraw or claim tokens from streams and airdrops.
 *
 * @param protocol - The protocol name ("airdrops", "flow", or "lockup")
 * @param version - The version to check
 * @returns true if the release charges fees
 * @see {@link https://docs.sablier.com/concepts/fees} for fee details
 * @example
 * isReleasePayable("airdrops", "v1.2") // false
 * isReleasePayable("airdrops", "v1.3") // true
 * isReleasePayable("lockup", "v1.2")   // false
 * isReleasePayable("lockup", "v2.0")   // true
 * isReleasePayable("flow", "v1.0")     // false
 * isReleasePayable("flow", "v1.1")     // true
 */
export function isReleasePayable(
  protocol: PayableEvmProtocol,
  version: Sablier.EVM.Version,
): boolean {
  return isEvmReleasePayable(protocol, version);
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

/**
 * Resolves a stream/airdrop entity ID for use with Sablier indexers.
 * Automatically routes to EVM or Solana based on chain ID.
 *
 * Format: `{contractAddress}-{chainId}-{tokenId}`
 *
 * @param opts - Configuration object
 * @param opts.alias - Contract/program alias (e.g., "LL2", "LK2", "FL2" for EVM; "LL" for Solana)
 * @param opts.chainId - Chain ID (EVM chains or Solana chains: 900000010, 900000020)
 * @param opts.tokenId - Stream/airdrop token ID
 * @param opts.protocol - Optional protocol to disambiguate aliases
 * @returns Stream ID in format "0xabc...-1-123" (EVM) or "DYw8jC...-900000010-123" (Solana)
 * @example
 * // EVM
 * resolveStreamId({ alias: "LL2", chainId: 1, tokenId: 123n })
 * // => "0xabc...-1-123"
 *
 * // Solana
 * resolveStreamId({ alias: "LL", chainId: 900000010, tokenId: 456n })
 * // => "DYw8jC...-900000010-456"
 */
export function resolveStreamId(opts: {
  alias: string;
  chainId: number;
  tokenId: bigint | string | number;
  protocol?: Sablier.EVM.Protocol | Sablier.Solana.Protocol;
}): string {
  const { alias, chainId, tokenId, protocol } = opts;
  const isSolanaChain = SOLANA_CHAIN_IDS.has(chainId);

  // Validate protocol/chain compatibility
  if (protocol && isSolanaChain && EVM_ONLY_PROTOCOLS.has(protocol as EvmProtocol)) {
    throw new Error(
      `Sablier SDK: Protocol "${protocol}" is EVM-only and not valid for Solana chain ${chainId}`,
    );
  }

  if (isSolanaChain) {
    return resolveSolanaStreamId({
      alias,
      chainId,
      protocol: protocol as Sablier.Solana.Protocol,
      tokenId,
    });
  }

  return resolveEvmStreamId({
    alias,
    chainId,
    protocol: protocol as Sablier.EVM.Protocol,
    tokenId,
  });
}
