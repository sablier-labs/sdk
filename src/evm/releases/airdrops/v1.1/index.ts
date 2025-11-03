import { resolvers } from "@src/evm/releases/resolvers";
import type { Sablier } from "@src/types";
import { abi } from "./abi";
import aliases from "./aliases";
import { mainnets, testnets } from "./deployments";
import manifest from "./manifest";

const deployments: Sablier.EVM.Deployment[] = [...mainnets, ...testnets];

export const release = resolvers.release.standard({
  abi,
  aliases,
  deployments: deployments,
  isLatest: false,
  manifest: manifest,
  protocol: "airdrops",
  version: "v1.1",
});
