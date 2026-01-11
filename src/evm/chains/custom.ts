import { defineChain as viemDefine } from "viem";

const DENERGY_CHAIN_ID = 369_369;
const DENERGY_NATIVE_CURRENCY_SYMBOL = "WATT";
const HYPEREVM_NATIVE_CURRENCY_SYMBOL = "HYPE";
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

/**
 * HyperEVM is using another chain's ID (Wanchain Testnet). Until they change this, we will have to define it like this.
 * @see https://github.com/wevm/viem/pull/3390
 */
export const hyperevm = viemDefine({
  blockExplorers: {
    default: { name: "Explorer", url: "https://hyperevmscan.io" },
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 13_051,
    },
  },
  id: 999,
  name: "HyperEVM",
  nativeCurrency: {
    decimals: 18,
    name: "Hyperliquid",
    symbol: HYPEREVM_NATIVE_CURRENCY_SYMBOL,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.hyperliquid.xyz/evm"],
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
