import { Protocol } from "@src/evm/enums";
import { sortDeployments } from "@src/evm/releases/helpers";
import { resolvers } from "@src/evm/releases/resolvers";
import type { Sablier } from "@src/types";
import { abi } from "./abi";
import aliases from "./aliases";
import { mainnets, testnets } from "./deployments";
import manifest from "./manifest";

const sortedMainnets = sortDeployments(mainnets);
const sortedTestnets = sortDeployments(testnets);
const deployments: Sablier.EVM.Deployment[] = [...sortedMainnets, ...sortedTestnets];

export const release = resolvers.release.standard({
  abi,
  aliases,
  deployments: deployments,
  isLatest: true,
  manifest: manifest,
  protocol: Protocol.Flow,
  version: "v2.0",
});
