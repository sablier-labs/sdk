import * as viem from "viem/chains";
import { fill } from "./config";

export const arbitrumSepolia = fill("arbitrum-sepolia", viem.arbitrumSepolia);
export const baseSepolia = fill("base-sepolia", viem.baseSepolia);
export const blastSepolia = fill("blast-sepolia", viem.blastSepolia);
export const lineaSepolia = fill("linea-sepolia", viem.lineaSepolia);
export const ethereumSepolia = fill("ethereum-sepolia", viem.sepolia);
export const modeTestnet = fill("mode-testnet", viem.modeTestnet);
export const monadTestnet = fill("monad-testnet", viem.monadTestnet);
export const morphHolesky = fill("morph-holesky", viem.morphHolesky);
export const optimismSepolia = fill("optimism-sepolia", viem.optimismSepolia);
export const superseedSepolia = fill("superseed-sepolia", viem.superseedSepolia);
export const taikoHekla = fill("taiko-hekla", viem.taikoHekla);
export const zksyncSepolia = fill("zksync-sepolia", viem.zksyncSepoliaTestnet);
