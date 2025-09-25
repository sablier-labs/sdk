import { chains } from "@src/chains";
import { Protocol } from "@src/enums";
import { resolvers } from "@src/releases/resolvers";
import type { Sablier } from "@src/types";
import aliases from "./aliases";
import manifest from "./manifest";

function get(chainId: number, contractMap: Sablier.ContractMap): Sablier.Deployment {
  return resolvers.deployment.standard({
    aliasMap: aliases,
    chainId,
    contractMap,
    protocol: Protocol.Airdrops,
    version: "v2.0",
  });
}

/**
 * @description Mainnet deployments for Airdrops v2.0
 */
export const mainnets: Sablier.Deployment[] = [];

/**
 * @description Testnet deployments for Airdrops v2.0
 */
export const testnets: Sablier.Deployment[] = [
  get(chains.sepolia.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: ["0x42D09ED40Dad47240d66059cDE41f14721F73F09", 9117969],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0x293A3902E5BcD156912b529300eA264426EF0C2F", 9117971],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x8eeB2731986aBfDE2afdF734fbC5BEc15Ba3122b", 9117971],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0x4584345C2159c13EdDb9D64B4F414B5908417AF3", 9117971],
  }),
];
