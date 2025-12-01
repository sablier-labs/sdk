import type { Sablier } from "@src/types";
import type { Chain as ViemChain } from "viem";
import { defineChain as viemDefine } from "viem";

// Imported like this for tree-shaking
import {
  abstract as _abstract,
  arbitrum as _arbitrum,
  arbitrumSepolia as _arbitrumSepolia,
  avalanche as _avalanche,
  base as _base,
  baseSepolia as _baseSepolia,
  berachain as _berachain,
  blast as _blast,
  blastSepolia as _blastSepolia,
  bsc as _bsc,
  chiliz as _chiliz,
  coreDao as _coreDao,
  form as _form,
  gnosis as _gnosis,
  iotex as _iotex,
  lightlinkPhoenix as _lightlinkPhoenix,
  linea as _linea,
  lineaSepolia as _lineaSepolia,
  mainnet as _mainnet,
  meld as _meld,
  mode as _mode,
  modeTestnet as _modeTestnet,
  monad as _monad,
  monadTestnet as _monadTestnet,
  morph as _morph,
  optimism as _optimism,
  optimismSepolia as _optimismSepolia,
  polygon as _polygon,
  ronin as _ronin,
  scroll as _scroll,
  sei as _sei,
  sepolia as _sepolia,
  sonic as _sonic,
  sophon as _sophon,
  superseed as _superseed,
  superseedSepolia as _superseedSepolia,
  taiko as _taiko,
  taikoHekla as _taikoHekla,
  unichain as _unichain,
  xdc as _xdc,
  zksync as _zksync,
  zksyncSepoliaTestnet as _zksyncSepoliaTestnet,
} from "viem/chains";

const HYPEREVM_NATIVE_CURRENCY_SYMBOL = "HYPE";
const TANGLE_NATIVE_CURRENCY_SYMBOL = "TNT";
const DENERGY_NATIVE_CURRENCY_SYMBOL = "WATT";

/* -------------------------------------------------------------------------- */
/*                                     RPC                                    */
/* -------------------------------------------------------------------------- */

type RPCGenerator = (apiKey: string) => string;

/**
 * @see https://dashboard.alchemy.com/apps/9bcxfr5kvbljbwhd/networks
 */
const alchemyRPCs: Record<number, RPCGenerator> = {
  [_abstract.id]: (apiKey) => `https://abstract-mainnet.g.alchemy.com/v2/${apiKey}`,
  [_arbitrum.id]: (apiKey) => `https://arb-mainnet.g.alchemy.com/v2/${apiKey}`,
  [_avalanche.id]: (apiKey) => `https://avax-mainnet.g.alchemy.com/v2/${apiKey}`,
  [_base.id]: (apiKey) => `https://base-mainnet.g.alchemy.com/v2/${apiKey}`,
  [_baseSepolia.id]: (apiKey) => `https://base-sepolia.g.alchemy.com/v2/${apiKey}`,
  [_berachain.id]: (apiKey) => `https://berachain-mainnet.g.alchemy.com/v2/${apiKey}`,
  [_blast.id]: (apiKey) => `https://blast-mainnet.g.alchemy.com/v2/${apiKey}`,
  [_blastSepolia.id]: (apiKey) => `https://blast-sepolia.g.alchemy.com/v2/${apiKey}`,
  [_bsc.id]: (apiKey) => `https://bnb-mainnet.g.alchemy.com/v2/${apiKey}`,
  [_gnosis.id]: (apiKey) => `https://gnosis-mainnet.g.alchemy.com/v2/${apiKey}`,
  [_linea.id]: (apiKey) => `https://linea-mainnet.g.alchemy.com/v2/${apiKey}`,
  [_lineaSepolia.id]: (apiKey) => `https://linea-sepolia.g.alchemy.com/v2/${apiKey}`,
  [_mainnet.id]: (apiKey) => `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
  [_monad.id]: (apiKey) => `https://monad-mainnet.g.alchemy.com/v2/${apiKey}`,
  [_optimism.id]: (apiKey) => `https://opt-mainnet.g.alchemy.com/v2/${apiKey}`,
  [_optimismSepolia.id]: (apiKey) => `https://opt-sepolia.g.alchemy.com/v2/${apiKey}`,
  [_polygon.id]: (apiKey) => `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}`,
  [_ronin.id]: (apiKey) => `https://ronin-mainnet.g.alchemy.com/v2/${apiKey}`,
  [_sepolia.id]: (apiKey) => `https://eth-sepolia.g.alchemy.com/v2/${apiKey}`,
  [_scroll.id]: (apiKey) => `https://scroll-mainnet.g.alchemy.com/v2/${apiKey}`,
  [_sei.id]: (apiKey) => `https://sei-mainnet.g.alchemy.com/v2/${apiKey}`,
  [_sonic.id]: (apiKey) => `https://sonic-mainnet.g.alchemy.com/v2/${apiKey}`,
  [_superseed.id]: (apiKey) => `https://superseed-mainnet.g.alchemy.com/v2/${apiKey}`,
  [_unichain.id]: (apiKey) => `https://unichain-mainnet.g.alchemy.com/v2/${apiKey}`,
  [_zksync.id]: (apiKey) => `https://zksync-mainnet.g.alchemy.com/v2/${apiKey}`,
};

/**
 * @see https://developer.metamask.io/key/active-endpoints
 * @see https://infura.io/networks
 */
const infuraRPCs: Record<number, RPCGenerator> = {
  [_arbitrum.id]: (apiKey) => `https://arbitrum-mainnet.infura.io/v3/${apiKey}`,
  [_arbitrumSepolia.id]: (apiKey) => `https://arbitrum-sepolia.infura.io/v3/${apiKey}`,
  [_avalanche.id]: (apiKey) => `https://avalanche-mainnet.infura.io/v3/${apiKey}`,
  [_base.id]: (apiKey) => `https://base-mainnet.infura.io/v3/${apiKey}`,
  [_baseSepolia.id]: (apiKey) => `https://base-sepolia.infura.io/v3/${apiKey}`,
  [_blast.id]: (apiKey) => `https://blast-mainnet.infura.io/v3/${apiKey}`,
  [_blastSepolia.id]: (apiKey) => `https://blast-sepolia.infura.io/v3/${apiKey}`,
  [_bsc.id]: (apiKey) => `https://bsc-mainnet.infura.io/v3/${apiKey}`,
  [_mainnet.id]: (apiKey) => `https://mainnet.infura.io/v3/${apiKey}`,
  [_linea.id]: (apiKey) => `https://linea-mainnet.infura.io/v3/${apiKey}`,
  [_lineaSepolia.id]: (apiKey) => `https://linea-sepolia.infura.io/v3/${apiKey}`,
  [_optimism.id]: (apiKey) => `https://optimism-mainnet.infura.io/v3/${apiKey}`,
  [_optimismSepolia.id]: (apiKey) => `https://optimism-sepolia.infura.io/v3/${apiKey}`,
  [_polygon.id]: (apiKey) => `https://polygon-mainnet.infura.io/v3/${apiKey}`,
  [_scroll.id]: (apiKey) => `https://scroll-mainnet.infura.io/v3/${apiKey}`,
  [_sepolia.id]: (apiKey) => `https://sepolia.infura.io/v3/${apiKey}`,
  [_unichain.id]: (apiKey) => `https://unichain-mainnet.infura.io/v3/${apiKey}`,
  [_zksync.id]: (apiKey) => `https://zksync-mainnet.infura.io/v3/${apiKey}`,
};

/**
 * RouteMesh uses a deterministic URL pattern based on chain ID, supporting all chains.
 * @see https://routeme.sh/dashboard/chains
 */
const routemeshRPC =
  (chainId: number): RPCGenerator =>
  (apiKey) =>
    `https://lb.routeme.sh/rpc/${chainId}/${apiKey}`;

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

type IdToBool = { [chainId: number]: boolean };
type IdToString = { [chainId: number]: string };
type SymbolToString = { [symbol: string]: string };

const config = {
  coinGeckoIds: {
    [_mainnet.nativeCurrency.symbol]: "ethereum",
    [_avalanche.nativeCurrency.symbol]: "avalanche-2",
    [_berachain.nativeCurrency.symbol]: "berachain-bera",
    [_bsc.nativeCurrency.symbol]: "binancecoin",
    [_coreDao.nativeCurrency.symbol]: "coredaoorg",
    [_chiliz.nativeCurrency.symbol]: "chiliz",
    [DENERGY_NATIVE_CURRENCY_SYMBOL]: "watt",
    [_gnosis.nativeCurrency.symbol]: "dai",
    [HYPEREVM_NATIVE_CURRENCY_SYMBOL]: "hyperliquid",
    [_iotex.nativeCurrency.symbol]: "iotex",
    [_meld.nativeCurrency.symbol]: "meld-2",
    [_monad.nativeCurrency.symbol]: "monad",
    [_polygon.nativeCurrency.symbol]: "polygon-ecosystem-token",
    [_ronin.nativeCurrency.symbol]: "ronin",
    [_sei.nativeCurrency.symbol]: "sei-network",
    [_sophon.nativeCurrency.symbol]: "sophon",
    [_sonic.nativeCurrency.symbol]: "sonic-3",
    [TANGLE_NATIVE_CURRENCY_SYMBOL]: "tangle-network",
    [_xdc.nativeCurrency.symbol]: "xdce-crowd-sale",
  } as SymbolToString,
  names: {
    [_arbitrum.id]: "Arbitrum",
    [_bsc.id]: "BNB Chain",
    [_chiliz.id]: "Chiliz",
    [_form.id]: "Form",
    [_lightlinkPhoenix.id]: "Lightlink",
    [_lineaSepolia.id]: "Linea Sepolia",
    [_mode.id]: "Mode",
    [_taiko.id]: "Taiko",
    [_taikoHekla.id]: "Taiko Hekla",
    [_xdc.id]: "XDC",
  } as IdToString,
  slugs: {
    [_zksyncSepoliaTestnet.id]: "zksync-sepolia",
  } as IdToString,
  ui: {
    // By default, testnets are not supported by the UI.
    supportedTestnets: {
      [_baseSepolia.id]: true,
      [_sepolia.id]: true,
    } as IdToBool,
    // By default, mainnets are supported by the UI.
    unsupportedMainnets: {
      [_form.id]: true,
      [_iotex.id]: true,
      [_meld.id]: true,
      [_ronin.id]: true,
      [_taiko.id]: true,
    } as IdToBool,
  },
  // These chains have the artifacts under the `artifacts-zk` directory.
  zk: {
    [_abstract.id]: true,
    [_sophon.id]: true,
    [_zksync.id]: true,
    [_zksyncSepoliaTestnet.id]: true,
  } as IdToBool,
};

function define(slug: string, chain: ViemChain): Sablier.EVM.Chain {
  if (!chain.blockExplorers) {
    throw new Error(`Chain ${chain.name} has no block explorers`);
  }

  const defaultRPCs = chain.rpcUrls.default.http;
  if (!defaultRPCs) {
    throw new Error(`Chain ${chain.name} has no default RPC`);
  }

  const coinGeckoId = config.coinGeckoIds[chain.nativeCurrency.symbol];
  if (!coinGeckoId) {
    throw new Error(`Chain ${chain.name} has no coinGecko ID`);
  }

  const isTestnet = Boolean(chain.testnet);
  const isSupportedByUI = isTestnet
    ? Boolean(config.ui.supportedTestnets[chain.id])
    : !config.ui.unsupportedMainnets[chain.id];

  return {
    ...chain,
    blockExplorers: chain.blockExplorers,
    isSupportedByUI,
    isTestnet,
    isZK: Boolean(config.zk[chain.id]),
    name: config.names[chain.id] ?? chain.name,
    nativeCurrency: {
      ...chain.nativeCurrency,
      coinGeckoId,
    },
    rpc: {
      alchemy: alchemyRPCs[chain.id],
      defaults: defaultRPCs as string[],
      infura: infuraRPCs[chain.id],
      routemesh: routemeshRPC(chain.id),
    },
    slug,
  };
}

/* -------------------------------------------------------------------------- */
/*                             NORMAL DEFINITIONS                             */
/* -------------------------------------------------------------------------- */

export const abstract = define("abstract", _abstract);
export const arbitrum = define("arbitrum", _arbitrum);
export const arbitrumSepolia = define("arbitrum-sepolia", _arbitrumSepolia);
export const avalanche = define("avalanche", _avalanche);
export const base = define("base", _base);
export const baseSepolia = define("base-sepolia", _baseSepolia);
export const berachain = define("berachain", _berachain);
export const blast = define("blast", _blast);
export const blastSepolia = define("blast-sepolia", _blastSepolia);
export const bsc = define("bsc", _bsc);
export const coreDao = define("core-dao", _coreDao);
export const form = define("form", _form);
export const gnosis = define("gnosis", _gnosis);
export const iotex = define("iotex", _iotex);
export const lightlink = define("lightlink", _lightlinkPhoenix);
export const linea = define("linea", _linea);
export const lineaSepolia = define("linea-sepolia", _lineaSepolia);
export const mainnet = define("mainnet", _mainnet);
export const meld = define("meld", _meld);
export const mode = define("mode", _mode);
export const modeTestnet = define("mode-testnet", _modeTestnet);
export const monad = define("monad", _monad);
export const monadTestnet = define("monad-testnet", _monadTestnet);
export const morph = define("morph", _morph);
export const optimism = define("optimism", _optimism);
export const optimismSepolia = define("optimism-sepolia", _optimismSepolia);
export const polygon = define("polygon", _polygon);
export const ronin = define("ronin", _ronin);
export const scroll = define("scroll", _scroll);
export const sepolia = define("sepolia", _sepolia);
export const sonic = define("sonic", _sonic);
export const superseed = define("superseed", _superseed);
export const superseedSepolia = define("superseed-sepolia", _superseedSepolia);
export const taiko = define("taiko", _taiko);
export const unichain = define("unichain", _unichain);
export const xdc = define("xdc", _xdc);
export const zksync = define("zksync", _zksync);
export const zksyncSepolia = define("zksync-sepolia", _zksyncSepoliaTestnet);

/* -------------------------------------------------------------------------- */
/*                             CUSTOM DEFINITIONS                             */
/* -------------------------------------------------------------------------- */

export const chiliz: Sablier.EVM.Chain = define(
  "chiliz",
  viemDefine({
    ..._chiliz,
    blockExplorers: {
      default: { name: "Explorer", url: "https://chiliscan.com" },
    },
    rpcUrls: {
      default: {
        http: ["https://rpc.chiliz.com"],
      },
    },
  }),
);

export const denergy: Sablier.EVM.Chain = define(
  "denergy",
  viemDefine({
    blockExplorers: {
      default: { name: "Explorer", url: "https://explorer.denergychain.com/" },
    },
    id: 369369,
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
  }),
);

/**
 * HyperEVM is using another chain's ID (Wanchain Testnet). Until they change this, we will have to define it like this.
 * @see https://github.com/wevm/viem/pull/3390
 */
export const hyperevm: Sablier.EVM.Chain = define(
  "hyperevm",
  viemDefine({
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
  }),
);

export const sei: Sablier.EVM.Chain = define(
  "sei",
  viemDefine({
    ..._sei,
    blockExplorers: {
      default: { name: "Explorer", url: "https://seiscan.io" },
    },
    rpcUrls: {
      default: {
        http: ["https://evm-rpc.sei-apis.com", "https://sei.drpc.org"],
      },
    },
  }),
);

export const sophon: Sablier.EVM.Chain = define(
  "sophon",
  viemDefine({
    ..._sophon,
    blockExplorers: {
      default: { name: "Explorer", url: "https://sophscan.xyz" },
    },
  }),
);

export const taikoHekla: Sablier.EVM.Chain = define(
  "taiko-hekla",
  viemDefine({
    ..._taikoHekla,
    rpcUrls: {
      default: {
        http: ["https://taiko-hekla-rpc.publicnode.com", "https://rpc.hekla.taiko.xyz"],
      },
    },
  }),
);

export const tangle: Sablier.EVM.Chain = define(
  "tangle",
  viemDefine({
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
      symbol: "TNT",
    },
    rpcUrls: {
      default: {
        http: ["https://rpc.tangle.tools"],
      },
    },
    testnet: false,
  }),
);
