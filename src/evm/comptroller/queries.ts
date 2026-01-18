import type { Sablier } from "@/src/types.js";
import { deployments } from "./deployments.js";

export const comptrollerQueries = {
  /**
   * @notice Returns the comptroller deployment for a specific chain.
   * @param chainId The chain identifier.
   */
  get(chainId: number): Sablier.EVM.Contract | undefined {
    const deployment = deployments.find((item: Sablier.EVM.Contract) => item.chainId === chainId);
    return deployment ? { ...deployment } : undefined;
  },

  /**
   * @notice Returns all comptroller deployments across mainnets and testnets.
   */
  getAll(): Sablier.EVM.Contract[] {
    return deployments.map((deployment: Sablier.EVM.Contract) => ({ ...deployment }));
  },
};
