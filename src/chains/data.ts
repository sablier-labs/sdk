import type { Sablier } from "@src/types";
import { type Chain as ViemChain, defineChain as viemDefine } from "viem";
// Imported like this for tree-shaking
import {
  abstract,
  arbitrum,
  arbitrumSepolia,
  avalanche,
  base,
  baseSepolia,
  berachain,
  blast,
  blastSepolia,
  bsc,
  coreDao,
  form,
  gnosis,
  iotex,
  lightlinkPhoenix,
  linea,
  lineaSepolia,
  mainnet,
  meld,
  mode,
  modeTestnet,
  monadTestnet,
  morphHolesky,
  optimism,
  optimismSepolia,
  polygon,
  ronin,
  scroll,
  sei,
  sepolia,
  sophon,
  superseed,
  superseedSepolia,
  taiko,
  taikoHekla,
  unichain,
  chiliz as viemChiliz,
  morph as viemMorph,
  xdc,
  zksync,
  zksyncSepoliaTestnet,
} from "viem/chains";

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

type ConfigBool = { [chainId: number]: boolean };
type ConfigString = { [chainId: number]: string };

const config = {
  slugs: {
    [zksyncSepoliaTestnet.id]: "zksync-sepolia",
  } as ConfigString,
  ui: {
    // By default, testnets are not supported by the UI.
    supportedTestnets: {
      [baseSepolia.id]: true,
      [sepolia.id]: true,
    } as ConfigBool,
    // By default, mainnets are supported by the UI.
    unsupportedMainnets: {
      [meld.id]: true,
      [ronin.id]: true,
      [taiko.id]: true,
    } as ConfigBool,
  },
  // These chains have the artifacts under the `artifacts-zk` directory.
  zk: {
    [abstract.id]: true,
    [sophon.id]: true,
    [zksync.id]: true,
    [zksyncSepoliaTestnet.id]: true,
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
/*                                   CHAINS                                   */
/* -------------------------------------------------------------------------- */

const MULTICALL3_ADDRESS = "0xcA11bde05977b3631167028862bE2a173976CA11";

const chiliz: Sablier.Chain = define(
  "chiliz",
  viemDefine({
    ...viemChiliz,
    contracts: {
      ...viemChiliz.contracts,
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
    ...viemMorph,
    contracts: {
      ...viemMorph.contracts,
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
  abstract: define("abstract", abstract),
  arbitrum: define("arbitrum", arbitrum),
  avalanche: define("avalanche", avalanche),
  base: define("base", base),
  berachain: define("berachain", berachain),
  blast: define("blast", blast),
  bsc: define("bsc", bsc),
  chiliz,
  coreDao: define("core-dao", coreDao),
  ethereum: define("ethereum", mainnet),
  form: define("form", form),
  gnosis: define("gnosis", gnosis),
  iotex: define("iotex", iotex),
  lightlink: define("lightlink", lightlinkPhoenix),
  linea: define("linea", linea),
  meld: define("meld", meld),
  mode: define("mode", mode),
  morph,
  optimism: define("optimism", optimism),
  polygon: define("polygon", polygon),
  ronin: define("ronin", ronin),
  scroll: define("scroll", scroll),
  sei: define("sei", sei),
  sophon: define("sophon", sophon),
  superseed: define("superseed", superseed),
  taiko: define("taiko", taiko),
  tangle,
  unichain: define("unichain", unichain),
  xdc: define("xdc", xdc),
  zksync: define("zksync", zksync),
};

export const testnets: Record<string, Sablier.Chain> = {
  arbitrumSepolia: define("arbitrum-sepolia", arbitrumSepolia),
  baseSepolia: define("base-sepolia", baseSepolia),
  blastSepolia: define("blast-sepolia", blastSepolia),
  ethereumSepolia: define("ethereum-sepolia", sepolia),
  lineaSepolia: define("linea-sepolia", lineaSepolia),
  modeTestnet: define("mode-testnet", modeTestnet),
  monadTestnet: define("monad-testnet", monadTestnet),
  morphHolesky: define("morph-holesky", morphHolesky),
  optimismSepolia: define("optimism-sepolia", optimismSepolia),
  superseedSepolia: define("superseed-sepolia", superseedSepolia),
  taikoHekla: define("taiko-hekla", taikoHekla),
  zksyncSepolia: define("zksync-sepolia", zksyncSepoliaTestnet),
};

export const chains = { ...mainnets, ...testnets };

/* -------------------------------------------------------------------------- */
/*                                     RPC                                    */
/* -------------------------------------------------------------------------- */

type RPCGenerator = (apiKey: string) => string;

/**
 * @see https://dashboard.alchemy.com/apps/9bcxfr5kvbljbwhd/networks
 */
export const alchemyRPCs: Record<number, RPCGenerator> = {
  [abstract.id]: (apiKey) => `https://abstract-mainnet.g.alchemy.com/v2/${apiKey}`,
  [arbitrum.id]: (apiKey) => `https://arb-mainnet.g.alchemy.com/v2/${apiKey}`,
  [avalanche.id]: (apiKey) => `https://avax-mainnet.g.alchemy.com/v2/${apiKey}`,
  [base.id]: (apiKey) => `https://base-mainnet.g.alchemy.com/v2/${apiKey}`,
  [baseSepolia.id]: (apiKey) => `https://base-sepolia.g.alchemy.com/v2/${apiKey}`,
  [berachain.id]: (apiKey) => `https://berachain-mainnet.g.alchemy.com/v2/${apiKey}`,
  [blast.id]: (apiKey) => `https://blast-mainnet.g.alchemy.com/v2/${apiKey}`,
  [blastSepolia.id]: (apiKey) => `https://blast-sepolia.g.alchemy.com/v2/${apiKey}`,
  [bsc.id]: (apiKey) => `https://bnb-mainnet.g.alchemy.com/v2/${apiKey}`,
  [gnosis.id]: (apiKey) => `https://gnosis-mainnet.g.alchemy.com/v2/${apiKey}`,
  [linea.id]: (apiKey) => `https://linea-mainnet.g.alchemy.com/v2/${apiKey}`,
  [lineaSepolia.id]: (apiKey) => `https://linea-sepolia.g.alchemy.com/v2/${apiKey}`,
  [mainnet.id]: (apiKey) => `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
  [optimism.id]: (apiKey) => `https://opt-mainnet.g.alchemy.com/v2/${apiKey}`,
  [optimismSepolia.id]: (apiKey) => `https://opt-sepolia.g.alchemy.com/v2/${apiKey}`,
  [polygon.id]: (apiKey) => `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}`,
  [ronin.id]: (apiKey) => `https://ronin-mainnet.g.alchemy.com/v2/${apiKey}`,
  [sepolia.id]: (apiKey) => `https://eth-sepolia.g.alchemy.com/v2/${apiKey}`,
  [scroll.id]: (apiKey) => `https://scroll-mainnet.g.alchemy.com/v2/${apiKey}`,
  [sei.id]: (apiKey) => `https://sei-mainnet.g.alchemy.com/v2/${apiKey}`,
  [superseed.id]: (apiKey) => `https://superseed-mainnet.g.alchemy.com/v2/${apiKey}`,
  [unichain.id]: (apiKey) => `https://unichain-mainnet.g.alchemy.com/v2/${apiKey}`,
  [zksync.id]: (apiKey) => `https://zksync-mainnet.g.alchemy.com/v2/${apiKey}`,
};

/**
 * @see https://developer.metamask.io/key/active-endpoints
 * @see https://infura.io/networks
 */
export const infuraRPCs: Record<number, RPCGenerator> = {
  [arbitrum.id]: (apiKey) => `https://arbitrum-mainnet.infura.io/v3/${apiKey}`,
  [arbitrumSepolia.id]: (apiKey) => `https://arbitrum-sepolia.infura.io/v3/${apiKey}`,
  [avalanche.id]: (apiKey) => `https://avalanche-mainnet.infura.io/v3/${apiKey}`,
  [base.id]: (apiKey) => `https://base-mainnet.infura.io/v3/${apiKey}`,
  [baseSepolia.id]: (apiKey) => `https://base-sepolia.infura.io/v3/${apiKey}`,
  [blast.id]: (apiKey) => `https://blast-mainnet.infura.io/v3/${apiKey}`,
  [blastSepolia.id]: (apiKey) => `https://blast-sepolia.infura.io/v3/${apiKey}`,
  [bsc.id]: (apiKey) => `https://bsc-mainnet.infura.io/v3/${apiKey}`,
  [mainnet.id]: (apiKey) => `https://mainnet.infura.io/v3/${apiKey}`,
  [linea.id]: (apiKey) => `https://linea-mainnet.infura.io/v3/${apiKey}`,
  [lineaSepolia.id]: (apiKey) => `https://linea-sepolia.infura.io/v3/${apiKey}`,
  [optimism.id]: (apiKey) => `https://optimism-mainnet.infura.io/v3/${apiKey}`,
  [optimismSepolia.id]: (apiKey) => `https://optimism-sepolia.infura.io/v3/${apiKey}`,
  [polygon.id]: (apiKey) => `https://polygon-mainnet.infura.io/v3/${apiKey}`,
  [scroll.id]: (apiKey) => `https://scroll-mainnet.infura.io/v3/${apiKey}`,
  [sepolia.id]: (apiKey) => `https://sepolia.infura.io/v3/${apiKey}`,
  [unichain.id]: (apiKey) => `https://unichain-mainnet.infura.io/v3/${apiKey}`,
  [zksync.id]: (apiKey) => `https://zksync-mainnet.infura.io/v3/${apiKey}`,
};
