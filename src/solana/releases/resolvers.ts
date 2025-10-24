import { getNestedValues } from "@src/helpers";
import { createContractMapper, createStandardDeploymentResolver } from "@src/internal/resolver-factory";
import { chainsQueries } from "@src/solana/chains/queries";
import type { Sablier } from "@src/types";

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
/*                             PLATFORM SETUP                                 */
/* -------------------------------------------------------------------------- */

const contractMapper = createContractMapper<Sablier.Solana.Contract, Sablier.Solana.Protocol, Sablier.Solana.Version>(
  chainsQueries,
);

const standardDeploymentResolver = createStandardDeploymentResolver<
  Sablier.Solana.Deployment,
  Sablier.Solana.Contract,
  Sablier.Solana.Protocol,
  Sablier.Solana.Version
>(contractMapper);

/* -------------------------------------------------------------------------- */
/*                                 RESOLVERS                                  */
/* -------------------------------------------------------------------------- */

export const resolvers = {
  deployment: {
    /**
     * Creates a standard Solana deployment
     */
    standard: (params: DeploymentParams): Sablier.Solana.Deployment => {
      return standardDeploymentResolver(params);
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
