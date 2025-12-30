/**
 * @file This test suite validates RouteMesh support for all chains.
 *
 * The test pings each chain's RouteMesh endpoint with an eth_blockNumber call.
 * Chains that fail more than 5 times should be added to config.routemesh.unsupported.
 */

import {
  FetchHttpClient,
  HttpBody,
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "@effect/platform";
import { beforeAll, describe, expect, it } from "@effect/vitest";
import { chains } from "@src/evm/chains";
import { Effect, Schema } from "effect";
import _ from "lodash";

const ROUTEMESH_API_KEY = process.env.VITE_ROUTEMESH_API_KEY;

/**
 * Maximum number of retries before considering a chain unsupported.
 * If a chain fails more than this many times, it should be added to
 * config.routemesh.unsupported in src/evm/chains/data.ts
 */
const MAX_RETRIES = 5;

const JsonRpcResponseSchema = Schema.Struct({
  id: Schema.Number,
  jsonrpc: Schema.Literal("2.0"),
  result: Schema.String,
});

const JsonRpcErrorSchema = Schema.Struct({
  error: Schema.Struct({
    code: Schema.Number,
    message: Schema.String,
  }),
  id: Schema.Number,
  jsonrpc: Schema.Literal("2.0"),
});

const JsonRpcResponse = Schema.Union(JsonRpcResponseSchema, JsonRpcErrorSchema);

type TestResult = {
  chainId: number;
  chainName: string;
  error?: string;
  failCount: number;
  success: boolean;
};

/** Cache of chainId -> test results */
const testResultsCache = new Map<number, TestResult>();

function pingRoutemeshEndpoint(chainId: number, apiKey: string) {
  return Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient;
    const url = `https://lb.routeme.sh/rpc/${chainId}/${apiKey}`;
    const rpcRequest = {
      id: 1,
      jsonrpc: "2.0" as const,
      method: "eth_blockNumber",
      params: [] as const,
    };

    const requestBody = yield* HttpBody.json(rpcRequest);
    const request = HttpClientRequest.post(url, {
      body: requestBody,
      headers: { "Content-Type": "application/json" },
    });

    const response = yield* client.execute(request);

    // Consider non-2xx as failure
    if (response.status < 200 || response.status >= 300) {
      return { error: `HTTP ${response.status}`, success: false };
    }

    const body = yield* HttpClientResponse.schemaBodyJson(JsonRpcResponse)(response);

    // Check if it's an error response
    if ("error" in body) {
      return { error: body.error.message, success: false };
    }

    // Validate the result is a valid block number (hex string)
    if (!body.result.startsWith("0x")) {
      return { error: `Invalid block number: ${body.result}`, success: false };
    }

    return { success: true };
  }).pipe(Effect.provide(FetchHttpClient.layer));
}

/**
 * Tests a single chain with retries. Returns true if chain is supported.
 */
function testChainWithRetries(chainId: number, chainName: string, apiKey: string) {
  return Effect.gen(function* () {
    let failCount = 0;
    let lastError: string | undefined;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      const result = yield* pingRoutemeshEndpoint(chainId, apiKey).pipe(
        Effect.catchAll((e) => Effect.succeed({ error: String(e), success: false })),
      );

      if (result.success) {
        return { chainId, chainName, failCount, success: true };
      }

      failCount++;
      lastError = result.error;

      // Small delay between retries
      if (attempt < MAX_RETRIES) {
        yield* Effect.sleep("500 millis");
      }
    }

    return { chainId, chainName, error: lastError, failCount, success: false };
  });
}

describe("RouteMesh RPC Support", () => {
  if (!ROUTEMESH_API_KEY) {
    it.skip("VITE_ROUTEMESH_API_KEY not set - skipping RouteMesh tests", () => {});
    return;
  }

  // Get chains that have routemesh configured (not in unsupported list)
  const chainsWithRoutemesh = _.values(chains).filter((chain) => chain.rpc.routemesh !== undefined);

  // Pre-fetch all results before running individual tests
  beforeAll(async () => {
    const effects = chainsWithRoutemesh.map((chain) =>
      testChainWithRetries(chain.id, chain.name, ROUTEMESH_API_KEY!).pipe(
        Effect.tap((result) => {
          testResultsCache.set(chain.id, result);
        }),
      ),
    );

    await Effect.runPromise(
      Effect.all(effects, { concurrency: 5 }), // Limit concurrency to avoid rate limits
    );
  });

  for (const chain of chainsWithRoutemesh) {
    it(`${chain.name} (ID: ${chain.id}) should support RouteMesh`, () => {
      const result = testResultsCache.get(chain.id);

      if (!result) {
        throw new Error(`No test result found for chain ${chain.id}`);
      }

      if (!result.success) {
        console.warn(
          `Chain ${chain.name} (${chain.id}) failed RouteMesh test ${result.failCount} times. ` +
            `Error: ${result.error}. Consider adding to config.routemesh.unsupported.`,
        );
      }

      expect(result.success).toBe(true);
    });
  }

  // Summary test that lists all failures for easy identification
  it("should report chains that may need to be added to unsupported list", () => {
    const failures = Array.from(testResultsCache.values()).filter((r) => !r.success);

    if (failures.length > 0) {
      console.log("\n=== Chains that failed RouteMesh validation ===");
      console.log("Add these to config.routemesh.unsupported in src/evm/chains/data.ts:\n");
      for (const failure of failures) {
        console.log(`  [${failure.chainId}]: true, // ${failure.chainName} - ${failure.error}`);
      }
      console.log("\n");
    }

    // This test always passes - it's informational only
    expect(true).toBe(true);
  });
});
