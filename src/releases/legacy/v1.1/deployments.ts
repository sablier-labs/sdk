import { chains } from "@src/chains";
import { Protocol } from "@src/enums";
import { resolvers } from "@src/releases/resolvers";
import type { Sablier } from "@src/types";
import manifest from "./manifest";

const aliasMap = {};

function get(chainId: number, contractMap: Sablier.ContractMap): Sablier.Deployment {
  return resolvers.deployment.standard({
    aliasMap,
    chainId,
    contractMap,
    protocol: Protocol.Legacy,
    version: "v1.1",
  });
}

/**
 * @description Mainnet deployments for Legacy v1.1
 */
export const mainnets: Sablier.Deployment[] = [
  get(chains.arbitrum.id, {
    [manifest.SABLIER]: "0xaDB944B478818d95659067E70D2e5Fc43Fa3eDe9",
  }),
  get(chains.avalanche.id, {
    [manifest.SABLIER]: "0x73f503fad13203C87889c3D5c567550b2d41D7a4",
  }),
  get(chains.bsc.id, {
    [manifest.SABLIER]: "0x05BC7f5fb7F248d44d38703e5C921A8c16825161",
  }),
  get(chains.ethereum.id, {
    [manifest.SABLIER]: "0xaDB944B478818d95659067E70D2e5Fc43Fa3eDe9",
  }),
  get(chains.optimism.id, {
    [manifest.SABLIER]: "0x6C5927c0679e6d857E87367bb635decbcB20F31c",
  }),
  get(chains.polygon.id, {
    [manifest.SABLIER]: "0xAC18EAB6592F5fF6F9aCf5E0DCE0Df8E49124C06",
  }),
  get(chains.ronin.id, {
    [manifest.SABLIER]: "0xDe9dCc27aa1552d591Fc9B9c21881feE43BD8118",
  }),
];
