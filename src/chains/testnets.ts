import type { Sablier } from "@src/types";
import * as viem from "viem/chains";
import { resolve } from "./resolver";

export const testnets: Record<string, Sablier.Chain> = {
  arbitrumSepolia: resolve("arbitrum-sepolia", viem.arbitrumSepolia),
  baseSepolia: resolve("base-sepolia", viem.baseSepolia),
  blastSepolia: resolve("blast-sepolia", viem.blastSepolia),
  ethereumSepolia: resolve("ethereum-sepolia", viem.sepolia),
  lineaSepolia: resolve("linea-sepolia", viem.lineaSepolia),
  modeTestnet: resolve("mode-testnet", viem.modeTestnet),
  monadTestnet: resolve("monad-testnet", viem.monadTestnet),
  morphHolesky: resolve("morph-holesky", viem.morphHolesky),
  optimismSepolia: resolve("optimism-sepolia", viem.optimismSepolia),
  superseedSepolia: resolve("superseed-sepolia", viem.superseedSepolia),
  taikoHekla: resolve("taiko-hekla", viem.taikoHekla),
  zksyncSepolia: resolve("zksync-sepolia", viem.zksyncSepoliaTestnet),
};
