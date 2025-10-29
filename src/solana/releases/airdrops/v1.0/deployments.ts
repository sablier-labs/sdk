import { chains } from "@src/solana/chains";
import { Protocol } from "@src/solana/enums";
import { resolvers } from "@src/solana/releases/resolvers";
import type { Sablier } from "@src/types";
import aliases from "./aliases";
import manifest from "./manifest";

function get(chainId: number, contractMap: Sablier.Solana.ContractMap): Sablier.Solana.Deployment {
  return resolvers.deployment.standard({
    aliasMap: aliases,
    chainId,
    contractMap,
    protocol: Protocol.Airdrops,
    version: "v1.0",
  });
}

/**
 * @description Mainnet deployments for Airdrops v1.0
 */
export const mainnets: Sablier.Solana.Deployment[] = [
  get(chains.solana_mainnetBeta.id, {
    [manifest.SABLIER_MERKLE_INSTANT]: ["7XrxoQejBoGouW4V3aozTSwub7xSDjYqB4Go7YLjF9rV", 365675848],
  }),
];

/**
 * @description Testnet deployments for Airdrops v1.0
 */
export const testnets: Sablier.Solana.Deployment[] = [
  get(chains.solana_devnet.id, {
    [manifest.SABLIER_MERKLE_INSTANT]: ["7XrxoQejBoGouW4V3aozTSwub7xSDjYqB4Go7YLjF9rV", 408019095],
  }),
];
