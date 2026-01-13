import { getPath, setPath } from "@src/internal/utils/object-path";
import { Protocol } from "@src/solana/enums";
import { releasesQueries } from "@src/solana/releases/queries";
import type { Sablier } from "@src/types";

let _aliasCatalog: Sablier.Solana.AliasCatalog | undefined;

function getAliasCatalog(): Sablier.Solana.AliasCatalog {
  if (_aliasCatalog) return _aliasCatalog;

  _aliasCatalog = {
    [Protocol.Airdrops]: {},
    [Protocol.Lockup]: {},
  };

  for (const release of releasesQueries.getAll()) {
    const { protocol, version, deployments } = release;

    for (const deployment of deployments) {
      const { chainId, programs } = deployment;

      for (const program of programs) {
        if (program.alias) {
          const existing = getPath<Sablier.Solana.Program>(_aliasCatalog, [
            protocol,
            chainId,
            program.alias,
          ]);
          if (existing) {
            throw new Error(
              `Sablier SDK: Alias collision detected for "${program.alias}" on chain ${chainId} in ${protocol}. ` +
                `Existing: ${existing.address}, New: ${program.address}`,
            );
          }
          const entry = { ...program, protocol, version };
          setPath(_aliasCatalog, [protocol, chainId, program.alias], entry);
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
export const aliasCatalog = new Proxy({} as Sablier.Solana.AliasCatalog, {
  // Intercept property access (e.g., aliasCatalog.lockup)
  get(_, prop) {
    return getAliasCatalog()[prop as keyof Sablier.Solana.AliasCatalog];
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
