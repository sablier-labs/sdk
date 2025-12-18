import { aliasCatalog } from "@src/evm/contracts/alias-catalog";
import { Protocol } from "@src/evm/enums";
import { getContractExplorerURL as getContractExplorerURLInternal } from "@src/internal/utils/explorer-url";
import type { Sablier } from "@src/types";

/**
 * Truncate an Ethereum address for display purposes.
 * @param address - The Ethereum address to truncate (0x-prefixed)
 * @param chars - Number of characters to show on each side (default: 4)
 * @returns Truncated address in format "0xcafe...beef" or original if too short
 * @example
 * truncateEvmAddress("0x1234567890abcdef1234567890abcdef12345678") // "0x1234...5678"
 * truncateEvmAddress("0x1234567890abcdef1234567890abcdef12345678", 6) // "0x123456...345678"
 * truncateEvmAddress("0x123") // "0x123" (too short, returns original)
 */
export function truncateEvmAddress(address: Sablier.EVM.Address, chars = 4): string {
  // Return original if empty
  if (!address) {
    return address;
  }

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

  if (protocol) {
    const contract = aliasCatalog[protocol]?.[chainId]?.[alias];
    if (!contract) {
      throw new Error(
        `Sablier SDK: Unknown EVM contract alias "${alias}" on chain ${chainId} for protocol "${protocol}"`,
      );
    }
    return contract;
  }

  const protocols: Sablier.EVM.Protocol[] = [
    Protocol.Airdrops,
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
      `Sablier SDK: Ambiguous EVM contract alias "${alias}" on chain ${chainId}; specify protocol`,
    );
  }

  return matches[0];
}
