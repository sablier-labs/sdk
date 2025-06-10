/**
 * @file This file re-exports some of the Lockup v1.1 deployments as Airdrops v1.1 deployments.
 */
import { mainnets as lockupMainnets, testnets as lockupTestnets } from "@src/releases/lockup/v1.1/deployments";
import type { Sablier } from "@src/types";
import _ from "lodash";
import manifest from "./manifest";

function filter(deployments: Sablier.Deployment.LockupV1[]): Sablier.Deployment.Standard[] {
  return _.filter(deployments, (d) => {
    const peripheryContracts = d.periphery;
    return _.some(peripheryContracts, { name: manifest.SABLIER_V2_MERKLE_STREAMER_FACTORY });
  });
}

export const mainnets = filter(lockupMainnets);
export const testnets = filter(lockupTestnets);
