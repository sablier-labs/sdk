/** @see https://docs.etherscan.io/etherscan-v2/getting-started/supported-chains */
export const ETHERSCAN_CHAINS: Set<number> = new Set([
  1, 11_155_111, 17_000, 560_048, 56, 97, 137, 80_002, 8453, 84_532, 42_161, 42_170, 421_614,
  59_144, 59_141, 81_457, 168_587_773, 10, 11_155_420, 43_114, 43_113, 199, 1029, 42_220,
  11_142_220, 252, 2523, 100, 5000, 5003, 43_521, 1284, 1285, 1287, 204, 5611, 534_352, 534_351,
  167_000, 167_013, 324, 300, 50, 51, 33_139, 33_111, 480, 4801, 146, 14_601, 130, 1301, 2741,
  11_124, 80_094, 80_069, 1923, 1924, 143, 10_143, 999, 747_474, 737_373, 1329, 1328, 988, 2201,
]);

/**
 * Builds Etherscan API URL with clean parameter handling
 * @see https://docs.etherscan.io/api-endpoints/contracts
 * @example https://api.etherscan.io/v2/api?chainid=1&module=contract&action=getcontractcreation&contractaddresses=${0xcaFe...bEef}&apikey=${ETHERSCAN_API_KEY}
 */
export function getEtherscanContractCreationUrl(params: {
  chainId: number;
  contractAddresses: string;
}): string {
  const apiKey = getEtherscanApiKey();
  const url = new URL("https://api.etherscan.io/v2/api");
  const searchParams = new URLSearchParams({
    action: "getcontractcreation",
    apikey: apiKey,
    chainid: params.chainId.toString(),
    contractaddresses: params.contractAddresses,
    module: "contract",
  });
  url.search = searchParams.toString();
  return url.toString();
}

function getEtherscanApiKey(): string {
  const key = process.env.VITE_ETHERSCAN_API_KEY;
  if (!key) {
    throw new Error("VITE_ETHERSCAN_API_KEY is not set");
  }
  return key;
}
