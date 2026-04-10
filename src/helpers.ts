import { Protocol as EvmProtocol } from "./evm/enums.js";
import type { PayableEvmProtocol } from "./evm/helpers.js";
import { isEvmReleasePayable, resolveEvmStreamId, truncateEvmAddress } from "./evm/helpers.js";
import { SOLANA_CHAIN_IDS } from "./solana/chains/chains.js";
import { resolveSolanaStreamId, truncateSolanaAddress } from "./solana/helpers.js";
import type { Sablier, TruncateAddressOptions } from "./types.js";

// Re-export platform-specific helpers. EVM helpers are surfaced from the
// package root via `src/evm/index.ts`, so keep this barrel Solana-only to avoid
// duplicate `export *` paths for the same EVM names at `sablier`.
export * from "./solana/helpers.js";

// Re-export shared types
export type { TruncateAddressOptions } from "./types.js";

/** Version type supporting both EVM and Solana protocols */
type Version = Sablier.EVM.Version | Sablier.Solana.Version;
type EvmReleaseReference = Pick<Sablier.EVM.Release, "protocol" | "version">;

/** Protocols that exist on both EVM and Solana ecosystems */
const MULTI_ECOSYSTEM_PROTOCOLS = new Set([EvmProtocol.Airdrops, EvmProtocol.Lockup]);

/**
 * Compare two semantic version strings.
 * @param a - First version string (e.g., "v1.0")
 * @param b - Second version string (e.g., "v1.0")
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
 * @param release - The release object or `{ protocol, version }` pair to check
 * @returns true if the release charges fees
 * @see {@link https://docs.sablier.com/concepts/fees} for fee details
 * @example
 * isReleasePayable({ protocol: "airdrops", version: "v1.2" }) // false
 * isReleasePayable({ protocol: "airdrops", version: "v1.3" }) // true
 * isReleasePayable("airdrops", "v1.2") // false
 * isReleasePayable("airdrops", "v1.3") // true
 * isReleasePayable({ protocol: "lockup", version: "v1.2" })   // false
 * isReleasePayable({ protocol: "lockup", version: "v2.0" })   // true
 * isReleasePayable("lockup", "v1.2")   // false
 * isReleasePayable("lockup", "v2.0")   // true
 * isReleasePayable({ protocol: "flow", version: "v1.0" })     // false
 * isReleasePayable({ protocol: "flow", version: "v1.1" })     // true
 * isReleasePayable("flow", "v1.0")     // false
 * isReleasePayable("flow", "v1.1")     // true
 */
export function isReleasePayable(release: EvmReleaseReference): boolean;
/**
 * @deprecated Pass a release object instead. This overload will be removed in the next major version (v4).
 */
export function isReleasePayable(
  protocol: PayableEvmProtocol,
  version: Sablier.EVM.Version
): boolean;
export function isReleasePayable(
  releaseOrProtocol: EvmReleaseReference | PayableEvmProtocol,
  version?: Sablier.EVM.Version
): boolean {
  if (typeof releaseOrProtocol !== "string") {
    return isEvmReleasePayable(releaseOrProtocol);
  }

  if (!version) {
    throw new Error('Sablier SDK: Missing "version" for isEvmReleasePayable(protocol, version)');
  }

  return isEvmReleasePayable(releaseOrProtocol, version);
}

/**
 * Truncate an Ethereum or Solana address for display purposes.
 * Automatically routes to the appropriate typed function based on address format.
 *
 * @param address - The address to truncate (Ethereum 0x-prefixed or Solana base58)
 * @param options - Optional truncation options with start and end character counts (default: 4 each)
 * @returns Truncated address in format "0xcafe...beef" or "DYw8...NSKK" or original if too short
 * @example
 * truncateAddress("0x1234567890abcdef1234567890abcdef12345678") // "0x1234...5678"
 * truncateAddress("0x1234567890abcdef1234567890abcdef12345678", { start: 6, end: 6 }) // "0x123456...345678"
 * truncateAddress("DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK") // "DYw8...NSKK"
 * truncateAddress("0x123") // "0x123" (too short, returns original)
 */
export function truncateAddress(address: string, options?: TruncateAddressOptions): string {
  return address.startsWith("0x")
    ? truncateEvmAddress(address as Sablier.EVM.Address, options)
    : truncateSolanaAddress(address, options);
}

/**
 * Convenience alias for {@link truncateAddress}.
 * Also suitable for truncating arbitrary hex strings, not just addresses.
 */
export const truncate = truncateAddress;

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
  if (protocol && isSolanaChain && !MULTI_ECOSYSTEM_PROTOCOLS.has(protocol as EvmProtocol)) {
    throw new Error(
      `Sablier SDK: Protocol "${protocol}" is EVM-only and not valid for Solana chain ${chainId}`
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
