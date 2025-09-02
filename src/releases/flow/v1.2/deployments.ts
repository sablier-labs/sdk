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
    protocol: Protocol.Flow,
    version: "v1.1",
  });
}

/**
 * @description Mainnet deployments for Flow v1.1
 */
export const mainnets: Sablier.Deployment[] = [];

/**
 * @description Testnet deployments for Flow v1.1
 */
export const testnets: Sablier.Deployment[] = [
  get(chains.sepolia.id, {
    [manifest.SABLIER_FLOW]: ["0x3f69b642D012A7736D34C0F190084F7081Fd0DC1", 9118024],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xc9dBf2D207D178875b698e5f7493ce2d8BA88994",
  }),
];
