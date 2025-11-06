import _ from "lodash";

/**
 * Factory function to create releases queries with platform-specific configuration.
 * This eliminates code duplication between EVM and Solana implementations.
 */
export function createReleasesQueries<
  TProtocol extends string,
  TVersion extends string,
  TRelease extends { version: TVersion; deployments: Array<{ chainId: number }>; isLatest?: boolean },
>(config: { releases: Record<TProtocol, Record<string, TRelease>>; ProtocolEnum: Record<string, TProtocol> }) {
  const { releases, ProtocolEnum } = config;

  return {
    get: (opts: { protocol: TProtocol; version: TVersion }): TRelease | undefined => {
      const { protocol, version } = opts;
      return _.get(releases, [protocol, version]) as TRelease | undefined;
    },
    /**
     * Get all releases for a protocol.
     * - {}                  ⇒ all releases for all protocols
     * - {protocol}          ⇒ all releases for that protocol
     */
    getAll: (opts?: { protocol?: TProtocol }): TRelease[] => {
      const { protocol } = opts || {};
      if (protocol) {
        return _.flatMap(_.values(releases[protocol])) as TRelease[];
      }
      // Recursively get all releases from all protocols in the enum
      return _.flatMap(Object.values(ProtocolEnum), (protocolName) =>
        _.flatMap(_.values(releases[protocolName])),
      ) as TRelease[];
    },
    /**
     * Get the first release:
     * - {protocol}          ⇒ first overall
     * - {protocol,chainId}  ⇒ first on that chain
     */
    getFirst: (opts: { protocol: TProtocol; chainId?: number }): TRelease | undefined => {
      const { protocol, chainId } = opts;
      const list = releases[protocol];

      if (chainId) {
        return _.find(list, (r) => _.some(r.deployments, { chainId })) as TRelease | undefined;
      }

      return _.values(list)[0] as TRelease | undefined;
    },
    /**
     * Get the latest release for a protocol.
     * - {protocol}
     */
    getLatest: (opts: { protocol: TProtocol }): TRelease => {
      const list = _.values(releases[opts.protocol]) as TRelease[];
      const latest = list[list.length - 1];
      if (!latest.isLatest) {
        throw new Error(`Sablier SDK: No latest release found for Sablier ${opts.protocol}. Please report on GitHub.`);
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
 */
export function createContractsQueries<
  TProtocol extends string,
  TContract extends { name: string; address: string },
  TDeployment extends { chainId: number; contracts?: TContract[]; programs?: TContract[] },
  TRelease extends { version: string; deployments: TDeployment[] },
  TCatalog,
>(config: {
  catalog: TCatalog;
  releasesQueries: {
    getAll: (opts?: { protocol?: TProtocol }) => TRelease[];
  };
  protocols: TProtocol[];
  normalizeAddress: (address: string) => string;
  /** Field name for contracts (e.g., 'contracts' for EVM, 'programs' for Solana) */
  contractsField: "contracts" | "programs";
}) {
  const { catalog, releasesQueries, protocols, normalizeAddress, contractsField } = config;

  // Helper to safely get contracts/programs from deployment
  const getItems = (deployment: TDeployment | undefined): TContract[] => {
    if (!deployment) return [];
    return (deployment[contractsField] as TContract[]) || [];
  };

  return {
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
        const dep = _.find(release.deployments, { chainId }) as TDeployment | undefined;
        const items = getItems(dep);
        return (_.find(items, { name: contractName }) as TContract | undefined) || undefined;
      }

      // Query by address
      if (contractAddress) {
        const address = normalizeAddress(contractAddress);

        // Scoped to specific release
        if (release) {
          const dep = _.find(release.deployments, { chainId }) as TDeployment | undefined;
          const items = getItems(dep);
          return (_.find(items, (c) => normalizeAddress(c.address) === address) as TContract | undefined) || undefined;
        }

        // Scoped to protocol - check for duplicates across releases
        if (protocol) {
          const releases = releasesQueries.getAll({ protocol });
          const matches = releases.filter((rel) => {
            const dep = _.find(rel.deployments, { chainId }) as TDeployment | undefined;
            const items = getItems(dep);
            return _.some(items, (c) => normalizeAddress(c.address) === address);
          });

          if (matches.length > 1) {
            const versions = matches.map((r) => r.version).join(", ");
            throw new Error(
              `Sablier SDK: Contract ${contractAddress} exists in multiple releases (${versions}) for "${protocol}". ` +
                `Specify release: { chainId, contractAddress, release }`,
            );
          }

          return _.get(catalog, [protocol, chainId, address]);
        }

        // Fallback: search all protocols
        for (const protocol of protocols) {
          const contract = _.get(catalog, [protocol, chainId, address]);
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
    getAll: (opts?: { chainId?: number; protocol?: TProtocol; release?: TRelease }): TContract[] | undefined => {
      const { protocol, chainId, release } = opts || {};

      if (protocol && release) {
        throw new Error("Sablier SDK: Cannot specify both protocol and release as query options");
      }

      // by protocol
      if (protocol) {
        const releases = releasesQueries.getAll({ protocol });
        let deps = _.flatMap(releases, (r) => r.deployments);
        if (chainId) {
          deps = _.filter(deps, (d) => d.chainId === chainId);
          if (deps.length === 0) return undefined;
        }
        return _.flatMap(deps, getItems);
      }

      // by explicit release
      if (release) {
        let deps = release.deployments;
        if (chainId) {
          deps = _.filter(deps, (d) => d.chainId === chainId);
          if (deps.length === 0) return undefined;
        }
        return _.flatMap(deps, getItems);
      }

      // by chain id
      if (chainId) {
        const deps = _.flatMap(releasesQueries.getAll(), (r) => r.deployments);
        const filtered = _.filter(deps, (d) => d.chainId === chainId);
        return _.flatMap(filtered, getItems);
      }

      // no filters → all
      return _.flatMap(releasesQueries.getAll(), (r) => r.deployments.flatMap(getItems));
    },
  };
}
