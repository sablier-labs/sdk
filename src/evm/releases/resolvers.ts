import { chainsQueries } from "@src/evm/chains/queries";
import { getNestedValues } from "@src/evm/releases/helpers";
import { getContractExplorerURL } from "@src/helpers";
import type { Sablier } from "@src/types";
import _ from "lodash";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type DeploymentBaseParams = {
  protocol: Sablier.EVM.Protocol;
  version: Sablier.EVM.Version;
  chainId: number;
  aliasMap: Sablier.EVM.AliasMap;
};

type DeploymentLockupV1Params = DeploymentBaseParams & {
  contractMap: {
    core: Sablier.EVM.ContractMap;
    periphery: Sablier.EVM.ContractMap;
  };
};

type DeploymentStandardParams = DeploymentBaseParams & {
  contractMap: Sablier.EVM.ContractMap;
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
    lockupV1: (params: DeploymentLockupV1Params): Sablier.EVM.Deployment.LockupV1 => {
      const { contractMap, ...baseParams } = params;

      // Create standard deployment with merged contracts
      const mergedContracts = { ...contractMap.core, ...contractMap.periphery };
      const deployment = resolvers.deployment.standard({
        ...baseParams,
        contractMap: mergedContracts,
      }) as Sablier.EVM.Deployment.LockupV1;

      // Add separated core and periphery contracts
      deployment.core = mapContractsToDeployment(contractMap.core, baseParams);
      deployment.periphery = mapContractsToDeployment(contractMap.periphery, baseParams);

      return deployment;
    },

    /**
     * Creates a standard deployment with all contracts in a single array
     */
    standard: (params: DeploymentStandardParams): Sablier.EVM.Deployment => {
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
    lockupV1: (params: ReleaseParams<Sablier.EVM.Release.LockupV1>): Sablier.EVM.Release.LockupV1 => {
      return {
        ...params,
        contractNames: getNestedValues(params.manifest),
        kind: "lockupV1",
      };
    },

    /**
     * Creates a standard release with contract names extracted from manifest
     */
    standard: (params: ReleaseParams<Sablier.EVM.Release.Standard>): Sablier.EVM.Release.Standard => {
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
  contractMap: Sablier.EVM.ContractMap,
  params: Pick<DeploymentBaseParams, "chainId" | "protocol" | "version" | "aliasMap">,
): Sablier.EVM.Contract[] {
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
