import { Protocol } from "@src/enums";
import { sortDeployments } from "@src/releases/helpers";
import { resolvers } from "@src/releases/resolvers";
import type { Sablier } from "@src/types";
import { mainnets } from "./deployments";
import manifest from "./manifest";

const sortedMainnets = sortDeployments(mainnets);
export const deployments: Sablier.Deployment[] = [...sortedMainnets];

export const release = resolvers.release.standard({
  deployments,
  isLatest: false,
  manifest,
  protocol: Protocol.Legacy,
  version: "v1.0",
});
