import type { Sablier } from "@/src/types.js";

/**
 * Solana does not have chain IDs. These are made-up numbers so that we can use the same type for EVM and Solana chains.
 */
export const CHAIN_ID_SOLANA_MAINNET_BETA = 900_000_010;
export const CHAIN_ID_SOLANA_DEVNET = 900_000_020;

export const SOLANA_CHAIN_IDS = new Set([CHAIN_ID_SOLANA_MAINNET_BETA, CHAIN_ID_SOLANA_DEVNET]);

export const solanaDevnet: Sablier.Solana.Chain = {
  contracts: {},
  id: CHAIN_ID_SOLANA_DEVNET,
  isSupportedByUI: true,
  isTestnet: true,
  name: "Devnet",
  slug: "solana-devnet",
  blockExplorers: {
    default: { name: "Orb", url: "https://orb.helius.dev?cluster=devnet" },
    solanaFm: { name: "Solana FM", url: "https://solana.fm?cluster=devnet-alpha" },
    solscan: { name: "Solscan", url: "https://solscan.io?cluster=devnet" },
  },
  chainlink: {
    feed: "99B2bTijsU6f1GCT73HmdR7HCFFjGMBcPZY6jZ96ynrR",
    program: "HEvSKofvBgfaexv23kMabbYqxasxU3mQ4ibBMEmJWHny",
  },
  definition: {
    chainCode: "SOLDEV",
    chainId: CHAIN_ID_SOLANA_DEVNET,
    cluster: "devnet",
  },
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
} as const;

export const solanaMainnetBeta: Sablier.Solana.Chain = {
  coinGeckoPlatformId: "solana",
  contracts: {},
  id: CHAIN_ID_SOLANA_MAINNET_BETA,
  isSupportedByUI: true,
  isTestnet: false,
  name: "Solana",
  slug: "solana-mainnet-beta",
  blockExplorers: {
    default: { name: "Orb", url: "https://orb.helius.dev" },
    solanaFm: { name: "Solana FM", url: "https://solana.fm" },
    solscan: { name: "Solscan", url: "https://solscan.io" },
  },
  chainlink: {
    feed: "99B2bTijsU6f1GCT73HmdR7HCFFjGMBcPZY6jZ96ynrR",
    program: "HEvSKofvBgfaexv23kMabbYqxasxU3mQ4ibBMEmJWHny",
  },
  definition: {
    chainCode: "SOL",
    chainId: CHAIN_ID_SOLANA_MAINNET_BETA,
    cluster: "mainnet-beta",
  },
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
} as const;
