import type { Chain as ViemChain } from "viem";

/**
 * @see https://github.com/wevm/viem/discussions/3678
 */
type ChainBlockExplorer = {
  name: string;
  url: string;
  apiUrl?: string | undefined;
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
}
