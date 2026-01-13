import { Protocol } from "@src/evm/enums.js";
import { releasesQueries } from "@src/evm/releases/queries.js";
import { getPath, setPath } from "@src/internal/utils/object-path.js";
import type { Sablier } from "@src/types.js";

let _aliasCatalog: Sablier.EVM.AliasCatalog | undefined;

export function getAliasCatalog(): Sablier.EVM.AliasCatalog {
  if (_aliasCatalog) return _aliasCatalog;

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
          const existing = getPath<Sablier.EVM.Contract>(catalog, [
            protocol,
            chainId,
            contract.alias,
          ]);
          if (existing) {
            throw new Error(
              `Sablier SDK: Alias collision detected for "${contract.alias}" on chain ${chainId} in ${protocol}. ` +
                `Existing: ${existing.address}, New: ${contract.address}`,
            );
          }
          const entry = { ...contract, protocol, version };
          setPath(catalog, [protocol, chainId, contract.alias], entry);
        }
      }
    }
  }
  _aliasCatalog = catalog;
  return catalog;
}
