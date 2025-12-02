import { chains } from "@src/solana/chains";
import { Protocol } from "@src/solana/enums";
import { resolvers } from "@src/solana/releases/resolvers";
import type { Sablier } from "@src/types";
import aliases from "./aliases";
import manifest from "./manifest";

function get(chainId: number, programMap: Sablier.Solana.ProgramMap): Sablier.Solana.Deployment {
  return resolvers.deployment.standard({
    aliasMap: aliases,
    chainId,
    contractMap: programMap,
    protocol: Protocol.Airdrops,
    version: "v0.1",
  });
}

/**
 * @description Mainnet deployments for Airdrops v0.1
 */
export const mainnets: Sablier.Solana.Deployment[] = [
  get(chains.solanaMainnetBeta.id, {
    [manifest.SABLIER_MERKLE_INSTANT]: [
      "7XrxoQejBoGouW4V3aozTSwub7xSDjYqB4Go7YLjF9rV",
      365_675_848,
    ],
  }),
];

/**
 * @description Devnet deployments for Airdrops v0.1
 */
export const testnets: Sablier.Solana.Deployment[] = [
  get(chains.solanaDevnet.id, {
    [manifest.SABLIER_MERKLE_INSTANT]: [
      "7XrxoQejBoGouW4V3aozTSwub7xSDjYqB4Go7YLjF9rV",
      408_019_095,
    ],
  }),
];
