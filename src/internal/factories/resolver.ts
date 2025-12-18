import { getContractExplorerURL } from "@src/internal/utils/explorer-url";
import type { AliasMap, Shared } from "@src/shared/types";
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
  aliasMap: AliasMap;
};

/* -------------------------------------------------------------------------- */
/*                                 FACTORIES                                  */
/* -------------------------------------------------------------------------- */

/**
 * Creates a contract mapper function for a specific platform
 *
 * @template TContract - The contract/program type
 * @template TProtocol - The protocol type
 * @template TVersion - The version type
 * @template TAddress - The address type (e.g., `0x${string}` for EVM, `string` for Solana)
 */
export function createContractMapper<TContract, TProtocol, TVersion, TAddress extends string>(
  chainsQueries: ChainsQueries,
) {
  return (
    contractMap: Shared.ContractMap<TAddress>,
    params: ContractMapperParams<TProtocol, TVersion>,
  ): TContract[] => {
    const { chainId, protocol, version, aliasMap } = params;
    const chain = chainsQueries.getOrThrow(chainId);

    return _.entries(contractMap).map(([name, addressOrTuple]) => {
      const [address, blockNumber] = Array.isArray(addressOrTuple)
        ? addressOrTuple
        : [addressOrTuple];

      return {
        address,
        alias: aliasMap[name],
        block: blockNumber,
        chainId,
        explorerURL: getContractExplorerURL(
          chain.blockExplorers.default.url,
          address as `0x${string}`,
        ),
        name,
        protocol,
        version,
      } as TContract;
    });
  };
}

/**
 * Creates a standard deployment resolver
 *
 * @template TDeployment - The deployment type
 * @template TContract - The contract/program type
 * @template TProtocol - The protocol type
 * @template TVersion - The version type
 * @template TAddress - The address type (e.g., `0x${string}` for EVM, `string` for Solana)
 *
 * @param contractMapper - The contract mapper function
 * @param contractsField - Field name for contracts (e.g., 'contracts' for EVM, 'programs' for Solana)
 */
export function createStandardDeploymentResolver<
  TDeployment,
  TContract,
  TProtocol,
  TVersion,
  TAddress extends string,
>(
  contractMapper: ReturnType<typeof createContractMapper<TContract, TProtocol, TVersion, TAddress>>,
  contractsField: "contracts" | "programs" = "contracts",
) {
  return (params: {
    protocol: TProtocol;
    version: TVersion;
    chainId: number;
    aliasMap: AliasMap;
    contractMap: Shared.ContractMap<TAddress>;
  }): TDeployment => {
    const { contractMap, ...baseParams } = params;
    const items = contractMapper(contractMap, baseParams);

    return {
      chainId: baseParams.chainId,
      [contractsField]: items,
    } as TDeployment;
  };
}

/**
 * Extracts contract/program names from a manifest object
 *
 * @template T - The manifest type
 * @param manifest - The manifest object containing contract/program names
 * @param getNestedValues - Function to extract values from nested manifest structure
 * @returns Array of contract/program names
 */
export function extractContractNames<T extends Record<string, string | Record<string, string>>>(
  manifest: T,
  getNestedValues: (obj: T) => string[],
): string[] {
  return getNestedValues(manifest);
}
