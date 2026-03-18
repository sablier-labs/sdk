import { chains } from "@/src/evm/chains/index.js";
import { Protocol } from "@/src/evm/enums.js";
import { resolvers } from "@/src/evm/releases/resolvers.js";
import type { Sablier } from "@/src/types.js";
import aliases from "./aliases.js";
import manifest from "./manifest.js";

function get(chainId: number, contractMap: Sablier.EVM.ContractMap): Sablier.EVM.Deployment {
  return resolvers.deployment.standard({
    aliasMap: aliases,
    chainId,
    contractMap,
    protocol: Protocol.Bob,
    version: "v1.0",
  });
}

/**
 * @description Mainnet deployments for Bob v1.0
 */
export const mainnets: Sablier.EVM.Deployment[] = [
  get(chains.mainnet.id, {
    [manifest.SABLIER_BOB]: ["0xC8AB7E45E6DF99596b86870c26C25c721eB5C9af", 24_674_959],
    [manifest.SABLIER_ESCROW]: ["0xe1662e09e68b700A0C17F17BD08445EC1de0d206", 24_675_924],
    [manifest.SABLIER_LIDO_ADAPTER]: ["0x40c564A59bB2f1544222D6848E3eEc1Cb68837E6", 24_675_064],
  }),
];

/**
 * @description Testnet deployments for Bob v1.0
 */
export const testnets: Sablier.EVM.Deployment[] = [
  get(chains.sepolia.id, {
    [manifest.SABLIER_BOB]: ["0x2007fE3B4CcBfD887345Cf7C455D5C3F4A19fA2F", 10_461_684],
    [manifest.SABLIER_ESCROW]: ["0x98bB3Ed39028f3882e2C4B054F3DD4E7b1Fefd93", 10_461_701],
    [manifest.SABLIER_LIDO_ADAPTER]: ["0xbcB10B911CA7B74DdE7EeFDafe11E9EF4Fe32C59", 10_461_684],
  }),
];
