/**
 * @file This file exports the Sablier object, singleton that contains the queries for the
 * chains, contracts, and releases for both evm and solana compatible chains.
 *
 * @example
 * ```typescript
 * import { sablier } from "sablier";
 *
 * const lockupContract = sablier.evmContractsQueries.get({
 *   chainId: mainnet.id,
 *   contractName: "SablierLockup",
 *   release: releases.lockup["v2.0"],
 * });
 * const { address } = lockupContract;
 * ```
 */
import type { Sablier } from "@src/types";
import _ from "lodash";
import { chainsQueries as evmChainsQueries } from "./evm/chains/queries";
import { contractsQueries as evmContractsQueries } from "./evm/contracts/queries";
import { releasesQueries as evmReleasesQueries } from "./evm/releases/queries";
import { chainsQueries as solanaChainsQueries } from "./solana/chains/queries";
import { contractsQueries as solanaContractsQueries } from "./solana/contracts/queries";
import { releasesQueries as solanaReleasesQueries } from "./solana/releases/queries";

const evmDeploymentsQueries = {
  /**
   * Get many deployments.
   * - default            ⇒ all across all releases
   * - release            ⇒ that release's deployments
   */
  get: (opts: { chainId: number; release: Sablier.EVM.Release }): Sablier.EVM.Deployment | undefined => {
    const { release, chainId } = opts || {};
    return _.find(release.deployments, { chainId });
  },
  getAll: (): Sablier.EVM.Deployment[] => {
    return _.flatMap(evmReleasesQueries.getAll(), (r) => r.deployments);
  },
};

const solanaDeploymentsQueries = {
  /**
   * Get many deployments.
   * - default            ⇒ all across all releases
   * - release            ⇒ that release's deployments
   */
  get: (opts: { chainId: number; release: Sablier.Solana.Release }): Sablier.Solana.Deployment | undefined => {
    const { release, chainId } = opts || {};
    return _.find(release.deployments, { chainId });
  },
  getAll: (): Sablier.Solana.Deployment[] => {
    return _.flatMap(solanaReleasesQueries.getAll(), (r) => r.deployments);
  },
};

export const sablier = {
  /* -------------------------------------------------------------------------- */
  /*                               EVM                               */
  /* -------------------------------------------------------------------------- */
  evmChains: evmChainsQueries,
  evmContracts: evmContractsQueries,
  evmDeployments: evmDeploymentsQueries,
  evmReleases: evmReleasesQueries,

  /* -------------------------------------------------------------------------- */
  /*                               SOLANA                               */
  /* -------------------------------------------------------------------------- */
  solanaChains: solanaChainsQueries,
  solanaContracts: solanaContractsQueries,
  solanaDeployments: solanaDeploymentsQueries,
  solanaReleases: solanaReleasesQueries,
};
