import type { Sablier } from "@src/types";
import { type Chain as ViemChain, defineChain as viemDefine } from "viem";
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
  monadTestnet as _monadTestnet,
  morphHolesky as _morphHolesky,
  optimism as _optimism,
  optimismSepolia as _optimismSepolia,
  polygon as _polygon,
  ronin as _ronin,
  scroll as _scroll,
  sei as _sei,
  sepolia as _sepolia,
  sophon as _sophon,
  superseed as _superseed,
  superseedSepolia as _superseedSepolia,
  taiko as _taiko,
  taikoHekla as _taikoHekla,
  unichain as _unichain,
  chiliz as _viemChiliz,
  morph as _viemMorph,
  xdc as _xdc,
  zksync as _zksync,
  zksyncSepoliaTestnet as _zksyncSepoliaTestnet,
} from "viem/chains";

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
  [_optimism.id]: (apiKey) => `https://opt-mainnet.g.alchemy.com/v2/${apiKey}`,
  [_optimismSepolia.id]: (apiKey) => `https://opt-sepolia.g.alchemy.com/v2/${apiKey}`,
  [_polygon.id]: (apiKey) => `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}`,
  [_ronin.id]: (apiKey) => `https://ronin-mainnet.g.alchemy.com/v2/${apiKey}`,
  [_sepolia.id]: (apiKey) => `https://eth-sepolia.g.alchemy.com/v2/${apiKey}`,
  [_scroll.id]: (apiKey) => `https://scroll-mainnet.g.alchemy.com/v2/${apiKey}`,
  [_sei.id]: (apiKey) => `https://sei-mainnet.g.alchemy.com/v2/${apiKey}`,
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

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

type ConfigBool = { [chainId: number]: boolean };
type ConfigString = { [chainId: number]: string };

const config = {
  slugs: {
    [_zksyncSepoliaTestnet.id]: "zksync-sepolia",
  } as ConfigString,
  ui: {
    // By default, testnets are not supported by the UI.
    supportedTestnets: {
      [_baseSepolia.id]: true,
      [_sepolia.id]: true,
    } as ConfigBool,
    // By default, mainnets are supported by the UI.
    unsupportedMainnets: {
      [_meld.id]: true,
      [_ronin.id]: true,
      [_taiko.id]: true,
    } as ConfigBool,
  },
  // These chains have the artifacts under the `artifacts-zk` directory.
  zk: {
    [_abstract.id]: true,
    [_sophon.id]: true,
    [_zksync.id]: true,
    [_zksyncSepoliaTestnet.id]: true,
  } as ConfigBool,
};

function define(slug: string, chain: ViemChain): Sablier.Chain {
  if (!chain.blockExplorers) {
    throw new Error(`Chain ${chain.name} has no block explorers`);
  }
  const defaultRPC = chain.rpcUrls.default.http[0];
  if (!defaultRPC) {
    throw new Error(`Chain ${chain.name} has no default RPC`);
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
    rpc: {
      alchemy: alchemyRPCs[chain.id],
      default: defaultRPC,
      infura: infuraRPCs[chain.id],
    },
    slug,
  };
}

/* -------------------------------------------------------------------------- */
/*                                 DEFINITIONS                                */
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
export const monadTestnet = define("monad-testnet", _monadTestnet);
export const morphHolesky = define("morph-holesky", _morphHolesky);
export const optimism = define("optimism", _optimism);
export const optimismSepolia = define("optimism-sepolia", _optimismSepolia);
export const polygon = define("polygon", _polygon);
export const ronin = define("ronin", _ronin);
export const scroll = define("scroll", _scroll);
export const sei = define("sei", _sei);
export const sepolia = define("sepolia", _sepolia);
export const sophon = define("sophon", _sophon);
export const superseed = define("superseed", _superseed);
export const superseedSepolia = define("superseed-sepolia", _superseedSepolia);
export const taiko = define("taiko", _taiko);
export const taikoHekla = define("taiko-hekla", _taikoHekla);
export const unichain = define("unichain", _unichain);
export const xdc = define("xdc", _xdc);
export const zksync = define("zksync", _zksync);
export const zksyncSepolia = define("zksync-sepolia", _zksyncSepoliaTestnet);

export const chiliz: Sablier.Chain = define(
  "chiliz",
  viemDefine({
    ..._viemChiliz,
    contracts: {
      ..._viemChiliz.contracts,
      multicall3: {
        address: "0xcA11bde05977b3631167028862bE2a173976CA11",
        blockCreated: 8_080_847,
      },
    },
  }),
);

export const morph: Sablier.Chain = define(
  "morph",
  viemDefine({
    ..._viemMorph,
    contracts: {
      ..._viemMorph.contracts,
      multicall3: {
        address: "0xcA11bde05977b3631167028862bE2a173976CA11",
        blockCreated: 3_654_913,
      },
    },
  }),
);

export const tangle: Sablier.Chain = define(
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
