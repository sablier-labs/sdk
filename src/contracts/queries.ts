import { Protocol } from "@src/enums";
import { releasesQueries } from "@src/releases/queries";
import type { Sablier } from "@src/types";
import _ from "lodash";
import { catalog } from "./catalog";

export const contractsQueries = {
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
    protocol?: Sablier.Protocol;
    release?: Sablier.Release;
  }): Sablier.Contract | undefined => {
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
      const dep = _.find(release.deployments, { chainId });
      return dep ? _.find(dep.contracts, { name: contractName }) : undefined;
    }

    // Query by address
    if (contractAddress) {
      const address = contractAddress.toLowerCase();

      // Scoped to specific release
      if (release) {
        const dep = _.find(release.deployments, { chainId });
        return dep ? _.find(dep.contracts, (c) => c.address.toLowerCase() === address) : undefined;
      }

      // Scoped to protocol - check for duplicates across releases
      if (protocol) {
        const releases = releasesQueries.getAll({ protocol });
        const matches = releases.filter((rel) => {
          const dep = _.find(rel.deployments, { chainId });
          return dep && _.some(dep.contracts, (c) => c.address.toLowerCase() === address);
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
      return (
        _.get(catalog, [Protocol.Airdrops, chainId, address]) ||
        _.get(catalog, [Protocol.Flow, chainId, address]) ||
        _.get(catalog, [Protocol.Legacy, chainId, address]) ||
        _.get(catalog, [Protocol.Lockup, chainId, address])
      );
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
    protocol?: Sablier.Protocol;
    release?: Sablier.Release;
  }): Sablier.Contract[] | undefined => {
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
      return _.flatMap(deps, (d) => d.contracts);
    }

    // by explicit release
    if (release) {
      let deps = release.deployments;
      if (chainId) {
        deps = _.filter(deps, (d) => d.chainId === chainId);
        if (deps.length === 0) return undefined;
      }
      return _.flatMap(deps, (d) => d.contracts);
    }

    // by chain id
    if (chainId) {
      const deps = _.flatMap(releasesQueries.getAll(), (r) => r.deployments);
      const filtered = _.filter(deps, (d) => d.chainId === chainId);
      return _.flatMap(filtered, (d) => d.contracts);
    }

    // no filters → all
    return _.flatMap(releasesQueries.getAll(), (r) => r.deployments.flatMap((d) => d.contracts));
  },
};
