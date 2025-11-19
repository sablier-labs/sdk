// ============================================================================
// FILE: verify-chains.ts
// Verifies RPC endpoint connectivity for all configured chains
// ============================================================================

import axios, { AxiosError } from "axios";

interface RPCResponse {
  jsonrpc: string;
  id: number;
  result?: string;
  error?: {
    code: number;
    message: string;
  };
}

async function testRPCEndpoint(url: string, expectedChainId: number): Promise<boolean> {
  try {
    const response = await axios.post<RPCResponse>(
      url,
      {
        id: 1,
        jsonrpc: "2.0",
        method: "eth_chainId",
        params: [],
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      },
    );

    if (response.data.error) {
      return false;
    }

    if (!response.data.result) {
      return false;
    }

    const returnedChainId = parseInt(response.data.result, 16);
    return returnedChainId === expectedChainId;
  } catch {
    return false;
  }
}

export { testRPCEndpoint };
