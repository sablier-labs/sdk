import type { Chain as ViemChain } from "viem";
import type * as enums from "./evm/enums";

export namespace Sablier {
  /* -------------------------------------------------------------------------- */
  /*                                    TYPES                                   */
  /* -------------------------------------------------------------------------- */

  /**
   * @see https://github.com/wevm/viem/discussions/3678
   */
  type ChainBlockExplorer = {
    name: string;
    url: string;
    apiUrl?: string | undefined;
  };

  export type Repository = {
    commit: string;
    url: `https://github.com/sablier-labs/${string}`;
  };

  /* -------------------------------------------------------------------------- */
  /*                               SUB-NAMESPACES                               */
  /* -------------------------------------------------------------------------- */

  export namespace EVM {
    export type AliasMap = { [contractName: string]: string };
    /** Ethereum address in the format 0x followed by 40 hex characters. */
    export type Address = `0x${string}`;

    export type AbiMap = { [contractName: string]: readonly object[] };
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
      isZK: boolean;
      nativeCurrency: ViemChain["nativeCurrency"] & {
        coinGeckoId: string;
      };
      rpc: {
        /** Alchemy RPC URL generator. */
        alchemy?: (apiKey: string) => string;
        /** Default RPC URL. */
        defaults: string[];
        /** Infura RPC URL generator. */
        infura?: (apiKey: string) => string;
        /** RouteMesh RPC URL generator. */
        routemesh?: (apiKey: string) => string;
      };
      /** Used in deployment files to identify the chain, e.g., arbitrum-sepolia. */
      slug: string;
    };

    /**
     * The base contract type.
     */
    export type Contract = {
      /** The address of the contract. */
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
      /** The protocol the contract is part of (optional). */
      protocol: Sablier.EVM.Protocol | undefined;
      /** The release version the contract is part of (optional). */
      version: Sablier.EVM.Version | undefined;
    };

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
    export type ContractMap = {
      [contractName: string]: Address | [Address, number];
    };

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

    /**
     * Contract names for a given protocol and version.
     * Note that this may contain both deployed contracts and abstract contracts that are not deployed.
     */
    export namespace Manifest {
      export type LockupV1 = {
        core: Standard;
        periphery: Standard;
      };

      export type Standard = {
        [contractKey: string]: string;
      };
    }

    export type Manifest = Manifest.LockupV1 | Manifest.Standard;

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

    export namespace Version {
      export type Airdrops = `${enums.Version.Airdrops}` | enums.Version.Airdrops;

      export type Flow = `${enums.Version.Flow}` | enums.Version.Flow;

      export type Legacy = `${enums.Version.Legacy}` | enums.Version.Legacy;

      export type Lockup = `${enums.Version.Lockup}` | enums.Version.Lockup;
    }

    export type Version = Version.Airdrops | Version.Flow | Version.Legacy | Version.Lockup;

    export namespace Indexer {
      type Common = {
        chainId: number;
        protocol: EVM.Protocol;
      };

      export type Envio = Common & {
        envio: string;
      };

      export namespace TheGraph {
        type SubgraphCommon = {
          /** URL to The Graph explorer. */
          explorerURL?: string;
          /** The kind of subgraph. */
          kind: "custom" | "official";
          /** URL to The Graph studio. */
          studioURL?: string;
        };

        export type SubgraphCustom = SubgraphCommon & {
          kind: "custom";
          subgraphURL: string;
          subgraph?: never;
        };

        export type SubgraphOfficial = SubgraphCommon & {
          kind: "official";
          subgraphURL?: never;
          subgraph: {
            id: string;
            /** Function to generate the TheGraph URL with a user-provided API key. */
            url: (apiKey: string) => string;
          };
        };

        export type Subgraph = SubgraphCustom | SubgraphOfficial;
      }

      export type TheGraph = Common & {
        graph: TheGraph.Subgraph;
      };
    }
  }

  /* --------------------------------------------------------------------------------------------------- */
  /*                               RE-EXPORTS (FOR BACKWARD COMPATIBILITY)                               */
  /* --------------------------------------------------------------------------------------------------- */
  export type Address = EVM.Address;
  export type AbiMap = EVM.AbiMap;
  export type Chain = EVM.Chain;
  export type CompilerSettings = EVM.CompilerSettings;
  export type Contract = EVM.Contract;
  export type ContractCatalog = EVM.ContractCatalog;
  export type ContractMap = EVM.ContractMap;
  export type Protocol = EVM.Protocol;
  export type Deployment = EVM.Deployment;
  export type Manifest = EVM.Manifest;
  export type Release = EVM.Release;
  export type Version = EVM.Version;
  export import Indexer = EVM.Indexer;
}
