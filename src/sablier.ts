/**
 * @file This file exports the Sablier object, singleton that contains the queries for the
 * chains, contracts, and releases.
 *
 * @example
 * ```typescript
 * import { sablier } from "sablier";
 *
 * const lockupContract = sablier.contracts.get({
 *   chainId: mainnet.id,
 *   contractName: "SablierLockup",
 *   release: releases.lockup["v2.0"],
 * });
 * const { address } = lockupContract;
 * ```
 */
import type { Sablier } from "@src/types";
import _ from "lodash";
import { chainsQueries } from "./chains/queries";
import { contractsQueries } from "./contracts/queries";
import { releasesQueries } from "./releases/queries";

const deploymentsQueries = {
  /**
   * Get many deployments.
   * - default            ⇒ all across all releases
   * - release            ⇒ that release's deployments
   */
  get: (opts: { chainId: number; release: Sablier.Release }): Sablier.Deployment | undefined => {
    const { release, chainId } = opts || {};
    return _.find(release.deployments, { chainId });
  },
  getAll: (): Sablier.Deployment[] => {
    return _.flatMap(releasesQueries.getAll(), (r) => r.deployments);
  },
};

export const sablier = {
  chains: chainsQueries,
  contracts: contractsQueries,
  deployments: deploymentsQueries,
  releases: releasesQueries,
};
