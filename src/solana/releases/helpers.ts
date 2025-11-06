import { chainsQueries } from "@src/solana/chains/queries";

export function sortDeployments<T extends { chainId: number }>(deployments: T[]): T[] {
  return deployments.sort((a, b) => {
    const aChain = chainsQueries.getOrThrow(a.chainId);
    const bChain = chainsQueries.getOrThrow(b.chainId);
    return aChain.name.localeCompare(bChain.name);
  });
}
