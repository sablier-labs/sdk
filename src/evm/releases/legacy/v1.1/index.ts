import { Protocol } from "@src/evm/enums";
import { sortDeployments } from "@src/evm/releases/helpers";
import { resolvers } from "@src/evm/releases/resolvers";
import type { Sablier } from "@src/types";
import { abi } from "./abi";
import { mainnets } from "./deployments";
import manifest from "./manifest";

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
