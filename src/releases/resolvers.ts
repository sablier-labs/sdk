import { chainsQueries } from "@src/chains/queries";
import { getContractExplorerURL } from "@src/helpers";
import { getNestedValues } from "@src/releases/helpers";
import type { Sablier } from "@src/types";
import _ from "lodash";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type DeploymentBaseParams = {
  protocol: Sablier.Protocol;
  version: Sablier.Version;
  chainId: number;
  aliasMap: Sablier.AliasMap;
};

type DeploymentLockupV1Params = DeploymentBaseParams & {
  contractMap: {
    core: Sablier.ContractMap;
    periphery: Sablier.ContractMap;
  };
};

type DeploymentStandardParams = DeploymentBaseParams & {
  contractMap: Sablier.ContractMap;
};

type ReleaseParams<T> = Omit<T, "kind" | "contractNames">;

/* -------------------------------------------------------------------------- */
/*                                 RESOLVERS                                  */
/* -------------------------------------------------------------------------- */

export const resolvers = {
  deployment: {
    /**
     * Creates a LockupV1 deployment with separate core and periphery contracts
     */
    lockupV1: (params: DeploymentLockupV1Params): Sablier.Deployment.LockupV1 => {
      const { contractMap, ...baseParams } = params;

      // Create standard deployment with merged contracts
      const mergedContracts = { ...contractMap.core, ...contractMap.periphery };
      const deployment = resolvers.deployment.standard({
        ...baseParams,
        contractMap: mergedContracts,
      }) as Sablier.Deployment.LockupV1;

      // Add separated core and periphery contracts
      deployment.core = mapContractsToDeployment(contractMap.core, baseParams);
      deployment.periphery = mapContractsToDeployment(contractMap.periphery, baseParams);

      return deployment;
    },

    /**
     * Creates a standard deployment with all contracts in a single array
     */
    standard: (params: DeploymentStandardParams): Sablier.Deployment => {
      const { contractMap, ...baseParams } = params;
      const contracts = mapContractsToDeployment(contractMap, baseParams);

      return {
        chainId: baseParams.chainId,
        contracts,
      };
    },
  },

  release: {
    /**
     * Creates a LockupV1 release with contract names extracted from manifest
     */
    lockupV1: (params: ReleaseParams<Sablier.Release.LockupV1>): Sablier.Release.LockupV1 => {
      return {
        ...params,
        contractNames: getNestedValues(params.manifest),
        kind: "lockupV1",
      };
    },

    /**
     * Creates a standard release with contract names extracted from manifest
     */
    standard: (params: ReleaseParams<Sablier.Release.Standard>): Sablier.Release.Standard => {
      return {
        ...params,
        contractNames: getNestedValues(params.manifest),
        kind: "standard",
      };
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                                  HELPERS                                   */
/* -------------------------------------------------------------------------- */

/**
 * Converts a contract map to an array of deployment contracts
 */
function mapContractsToDeployment(
  contractMap: Sablier.ContractMap,
  params: Pick<DeploymentBaseParams, "chainId" | "protocol" | "version" | "aliasMap">,
): Sablier.Contract[] {
  const { chainId, protocol, version, aliasMap } = params;
  const chain = chainsQueries.getOrThrow(chainId);

  return _.entries(contractMap).map(([name, addressOrTuple]) => {
    const [address, blockNumber] = Array.isArray(addressOrTuple) ? addressOrTuple : [addressOrTuple];

    return {
      address,
      alias: aliasMap[name],
      block: blockNumber,
      chainId,
      explorerURL: getContractExplorerURL(chain.blockExplorers.default.url, address),
      name,
      protocol,
      version,
    };
  });
}
