import { Protocol } from "@/src/solana/enums.js";
import { sortDeployments } from "@/src/solana/releases/helpers.js";
import { resolvers } from "@/src/solana/releases/resolvers.js";
import type { Sablier } from "@/src/types.js";
import aliases from "./aliases.js";
import { mainnets, testnets } from "./deployments.js";
import { idl } from "./idl.js";
import manifest from "./manifest.js";

const sortedMainnets = sortDeployments(mainnets);
const sortedTestnets = sortDeployments(testnets);
const deployments: Sablier.Solana.Deployment[] = [...sortedMainnets, ...sortedTestnets];

export const release = resolvers.release.standard({
  aliases,
  deployments,
  idl,
  isLatest: true,
  manifest,
  protocol: Protocol.Airdrops,
  version: "v0.1",
});
