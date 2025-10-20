import { sortChains } from "@src/helpers";
import type { ChainBase } from "@src/shared/types";
import _ from "lodash";

/**
 * Generic factory function to create type-safe chain query objects.
 *
 * @template T - Chain type extending ChainBase constraint
 * @param chains - Record of chain definitions keyed by chain identifier
 * @returns Query object with type-safe methods for chain operations
 *
 * @example
 * ```typescript
 * const evmQueries = createChainQueries<Sablier.EVM.Chain>(evmChains);
 * const solanaQueries = createChainQueries<Sablier.Solana.Chain>(solanaChains);
 * ```
 */
export function createChainQueries<T extends ChainBase>(chains: Record<string, T>) {
  return {
    /**
     * Find a chain by its numeric ID.
     *
     * @param chainId - The numeric chain identifier
     * @returns The chain if found, undefined otherwise
     */
    get: (chainId: number): T | undefined => {
      return _.find(chains, (c) => c.id === chainId);
    },

    /**
     * Get all chains sorted by name.
     *
     * @returns Array of all chains sorted alphabetically
     */
    getAll: (): T[] => {
      return sortChains(_.values(chains));
    },

    /**
     * Find a chain by its slug identifier.
     *
     * @param slug - The chain slug (e.g., "ethereum", "solana-mainnet")
     * @returns The chain if found, undefined otherwise
     */
    getBySlug: (slug: string): T | undefined => {
      return _.find(chains, (c) => c.slug === slug);
    },

    /**
     * Get all mainnet chains sorted by name.
     *
     * @returns Array of mainnet chains sorted alphabetically
     */
    getMainnets: (): T[] => {
      return sortChains(_.filter(_.values(chains), (c) => !c.isTestnet));
    },

    /**
     * Find a chain by its numeric ID, throwing an error if not found.
     *
     * @param chainId - The numeric chain identifier
     * @returns The chain
     * @throws Error if chain with the given ID is not found
     */
    getOrThrow: (chainId: number): T => {
      const chain = _.find(chains, (c) => c.id === chainId);
      if (!chain) {
        throw new Error(`Sablier SDK: Chain with ID ${chainId} not found`);
      }
      return chain;
    },

    /**
     * Get all testnet chains sorted by name.
     *
     * @returns Array of testnet chains sorted alphabetically
     */
    getTestnets: (): T[] => {
      return sortChains(_.filter(_.values(chains), (c) => c.isTestnet));
    },
  };
}
