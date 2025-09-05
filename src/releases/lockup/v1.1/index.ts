import { Protocol } from "@src/enums";
import { sortDeployments } from "@src/releases/helpers";
import { resolvers } from "@src/releases/resolvers";
import type { Sablier } from "@src/types";
import { abi } from "./abi";
import aliases from "./aliases";
import { mainnets, testnets } from "./deployments";
import manifest from "./manifest";

const sortedMainnets = sortDeployments(mainnets);
const sortedTestnets = sortDeployments(testnets);
const deployments: Sablier.Deployment.LockupV1[] = [...sortedMainnets, ...sortedTestnets];

export const release = resolvers.release.lockupV1({
  abi,
  aliases,
  deployments,
  isLatest: false,
  manifest,
  protocol: Protocol.Lockup,
  version: "v1.1",
});
