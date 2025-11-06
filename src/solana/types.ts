import type { Shared } from "@src/shared/types";
import type * as enums from "./enums";

export namespace Solana {
  export type Address = string;
  export type ChainCode = `${enums.ChainCode}` | enums.ChainCode;
  export type Cluster = `${enums.Cluster}` | enums.Cluster;

  export type Chain = Shared.Chain & {
    rpc: Shared.Chain["rpc"] & {
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

  export type Protocol = `${enums.Protocol}` | enums.Protocol;

  export namespace Version {
    export type Airdrops = `${enums.Version.Airdrops}` | enums.Version.Airdrops;
    export type Lockup = `${enums.Version.Lockup}` | enums.Version.Lockup;
  }

  export type Version = Version.Airdrops | Version.Lockup;
}
