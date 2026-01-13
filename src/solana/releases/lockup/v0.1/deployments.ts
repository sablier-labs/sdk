import { chains } from "@src/solana/chains/index.js";
import { Protocol } from "@src/solana/enums.js";
import { resolvers } from "@src/solana/releases/resolvers.js";
import type { Sablier } from "@src/types.js";
import aliases from "./aliases.js";
import manifest from "./manifest.js";

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
 * @description Mainnet deployments for Lockup v0.1
 */
export const mainnets: Sablier.Solana.Deployment[] = [
  get(chains.solanaMainnetBeta.id, {
    [manifest.SABLIER_LOCKUP_LINEAR]: ["4EauRKrNErKfsR4XetEZJNmvACGHbHnHV4R5dvJuqupC", 365_675_725],
  }),
];

/**
 * @description Testnet deployments for Lockup v0.1
 */
export const testnets: Sablier.Solana.Deployment[] = [
  get(chains.solanaDevnet.id, {
    [manifest.SABLIER_LOCKUP_LINEAR]: ["4EauRKrNErKfsR4XetEZJNmvACGHbHnHV4R5dvJuqupC", 408_019_064],
  }),
];
