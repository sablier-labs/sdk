import { getContractExplorerURL } from "@src/helpers";
import _ from "lodash";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type ChainsQueries = {
  getOrThrow: (chainId: number) => { blockExplorers: { default: { url: string } } };
};

type ContractMapperParams<TProtocol, TVersion> = {
  chainId: number;
  protocol: TProtocol;
  version: TVersion;
  aliasMap: { [contractName: string]: string };
};

type ContractMap = {
  [contractName: string]: string | [string, number];
};

/* -------------------------------------------------------------------------- */
/*                                 FACTORIES                                  */
/* -------------------------------------------------------------------------- */

/**
 * Creates a contract mapper function for a specific platform
 */
export function createContractMapper<TContract, TProtocol, TVersion>(chainsQueries: ChainsQueries) {
  return (contractMap: ContractMap, params: ContractMapperParams<TProtocol, TVersion>): TContract[] => {
    const { chainId, protocol, version, aliasMap } = params;
    const chain = chainsQueries.getOrThrow(chainId);

    return _.entries(contractMap).map(([name, addressOrTuple]) => {
      const [address, blockNumber] = Array.isArray(addressOrTuple) ? addressOrTuple : [addressOrTuple];

      return {
        address,
        alias: aliasMap[name],
        block: blockNumber,
        chainId,
        explorerURL: getContractExplorerURL(chain.blockExplorers.default.url, address as `0x${string}`),
        name,
        protocol,
        version,
      } as TContract;
    });
  };
}

/**
 * Creates a standard deployment resolver
 */
export function createStandardDeploymentResolver<TDeployment, TContract, TProtocol, TVersion>(
  contractMapper: ReturnType<typeof createContractMapper<TContract, TProtocol, TVersion>>,
) {
  return (params: {
    protocol: TProtocol;
    version: TVersion;
    chainId: number;
    aliasMap: { [contractName: string]: string };
    contractMap: ContractMap;
  }): TDeployment => {
    const { contractMap, ...baseParams } = params;
    const contracts = contractMapper(contractMap, baseParams);

    return {
      chainId: baseParams.chainId,
      contracts,
    } as TDeployment;
  };
}

/**
 * Extracts contract names from a manifest object
 */
export function extractContractNames<T extends Record<string, string | Record<string, string>>>(
  manifest: T,
  getNestedValues: (obj: T) => string[],
): string[] {
  return getNestedValues(manifest);
}
