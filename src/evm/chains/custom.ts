import { defineChain as viemDefine } from "viem";

const DENERGY_CHAIN_ID = 369_369;
const DENERGY_NATIVE_CURRENCY_SYMBOL = "WATT";
const TANGLE_NATIVE_CURRENCY_SYMBOL = "TNT";

export const denergy = viemDefine({
  blockExplorers: {
    default: { name: "Explorer", url: "https://explorer.denergychain.com" },
  },
  id: DENERGY_CHAIN_ID,
  name: "Denergy",
  nativeCurrency: {
    decimals: 18,
    name: "Watt",
    symbol: DENERGY_NATIVE_CURRENCY_SYMBOL,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.d.energy"],
    },
  },
  testnet: false,
});

export const tangle = viemDefine({
  blockExplorers: {
    default: { name: "Explorer", url: "https://explorer.tangle.tools" },
  },
  contracts: {
    multicall3: {
      address: "0xd595D34ed96b253E7c7a934a7624F330a8411953",
      blockCreated: 2_790_914,
    },
  },
  id: 5845,
  name: "Tangle",
  nativeCurrency: {
    decimals: 18,
    name: "Tangle",
    symbol: TANGLE_NATIVE_CURRENCY_SYMBOL,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.tangle.tools"],
    },
  },
  testnet: false,
});
