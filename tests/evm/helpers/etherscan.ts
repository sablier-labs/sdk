/** @see https://docs.etherscan.io/etherscan-v2/getting-started/supported-chains */
export const ETHERSCAN_CHAINS: Set<number> = new Set([
  1, 11155111, 17000, 560048, 56, 97, 137, 80002, 1101, 2442, 8453, 84532, 42161, 42170, 421614,
  59144, 59141, 250, 4002, 81457, 168587773, 10, 11155420, 43114, 43113, 199, 1028, 42220, 44787,
  25, 252, 2522, 100, 255, 2358, 5000, 5003, 1284, 1285, 1287, 204, 5611, 534352, 534351, 167000,
  167009, 1111, 1112, 324, 300, 660279, 37714555429, 50, 51, 33139, 33111, 480, 4801, 50104,
  531050104, 146, 57054, 130, 1301, 2741, 11124, 80094, 80069, 1923, 1924, 10143,
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
