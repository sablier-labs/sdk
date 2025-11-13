import { Protocol } from "@src/solana/enums";
import { releasesQueries } from "@src/solana/releases/queries";
import type { Sablier } from "@src/types";
import _ from "lodash";

function getCatalog(): Sablier.Solana.ProgramCatalog {
  const catalog: Sablier.Solana.ProgramCatalog = {
    [Protocol.Airdrops]: {},
    [Protocol.Lockup]: {},
  };

  for (const release of releasesQueries.getAll()) {
    const { protocol, version, deployments } = release;

    for (const deployment of deployments) {
      const { chainId, programs } = deployment;

      for (const contract of programs) {
        const address = contract.address;
        const entry = _.merge(contract, {
          protocol,
          version,
        });
        _.set(catalog, [protocol, chainId, address], entry);
      }
    }
  }
  return catalog;
}

export const catalog = getCatalog();
