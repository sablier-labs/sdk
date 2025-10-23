import { Protocol } from "@src/solana/enums";
import { sortDeployments } from "@src/solana/releases/helpers";
import { resolvers } from "@src/solana/releases/resolvers";
import type { Sablier } from "@src/types";
import aliases from "./aliases";
import { mainnets, testnets } from "./deployments";
import { idl } from "./idl";
import manifest from "./manifest";

const sortedMainnets = sortDeployments(mainnets);
const sortedTestnets = sortDeployments(testnets);
const deployments: Sablier.Solana.Deployment[] = [...sortedMainnets, ...sortedTestnets];

export const release = resolvers.release.standard({
  aliases,
  deployments,
  idl,
  isLatest: true,
  manifest,
  protocol: Protocol.Lockup,
  version: "v1.0",
});
