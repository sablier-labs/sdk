import axios from "axios";
import * as viem from "viem/chains";

type RPCGenerator = (apiKey: string) => string;

export const alchemyRPCs: Record<number, RPCGenerator> = {
  [viem.arbitrum.id]: (apiKey) => `https://arb-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.avalanche.id]: (apiKey) => `https://avax-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.base.id]: (apiKey) => `https://base-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.bsc.id]: (apiKey) => `https://bnb-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.mainnet.id]: (apiKey) => `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.linea.id]: (apiKey) => `https://linea-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.optimism.id]: (apiKey) => `https://opt-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.polygon.id]: (apiKey) => `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.scroll.id]: (apiKey) => `https://scroll-mainnet.g.alchemy.com/v2/${apiKey}`,
  [viem.zksync.id]: (apiKey) => `https://zksync-mainnet.g.alchemy.com/v2/${apiKey}`,
};

export const infuraRPCs: Record<number, RPCGenerator> = {
  [viem.arbitrum.id]: (apiKey) => `https://arbitrum-mainnet.infura.io/v3/${apiKey}`,
  [viem.avalanche.id]: (apiKey) => `https://avalanche-mainnet.infura.io/v3/${apiKey}`,
  [viem.bsc.id]: (apiKey) => `https://bsc-mainnet.infura.io/v3/${apiKey}`,
  [viem.mainnet.id]: (apiKey) => `https://mainnet.infura.io/v3/${apiKey}`,
  [viem.linea.id]: (apiKey) => `https://linea-mainnet.infura.io/v3/${apiKey}`,
  [viem.optimism.id]: (apiKey) => `https://optimism-mainnet.infura.io/v3/${apiKey}`,
  [viem.polygon.id]: (apiKey) => `https://polygon-mainnet.infura.io/v3/${apiKey}`,
  [viem.scroll.id]: (apiKey) => `https://scroll-mainnet.infura.io/v3/${apiKey}`,
  [viem.zksync.id]: (apiKey) => `https://zksync-mainnet.infura.io/v3/${apiKey}`,
};

interface JsonRpcResponse {
  jsonrpc: string;
  id: number;
  result?: unknown;
  error?: {
    code: number;
    message: string;
  };
}

/**
 * Helper function to format axios errors in a type-safe way
 */
function formatAxiosError<T>(error: T, chainName: string): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return `  🐛 [${chainName}] HTTP Error: ${error.response.status} ${error.response.statusText}`;
    } else if (error.request) {
      return `  🐛 [${chainName}] No response received: ${error.message}`;
    } else {
      return `  🐛 [${chainName}] Request error: ${error.message}`;
    }
  }
  return `  🐛 [${chainName}] Exception: ${error instanceof Error ? error.message : String(error)}`;
}

/**
 * Tests if an RPC endpoint is working by making a simple eth_blockNumber call
 * Logs any errors encountered during the request
 */
async function testRPCEndpoint(url: string, chainName: string): Promise<boolean> {
  try {
    const response = await axios.post(
      url,
      {
        id: 1,
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        params: [],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = response.data as JsonRpcResponse;

    if (data.error) {
      console.error(`  🐛 [${chainName}] RPC Error: ${data.error.code} - ${data.error.message}`);
      return false;
    }

    if (data.result === undefined) {
      console.error(`  🐛 [${chainName}] Invalid response: missing result field`);
      return false;
    }

    return true;
  } catch (error) {
    console.error(formatAxiosError(error, chainName));
    return false;
  }
}

/**
 * Gets chain name from viem chains object
 */
export function getChainName(chainId: number): string {
  const allChains = Object.values(viem);
  const chain = allChains.find((c: any) => c.id === chainId);
  return chain?.name || `Chain ${chainId}`;
}

/**
 * Fetches list of chains actually supported by Infura by testing each RPC endpoint sequentially
 */
export async function fetchInfuraSupportedChains(apiKey: string): Promise<{
  supported: number[];
  failed: number[];
}> {
  const supported: number[] = [];
  const failed: number[] = [];

  const chainIds = Object.keys(infuraRPCs).map(Number);

  console.log(`\n🟠 Testing ${chainIds.length} Infura RPC`);

  for (const chainId of chainIds) {
    const chainName = getChainName(chainId);
    const url = infuraRPCs[chainId](apiKey);
    const isWorking = await testRPCEndpoint(url, chainName);

    if (isWorking) {
      supported.push(chainId);
      console.log(`${chainName} (${chainId})`);
    } else {
      failed.push(chainId);
      console.log(`${chainName} (${chainId})`);
    }
  }

  return { failed, supported };
}

/**
 * Fetches list of chains actually supported by Alchemy by testing each RPC endpoint sequentially
 */
export async function fetchAlchemySupportedChains(apiKey: string): Promise<{
  supported: number[];
  failed: number[];
}> {
  const supported: number[] = [];
  const failed: number[] = [];

  const chainIds = Object.keys(alchemyRPCs).map(Number);

  console.log(`\n Testing ${chainIds.length} Alchemy RPC endpoints.`);

  for (const chainId of chainIds) {
    const chainName = getChainName(chainId);
    const url = alchemyRPCs[chainId](apiKey);
    const isWorking = await testRPCEndpoint(url, chainName);

    if (isWorking) {
      supported.push(chainId);
      console.log(`${chainName} (${chainId})`);
    } else {
      failed.push(chainId);
      console.log(`${chainName} (${chainId})`);
    }
  }

  return { failed, supported };
}

/**
 * Formats test results for clear error messages
 */
export function formatResults(provider: string, supported: number[], failed: number[]): string {
  if (failed.length === 0) {
    return `\n✅ All ${provider} RPC endpoints are working! (${supported.length}/${supported.length + failed.length})`;
  }

  const failedChains = failed.map((id) => `  - ${getChainName(id)} (Chain ID: ${id})`).join("\n");

  return [
    `\n❌ Some ${provider} RPC endpoints failed:`,
    failedChains,
    `\nWorking: ${supported.length}/${supported.length + failed.length}`,
  ].join("\n");
}
