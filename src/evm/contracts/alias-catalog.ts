import { Protocol } from "@src/evm/enums";
import { releasesQueries } from "@src/evm/releases/queries";
import type { Sablier } from "@src/types";
import _ from "lodash";

function getAliasCatalog(): Sablier.EVM.AliasCatalog {
  const catalog: Sablier.EVM.AliasCatalog = {
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
        if (contract.alias) {
          const existing = _.get(catalog, [protocol, chainId, contract.alias]);
          if (existing) {
            console.warn(
              `Sablier SDK: Alias collision detected for "${contract.alias}" on chain ${chainId} in ${protocol}. ` +
                `Existing: ${existing.address}, New: ${contract.address}`,
            );
          }
          const entry = _.merge({}, contract, { protocol, version });
          _.set(catalog, [protocol, chainId, contract.alias], entry);
        }
      }
    }
  }
  return catalog;
}

export const aliasCatalog = getAliasCatalog();
