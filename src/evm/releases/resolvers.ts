import { chainsQueries } from "@/src/evm/chains/queries.js";
import {
  createContractMapper,
  createStandardDeploymentResolver,
} from "@/src/internal/factories/resolver.js";
import { getNestedValues } from "@/src/internal/utils/nested-values.js";
import type { AliasMap } from "@/src/shared/types.js";
import type { Sablier } from "@/src/types.js";
import type { EvmReleaseVersionByProtocol, ReleaseFeaturesForProtocol } from "./features.js";
import { getEvmReleaseFeatures } from "./features.js";

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

type ReleaseParams<T> = Omit<T, "kind" | "contractNames" | "features" | "protocol" | "version">;

type StandardRelease<
  TProtocol extends keyof EvmReleaseVersionByProtocol,
  TAbiMap extends Sablier.EVM.AbiMap,
> = Sablier.EVM.Release.Standard<TAbiMap, ReleaseFeaturesForProtocol<TProtocol>>;

type LockupProtocol = Extract<keyof EvmReleaseVersionByProtocol, "lockup">;

type LockupV1Release<TAbiMap extends Sablier.EVM.AbiMap> = Sablier.EVM.Release.LockupV1<
  TAbiMap,
  ReleaseFeaturesForProtocol<LockupProtocol>
>;

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
function createLockupV1Deployment(
  params: DeploymentLockupV1Params
): Sablier.EVM.Deployment.LockupV1 {
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
    lockupV1: <
      TAbiMap extends Sablier.EVM.AbiMap,
      TVersion extends EvmReleaseVersionByProtocol[LockupProtocol],
    >(
      params: ReleaseParams<LockupV1Release<TAbiMap>> & {
        protocol: LockupProtocol;
        version: TVersion;
      }
    ): LockupV1Release<TAbiMap> => {
      return {
        ...params,
        contractNames: getNestedValues(params.manifest),
        features: getEvmReleaseFeatures<LockupProtocol>(params.protocol, params.version),
        kind: "lockupV1",
      };
    },

    /**
     * Creates a standard release with contract names extracted from manifest
     */
    standard: <
      TProtocol extends keyof EvmReleaseVersionByProtocol,
      TAbiMap extends Sablier.EVM.AbiMap,
      TVersion extends EvmReleaseVersionByProtocol[TProtocol],
    >(
      params: ReleaseParams<StandardRelease<TProtocol, TAbiMap>> & {
        protocol: TProtocol;
        version: TVersion;
      }
    ): StandardRelease<TProtocol, TAbiMap> => {
      return {
        ...params,
        contractNames: getNestedValues(params.manifest),
        features: getEvmReleaseFeatures<TProtocol>(params.protocol, params.version),
        kind: "standard",
      };
    },
  },
};
