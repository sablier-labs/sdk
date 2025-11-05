import type { AliasMap, Repository, Shared } from "@src/shared/types";
import type * as enums from "./enums";

export namespace EVM {
  /** Ethereum address in the format 0x followed by 40 hex characters. */
  export type Address = `0x${string}`;

  export type AbiMap = { [contractName: string]: readonly object[] };
  export type Chain = Shared.Chain & {
    /** Whether this is a zkEVM like zkSync. */
    isZK: boolean;
    rpc: Shared.Chain["rpc"] & {
      /** Alchemy RPC URL generator. */
      alchemy?: (apiKey: string) => string;
      /** Infura RPC URL generator. */
      infura?: (apiKey: string) => string;
      /** RouteMesh RPC URL generator. */
      routemesh?: (apiKey: string) => string;
    };
  };

  /**
   * The base contract type for EVM chains.
   */
  export type Contract = Shared.Contract<Address, Protocol, Version>;

  /**
   * Reverse mapping of contracts so that we can look up contracts by address.
   */
  export type ContractCatalog = {
    [protocol in Protocol]: {
      [chainId: number]: {
        [address: Address]: Contract;
      };
    };
  };

  /** @internal */
  export type ContractMap = Shared.ContractMap<Address>;

  export type Protocol = `${enums.Protocol}` | enums.Protocol;

  export type CompilerSettings = {
    /** The EVM version such as shanghai, paris, etc. */
    evmVersion: string;
    /** Whether the optimizer is enabled. */
    optimizer: boolean;
    /** The number of optimizer runs. */
    optimizerRuns: number;
    /** Optional salt used for CREATE2 deployment. None implies deployment using CREATE. */
    salt?: string;
    /** The solc version used. */
    solcVersion: `v${number}.${number}.${number}`;
    /** Whether the IR is used. */
    viaIR: boolean;
    /** Optional zk version used, only valid for zkEVM chains. */
    zkVersion?: `v${number}.${number}.${number}`;
  };

  /* -------------------------------------------------------------------------- */
  /*                                 DEPLOYMENT                                 */
  /* -------------------------------------------------------------------------- */

  export namespace Deployment {
    export type Standard = {
      chainId: number;
      contracts: Contract[];
      /** TODO: Compiler settings for the contract. Not implemented yet. */
      compilerSettings?: CompilerSettings;
    };

    export type LockupV1 = Standard & {
      core: Contract[];
      periphery: Contract[];
    };
  }

  export type Deployment = Deployment.Standard | Deployment.LockupV1;

  /* -------------------------------------------------------------------------- */
  /*                                  MANIFEST                                  */
  /* -------------------------------------------------------------------------- */

  /**
   * Contract names for a given protocol and version.
   * Note that this may contain both deployed contracts and abstract contracts that are not deployed.
   */
  export namespace Manifest {
    export type LockupV1 = {
      core: Standard;
      periphery: Standard;
    };

    export type Standard = Shared.Manifest;
  }

  export type Manifest = Manifest.LockupV1 | Manifest.Standard;

  /* -------------------------------------------------------------------------- */
  /*                                   RELEASE                                  */
  /* -------------------------------------------------------------------------- */

  /**
   * A collection of deployments for a given protocol and version.
   */
  export namespace Release {
    type Common = {
      abi: AbiMap;
      /** A map of contract names to their aliases, used in the Sablier Interface and the Graph. */
      aliases?: AliasMap;
      /** An array of contract names. */
      contractNames: string[];
      /** Whether this is the latest release for this protocol. */
      isLatest: boolean;
      /** The kind of release. */
      kind: "standard" | "lockupV1";
      /** The Sablier protocol released, e.g. `airdrops`. */
      protocol: Protocol;
      /** Repository information for the release. */
      repository?: Repository;
      /** The version of the release, e.g., `v1.3`. */
      version: Version;
    };

    /**
     * Lockup v1.x release used to separate Lockup contracts into core and periphery sub-categories.
     * @see https://github.com/sablier-labs/v2-periphery
     */
    export type LockupV1 = Common & {
      deployments: Deployment.LockupV1[];
      kind: "lockupV1";
      manifest: Manifest.LockupV1;
    };

    export type Standard = Common & {
      deployments: Deployment.Standard[];
      kind: "standard";
      manifest: Manifest.Standard;
    };
  }

  export type Release = Release.Standard | Release.LockupV1;

  /* -------------------------------------------------------------------------- */
  /*                                   VERSION                                  */
  /* -------------------------------------------------------------------------- */

  export namespace Version {
    export type Airdrops = `${enums.Version.Airdrops}` | enums.Version.Airdrops;

    export type Flow = `${enums.Version.Flow}` | enums.Version.Flow;

    export type Legacy = `${enums.Version.Legacy}` | enums.Version.Legacy;

    export type Lockup = `${enums.Version.Lockup}` | enums.Version.Lockup;
  }
  export type Version = Version.Airdrops | Version.Flow | Version.Legacy | Version.Lockup;
}
