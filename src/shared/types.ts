import type { Chain as ViemChain } from "viem";

/**
 * @see https://github.com/wevm/viem/discussions/3678
 */
type ChainBlockExplorer = {
  name: string;
  url: string;
  apiUrl?: string | undefined;
};

/**
 * Repository metadata for Sablier protocol contracts.
 */
export type Repository = {
  commit: string;
  url: `https://github.com/sablier-labs/${string}`;
};

/**
 * Map of contract names to their aliases.
 * Used in the Sablier Interface and indexers.
 */
export type AliasMap = {
  [contractName: string]: string;
};

export namespace Shared {
  /**
   * Common properties shared by EVM and Solana chains.
   * This type represents the minimal interface required for chain queries and operations.
   */
  export type Chain = ViemChain & {
    blockExplorers: {
      [key: string]: ChainBlockExplorer;
      default: ChainBlockExplorer;
    };
    /** Whether this chain is supported by the Sablier Interface at https://app.sablier.com. */
    isSupportedByUI: boolean;
    /** Whether this is a testnet network. */
    isTestnet: boolean;
    nativeCurrency: ViemChain["nativeCurrency"] & {
      coinGeckoId: string;
    };
    rpc: {
      /** Default RPC URL. */
      defaults: string[];
      [key: string]: unknown;
    };
    /** Used in deployment files to identify the chain, e.g., arbitrum-sepolia. */
    slug: string;
  };

  /**
   * Generic contract mapping that supports both simple addresses and address-with-block tuples.
   * @internal
   */
  export type ContractMap<TAddress extends string> = {
    [contractName: string]: TAddress | [TAddress, number];
  };

  /**
   * Base manifest structure for contract names in a protocol version.
   */
  export type Manifest = {
    [contractKey: string]: string;
  };

  /**
   * Generic contract type shared across all platforms (EVM, Solana, etc.).
   * This provides a consistent interface for contract metadata regardless of the underlying blockchain.
   *
   * @template TAddress - The address type for the platform (e.g., `0x${string}` for EVM, `string` for Solana)
   * @template TProtocol - The protocol enum/type for the platform
   * @template TVersion - The version enum/type for the platform
   */
  export type Contract<TAddress extends string, TProtocol, TVersion> = {
    /** The address of the contract. */
    address: TAddress;
    /** Optional alias for the contract, used in the Sablier Interface and the indexers. */
    alias?: string;
    /** The block number at which the contract was deployed. */
    block?: number;
    /** The ID of the chain the contract is deployed on. */
    chainId: number;
    /** URL to the explorer page for the contract. */
    explorerURL?: string;
    /** The name of the contract. */
    name: string;
    /** The protocol the contract is part of (optional). */
    protocol: TProtocol | undefined;
    /** The release version the contract is part of (optional). */
    version: TVersion | undefined;
  };
}
