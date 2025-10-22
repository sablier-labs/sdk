import { sortChains } from "@src/helpers";
import type { Sablier } from "@src/types";
import _ from "lodash";
import * as chains from "./data";

export const chainsQueries = {
  get: (chainId: number): Sablier.EVM.Chain | undefined => {
    return _.find(chains, (c) => c.id === chainId);
  },
  getAll: (): Sablier.EVM.Chain[] => {
    return sortChains(_.values(chains));
  },
  getBySlug: (slug: string): Sablier.EVM.Chain | undefined => {
    return _.find(chains, (c) => c.slug === slug);
  },
  getMainnets: (): Sablier.EVM.Chain[] => {
    return sortChains(_.filter(_.values(chains), (c) => !c.isTestnet));
  },
  getOrThrow: (chainId: number): Sablier.EVM.Chain => {
    const chain = _.find(chains, (c) => c.id === chainId);
    if (!chain) {
      throw new Error(`Sablier SDK: Chain with ID ${chainId} not found`);
    }
    return chain;
  },
  getTestnets: (): Sablier.EVM.Chain[] => {
    return sortChains(_.filter(_.values(chains), (c) => c.isTestnet));
  },
};
