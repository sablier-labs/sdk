import type { Chain as ViemChain } from "viem";
import type * as enums from "./enums";

/**
 * @see https://github.com/wevm/viem/discussions/3678
 */
type ChainBlockExplorer = {
  name: string;
  url: string;
  apiUrl?: string | undefined;
};

export namespace Solana {
  export type Address = string;
  export type ChainCode = "SOL" | "SOLDEV" | "SOLTEST";
  export type Cluster = "mainnet-beta" | "devnet" | "testnet";

  export type Chain = ViemChain & {
    blockExplorers: {
      [key: string]: ChainBlockExplorer;
      default: ChainBlockExplorer;
    };
    /** Whether this chain is supported by the Sablier Interface at https://app.sablier.com. */
    isSupportedByUI: boolean;
    /** Whether this is a testnet network. */
    isTestnet: boolean;
    /** Whether this is a zkEVM like zkSync. */
    nativeCurrency: ViemChain["nativeCurrency"] & {
      coinGeckoId: string;
    };
    slug: string;

    rpc: {
      /** Helius RPC URL generator. */
      helius?: (apiKey: string) => string;
      /** Default RPC URL. */
      defaults: string[];
    };
    /** Used in deployment files to identify the chain, e.g., arbitrum-sepolia. */
    chainlink: {
      program: Address; // Chainlink program used to retrieve on-chain price feeds
      feed: Address; // Account providing the SOL/USD price feed data.
    };
    definition: {
      chainCode: ChainCode;
      chainId: number;
      cluster: Cluster;
    };
  };

  export type Protocol = `${enums.Protocol}` | enums.Protocol;

  export namespace Version {
    export type Airdrops = `${enums.Version.Airdrops}` | enums.Version.Airdrops;
    export type Lockup = `${enums.Version.Lockup}` | enums.Version.Lockup;
  }

  export type Version = Version.Airdrops | Version.Lockup;
}
