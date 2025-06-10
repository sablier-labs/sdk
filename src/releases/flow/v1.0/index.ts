import { Protocol } from "@src/enums";
import { sortDeployments } from "@src/releases/helpers";
import { resolvers } from "@src/releases/resolvers";
import type { Sablier } from "@src/types";
import aliases from "./aliases";
import { mainnets, testnets } from "./deployments";
import manifest from "./manifest";

const sortedMainnets = sortDeployments(mainnets);
const sortedTestnets = sortDeployments(testnets);
export const deployments: Sablier.Deployment[] = [...sortedMainnets, ...sortedTestnets];

export const release = resolvers.release.standard({
  aliases,
  deployments: deployments,
  isLatest: false,
  manifest: manifest,
  protocol: Protocol.Flow,
  version: "v1.0",
});
