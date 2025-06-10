import type { Sablier } from "@src/types";
import type { Chain as ViemChain } from "viem/chains";
import * as viem from "viem/chains";
import { alchemyRPCs, infuraRPCs } from "./rpc";

type ConfigBool = { [chainId: number]: boolean };
type ConfigString = { [chainId: number]: string };

export const config = {
  slugs: {
    [viem.zksyncSepoliaTestnet.id]: "zksync-sepolia",
  } as ConfigString,
  ui: {
    // By default, testnets are not supported by the UI.
    supportedTestnets: {
      [viem.baseSepolia.id]: true,
      [viem.sepolia.id]: true,
    } as ConfigBool,
    // By default, mainnets are supported by the UI.
    unsupportedMainnets: {
      [viem.meld.id]: true,
      [viem.ronin.id]: true,
      [viem.taiko.id]: true,
    } as ConfigBool,
  },
  // These chains have the artifacts under the `artifacts-zk` directory.
  zk: {
    [viem.abstract.id]: true,
    [viem.sophon.id]: true,
    [viem.zksync.id]: true,
    [viem.zksyncSepoliaTestnet.id]: true,
  } as ConfigBool,
};

export function fill(slug: string, chain: ViemChain): Sablier.Chain {
  if (!chain.blockExplorers) {
    throw new Error(`Chain ${chain.name} has no block explorers`);
  }

  const isTestnet = Boolean(chain.testnet);
  const isSupportedByUI = isTestnet
    ? Boolean(config.ui.supportedTestnets[chain.id])
    : !config.ui.unsupportedMainnets[chain.id];

  return {
    ...chain,
    blockExplorers: chain.blockExplorers,
    isSupportedByUI,
    isTestnet,
    isZK: Boolean(config.zk[chain.id]),
    rpc: {
      alchemy: alchemyRPCs[chain.id],
      default: chain.rpcUrls.default.http[0],
      infura: infuraRPCs[chain.id],
    },
    slug,
  };
}
