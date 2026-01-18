/**
 * @file This file re-exports some of the Lockup v1.1 deployments as Airdrops v1.1 deployments.
 */
import {
  mainnets as lockupMainnets,
  testnets as lockupTestnets,
} from "@/src/evm/releases/lockup/v1.1/deployments.js";
import type { Sablier } from "@/src/types.js";
import manifest from "./manifest.js";

function filter(deployments: Sablier.EVM.Deployment.LockupV1[]): Sablier.EVM.Deployment.Standard[] {
  return deployments.filter((d) => {
    const peripheryContracts = d.periphery;
    return peripheryContracts.some((c) => c.name === manifest.SABLIER_V2_MERKLE_STREAMER_FACTORY);
  });
}

export const mainnets = filter(lockupMainnets);
export const testnets = filter(lockupTestnets);
