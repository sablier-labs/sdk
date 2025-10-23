import type { AliasMap, ContractBase, ContractMapBase, ManifestBase, Repository, Shared } from "@src/shared/types";
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

  /**
   * The base contract type for Solana.
   */
  export type Program = ContractBase<Address, Protocol, Version>;

  export type ProgramMap = ContractMapBase<Address>;
  export type ProgramCatalog = {
    [protocol in Protocol]: {
      [chainId: number]: {
        [address: Address]: Program;
      };
    };
  };

  /**
   * A collection of contracts deployed on a single chain.
   */
  export type Deployment = {
    chainId: number;
    programs: Program[];
  };

  export type IdlMap = { [contractName: string]: object };

  /**
   * Contract names for a given protocol and version.
   */
  export type Manifest = ManifestBase;

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
    programNames: string[];
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
