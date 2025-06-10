import { releasesQueries } from "@src/releases/queries";
import type { Sablier } from "@src/types";
import _ from "lodash";
import { catalog } from "./catalog";

export const contractsQueries = {
  /**
   * Get a single contract using the following options:
   * - { chainId, name, release }
   * - { chainId, address, protocol }
   */
  get: (opts: {
    chainId: number;
    contractAddress?: string;
    contractName?: string;
    protocol?: Sablier.Protocol;
    release?: Sablier.Release;
  }): Sablier.Contract | undefined => {
    const { chainId, contractAddress, contractName, protocol, release } = opts;

    if (contractAddress && contractName) {
      throw new Error("Cannot specify both contractAddress and contractName as query options");
    }

    if (protocol && release) {
      throw new Error("Cannot specify both protocol and release as query options");
    }

    if (contractName) {
      if (!release) {
        throw new Error("Cannot specify contractName without release");
      }
      const dep = _.find(release.deployments, { chainId });
      return dep && _.find(dep.contracts, { name: contractName });
    }

    if (contractAddress) {
      if (!protocol) {
        throw new Error("Cannot specify contractAddress without protocol");
      }
      return _.get(catalog, [protocol, chainId, contractAddress]);
    }

    return undefined;
  },
  /**
   * Get many contracts.
   * - no options             ⇒ all
   * - { chainId }            ⇒ all for that chain
   * - { protocol }           ⇒ all for that protocol
   * - { protocol, chainId }  ⇒ filtered by chain
   * - { release }            ⇒ all deployments of that release
   * - { release, chainId }   ⇒ that slice of deployments
   */
  getAll: (opts?: {
    chainId?: number;
    protocol?: Sablier.Protocol;
    release?: Sablier.Release;
  }): Sablier.Contract[] | undefined => {
    const { protocol, chainId, release } = opts || {};

    if (protocol && release) {
      throw new Error("Cannot specify both protocol and release as query options");
    }

    // by protocol
    if (protocol) {
      const releases = releasesQueries.getAll({ protocol });
      let deps = _.flatMap(releases, (r) => r.deployments);
      if (chainId) {
        deps = _.filter(deps, { chainId });
        if (deps.length === 0) return undefined;
      }
      return _.flatMap(deps, (d) => d.contracts);
    }

    // by explicit release
    if (release) {
      let deps = release.deployments;
      if (chainId) {
        deps = _.filter(deps, { chainId });
        if (deps.length === 0) return undefined;
      }
      return _.flatMap(deps, (d) => d.contracts);
    }

    // by chain id
    if (chainId) {
      const deps = _.flatMap(releasesQueries.getAll(), (r) => r.deployments);
      const filtered = _.filter(deps, { chainId });
      return _.flatMap(filtered, (d) => d.contracts);
    }

    // no filters → all
    return _.flatMap(releasesQueries.getAll(), (r) => r.deployments.flatMap((d) => d.contracts));
  },
};
