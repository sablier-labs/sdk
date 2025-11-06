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
    protocol: Protocol.Lockup,
    version: "v0.1",
  });
}

/**
 * @description Mainnet deployments for Lockup v1.0
 */
export const mainnets: Sablier.Solana.Deployment[] = [
  get(chains.solanaMainnetBeta.id, {
    [manifest.SABLIER_LOCKUP_LINEAR]: ["4EauRKrNErKfsR4XetEZJNmvACGHbHnHV4R5dvJuqupC", 365675725],
  }),
];

/**
 * @description Testnet deployments for Lockup v1.0
 */
export const testnets: Sablier.Solana.Deployment[] = [
  get(chains.solanaDevnet.id, {
    [manifest.SABLIER_LOCKUP_LINEAR]: ["4EauRKrNErKfsR4XetEZJNmvACGHbHnHV4R5dvJuqupC", 408019064],
  }),
];
