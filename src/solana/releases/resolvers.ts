import { getNestedValues } from "@src/helpers";
import { createContractMapper, createStandardDeploymentResolver } from "@src/internal/factories/resolver";
import type { AliasMap } from "@src/shared/types";
import { chainsQueries } from "@src/solana/chains/queries";
import type { Sablier } from "@src/types";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type DeploymentParams = {
  protocol: Sablier.Solana.Protocol;
  version: Sablier.Solana.Version;
  chainId: number;
  aliasMap: AliasMap;
  contractMap: Sablier.Solana.ProgramMap;
};

type ReleaseParams = Omit<Sablier.Solana.Release, "programNames">;

/* -------------------------------------------------------------------------- */
/*                             PLATFORM SETUP                                 */
/* -------------------------------------------------------------------------- */

const contractMapper = createContractMapper<
  Sablier.Solana.Program,
  Sablier.Solana.Protocol,
  Sablier.Solana.Version,
  Sablier.Solana.Address
>(chainsQueries);

const standardDeploymentResolver = createStandardDeploymentResolver<
  Sablier.Solana.Deployment,
  Sablier.Solana.Program,
  Sablier.Solana.Protocol,
  Sablier.Solana.Version,
  Sablier.Solana.Address
>(contractMapper, "programs");

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
      return { ...params, programNames: getNestedValues(params.manifest) };
    },
  },
};
