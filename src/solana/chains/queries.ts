import { sortChains } from "@src/helpers";
import type { Sablier } from "@src/types";
import _ from "lodash";
import * as chains from "./data";

export const chainsQueries = {
  get: (chainId: number): Sablier.Solana.Chain | undefined => {
    return _.find(chains, (c) => c.id === chainId);
  },
  getAll: (): Sablier.Solana.Chain[] => {
    return sortChains(_.values(chains));
  },
  getBySlug: (slug: string): Sablier.Solana.Chain | undefined => {
    return _.find(chains, (c) => c.slug === slug);
  },
  getMainnets: (): Sablier.Solana.Chain[] => {
    return sortChains(_.filter(_.values(chains), (c) => !c.isTestnet));
  },
  getOrThrow: (chainId: number): Sablier.Solana.Chain => {
    const chain = _.find(chains, (c) => c.id === chainId);
    if (!chain) {
      throw new Error(`Sablier SDK: Chain with ID ${chainId} not found`);
    }
    return chain;
  },
  getTestnets: (): Sablier.Solana.Chain[] => {
    return sortChains(_.filter(_.values(chains), (c) => c.isTestnet));
  },
};
