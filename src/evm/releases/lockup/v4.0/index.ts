import { Protocol } from "@/src/evm/enums.js";
import { resolvers } from "@/src/evm/releases/resolvers.js";
import type { Sablier } from "@/src/types.js";
import { abi } from "./abi.js";
import aliases from "./aliases.js";
import { mainnets, testnets } from "./deployments.js";
import manifest from "./manifest.js";

const deployments: Sablier.EVM.Deployment[] = [...mainnets, ...testnets];

export const release = resolvers.release.standard({
  abi,
  aliases,
  deployments,
  isLatest: true,
  manifest,
  protocol: Protocol.Lockup,
  version: "v4.0",
});
