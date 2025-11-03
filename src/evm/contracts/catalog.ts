import { Protocol } from "@src/evm/enums";
import { releasesQueries } from "@src/evm/releases/queries";
import type { Sablier } from "@src/types";
import _ from "lodash";

function getCatalog(): Sablier.EVM.ContractCatalog {
  const catalog: Sablier.EVM.ContractCatalog = {
    [Protocol.Airdrops]: {},
    [Protocol.Flow]: {},
    [Protocol.Legacy]: {},
    [Protocol.Lockup]: {},
  };

  for (const release of releasesQueries.getAll()) {
    const { protocol, version, deployments } = release;

    for (const deployment of deployments) {
      const { chainId, contracts } = deployment;

      for (const contract of contracts) {
        const address = contract.address.toLowerCase(); // lowercase needed for deterministic lookup
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
