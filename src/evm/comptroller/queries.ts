import type { Sablier } from "@src/types";
import { deployments } from "./deployments";

export const comptrollerQueries = {
  /**
   * @notice Returns the comptroller deployment for a specific chain.
   * @param chainId The chain identifier.
   */
  get(chainId: number): Sablier.EVM.Contract | undefined {
    const deployment = deployments.find((item) => item.chainId === chainId);
    return deployment ? { ...deployment } : undefined;
  },

  /**
   * @notice Returns all comptroller deployments across mainnets and testnets.
   */
  getAll(): Sablier.EVM.Contract[] {
    return deployments.map((deployment) => ({ ...deployment }));
  },
};
