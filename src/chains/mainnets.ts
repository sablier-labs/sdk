import type { Sablier } from "@src/types";
import { defineChain } from "viem";
import * as viem from "viem/chains";
import { fill } from "./config";

export const abstract = fill("abstract", viem.abstract);
export const arbitrum = fill("arbitrum", viem.arbitrum);
export const avalanche = fill("avalanche", viem.avalanche);
export const base = fill("base", viem.base);
export const berachain = fill("berachain", viem.berachain);
export const blast = fill("blast", viem.blast);
export const bsc = fill("bsc", viem.bsc);
export const chiliz = fill("chiliz", viem.chiliz);
export const coreDao = fill("core-dao", viem.coreDao);
export const ethereum = fill("ethereum", viem.mainnet);
export const form = fill("form", viem.form);
export const gnosis = fill("gnosis", viem.gnosis);
export const iotex = fill("iotex", viem.iotex);
export const lightlink = fill("lightlink", viem.lightlinkPhoenix);
export const linea = fill("linea", viem.linea);
export const meld = fill("meld", viem.meld);
export const mode = fill("mode", viem.mode);
export const morph = fill("morph", viem.morph);
export const optimism = fill("optimism", viem.optimism);
export const polygon = fill("polygon", viem.polygon);
export const ronin = fill("ronin", viem.ronin);
export const scroll = fill("scroll", viem.scroll);
export const sei = fill("sei", viem.sei);
export const sophon = fill("sophon", viem.sophon);
export const superseed = fill("superseed", viem.superseed);
export const taiko = fill("taiko", viem.taiko);
export const unichain = fill("unichain", viem.unichain);
export const xdc = fill("xdc", viem.xdc);
export const zksync = fill("zksync", viem.zksync);

/* -------------------------------------------------------------------------- */
/*                                CUSTOM CHAINS                               */
/* -------------------------------------------------------------------------- */

export const tangle: Sablier.Chain = fill(
  "tangle",
  defineChain({
    blockExplorers: {
      default: { name: "Explorer", url: "https://explorer.tangle.tools" },
    },
    contracts: {
      multicall3: {
        address: "0xd595D34ed96b253E7c7a934a7624F330a8411953",
        blockCreated: 2790914,
      },
    },
    id: 5845,
    name: "Tangle",
    nativeCurrency: {
      decimals: 18,
      name: "Tangle",
      symbol: "TNT",
    },
    rpc: {
      public: "https://rpc.tangle.tools",
    },
    rpcUrls: {
      default: {
        http: ["https://rpc.tangle.tools"],
      },
    },
    testnet: false,
  }),
);
