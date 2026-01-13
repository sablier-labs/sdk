/**
 * @file This file re-exports some of the Lockup v1.2 deployments as Airdrops v1.2 deployments.
 */
import {
  mainnets as lockupMainnets,
  testnets as lockupTestnets,
} from "@src/evm/releases/lockup/v1.2/deployments.js";
import type { Sablier } from "@src/types.js";
import manifest from "./manifest.js";

function filter(deployments: Sablier.EVM.Deployment.LockupV1[]): Sablier.EVM.Deployment.Standard[] {
  return deployments.filter((d) => {
    const peripheryContracts = d.periphery;
    return peripheryContracts.some((c) => c.name === manifest.SABLIER_V2_MERKLE_LOCKUP_FACTORY);
  });
}

export const mainnets = filter(lockupMainnets);
export const testnets = filter(lockupTestnets);
