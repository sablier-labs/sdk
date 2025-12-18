import { Protocol } from "@src/solana/enums";
import { releasesQueries } from "@src/solana/releases/queries";
import type { Sablier } from "@src/types";
import _ from "lodash";

function getAliasCatalog(): Sablier.Solana.AliasCatalog {
  const catalog: Sablier.Solana.AliasCatalog = {
    [Protocol.Airdrops]: {},
    [Protocol.Lockup]: {},
  };

  for (const release of releasesQueries.getAll()) {
    const { protocol, version, deployments } = release;

    for (const deployment of deployments) {
      const { chainId, programs } = deployment;

      for (const program of programs) {
        if (program.alias) {
          const existing = _.get(catalog, [protocol, chainId, program.alias]);
          if (existing) {
            throw new Error(
              `Sablier SDK: Alias collision detected for "${program.alias}" on chain ${chainId} in ${protocol}. ` +
                `Existing: ${existing.address}, New: ${program.address}`,
            );
          }
          const entry = _.merge({}, program, { protocol, version });
          _.set(catalog, [protocol, chainId, program.alias], entry);
        }
      }
    }
  }
  return catalog;
}

export const aliasCatalog = getAliasCatalog();
