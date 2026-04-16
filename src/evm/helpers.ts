// NOTE: evm/index.ts uses explicit named re-exports instead of `export *` for
// this module. When adding or removing a public export here, mirror the change
// in evm/index.ts. The "barrel re-exports every helpers symbol" test in
// tests/package-exports.test.ts will catch any drift.
import { getContractExplorerURL as getContractExplorerURLInternal } from "@/src/internal/utils/explorer-url.js";
import type { Sablier, TruncateAddressOptions } from "@/src/types.js";
import { getAliasCatalog } from "./contracts/alias-catalog.js";
import { Protocol } from "./enums.js";

export type {
  EvmReleaseFeatureSetByProtocol,
  EvmReleaseVersionByProtocol,
  PayableEvmProtocol,
  ReleaseFeaturesForProtocol,
} from "./releases/features.js";
export {
  evmReleaseFeatures,
  getAirdropsReleaseFeatures,
  getEvmReleaseFeatures,
  getFlowReleaseFeatures,
  getLockupReleaseFeatures,
  hasClaimTo,
  hasOnchainMinFee,
  hasSimpleTransfer,
  hasSplitLockupArchitecture,
  hasSponsor,
  isEvmReleasePayable,
  supportsLockupBatch,
  supportsLockupPrbProxy,
  supportsLockupShape,
  usesLockupSplit,
} from "./releases/features.js";

/**
 * Get the explorer URL for a contract. Compatible with Etherscan, Blockscout, etc.
 * @param explorerURL - The base explorer URL, e.g. https://etherscan.io
 * @param contractAddress - The contract object
 * @returns The explorer URL for the contract, e.g. https://etherscan.io/address/0x123...
 */
export function getContractExplorerURL(explorerURL: string, contractAddress: Sablier.EVM.Address) {
  return getContractExplorerURLInternal(explorerURL, contractAddress);
}

/**
 * Constructs a stream/airdrop entity ID for EVM chains in the format used by Sablier indexers.
 * Format: `{contractAddress}-{chainId}-{tokenId}`
 *
 * The contract address is lowercased for normalization, as EVM addresses are case-insensitive.
 *
 * @param opts - Configuration object
 * @param opts.alias - Contract alias (e.g., "LL2", "LK2", "FL2")
 * @param opts.chainId - Chain ID where the contract is deployed
 * @param opts.tokenId - Stream/airdrop token ID
 * @param opts.protocol - Optional protocol to disambiguate aliases
 * @returns Stream ID in format "0xabc...-1-123"
 * @example
 * resolveEvmStreamId({ alias: "LL2", chainId: 1, tokenId: 123n })
 * // => "0xabc...-1-123"
 */
export function resolveEvmStreamId(opts: {
  alias: string;
  chainId: number;
  tokenId: bigint | string | number;
  protocol?: Sablier.EVM.Protocol;
}): string {
  const { alias, chainId, tokenId, protocol } = opts;

  const contract = resolveEvmContractByAlias({ alias, chainId, protocol });
  return `${contract.address.toLowerCase()}-${chainId}-${tokenId}`;
}

/**
 * Resolves an EVM contract by its alias from the alias catalog.
 *
 * @param opts - Configuration object
 * @param opts.alias - Contract alias (e.g., "LL2", "LK2", "FL2")
 * @param opts.chainId - Chain ID where the contract is deployed
 * @param opts.protocol - Optional protocol to disambiguate aliases that exist in multiple protocols
 * @returns The resolved contract
 * @throws Error if alias is not found or is ambiguous without protocol specified
 * @example
 * resolveEvmContractByAlias({ alias: "LL2", chainId: 1 })
 * // => { address: "0x...", name: "SablierLockupLinear", ... }
 */
export function resolveEvmContractByAlias(opts: {
  alias: string;
  chainId: number;
  protocol?: Sablier.EVM.Protocol;
}): Sablier.EVM.Contract {
  const { alias, chainId, protocol } = opts;
  const aliasCatalog = getAliasCatalog();

  if (protocol) {
    const contract = aliasCatalog[protocol]?.[chainId]?.[alias];
    if (!contract) {
      throw new Error(
        `Sablier SDK: Unknown EVM contract alias "${alias}" on chain ${chainId} for protocol "${protocol}"`
      );
    }
    return contract;
  }

  const protocols: Sablier.EVM.Protocol[] = [
    Protocol.Airdrops,
    Protocol.Bob,
    Protocol.Flow,
    Protocol.Legacy,
    Protocol.Lockup,
  ];

  const matches = protocols
    .map((p) => aliasCatalog[p]?.[chainId]?.[alias])
    .filter(Boolean) as Sablier.EVM.Contract[];

  if (matches.length === 0) {
    throw new Error(`Sablier SDK: Unknown EVM contract alias "${alias}" on chain ${chainId}`);
  }

  if (matches.length > 1) {
    throw new Error(
      `Sablier SDK: Ambiguous EVM contract alias "${alias}" on chain ${chainId}; specify protocol`
    );
  }

  return matches[0];
}

/**
 * Truncate an Ethereum address for display purposes.
 * @param address - The Ethereum address to truncate (0x-prefixed)
 * @param options - Truncation options with start/end character counts (default: 4 each, must be >= 1)
 * @returns Truncated address in format "0xcafe...beef" or original if too short
 * @example
 * truncateEvmAddress("0x1234567890abcdef1234567890abcdef12345678") // "0x1234...5678"
 * truncateEvmAddress("0x1234567890abcdef1234567890abcdef12345678", { start: 6, end: 6 }) // "0x123456...345678"
 * truncateEvmAddress("0x1234567890abcdef1234567890abcdef12345678", { start: 2, end: 6 }) // "0x12...345678"
 * truncateEvmAddress("0x123") // "0x123" (too short, returns original)
 */
export function truncateEvmAddress(
  address: Sablier.EVM.Address,
  options?: TruncateAddressOptions
): string {
  if (!address) {
    return address;
  }

  const start = options?.start ?? 4;
  const end = options?.end ?? 4;
  const minLength = 2 + start + end;

  if (address.length <= minLength) {
    return address;
  }

  const prefix = address.slice(0, 2 + start);
  const suffix = end === 0 ? "" : address.slice(-end);

  return `${prefix}...${suffix}`;
}
