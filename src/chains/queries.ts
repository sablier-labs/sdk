import type { Sablier } from "@src/types";
import _ from "lodash";
import { chains as allChains } from "./data";

export const chainsQueries = {
  get: (chainId: number): Sablier.Chain | undefined => {
    return _.find(allChains, { id: chainId });
  },
  getAll: (): Sablier.Chain[] => {
    return _.values(allChains);
  },
  getBySlug: (slug: string): Sablier.Chain | undefined => {
    return _.find(allChains, { slug });
  },
  getOrThrow: (chainId: number): Sablier.Chain => {
    const chain = _.find(allChains, { id: chainId });
    if (!chain) {
      throw new Error(`Chain with ID ${chainId} not found`);
    }
    return chain;
  },
};
