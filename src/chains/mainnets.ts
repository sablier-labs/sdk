import type { Sablier } from "@src/types";
import { defineChain } from "viem";
import * as viem from "viem/chains";
import { resolve } from "./resolver";

const MULTICALL3_ADDRESS = "0xcA11bde05977b3631167028862bE2a173976CA11";

const chiliz: Sablier.Chain = resolve(
  "chiliz",
  defineChain({
    ...viem.chiliz,
    contracts: {
      ...viem.chiliz.contracts,
      multicall3: {
        address: MULTICALL3_ADDRESS,
        blockCreated: 8_080_847,
      },
    },
  }),
);

const morph: Sablier.Chain = resolve(
  "morph",
  defineChain({
    ...viem.morph,
    contracts: {
      ...viem.morph.contracts,
      multicall3: {
        address: MULTICALL3_ADDRESS,
        blockCreated: 3_654_913,
      },
    },
  }),
);

const tangle: Sablier.Chain = resolve(
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
  abstract: resolve("abstract", viem.abstract),
  arbitrum: resolve("arbitrum", viem.arbitrum),
  avalanche: resolve("avalanche", viem.avalanche),
  base: resolve("base", viem.base),
  berachain: resolve("berachain", viem.berachain),
  blast: resolve("blast", viem.blast),
  bsc: resolve("bsc", viem.bsc),
  chiliz,
  coreDao: resolve("core-dao", viem.coreDao),
  ethereum: resolve("ethereum", viem.mainnet),
  form: resolve("form", viem.form),
  gnosis: resolve("gnosis", viem.gnosis),
  iotex: resolve("iotex", viem.iotex),
  lightlink: resolve("lightlink", viem.lightlinkPhoenix),
  linea: resolve("linea", viem.linea),
  meld: resolve("meld", viem.meld),
  mode: resolve("mode", viem.mode),
  morph,
  optimism: resolve("optimism", viem.optimism),
  polygon: resolve("polygon", viem.polygon),
  ronin: resolve("ronin", viem.ronin),
  scroll: resolve("scroll", viem.scroll),
  sei: resolve("sei", viem.sei),
  sophon: resolve("sophon", viem.sophon),
  superseed: resolve("superseed", viem.superseed),
  taiko: resolve("taiko", viem.taiko),
  tangle,
  unichain: resolve("unichain", viem.unichain),
  xdc: resolve("xdc", viem.xdc),
  zksync: resolve("zksync", viem.zksync),
};
