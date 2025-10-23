import { chainsQueries } from "@src/solana/chains/queries";
import { getNestedValues } from "@src/solana/releases/helpers";
import type { Sablier } from "@src/types";
import _ from "lodash";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type DeploymentParams = {
  protocol: Sablier.Solana.Protocol;
  version: Sablier.Solana.Version;
  chainId: number;
  aliasMap: Sablier.Solana.AliasMap;
  contractMap: Sablier.Solana.ContractMap;
};

type ReleaseParams = Omit<Sablier.Solana.Release, "contractNames">;

/* -------------------------------------------------------------------------- */
/*                                 RESOLVERS                                  */
/* -------------------------------------------------------------------------- */

export const resolvers = {
  deployment: {
    /**
     * Creates a standard Solana deployment
     */
    standard: (params: DeploymentParams): Sablier.Solana.Deployment => {
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
     * Creates a Solana release with contract names extracted from manifest
     */
    standard: (params: ReleaseParams): Sablier.Solana.Release => {
      return {
        ...params,
        contractNames: getNestedValues(params.manifest),
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
  contractMap: Sablier.Solana.ContractMap,
  params: Pick<DeploymentParams, "chainId" | "protocol" | "version" | "aliasMap">,
): Sablier.Solana.Contract[] {
  const { chainId, protocol, version, aliasMap } = params;
  const chain = chainsQueries.getOrThrow(chainId);

  return _.entries(contractMap).map(([name, addressOrTuple]) => {
    const [address, blockNumber] = Array.isArray(addressOrTuple) ? addressOrTuple : [addressOrTuple];

    return {
      address,
      alias: aliasMap[name],
      block: blockNumber,
      chainId,
      explorerURL: `${chain.blockExplorers.default.url}/address/${address}`,
      name,
      protocol,
      version,
    };
  });
}
