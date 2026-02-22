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
// import { berachain } from "viem/chains/definitions/zksync";
import type { ChainSpec } from "./builder.js";
import { denergy, hyperevm, tangle } from "./custom.js";

const COIN_GECKO = {
  eth: "ethereum",
  mon: "monad",
} as const;

export const chainSpecs = {
  /* -------------------------------------------------------------------------- */
  /*                                  ABSTRACT                                  */
  /* -------------------------------------------------------------------------- */
  abstract: {
    base: _abstract,
    meta: {
      isZk: true,
    },
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
    },
    rpc: {
      alchemy: "abstract-mainnet",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                  ARBITRUM                                  */
  /* -------------------------------------------------------------------------- */
  arbitrum: {
    base: _arbitrum,
    meta: {
      name: "Arbitrum",
    },
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
      wrapperContract: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    },
    rpc: {
      alchemy: "arb-mainnet",
      infura: "arbitrum-mainnet",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                              ARBITRUM SEPOLIA                              */
  /* -------------------------------------------------------------------------- */
  arbitrumSepolia: {
    base: _arbitrumSepolia,
    meta: {
      slug: "arbitrum-sepolia",
    },
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
    },
    rpc: {
      infura: "arbitrum-sepolia",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                 AVALANCHE                                  */
  /* -------------------------------------------------------------------------- */
  avalanche: {
    base: _avalanche,
    meta: {},
    nativeCurrency: {
      coinGeckoId: "avalanche-2",
      wrapperContract: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    },
    rpc: {
      alchemy: "avax-mainnet",
      infura: "avalanche-mainnet",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                    BASE                                    */
  /* -------------------------------------------------------------------------- */
  base: {
    base: _base,
    meta: {},
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
      wrapperContract: "0x4200000000000000000000000000000000000006",
    },
    rpc: {
      alchemy: "base-mainnet",
      infura: "base-mainnet",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                BASE SEPOLIA                                */
  /* -------------------------------------------------------------------------- */
  baseSepolia: {
    base: _baseSepolia,
    meta: {
      slug: "base-sepolia",
      ui: "SUPPORTED",
    },
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
    },
    rpc: {
      alchemy: "base-sepolia",
      infura: "base-sepolia",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                 BERACHAIN                                  */
  /* -------------------------------------------------------------------------- */
  berachain: {
    base: _berachain,
    meta: {},
    nativeCurrency: {
      coinGeckoId: "berachain-bera",
      wrapperContract: "0x6969696969696969696969696969696969696969",
    },
    rpc: {
      alchemy: "berachain-mainnet",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                   BLAST                                   */
  /* -------------------------------------------------------------------------- */
  blast: {
    base: _blast,
    meta: {},
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
      wrapperContract: "0x4300000000000000000000000000000000000004",
    },
    rpc: {
      alchemy: "blast-mainnet",
      infura: "blast-mainnet",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                               BLAST SEPOLIA                               */
  /* -------------------------------------------------------------------------- */
  blastSepolia: {
    base: _blastSepolia,
    meta: {
      slug: "blast-sepolia",
    },
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
    },
    rpc: {
      alchemy: "blast-sepolia",
      infura: "blast-sepolia",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                     BSC                                    */
  /* -------------------------------------------------------------------------- */
  bsc: {
    base: _bsc,
    meta: {
      name: "BNB Chain",
    },
    nativeCurrency: {
      coinGeckoId: "binancecoin",
      wrapperContract: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    },
    rpc: {
      alchemy: "bnb-mainnet",
      infura: "bsc-mainnet",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                   CHILIZ                                   */
  /* -------------------------------------------------------------------------- */
  chiliz: {
    base: _chiliz,
    meta: {
      name: "Chiliz",
    },
    nativeCurrency: {
      coinGeckoId: "chiliz",
    },
    overrides: {
      blockExplorers: {
        default: { name: "Explorer", url: "https://chiliscan.com" },
      },
      rpcUrls: {
        default: {
          http: ["https://rpc.chiliz.com"],
        },
      },
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                  CORE DAO                                  */
  /* -------------------------------------------------------------------------- */
  coreDao: {
    base: _coreDao,
    meta: {
      slug: "core-dao",
    },
    nativeCurrency: {
      coinGeckoId: "coredaoorg",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                  DENERGY                                   */
  /* -------------------------------------------------------------------------- */
  denergy: {
    base: denergy,
    meta: {},
    nativeCurrency: {
      coinGeckoId: "watt",
      wrapperContract: "0x87fFB2d57f78d5A8E17db78F3290A367299b5B07",
    },
    rpc: {
      routemesh: false,
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                    FORM                                    */
  /* -------------------------------------------------------------------------- */
  form: {
    base: _form,
    meta: {
      name: "Form",
      ui: "NOT_SUPPORTED",
    },
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
    },
    rpc: {
      routemesh: false,
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                   GNOSIS                                   */
  /* -------------------------------------------------------------------------- */
  gnosis: {
    base: _gnosis,
    meta: {},
    nativeCurrency: {
      coinGeckoId: "dai",
      wrapperContract: "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1",
    },
    rpc: {
      alchemy: "gnosis-mainnet",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                 HYPEREVM                                   */
  /* -------------------------------------------------------------------------- */
  hyperevm: {
    base: hyperevm,
    meta: {},
    nativeCurrency: {
      coinGeckoId: "hyperliquid",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                   IOTEX                                    */
  /* -------------------------------------------------------------------------- */
  iotex: {
    base: _iotex,
    meta: {
      ui: "NOT_SUPPORTED",
    },
    nativeCurrency: {
      coinGeckoId: "iotex",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                  LIGHTLINK                                 */
  /* -------------------------------------------------------------------------- */
  lightlink: {
    base: _lightlinkPhoenix,
    meta: {
      name: "Lightlink",
    },
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                   LINEA                                    */
  /* -------------------------------------------------------------------------- */
  linea: {
    base: _linea,
    meta: {},
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
      wrapperContract: "0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f",
    },
    rpc: {
      alchemy: "linea-mainnet",
      infura: "linea-mainnet",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                               LINEA SEPOLIA                                */
  /* -------------------------------------------------------------------------- */
  lineaSepolia: {
    base: _lineaSepolia,
    meta: {
      name: "Linea Sepolia",
      slug: "linea-sepolia",
    },
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
    },
    rpc: {
      alchemy: "linea-sepolia",
      infura: "linea-sepolia",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                  MAINNET                                   */
  /* -------------------------------------------------------------------------- */
  mainnet: {
    base: _mainnet,
    meta: {},
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
      wrapperContract: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    },
    rpc: {
      alchemy: "eth-mainnet",
      infura: "mainnet",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                    MELD                                    */
  /* -------------------------------------------------------------------------- */
  meld: {
    base: _meld,
    meta: {
      ui: "NOT_SUPPORTED",
    },
    nativeCurrency: {
      coinGeckoId: "meld-2",
    },
    rpc: {
      routemesh: false,
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                    MODE                                    */
  /* -------------------------------------------------------------------------- */
  mode: {
    base: _mode,
    meta: {
      name: "Mode",
    },
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
      wrapperContract: "0x4200000000000000000000000000000000000006",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                MODE TESTNET                                */
  /* -------------------------------------------------------------------------- */
  modeTestnet: {
    base: _modeTestnet,
    meta: {
      slug: "mode-testnet",
    },
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                    MONAD                                   */
  /* -------------------------------------------------------------------------- */
  monad: {
    base: _monad,
    meta: {},
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.mon,
      wrapperContract: "0x3bd359C1119dA7Da1D913D1C4D2B7c461115433A",
    },
    overrides: {
      blockExplorers: {
        default: { name: "Explorer", url: "https://monadscan.com" },
      },
    },
    rpc: {
      alchemy: "monad-mainnet",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                    MORPH                                   */
  /* -------------------------------------------------------------------------- */
  morph: {
    base: _morph,
    meta: {},
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
      wrapperContract: "0x5300000000000000000000000000000000000011",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                  OPTIMISM                                  */
  /* -------------------------------------------------------------------------- */
  optimism: {
    base: _optimism,
    meta: {},
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
      wrapperContract: "0x4200000000000000000000000000000000000006",
    },
    rpc: {
      alchemy: "opt-mainnet",
      infura: "optimism-mainnet",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                              OPTIMISM SEPOLIA                              */
  /* -------------------------------------------------------------------------- */
  optimismSepolia: {
    base: _optimismSepolia,
    meta: {
      slug: "optimism-sepolia",
    },
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
    },
    rpc: {
      alchemy: "opt-sepolia",
      infura: "optimism-sepolia",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                   POLYGON                                  */
  /* -------------------------------------------------------------------------- */
  polygon: {
    base: _polygon,
    meta: {},
    nativeCurrency: {
      coinGeckoId: "polygon-ecosystem-token",
      wrapperContract: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    },
    rpc: {
      alchemy: "polygon-mainnet",
      infura: "polygon-mainnet",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                    RONIN                                   */
  /* -------------------------------------------------------------------------- */
  ronin: {
    base: _ronin,
    meta: {
      ui: "NOT_SUPPORTED",
    },
    nativeCurrency: {
      coinGeckoId: "ronin",
    },
    rpc: {
      alchemy: "ronin-mainnet",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                   SCROLL                                   */
  /* -------------------------------------------------------------------------- */
  scroll: {
    base: _scroll,
    meta: {},
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
      wrapperContract: "0x5300000000000000000000000000000000000004",
    },
    rpc: {
      alchemy: "scroll-mainnet",
      infura: "scroll-mainnet",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                     SEI                                    */
  /* -------------------------------------------------------------------------- */
  sei: {
    base: _sei,
    meta: {},
    nativeCurrency: {
      coinGeckoId: "sei-network",
      wrapperContract: "0xE30feDd158A2e3b13e9badaeABaFc5516e95e8C7",
    },
    overrides: {
      blockExplorers: {
        default: { name: "Explorer", url: "https://seiscan.io" },
      },
      rpcUrls: {
        default: {
          http: ["https://evm-rpc.sei-apis.com", "https://sei.drpc.org"],
        },
      },
    },
    rpc: {
      alchemy: "sei-mainnet",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                   SEPOLIA                                  */
  /* -------------------------------------------------------------------------- */
  sepolia: {
    base: _sepolia,
    meta: {
      ui: "SUPPORTED",
    },
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
      wrapperContract: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
    },
    rpc: {
      alchemy: "eth-sepolia",
      infura: "sepolia",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                   SONIC                                    */
  /* -------------------------------------------------------------------------- */
  sonic: {
    base: _sonic,
    meta: {},
    nativeCurrency: {
      coinGeckoId: "sonic-3",
      wrapperContract: "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
    },
    rpc: {
      alchemy: "sonic-mainnet",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                   SOPHON                                   */
  /* -------------------------------------------------------------------------- */
  sophon: {
    base: _sophon,
    meta: {
      isZk: true,
    },
    nativeCurrency: {
      coinGeckoId: "sophon",
    },
    overrides: {
      blockExplorers: {
        default: { name: "Explorer", url: "https://sophscan.xyz" },
      },
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                 SUPERSEED                                  */
  /* -------------------------------------------------------------------------- */
  superseed: {
    base: _superseed,
    meta: {},
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
    },
    rpc: {
      alchemy: "superseed-mainnet",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                              SUPERSEED SEPOLIA                             */
  /* -------------------------------------------------------------------------- */
  superseedSepolia: {
    base: _superseedSepolia,
    meta: {
      slug: "superseed-sepolia",
    },
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                    TAIKO                                   */
  /* -------------------------------------------------------------------------- */
  taiko: {
    base: _taiko,
    meta: {
      name: "Taiko",
      ui: "NOT_SUPPORTED",
    },
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
      wrapperContract: "0x4200000000000000000000000000000000000006",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                TAIKO HEKLA                                 */
  /* -------------------------------------------------------------------------- */
  taikoHekla: {
    base: _taikoHekla,
    meta: {
      name: "Taiko Hekla",
      slug: "taiko-hekla",
    },
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
    },
    overrides: {
      rpcUrls: {
        default: {
          http: ["https://taiko-hekla-rpc.publicnode.com", "https://rpc.hekla.taiko.xyz"],
        },
      },
    },
    rpc: {
      routemesh: false,
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                   TANGLE                                   */
  /* -------------------------------------------------------------------------- */
  tangle: {
    base: tangle,
    meta: {},
    nativeCurrency: {
      coinGeckoId: "tangle-network",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                  UNICHAIN                                  */
  /* -------------------------------------------------------------------------- */
  unichain: {
    base: _unichain,
    meta: {},
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
      wrapperContract: "0x4200000000000000000000000000000000000006",
    },
    rpc: {
      alchemy: "unichain-mainnet",
      infura: "unichain-mainnet",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                     XDC                                    */
  /* -------------------------------------------------------------------------- */
  xdc: {
    base: _xdc,
    meta: {
      name: "XDC",
    },
    nativeCurrency: {
      coinGeckoId: "xdce-crowd-sale",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                   ZKSYNC                                   */
  /* -------------------------------------------------------------------------- */
  zksync: {
    base: _zksync,
    meta: {
      isZk: true,
    },
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
      wrapperContract: "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91",
    },
    overrides: {
      blockExplorers: {
        default: {
          apiUrl: "https://block-explorer-api.mainnet.zksync.io/api",
          name: "ZKsync Explorer",
          url: "https://explorer.zksync.io",
        },
        native: {
          apiUrl: "https://block-explorer-api.mainnet.zksync.io/api",
          name: "ZKsync Explorer",
          url: "https://explorer.zksync.io",
        },
      },
    },
    rpc: {
      alchemy: "zksync-mainnet",
      infura: "zksync-mainnet",
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                              ZKSYNC SEPOLIA                                */
  /* -------------------------------------------------------------------------- */
  zksyncSepolia: {
    base: _zksyncSepoliaTestnet,
    meta: {
      isZk: true,
      slug: "zksync-sepolia",
    },
    nativeCurrency: {
      coinGeckoId: COIN_GECKO.eth,
    },
    overrides: {
      blockExplorers: {
        default: {
          apiUrl: "https://block-explorer-api.sepolia.zksync.dev/api",
          name: "ZKsync Explorer",
          url: "https://sepolia.explorer.zksync.io",
        },
      },
    },
  },
} satisfies Record<string, ChainSpec>;
