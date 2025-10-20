import type { ChainBase } from "@src/shared/types";
import type * as enums from "./enums";

export namespace Solana {
  export type Address = string;
  export type ChainCode = `${enums.ChainCode}` | enums.ChainCode;
  export type Cluster = `${enums.Cluster}` | enums.Cluster;

  export type Chain = ChainBase & {
    rpc: ChainBase["rpc"] & {
      /** Helius RPC URL generator. */
      helius?: (apiKey: string) => string;
    };
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
}
