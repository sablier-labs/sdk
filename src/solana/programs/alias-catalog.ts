import { getPath, setPath } from "@src/internal/utils/object-path.js";
import { Protocol } from "@src/solana/enums.js";
import { releasesQueries } from "@src/solana/releases/queries.js";
import type { Sablier } from "@src/types.js";

let _aliasCatalog: Sablier.Solana.AliasCatalog | undefined;

export function getAliasCatalog(): Sablier.Solana.AliasCatalog {
  if (_aliasCatalog) {
    return _aliasCatalog;
  }

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
          const existing = getPath<Sablier.Solana.Program>(catalog, [
            protocol,
            chainId,
            program.alias,
          ]);
          if (existing) {
            throw new Error(
              `Sablier SDK: Alias collision detected for "${program.alias}" on chain ${chainId} in ${protocol}. ` +
                `Existing: ${existing.address}, New: ${program.address}`
            );
          }
          const entry = { ...program, protocol, version };
          setPath(catalog, [protocol, chainId, program.alias], entry);
        }
      }
    }
  }
  _aliasCatalog = catalog;
  return catalog;
}
