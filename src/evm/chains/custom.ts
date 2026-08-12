import { defineChain as viemDefine } from "viem";

const DENERGY_CHAIN_ID = 369_369;
const DENERGY_NATIVE_CURRENCY_SYMBOL = "WATT";
const ROBINHOOD_CHAIN_ID = 4663;
const TANGLE_NATIVE_CURRENCY_SYMBOL = "TNT";

export const denergy = viemDefine({
  id: DENERGY_CHAIN_ID,
  name: "Denergy",
  testnet: false,
  blockExplorers: {
    default: { name: "Explorer", url: "https://explorer.denergychain.com" },
  },
  contracts: {
    // Injected via a chain upgrade: the explorer has no creation tx for this address and the node
    // prunes state, so `blockCreated` cannot be determined. The runtime bytecode at `latest` is
    // byte-identical to canonical Multicall3.
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
    },
  },
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
});

export const robinhood = viemDefine({
  id: ROBINHOOD_CHAIN_ID,
  name: "Robinhood",
  testnet: false,
  blockExplorers: {
    default: {
      apiUrl: "https://robinhoodchain.blockscout.com/api",
      name: "Robinhood Chain Explorer",
      url: "https://robinhoodchain.blockscout.com",
    },
  },
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.mainnet.chain.robinhood.com"],
    },
  },
});

export const tangle = viemDefine({
  id: 5845,
  name: "Tangle",
  testnet: false,
  blockExplorers: {
    default: { name: "Explorer", url: "https://explorer.tangle.tools" },
  },
  contracts: {
    multicall3: {
      address: "0xd595D34ed96b253E7c7a934a7624F330a8411953",
      blockCreated: 2_790_914,
    },
  },
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
});
