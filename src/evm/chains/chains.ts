import { buildChains } from "./builder.js";
import { chainSpecs } from "./specs.js";

const chains = buildChains(chainSpecs);

/* -------------------------------------------------------------------------- */
/*                             NORMAL DEFINITIONS                             */
/* -------------------------------------------------------------------------- */

export const {
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
  gnosis,
  lightlink,
  linea,
  lineaSepolia,
  mainnet,
  meld,
  mode,
  modeTestnet,
  morph,
  optimism,
  optimismSepolia,
  polygon,
  ronin,
  scroll,
  sepolia,
  sonic,
  superseed,
  superseedSepolia,
  taiko,
  unichain,
  xdc,
} = chains;

/* -------------------------------------------------------------------------- */
/*                             CUSTOM DEFINITIONS                             */
/* -------------------------------------------------------------------------- */

export const {
  chiliz,
  denergy,
  hyperevm,
  monad,
  sei,
  sophon,
  taikoHekla,
  tangle,
  zksync,
  zksyncSepolia,
} = chains;
