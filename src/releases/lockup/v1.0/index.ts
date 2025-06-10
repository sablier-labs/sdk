import { Protocol } from "@src/enums";
import { sortDeployments } from "@src/releases/helpers";
import { resolvers } from "@src/releases/resolvers";
import type { Sablier } from "@src/types";
import aliases from "./aliases";
import { mainnets, testnets } from "./deployments";
import manifest from "./manifest";

const sortedMainnets = sortDeployments(mainnets);
const sortedTestnets = sortDeployments(testnets);
export const deployments: Sablier.Deployment.LockupV1[] = [...sortedMainnets, ...sortedTestnets];

export const release = resolvers.release.lockupV1({
  aliases,
  deployments,
  isLatest: false,
  manifest,
  protocol: Protocol.Lockup,
  version: "v1.0",
});
