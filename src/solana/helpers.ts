import type { Sablier, TruncateAddressOptions } from "@/src/types.js";
import { Protocol } from "./enums.js";
import { getAliasCatalog } from "./programs/alias-catalog.js";

/**
 * Truncate a Solana address for display purposes.
 * @param address - The Solana address to truncate (base58 encoded)
 * @param options - Truncation options with start/end character counts (default: 4 each, must be >= 1)
 * @returns Truncated address in format "DYw8...NSKK" or original if too short
 * @example
 * truncateSolanaAddress("DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK") // "DYw8...NSKK"
 * truncateSolanaAddress("DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK", { start: 6, end: 6 }) // "DYw8jC...5CNSKK"
 * truncateSolanaAddress("DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK", { start: 2, end: 6 }) // "DY...5CNSKK"
 * truncateSolanaAddress("abc") // "abc" (too short, returns original)
 */
export function truncateSolanaAddress(
  address: Sablier.Solana.Address,
  options?: TruncateAddressOptions
): string {
  if (!address) {
    return address;
  }

  const start = options?.start ?? 4;
  const end = options?.end ?? 4;
  const minLength = start + end;

  if (address.length <= minLength) {
    return address;
  }

  const prefix = address.slice(0, start);
  const suffix = end === 0 ? "" : address.slice(-end);

  return `${prefix}...${suffix}`;
}

/**
 * Constructs a stream/airdrop entity ID for Solana chains in the format used by Sablier indexers.
 * Format: `{programAddress}-{chainId}-{tokenId}`
 *
 * The program address is preserved as-is, as Solana addresses are case-sensitive.
 *
 * @param opts - Configuration object
 * @param opts.alias - Program alias (e.g., "LL", "merkleFactoryInstant")
 * @param opts.chainId - Chain ID used by this SDK for Solana networks
 * @param opts.tokenId - Stream/airdrop token ID
 * @param opts.protocol - Optional protocol to disambiguate aliases
 * @returns Stream ID in format "DYw8jC...-900000010-123"
 * @example
 * resolveSolanaStreamId({ alias: "LL", chainId: 900000010, tokenId: 123n })
 * // => "DYw8jC...-900000010-123"
 */
export function resolveSolanaStreamId(opts: {
  alias: string;
  chainId: number;
  tokenId: bigint | string | number;
  protocol?: Sablier.Solana.Protocol;
}): string {
  const { alias, chainId, tokenId, protocol } = opts;

  const program = resolveSolanaProgramByAlias({ alias, chainId, protocol });
  return `${program.address}-${chainId}-${tokenId}`;
}

/**
 * Resolves a Solana program by its alias from the alias catalog.
 *
 * @param opts - Configuration object
 * @param opts.alias - Program alias (e.g., "LL", "merkleFactoryInstant")
 * @param opts.chainId - Chain ID used by this SDK for Solana networks
 * @param opts.protocol - Optional protocol to disambiguate aliases that exist in multiple protocols
 * @returns The resolved program
 * @throws Error if alias is not found or is ambiguous without protocol specified
 * @example
 * resolveSolanaProgramByAlias({ alias: "LL", chainId: 900000010 })
 * // => { address: "DYw8jC...", name: "SablierLockupLinear", ... }
 */
export function resolveSolanaProgramByAlias(opts: {
  alias: string;
  chainId: number;
  protocol?: Sablier.Solana.Protocol;
}): Sablier.Solana.Program {
  const { alias, chainId, protocol } = opts;
  const aliasCatalog = getAliasCatalog();

  if (protocol) {
    const program = aliasCatalog[protocol]?.[chainId]?.[alias];
    if (!program) {
      throw new Error(
        `Sablier SDK: Unknown Solana program alias "${alias}" on chain ${chainId} for protocol "${protocol}"`
      );
    }
    return program;
  }

  const protocols: Sablier.Solana.Protocol[] = [Protocol.Airdrops, Protocol.Lockup];

  const matches = protocols
    .map((p) => aliasCatalog[p]?.[chainId]?.[alias])
    .filter(Boolean) as Sablier.Solana.Program[];

  if (matches.length === 0) {
    throw new Error(`Sablier SDK: Unknown Solana program alias "${alias}" on chain ${chainId}`);
  }

  if (matches.length > 1) {
    throw new Error(
      `Sablier SDK: Ambiguous Solana program alias "${alias}" on chain ${chainId}; specify protocol`
    );
  }

  return matches[0];
}
