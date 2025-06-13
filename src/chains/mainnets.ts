import type { Sablier } from "@src/types";
import { defineChain } from "viem";
import * as viem from "viem/chains";
import { fill } from "./config";

const tangle: Sablier.Chain = fill(
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

export const mainnets: Record<string, Sablier.Chain> = {
  abstract: fill("abstract", viem.abstract),
  arbitrum: fill("arbitrum", viem.arbitrum),
  avalanche: fill("avalanche", viem.avalanche),
  base: fill("base", viem.base),
  berachain: fill("berachain", viem.berachain),
  blast: fill("blast", viem.blast),
  bsc: fill("bsc", viem.bsc),
  chiliz: fill("chiliz", viem.chiliz),
  coreDao: fill("core-dao", viem.coreDao),
  ethereum: fill("ethereum", viem.mainnet),
  form: fill("form", viem.form),
  gnosis: fill("gnosis", viem.gnosis),
  iotex: fill("iotex", viem.iotex),
  lightlink: fill("lightlink", viem.lightlinkPhoenix),
  linea: fill("linea", viem.linea),
  meld: fill("meld", viem.meld),
  mode: fill("mode", viem.mode),
  morph: fill("morph", viem.morph),
  optimism: fill("optimism", viem.optimism),
  polygon: fill("polygon", viem.polygon),
  ronin: fill("ronin", viem.ronin),
  scroll: fill("scroll", viem.scroll),
  sei: fill("sei", viem.sei),
  sophon: fill("sophon", viem.sophon),
  superseed: fill("superseed", viem.superseed),
  taiko: fill("taiko", viem.taiko),
  tangle,
  unichain: fill("unichain", viem.unichain),
  xdc: fill("xdc", viem.xdc),
  zksync: fill("zksync", viem.zksync),
};
