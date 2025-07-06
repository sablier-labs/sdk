import type { Sablier } from "@src/types";
import * as viem from "viem/chains";
import { defineChain as define } from "./definer";

export const testnets: Record<string, Sablier.Chain> = {
  arbitrumSepolia: define("arbitrum-sepolia", viem.arbitrumSepolia),
  baseSepolia: define("base-sepolia", viem.baseSepolia),
  blastSepolia: define("blast-sepolia", viem.blastSepolia),
  ethereumSepolia: define("ethereum-sepolia", viem.sepolia),
  lineaSepolia: define("linea-sepolia", viem.lineaSepolia),
  modeTestnet: define("mode-testnet", viem.modeTestnet),
  monadTestnet: define("monad-testnet", viem.monadTestnet),
  morphHolesky: define("morph-holesky", viem.morphHolesky),
  optimismSepolia: define("optimism-sepolia", viem.optimismSepolia),
  superseedSepolia: define("superseed-sepolia", viem.superseedSepolia),
  taikoHekla: define("taiko-hekla", viem.taikoHekla),
  zksyncSepolia: define("zksync-sepolia", viem.zksyncSepoliaTestnet),
};
