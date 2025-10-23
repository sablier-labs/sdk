import { Protocol } from "@src/solana/enums";
import { releasesQueries } from "@src/solana/releases/queries";
import type { Sablier } from "@src/types";
import _ from "lodash";

function getCatalog(): Sablier.Solana.ContractCatalog {
  const catalog: Sablier.Solana.ContractCatalog = {
    [Protocol.Airdrops]: {},
    [Protocol.Lockup]: {},
  };

  for (const release of releasesQueries.getAll()) {
    const { protocol, version, deployments } = release;

    for (const deployment of deployments) {
      const { chainId, contracts } = deployment;

      for (const contract of contracts) {
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
