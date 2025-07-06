import type { Sablier } from "@src/types";
import { defineChain as viemDefine } from "viem";
import * as viem from "viem/chains";
import { defineChain as define } from "./definer";

const MULTICALL3_ADDRESS = "0xcA11bde05977b3631167028862bE2a173976CA11";

const chiliz: Sablier.Chain = define(
  "chiliz",
  viemDefine({
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

const morph: Sablier.Chain = define(
  "morph",
  viemDefine({
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

const tangle: Sablier.Chain = define(
  "tangle",
  viemDefine({
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
  abstract: define("abstract", viem.abstract),
  arbitrum: define("arbitrum", viem.arbitrum),
  avalanche: define("avalanche", viem.avalanche),
  base: define("base", viem.base),
  berachain: define("berachain", viem.berachain),
  blast: define("blast", viem.blast),
  bsc: define("bsc", viem.bsc),
  chiliz,
  coreDao: define("core-dao", viem.coreDao),
  ethereum: define("ethereum", viem.mainnet),
  form: define("form", viem.form),
  gnosis: define("gnosis", viem.gnosis),
  iotex: define("iotex", viem.iotex),
  lightlink: define("lightlink", viem.lightlinkPhoenix),
  linea: define("linea", viem.linea),
  meld: define("meld", viem.meld),
  mode: define("mode", viem.mode),
  morph,
  optimism: define("optimism", viem.optimism),
  polygon: define("polygon", viem.polygon),
  ronin: define("ronin", viem.ronin),
  scroll: define("scroll", viem.scroll),
  sei: define("sei", viem.sei),
  sophon: define("sophon", viem.sophon),
  superseed: define("superseed", viem.superseed),
  taiko: define("taiko", viem.taiko),
  tangle,
  unichain: define("unichain", viem.unichain),
  xdc: define("xdc", viem.xdc),
  zksync: define("zksync", viem.zksync),
};
