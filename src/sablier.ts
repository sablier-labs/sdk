/**
 * @file This file exports the Sablier object, singleton that contains the queries for the
 * chains, contracts, and releases for both evm and solana compatible chains.
 *
 * @example
 * ```typescript
 * import { sablier } from "sablier";
 *
 * // EVM
 * const lockupRelease = sablier.evm.releases.getLatest({ protocol: "lockup" });
 * let lockupContract = sablier.evm.contracts.get({
 *   chainId: mainnet.id,
 *   contractName: "SablierLockup",
 *   release: lockupRelease,
 * });
 *
 * // Can also be accessed like this:
 * lockupContract = sablier.contracts.get({
 *   chainId: mainnet.id,
 *   contractName: "SablierLockup",
 *   release: lockupRelease,
 * });
 * const { address } = lockupContract;
 * ```
 */

import { chainsQueries as evmChainsQueries } from "./evm/chains/queries.js";
import { comptrollerQueries } from "./evm/comptroller/queries.js";
import { contractsQueries as evmContractsQueries } from "./evm/contracts/queries.js";
import { releasesQueries as evmReleasesQueries } from "./evm/releases/queries.js";
import { chainsQueries as solanaChainsQueries } from "./solana/chains/queries.js";
import { programsQueries as solanaProgramsQueries } from "./solana/programs/queries.js";
import { releasesQueries as solanaReleasesQueries } from "./solana/releases/queries.js";
import type { Sablier } from "./types.js";

/**
 * Has to be defined here to avoid circular dependencies.
 */
const evmDeploymentsQueries = {
  /**
   * Get many deployments.
   * - default            ⇒ all across all releases
   * - release            ⇒ that release's deployments
   */
  get: (opts: {
    chainId: number;
    release: Sablier.EVM.Release;
  }): Sablier.EVM.Deployment | undefined => {
    const { release, chainId } = opts || {};
    return release.deployments.find((d) => d.chainId === chainId);
  },
  getAll: (): Sablier.EVM.Deployment[] => {
    return evmReleasesQueries.getAll().flatMap((r) => r.deployments);
  },
};

const solanaDeploymentsQueries = {
  /**
   * Get many deployments.
   * - default            ⇒ all across all releases
   * - release            ⇒ that release's deployments
   */
  get: (opts: {
    chainId: number;
    release: Sablier.Solana.Release;
  }): Sablier.Solana.Deployment | undefined => {
    const { release, chainId } = opts || {};
    return release.deployments.find((d) => d.chainId === chainId);
  },
  getAll: (): Sablier.Solana.Deployment[] => {
    return solanaReleasesQueries.getAll().flatMap((r) => r.deployments);
  },
};

const evm = {
  chains: evmChainsQueries,
  comptroller: comptrollerQueries,
  contracts: evmContractsQueries,
  deployments: evmDeploymentsQueries,
  releases: evmReleasesQueries,
};

const solana = {
  chains: solanaChainsQueries,
  deployments: solanaDeploymentsQueries,
  programs: solanaProgramsQueries,
  releases: solanaReleasesQueries,
};

export const sablier = {
  ...evm, // re-exporting for pre-v1.7 backward compatibility
  evm,
  solana,
};
