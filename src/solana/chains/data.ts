import type { Sablier } from "@src/types";

const CHAIN_ID_SOLANA_MAINNET_BETA = 900000010;
const CHAIN_ID_SOLANA_DEVNET = 900000020;

export const solana_devnet: Sablier.Solana.Chain = {
  blockExplorers: {
    default: { name: "Explorer", url: "https://solscan.io?cluster=devnet" },
    solanaFm: {
      name: "Solana FM",
      url: "https://solana.fm?cluster=devnet-alpha",
    },
  },
  chainlink: {
    feed: "99B2bTijsU6f1GCT73HmdR7HCFFjGMBcPZY6jZ96ynrR",
    program: "HEvSKofvBgfaexv23kMabbYqxasxU3mQ4ibBMEmJWHny",
  },
  contracts: {},
  definition: {
    chainCode: "SOLDEV",
    chainId: CHAIN_ID_SOLANA_DEVNET,
    cluster: "devnet",
  },
  id: CHAIN_ID_SOLANA_DEVNET,
  isSupportedByUI: true,
  isTestnet: true,
  name: "Devnet",
  nativeCurrency: {
    coinGeckoId: "solana",
    decimals: 9,
    name: "Solana",
    symbol: "SOL",
  },
  rpc: {
    defaults: ["https://api.devnet-beta.solana.com/"],
    helius: (key) => `https://devnet.helius-rpc.com/?api-key=${key}`,
  },
  rpcUrls: {
    default: {
      http: ["https://api.devnet-beta.solana.com/"],
    },
  },
  slug: "solana-devnet",
} as const;

export const solana_mainnetBeta: Sablier.Solana.Chain = {
  blockExplorers: {
    default: { name: "Explorer", url: "https://solscan.io" },
    solanaFm: { name: "Solana FM", url: "https://solana.fm" },
  },
  chainlink: {
    feed: "99B2bTijsU6f1GCT73HmdR7HCFFjGMBcPZY6jZ96ynrR",
    program: "HEvSKofvBgfaexv23kMabbYqxasxU3mQ4ibBMEmJWHny",
  },
  contracts: {},
  definition: {
    chainCode: "SOL",
    chainId: CHAIN_ID_SOLANA_MAINNET_BETA,
    cluster: "mainnet-beta",
  },
  id: CHAIN_ID_SOLANA_MAINNET_BETA,
  isSupportedByUI: true,
  isTestnet: false,
  name: "Solana",
  nativeCurrency: {
    coinGeckoId: "solana",
    decimals: 9,
    name: "Solana",
    symbol: "SOL",
  },
  rpc: {
    defaults: ["https://api.mainnet-beta.solana.com/"],
    helius: (key) => `https://mainnet.helius-rpc.com/?api-key=${key}`,
  },
  rpcUrls: {
    default: {
      http: ["https://api.mainnet-beta.solana.com/"],
    },
  },
  slug: "solana-mainnet-beta",
} as const;
