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

  bsc,
  coreDao,
  gnosis,
  hyperevm,
  lightlink,
  linea,
  lineaSepolia,
  mainnet,
  mode,

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
  battlechainTestnet,
  chiliz,
  denergy,
  monad,
  sei,
  sophon,
  tangle,
  zksync,
  zksyncSepolia,
} = chains;
