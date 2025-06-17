// Has to use "viem/chains" to avoid circular dependencies
import * as viem from "viem/chains";

type RPCGenerator = (apiKey: string) => string;

/**
 * @see https://dashboard.alchemy.com/apps/9bcxfr5kvbljbwhd/networks
 */
export const alchemyRPCs: Record<number, RPCGenerator> = {
  [viem.abstract.id]: (apiKey) => `https://abstract-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.abstractTestnet.id]: (apiKey) => `https://abstract-testnet.g.alchemy.com/v2/${apiKey}`,
  [viem.arbitrum.id]: (apiKey) => `https://arb-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.avalanche.id]: (apiKey) => `https://avax-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.base.id]: (apiKey) => `https://base-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.baseSepolia.id]: (apiKey) => `https://base-sepolia.g.alchemy.com/v2/${apiKey}`,
  [viem.berachain.id]: (apiKey) => `https://berachain-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.blast.id]: (apiKey) => `https://blast-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.blastSepolia.id]: (apiKey) => `https://blast-sepolia.g.alchemy.com/v2/${apiKey}`,
  [viem.bsc.id]: (apiKey) => `https://bnb-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.gnosis.id]: (apiKey) => `https://gnosis-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.linea.id]: (apiKey) => `https://linea-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.lineaSepolia.id]: (apiKey) => `https://linea-sepolia.g.alchemy.com/v2/${apiKey}`,
  [viem.mainnet.id]: (apiKey) => `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.optimism.id]: (apiKey) => `https://opt-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.optimismSepolia.id]: (apiKey) => `https://opt-sepolia.g.alchemy.com/v2/${apiKey}`,
  [viem.polygon.id]: (apiKey) => `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.ronin.id]: (apiKey) => `https://ronin-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.sepolia.id]: (apiKey) => `https://eth-sepolia.g.alchemy.com/v2/${apiKey}`,
  [viem.scroll.id]: (apiKey) => `https://scroll-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.scrollSepolia.id]: (apiKey) => `https://scroll-sepolia.g.alchemy.com/v2/${apiKey}`,
  [viem.sei.id]: (apiKey) => `https://sei-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.superseed.id]: (apiKey) => `https://superseed-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.unichain.id]: (apiKey) => `https://unichain-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.zksync.id]: (apiKey) => `https://zksync-mainnet.g.alchemy.com/v2/${apiKey}`,
};

/**
 * @see https://developer.metamask.io/key/active-endpoints
 * @see https://infura.io/networks
 */
export const infuraRPCs: Record<number, RPCGenerator> = {
  [viem.arbitrum.id]: (apiKey) => `https://arbitrum-mainnet.infura.io/v3/${apiKey}`,
  [viem.arbitrumSepolia.id]: (apiKey) => `https://arbitrum-sepolia.infura.io/v3/${apiKey}`,
  [viem.avalanche.id]: (apiKey) => `https://avalanche-mainnet.infura.io/v3/${apiKey}`,
  [viem.base.id]: (apiKey) => `https://base-mainnet.infura.io/v3/${apiKey}`,
  [viem.baseSepolia.id]: (apiKey) => `https://base-sepolia.infura.io/v3/${apiKey}`,
  [viem.blast.id]: (apiKey) => `https://blast-mainnet.infura.io/v3/${apiKey}`,
  [viem.blastSepolia.id]: (apiKey) => `https://blast-sepolia.infura.io/v3/${apiKey}`,
  [viem.bsc.id]: (apiKey) => `https://bsc-mainnet.infura.io/v3/${apiKey}`,
  [viem.mainnet.id]: (apiKey) => `https://mainnet.infura.io/v3/${apiKey}`,
  [viem.linea.id]: (apiKey) => `https://linea-mainnet.infura.io/v3/${apiKey}`,
  [viem.lineaSepolia.id]: (apiKey) => `https://linea-sepolia.infura.io/v3/${apiKey}`,
  [viem.optimism.id]: (apiKey) => `https://optimism-mainnet.infura.io/v3/${apiKey}`,
  [viem.optimismSepolia.id]: (apiKey) => `https://optimism-sepolia.infura.io/v3/${apiKey}`,
  [viem.polygon.id]: (apiKey) => `https://polygon-mainnet.infura.io/v3/${apiKey}`,
  [viem.scroll.id]: (apiKey) => `https://scroll-mainnet.infura.io/v3/${apiKey}`,
  [viem.sepolia.id]: (apiKey) => `https://sepolia.infura.io/v3/${apiKey}`,
  [viem.unichain.id]: (apiKey) => `https://unichain-mainnet.infura.io/v3/${apiKey}`,
  [viem.zksync.id]: (apiKey) => `https://zksync-mainnet.infura.io/v3/${apiKey}`,
};
