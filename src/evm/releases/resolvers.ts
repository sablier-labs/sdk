import { chainsQueries } from "@src/evm/chains/queries";
import { getNestedValues } from "@src/helpers";
import { createContractMapper, createStandardDeploymentResolver } from "@src/internal/factories/resolver";
import type { AliasMap } from "@src/shared/types";
import type { Sablier } from "@src/types";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type DeploymentBaseParams = {
  protocol: Sablier.EVM.Protocol;
  version: Sablier.EVM.Version;
  chainId: number;
  aliasMap: AliasMap;
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
/*                             PLATFORM SETUP                                 */
/* -------------------------------------------------------------------------- */

const contractMapper = createContractMapper<
  Sablier.EVM.Contract,
  Sablier.EVM.Protocol,
  Sablier.EVM.Version,
  Sablier.EVM.Address
>(chainsQueries);

const standardDeploymentResolver = createStandardDeploymentResolver<
  Sablier.EVM.Deployment,
  Sablier.EVM.Contract,
  Sablier.EVM.Protocol,
  Sablier.EVM.Version,
  Sablier.EVM.Address
>(contractMapper, "contracts");

/* -------------------------------------------------------------------------- */
/*                           EVM-SPECIFIC RESOLVERS                           */
/* -------------------------------------------------------------------------- */

/**
 * Creates a LockupV1 deployment with separate core and periphery contracts
 */
function createLockupV1Deployment(params: DeploymentLockupV1Params): Sablier.EVM.Deployment.LockupV1 {
  const { contractMap, ...baseParams } = params;

  // Create standard deployment with merged contracts
  const mergedContracts = { ...contractMap.core, ...contractMap.periphery };
  const deployment = standardDeploymentResolver({
    ...baseParams,
    contractMap: mergedContracts,
  }) as Sablier.EVM.Deployment.LockupV1;

  // Add separated core and periphery contracts
  deployment.core = contractMapper(contractMap.core, baseParams);
  deployment.periphery = contractMapper(contractMap.periphery, baseParams);

  return deployment;
}

/* -------------------------------------------------------------------------- */
/*                                 RESOLVERS                                  */
/* -------------------------------------------------------------------------- */

export const resolvers = {
  deployment: {
    /**
     * Creates a LockupV1 deployment with separate core and periphery contracts
     */
    lockupV1: (params: DeploymentLockupV1Params): Sablier.EVM.Deployment.LockupV1 => {
      return createLockupV1Deployment(params);
    },

    /**
     * Creates a standard deployment with all contracts in a single array
     */
    standard: (params: DeploymentStandardParams): Sablier.EVM.Deployment => {
      return standardDeploymentResolver(params);
    },
  },

  release: {
    /**
     * Creates a LockupV1 release with contract names extracted from manifest
     */
    lockupV1: <TAbiMap extends Sablier.EVM.AbiMap>(
      params: ReleaseParams<Sablier.EVM.Release.LockupV1<TAbiMap>>
    ): Sablier.EVM.Release.LockupV1<TAbiMap> => {
      return {
        ...params,
        contractNames: getNestedValues(params.manifest),
        kind: "lockupV1",
      };
    },

    /**
     * Creates a standard release with contract names extracted from manifest
     */
    standard: <TAbiMap extends Sablier.EVM.AbiMap>(
      params: ReleaseParams<Sablier.EVM.Release.Standard<TAbiMap>>
    ): Sablier.EVM.Release.Standard<TAbiMap> => {
      return {
        ...params,
        contractNames: getNestedValues(params.manifest),
        kind: "standard",
      };
    },
  },
};
