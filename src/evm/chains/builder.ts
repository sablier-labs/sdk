import type { Chain as ViemChain } from "viem";
import { defineChain as viemDefine } from "viem";
import type { Sablier } from "@/src/types.js";
import { alchemyUrl, infuraUrl, routemeshUrl } from "./providers.js";

export type ChainSpec = {
  base: ViemChain;
  meta: {
    // Optional display overrides and metadata specific to Sablier.
    coinGeckoPlatformId?: string;
    name?: string;
    isZk?: boolean;
    ui?: "SUPPORTED" | "NOT_SUPPORTED";
    slug?: string;
  };
  nativeCurrency: {
    // CoinGecko API ID for price lookups.
    coinGeckoId: string;
    // Wrapper contract for native token (if applicable).
    wrapperContract?: string;
  };
  rpc?: {
    alchemy?: string;
    infura?: string;
    routemesh?: boolean;
  };
  overrides?: Partial<ViemChain>;
};

/**
 * Merge a base viem chain with overrides while preserving core structure.
 *
 * We use `viemDefine` to keep any derived properties consistent with viem's
 * expected shape, while also allowing us to override partial fields like
 * block explorers or RPC URLs without losing the base chain data.
 */
const mergeChain = (base: ViemChain, overrides?: Partial<ViemChain>): ViemChain => {
  if (!overrides) {
    return base;
  }

  // Shallow merge: nested objects like blockExplorers are replaced, not deep-merged.
  // viemDefine normalizes the chain object and preserves derived fields.
  return viemDefine({
    ...base,
    ...overrides,
    blockExplorers: overrides.blockExplorers ?? base.blockExplorers,
    contracts: overrides.contracts ?? base.contracts,
    nativeCurrency: overrides.nativeCurrency ?? base.nativeCurrency,
    rpcUrls: overrides.rpcUrls ?? base.rpcUrls,
  });
};

/**
 * Build a Sablier chain from a spec, enforcing required metadata invariants.
 *
 * This centralizes validation (e.g. CoinGecko id presence), derives UI support
 * defaults, and wires provider RPC generators so the spec table can stay lean.
 */
const buildChain = (key: string, spec: ChainSpec): Sablier.EVM.Chain => {
  const chain = mergeChain(spec.base, spec.overrides);

  // Ensure viem-provided fields we rely on are present.
  if (!chain.blockExplorers) {
    throw new Error(`Chain ${chain.name} has no block explorers`);
  }

  const defaultRPCs = chain.rpcUrls.default.http;
  if (!defaultRPCs) {
    throw new Error(`Chain ${chain.name} has no default RPC`);
  }

  // CoinGecko id is required for pricing across the SDK.
  if (!spec.nativeCurrency.coinGeckoId) {
    throw new Error(`Chain ${chain.name} has no coinGecko ID`);
  }

  const alchemyNetwork = spec.rpc?.alchemy;
  const infuraNetwork = spec.rpc?.infura;
  const routemeshEnabled = spec.rpc?.routemesh !== false;

  // UI support is opt-in for testnets. Mainnets are supported by default unless flagged.
  const isTestnet = Boolean(chain.testnet);
  const uiOverride = spec.meta.ui;
  const isSupportedByUI = uiOverride ? uiOverride === "SUPPORTED" : !isTestnet;

  return {
    ...chain,
    blockExplorers: chain.blockExplorers,
    coinGeckoPlatformId: spec.meta.coinGeckoPlatformId,
    isSupportedByUI,
    isTestnet,
    isZK: Boolean(spec.meta.isZk),
    name: spec.meta.name ?? chain.name,
    slug: spec.meta.slug ?? key,
    nativeCurrency: {
      ...chain.nativeCurrency,
      coinGeckoId: spec.nativeCurrency.coinGeckoId,
      wrapperContract: spec.nativeCurrency.wrapperContract,
    },
    rpc: {
      // Provider URLs are generated from network slugs to avoid duplication.
      alchemy: alchemyNetwork ? (apiKey) => alchemyUrl(alchemyNetwork, apiKey) : undefined,
      defaults: defaultRPCs as string[],
      infura: infuraNetwork ? (apiKey) => infuraUrl(infuraNetwork, apiKey) : undefined,
      routemesh: routemeshEnabled ? (apiKey) => routemeshUrl(chain.id, apiKey) : undefined,
    },
  };
};

/**
 * Build the full chain registry from the specs object.
 *
 * We intentionally derive the registry from a single spec source so the type,
 * metadata, and provider configuration are assembled in one pass. This keeps
 * exports consistent and makes it hard to forget required metadata when a new
 * chain is added.
 */
export const buildChains = <T extends Record<string, ChainSpec>>(
  specs: T
): { [K in keyof T]: Sablier.EVM.Chain } => {
  const entries = Object.entries(specs).map(([key, spec]) => [key, buildChain(key, spec)]);

  return Object.fromEntries(entries) as { [K in keyof T]: Sablier.EVM.Chain };
};
