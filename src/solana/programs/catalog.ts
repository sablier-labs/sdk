import { setPath } from "@/src/internal/utils/object-path.js";
import { Protocol } from "@/src/solana/enums.js";
import { releasesQueries } from "@/src/solana/releases/queries.js";
import type { Sablier } from "@/src/types.js";

let _catalog: Sablier.Solana.ProgramCatalog | undefined;

function getCatalog(): Sablier.Solana.ProgramCatalog {
  if (_catalog) {
    return _catalog;
  }

  _catalog = {
    [Protocol.Airdrops]: {},
    [Protocol.Lockup]: {},
  };

  for (const release of releasesQueries.getAll()) {
    const { protocol, version, deployments } = release;

    for (const deployment of deployments) {
      const { chainId, programs } = deployment;

      for (const contract of programs) {
        const address = contract.address;
        const entry = { ...contract, protocol, version };
        setPath(_catalog, [protocol, chainId, address], entry);
      }
    }
  }
  return _catalog;
}

/**
 * Lazily initialized catalog for reverse address lookups.
 *
 * Uses an ES6 Proxy object to defer getCatalog() execution until the catalog is actually accessed.
 * The Proxy intercepts property access and forwards it to the real catalog, which is built on first use.
 * This avoids iterating all releases at module load time.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
 */
export const catalog = new Proxy({} as Sablier.Solana.ProgramCatalog, {
  // Intercept property access (e.g., catalog.lockup)
  get(_, prop) {
    return getCatalog()[prop as keyof Sablier.Solana.ProgramCatalog];
  },
  // Required for Object.keys(), JSON.stringify(), spread operator
  // Returns property descriptor (writable, enumerable, etc.) for a key
  getOwnPropertyDescriptor(_, prop) {
    return Object.getOwnPropertyDescriptor(getCatalog(), prop);
  },
  // Required for Object.keys(), for...in, Object.getOwnPropertyNames()
  // Returns all property keys (strings and symbols) of the target
  ownKeys() {
    return Reflect.ownKeys(getCatalog());
  },
});
