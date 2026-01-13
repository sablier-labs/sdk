import { getPath } from "@src/internal/utils/object-path";

/**
 * Factory function to create releases queries with platform-specific configuration.
 * This eliminates code duplication between EVM and Solana implementations.
 */
export function createReleasesQueries<
  TProtocol extends string,
  TVersion extends string,
  TRelease extends {
    version: TVersion;
    deployments: Array<{ chainId: number }>;
    isLatest?: boolean;
  },
>(config: {
  releases: Record<TProtocol, Record<string, TRelease>>;
  ProtocolEnum: Record<string, TProtocol>;
}) {
  const { releases, ProtocolEnum } = config;

  return {
    get: (opts: { protocol: TProtocol; version: TVersion }): TRelease | undefined => {
      const { protocol, version } = opts;
      return getPath<TRelease>(releases, [protocol, version]);
    },
    /**
     * Get all releases for a protocol.
     * - {}                  ⇒ all releases for all protocols
     * - {protocol}          ⇒ all releases for that protocol
     */
    getAll: (opts?: { protocol?: TProtocol }): TRelease[] => {
      const { protocol } = opts || {};
      if (protocol) {
        return Object.values(releases[protocol]) as TRelease[];
      }
      // Recursively get all releases from all protocols in the enum
      return Object.values(ProtocolEnum).flatMap((protocolName) =>
        Object.values(releases[protocolName]),
      ) as TRelease[];
    },
    /**
     * Get the first release:
     * - {protocol}          ⇒ first overall
     * - {protocol,chainId}  ⇒ first on that chain
     */
    getFirst: (opts: { protocol: TProtocol; chainId?: number }): TRelease | undefined => {
      const { protocol, chainId } = opts;
      const list = Object.values(releases[protocol]) as TRelease[];

      if (chainId) {
        return list.find((r) => r.deployments.some((d) => d.chainId === chainId));
      }

      return list[0];
    },
    /**
     * Get the latest release for a protocol.
     * - {protocol}
     */
    getLatest: (opts: { protocol: TProtocol }): TRelease => {
      const list = Object.values(releases[opts.protocol]) as TRelease[];
      const latest = list[list.length - 1];
      if (!latest.isLatest) {
        throw new Error(
          `Sablier SDK: No latest release found for Sablier ${opts.protocol}. Please report on GitHub.`,
        );
      }
      return latest;
    },
  };
}

/**
 * Factory function to create contract queries with platform-specific configuration.
 * This eliminates code duplication between EVM and Solana implementations.
 *
 * @template TProtocol - The protocol type
 * @template TContract - The contract/program type with name and address fields
 * @template TDeployment - The deployment type containing contracts or programs
 * @template TRelease - The release type
 * @template TCatalog - The catalog type for reverse lookups
 * @template TAliasCatalog - The alias catalog type for alias-based lookups
 */
export function createContractsQueries<
  TProtocol extends string,
  TContract extends { name: string; address: string; alias?: string },
  TDeployment extends { chainId: number; contracts?: TContract[]; programs?: TContract[] },
  TRelease extends { version: string; deployments: TDeployment[] },
  TCatalog,
  TAliasCatalog = undefined,
>(config: {
  aliasCatalog?: TAliasCatalog;
  catalog: TCatalog;
  releasesQueries: {
    getAll: (opts?: { protocol?: TProtocol }) => TRelease[];
    getLatest: (opts: { protocol: TProtocol }) => TRelease;
  };
  protocols: TProtocol[];
  normalizeAddress: (address: string) => string;
  /** Field name for contracts (e.g., 'contracts' for EVM, 'programs' for Solana) */
  contractsField: "contracts" | "programs";
}) {
  const { aliasCatalog, catalog, releasesQueries, protocols, normalizeAddress, contractsField } =
    config;

  // Helper to safely get contracts/programs from deployment
  const getItems = (deployment: TDeployment | undefined): TContract[] => {
    if (!deployment) return [];
    return (deployment[contractsField] as TContract[]) || [];
  };

  return {
    aliasCatalog,
    /**
     * Get a single contract using the following options:
     *
     * - { chainId, contractName, release }
     * - { chainId, contractAddress, protocol }
     * - { chainId, contractAddress, release }
     * - { chainId, contractAddress, protocol, release }
     *
     * Note: If a contract address exists in multiple releases for the same protocol, you must specify the release.
     */
    get: (opts: {
      chainId: number;
      contractAddress?: string;
      contractName?: string;
      protocol?: TProtocol;
      release?: TRelease;
    }): TContract | undefined => {
      const { chainId, contractAddress, contractName, protocol, release } = opts;

      // Validation
      if (contractAddress && contractName) {
        throw new Error("Sablier SDK: Cannot specify both contractAddress and contractName");
      }

      // Query by name requires release
      if (contractName) {
        if (!release) {
          throw new Error("Sablier SDK: contractName requires release to be specified");
        }
        const dep = release.deployments.find((d) => d.chainId === chainId) as
          | TDeployment
          | undefined;
        const items = getItems(dep);
        return items.find((c) => c.name === contractName);
      }

      // Query by address
      if (contractAddress) {
        const address = normalizeAddress(contractAddress);

        // Scoped to specific release
        if (release) {
          const dep = release.deployments.find((d) => d.chainId === chainId) as
            | TDeployment
            | undefined;
          const items = getItems(dep);
          return items.find((c) => normalizeAddress(c.address) === address);
        }

        // Scoped to protocol - check for duplicates across releases
        if (protocol) {
          const releases = releasesQueries.getAll({ protocol });
          const matches = releases.filter((rel) => {
            const dep = rel.deployments.find((d) => d.chainId === chainId) as
              | TDeployment
              | undefined;
            const items = getItems(dep);
            return items.some((c) => normalizeAddress(c.address) === address);
          });

          if (matches.length > 1) {
            const versions = matches.map((r) => r.version).join(", ");
            throw new Error(
              `Sablier SDK: Contract ${contractAddress} exists in multiple releases (${versions}) for "${protocol}". ` +
                `Specify release: { chainId, contractAddress, release }`,
            );
          }

          return getPath<TContract>(catalog, [protocol, chainId, address]);
        }

        // Fallback: search all protocols
        for (const protocol of protocols) {
          const contract = getPath<TContract>(catalog, [protocol, chainId, address]);
          if (contract) return contract;
        }
        return undefined;
      }

      return undefined;
    },

    /**
     * Get many contracts.
     * - no options             ⇒ all
     * - { chainId }            ⇒ all for that chain
     * - { protocol }           ⇒ all for that protocol
     * - { protocol, chainId }  ⇒ all for that protocol and chain
     * - { release }            ⇒ all deployments of that release
     * - { release, chainId }   ⇒ all for that release and chain
     */
    getAll: (opts?: {
      chainId?: number;
      protocol?: TProtocol;
      release?: TRelease;
    }): TContract[] | undefined => {
      const { protocol, chainId, release } = opts || {};

      if (protocol && release) {
        throw new Error("Sablier SDK: Cannot specify both protocol and release as query options");
      }

      // by protocol
      if (protocol) {
        const releases = releasesQueries.getAll({ protocol });
        let deps = releases.flatMap((r) => r.deployments);
        if (chainId) {
          deps = deps.filter((d) => d.chainId === chainId);
          if (deps.length === 0) return undefined;
        }
        return deps.flatMap(getItems);
      }

      // by explicit release
      if (release) {
        let deps = release.deployments;
        if (chainId) {
          deps = deps.filter((d) => d.chainId === chainId);
          if (deps.length === 0) return undefined;
        }
        return deps.flatMap(getItems);
      }

      // by chain id
      if (chainId) {
        const deps = releasesQueries.getAll().flatMap((r) => r.deployments);
        const filtered = deps.filter((d) => d.chainId === chainId);
        return filtered.flatMap(getItems);
      }

      // no filters → all
      return releasesQueries.getAll().flatMap((r) => r.deployments.flatMap(getItems));
    },

    /**
     * Get a contract by its alias.
     * Aliases are version-specific (e.g., LK = Lockup v2.0, LK2 = Lockup v3.0).
     *
     * @example
     * contractsQueries.getByAlias({ alias: "LK2", chainId: 1 })
     * contractsQueries.getByAlias({ alias: "FL3", chainId: 137, protocol: "flow" })
     */
    getByAlias: (opts: {
      alias: string;
      chainId: number;
      protocol?: TProtocol;
    }): TContract | undefined => {
      const { alias, chainId, protocol } = opts;

      if (!aliasCatalog) {
        return undefined;
      }

      if (protocol) {
        return getPath<TContract>(aliasCatalog, [protocol, chainId, alias]);
      }

      // Search all protocols
      for (const p of protocols) {
        const contract = getPath<TContract>(aliasCatalog, [p, chainId, alias]);
        if (contract) return contract;
      }
      return undefined;
    },

    /**
     * Get the latest contract by name for a protocol.
     * - { chainId, contractName, protocol }
     */
    getLatestByName: (opts: {
      chainId: number;
      contractName: string;
      protocol: TProtocol;
    }): TContract | undefined => {
      const { chainId, contractName, protocol } = opts;
      const release = releasesQueries.getLatest({ protocol });
      const dep = release.deployments.find((d) => d.chainId === chainId) as TDeployment | undefined;
      const items = getItems(dep);
      return items.find((c) => c.name === contractName);
    },
  };
}
