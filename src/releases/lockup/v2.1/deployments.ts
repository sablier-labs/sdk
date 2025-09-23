import { chains } from "@src/chains";
import { Protocol } from "@src/enums";
import { resolvers } from "@src/releases/resolvers";
import type { Sablier } from "@src/types";
import aliases from "./aliases";
import manifest from "./manifest";

function get(chainId: number, contractMap: Sablier.ContractMap): Sablier.Deployment {
  return resolvers.deployment.standard({
    aliasMap: aliases,
    chainId,
    contractMap,
    protocol: Protocol.Lockup,
    version: "v2.1",
  });
}

/**
 * @description Mainnet deployments for Lockup v2.1
 */
export const mainnets: Sablier.Deployment[] = [];

/**
 * @description Testnet deployments for Lockup v2.1
 */
export const testnets: Sablier.Deployment[] = [
  get(chains.sepolia.id, {
    [manifest.HELPERS]: "0xa0A1aC47260B95D334763473B868117EF7343aA0",
    [manifest.LOCKUP_MATH]: "0x1feB172238638897B13b69C65feB508a0a96b35D",
    [manifest.LOCKUP_NFT_DESCRIPTOR]: "0x69cEBD28c805A70F1a39374676c92E99190a34b8",
    [manifest.SABLIER_BATCH_LOCKUP]: "0x1C0689B759d335a8a94c1FFF8D78084142D537f1",
    [manifest.SABLIER_LOCKUP]: ["0x4E80870b94c4b38649bC7d7d28Cca1db96553Eb8", 9117858],
  }),
];
