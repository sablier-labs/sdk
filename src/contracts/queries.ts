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
   * - { chainId, contractAddress, protocol, release }
   * - { chainId, contractAddress, release }
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

    if (contractAddress && contractName) {
      throw new Error("Sablier SDK: Cannot specify both contractAddress and contractName as query options");
    }

    if (contractName) {
      if (!release) {
        throw new Error("Sablier SDK: Cannot specify contractName without release");
      }
      const dep = _.find(release.deployments, { chainId });
      return dep && _.find(dep.contracts, { name: contractName });
    }

    if (contractAddress) {
      const contractAddressToLowerCase = contractAddress.toLowerCase();

      if (release) {
        const deployment = _.find(release.deployments, { chainId });
        return (
          deployment && _.find(deployment.contracts, (c) => c.address.toLowerCase() === contractAddressToLowerCase)
        );
      }

      if (protocol) {
        // Check if contract address exists in multiple releases for this protocol.
        const allReleases = releasesQueries.getAll({ protocol });
        const found = allReleases.filter((rel) => {
          const deployment = _.find(rel.deployments, { chainId });
          return (
            deployment && _.some(deployment.contracts, (c) => c.address.toLowerCase() === contractAddressToLowerCase)
          );
        });

        if (found.length > 1) {
          const versions = found.map((r) => r.version).join(", ");
          throw new Error(
            `Sablier SDK: Contract address ${contractAddress} exists in multiple releases (${versions}) for protocol "${protocol}". ` +
              `Please specify the release explicitly using { chainId, contractAddress, protocol, release } or { chainId, contractAddress, release } instead.`,
          );
        }

        return _.get(catalog, [protocol, chainId, contractAddressToLowerCase]);
      }
      return (
        _.get(catalog, ["airdrop", chainId, contractAddressToLowerCase]) ||
        _.get(catalog, ["flow", chainId, contractAddressToLowerCase]) ||
        _.get(catalog, ["legacy", chainId, contractAddressToLowerCase]) ||
        _.get(catalog, ["lockup", chainId, contractAddressToLowerCase])
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
