import { resolvers } from "@src/releases/resolvers";
import type { Sablier } from "@src/types";
import aliases from "./aliases";
import { mainnets, testnets } from "./deployments";
import manifest from "./manifest";

const deployments: Sablier.Deployment[] = [...mainnets, ...testnets];

export const release = resolvers.release.standard({
  aliases,
  deployments: deployments,
  isLatest: false,
  manifest: manifest,
  protocol: "airdrops",
  version: "v1.1",
});
