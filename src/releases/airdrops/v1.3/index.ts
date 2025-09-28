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
const deployments: Sablier.Deployment[] = [...sortedMainnets, ...sortedTestnets];

export const release = resolvers.release.standard({
  abi,
  aliases,
  deployments: deployments,
  isLatest: false,
  manifest: manifest,
  protocol: Protocol.Airdrops,
  version: "v1.3",
});
