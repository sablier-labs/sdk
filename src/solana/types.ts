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

type Repository = {
  commit: string;
  url: `https://github.com/sablier-labs/${string}`;
};

export namespace Solana {
  export type Address = string;
  export type AliasMap = { [contractName: string]: string };
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

  /**
   * The base contract type for Solana.
   */
  export type Contract = {
    /** The address of the contract (program). */
    address: Address;
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
    /** The protocol the contract is part of. */
    protocol: Solana.Protocol | undefined;
    /** The release version the contract is part of. */
    version: Solana.Version | undefined;
  };

  /** @internal */
  export type ContractMap = {
    [contractName: string]: Address | [Address, number];
  };

  export type ContractCatalog = {
    [protocol in Protocol]: {
      [chainId: number]: {
        [address: Address]: Contract;
      };
    };
  };

  /**
   * A collection of contracts deployed on a single chain.
   */
  export type Deployment = {
    chainId: number;
    contracts: Contract[];
  };

  export type IdlMap = { [contractName: string]: object };

  /**
   * Contract names for a given protocol and version.
   */
  export type Manifest = {
    [contractKey: string]: string;
  };

  export type Protocol = `${enums.Protocol}` | enums.Protocol;

  /**
   * A collection of deployments for a given protocol and version.
   */
  export type Release = {
    /** A map of contract names to their IDL (Interface Definition Language). */
    idl: IdlMap;
    /** A map of contract names to their aliases, used in the Sablier Interface and indexers. */
    aliases?: AliasMap;
    /** An array of contract names. */
    contractNames: string[];
    /** List of deployments across different chains. */
    deployments: Deployment[];
    /** Whether this is the latest release for this protocol. */
    isLatest: boolean;
    /** The contract name manifest. */
    manifest: Manifest;
    /** The Sablier protocol released, e.g. `lockup`. */
    protocol: Protocol;
    /** Repository information for the release. */
    repository?: Repository;
    /** The version of the release, e.g., `v1.0`. */
    version: Version;
  };

  export namespace Version {
    export type Airdrops = `${enums.Version.Airdrops}` | enums.Version.Airdrops;
    export type Lockup = `${enums.Version.Lockup}` | enums.Version.Lockup;
  }

  export type Version = Version.Airdrops | Version.Lockup;
}
