import { Protocol } from "@src/evm/enums.js";
import { sortDeployments } from "@src/evm/releases/helpers.js";
import { resolvers } from "@src/evm/releases/resolvers.js";
import type { Sablier } from "@src/types.js";
import { abi } from "./abi.js";
import { mainnets } from "./deployments.js";
import manifest from "./manifest.js";

const sortedMainnets = sortDeployments(mainnets);

const deployments: Sablier.EVM.Deployment[] = [...sortedMainnets];

export const release = resolvers.release.standard({
  abi,
  deployments,
  isLatest: true,
  manifest,
  protocol: Protocol.Legacy,
  version: "v1.1",
});
