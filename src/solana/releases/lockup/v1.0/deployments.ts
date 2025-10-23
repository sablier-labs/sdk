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
    protocol: Protocol.Lockup,
    version: "v1.0",
  });
}

/**
 * @description Mainnet deployments for Lockup v1.0
 */
export const mainnets: Sablier.Solana.Deployment[] = [
  get(chains.solana_mainnetBeta.id, {
    [manifest.SABLIER_LOCKUP_LINEAR]: ["4EauRKrNErKfsR4XetEZJNmvACGHbHnHV4R5dvJuqupC", 365675725],
  }),
];

/**
 * @description Testnet deployments for Lockup v1.0
 */
export const testnets: Sablier.Solana.Deployment[] = [
  get(chains.solana_devnet.id, {
    [manifest.SABLIER_LOCKUP_LINEAR]: ["4EauRKrNErKfsR4XetEZJNmvACGHbHnHV4R5dvJuqupC", 408019064],
  }),
];
