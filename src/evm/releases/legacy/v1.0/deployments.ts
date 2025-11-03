import { chains } from "@src/evm/chains";
import { Protocol } from "@src/evm/enums";
import { resolvers } from "@src/evm/releases/resolvers";
import type { Sablier } from "@src/types";
import manifest from "./manifest";

const aliasMap = {};
const contractMap: Sablier.EVM.ContractMap = {
  [manifest.PAYROLL]: "0xbd6a40Bb904aEa5a49c59050B5395f7484A4203d",
  [manifest.SABLIER]: "0xA4fc358455Febe425536fd1878bE67FfDBDEC59a",
};

/**
 * @description Mainnet deployments for Legacy v1.0
 */
export const mainnets: Sablier.EVM.Deployment[] = [
  resolvers.deployment.standard({
    aliasMap,
    chainId: chains.mainnet.id,
    contractMap,
    protocol: Protocol.Legacy,
    version: "v1.0",
  }),
];
