export const alchemyUrl = (network: string, apiKey: string): string =>
  `https://${network}.g.alchemy.com/v2/${apiKey}`;

export const infuraUrl = (network: string, apiKey: string): string =>
  `https://${network}.infura.io/v3/${apiKey}`;

/**
 * RouteMesh uses a deterministic URL pattern based on chain ID, supporting all chains.
 * @see https://routeme.sh/dashboard/chains
 */
export const routemeshUrl = (chainId: number, apiKey: string): string =>
  `https://lb.routeme.sh/rpc/${chainId}/${apiKey}`;
