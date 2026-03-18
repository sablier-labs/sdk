import { Protocol } from "@/src/evm/enums.js";
import { sortDeployments } from "@/src/evm/releases/helpers.js";
import { resolvers } from "@/src/evm/releases/resolvers.js";
import type { Sablier } from "@/src/types.js";
import { abi } from "./abi.js";
import aliases from "./aliases.js";
import { mainnets, testnets } from "./deployments.js";
import manifest from "./manifest.js";

const sortedMainnets = sortDeployments(mainnets);
const sortedTestnets = sortDeployments(testnets);
const deployments: Sablier.EVM.Deployment[] = [...sortedMainnets, ...sortedTestnets];

export const release = resolvers.release.standard({
  abi,
  aliases,
  deployments,
  isLatest: true,
  manifest,
  protocol: Protocol.Bob,
  version: "v1.0",
});
