import { Protocol } from "@src/evm/enums";
import { releasesQueries } from "@src/evm/releases/queries";
import { getPath, setPath } from "@src/internal/utils/object-path";
import type { Sablier } from "@src/types";

let _aliasCatalog: Sablier.EVM.AliasCatalog | undefined;

function getAliasCatalog(): Sablier.EVM.AliasCatalog {
  if (_aliasCatalog) return _aliasCatalog;

  _aliasCatalog = {
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
          const existing = getPath<Sablier.EVM.Contract>(_aliasCatalog, [
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
          setPath(_aliasCatalog, [protocol, chainId, contract.alias], entry);
        }
      }
    }
  }
  return _aliasCatalog;
}

/**
 * Lazily initialized alias catalog for alias-based lookups.
 *
 * Uses an ES6 Proxy object to defer getAliasCatalog() execution until the catalog is actually accessed.
 * The Proxy intercepts property access and forwards it to the real catalog, which is built on first use.
 * This avoids iterating all releases at module load time.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
 */
export const aliasCatalog = new Proxy({} as Sablier.EVM.AliasCatalog, {
  // Intercept property access (e.g., aliasCatalog.lockup)
  get(_, prop) {
    return getAliasCatalog()[prop as keyof Sablier.EVM.AliasCatalog];
  },
  // Required for Object.keys(), JSON.stringify(), spread operator
  // Returns property descriptor (writable, enumerable, etc.) for a key
  getOwnPropertyDescriptor(_, prop) {
    return Object.getOwnPropertyDescriptor(getAliasCatalog(), prop);
  },
  // Required for Object.keys(), for...in, Object.getOwnPropertyNames()
  // Returns all property keys (strings and symbols) of the target
  ownKeys() {
    return Reflect.ownKeys(getAliasCatalog());
  },
});
