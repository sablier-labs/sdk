import type { Sablier } from "@src/types";
import * as viem from "viem/chains";
import { fill } from "./config";

export const testnets: Record<string, Sablier.Chain> = {
  arbitrumSepolia: fill("arbitrum-sepolia", viem.arbitrumSepolia),
  baseSepolia: fill("base-sepolia", viem.baseSepolia),
  blastSepolia: fill("blast-sepolia", viem.blastSepolia),
  ethereumSepolia: fill("ethereum-sepolia", viem.sepolia),
  lineaSepolia: fill("linea-sepolia", viem.lineaSepolia),
  modeTestnet: fill("mode-testnet", viem.modeTestnet),
  monadTestnet: fill("monad-testnet", viem.monadTestnet),
  morphHolesky: fill("morph-holesky", viem.morphHolesky),
  optimismSepolia: fill("optimism-sepolia", viem.optimismSepolia),
  superseedSepolia: fill("superseed-sepolia", viem.superseedSepolia),
  taikoHekla: fill("taiko-hekla", viem.taikoHekla),
  zksyncSepolia: fill("zksync-sepolia", viem.zksyncSepoliaTestnet),
};
