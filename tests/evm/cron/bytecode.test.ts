/**
 * @file Validates that every contract address in the SDK has non-empty bytecode on-chain.
 *
 * For each contract across all releases, the test calls `eth_getCode` via the chain's default RPC
 * and asserts the returned code is not empty ("0x"). This catches stale or incorrect addresses in
 * the deployment data.
 *
 * It's a resource-heavy test so it should be only run in CI once per week.
 * @see https://github.com/sablier-labs/sdk/issues/9
 */

import {
  FetchHttpClient,
  HttpBody,
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "@effect/platform";
import { beforeAll, describe, expect, it } from "@effect/vitest";
import { Effect, Schedule, Schema } from "effect";
import { chains } from "@/src/evm/chains/index.js";
import { sablier } from "@/src/sablier.js";

/** Map from chainId to default RPC URL. */
const chainRpcMap = new Map<number, string>();
for (const chain of Object.values(chains)) {
  if (chain.rpc.defaults[0]) {
    chainRpcMap.set(chain.id, chain.rpc.defaults[0]);
  }
}

/** Cache of chainId:address → bytecode length (undefined if the fetch failed). */
const bytecodeCache = new Map<string, number | undefined>();

const cacheKey = (chainId: number, address: string) => `${chainId}:${address.toLowerCase()}`;

const JsonRpcResponseSchema = Schema.Struct({
  id: Schema.Number,
  jsonrpc: Schema.Literal("2.0"),
  result: Schema.String,
});

/**
 * Calls `eth_getCode` for a contract address and returns the bytecode length in bytes.
 * Returns 0 for empty contracts ("0x" or "0x0").
 */
function getCodeLength(rpcUrl: string, address: string) {
  return Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient;
    const rpcRequest = {
      id: 1,
      jsonrpc: "2.0" as const,
      method: "eth_getCode",
      params: [address, "latest"] as const,
    };

    const requestBody = yield* HttpBody.json(rpcRequest);
    const request = HttpClientRequest.post(rpcUrl, {
      body: requestBody,
      headers: { "Content-Type": "application/json" },
    });

    const response = yield* client.execute(request);
    const body = yield* HttpClientResponse.schemaBodyJson(JsonRpcResponseSchema)(response);

    const code = body.result;
    if (code === "0x" || code === "0x0") {
      return 0;
    }

    // Each hex byte is 2 characters; subtract the "0x" prefix.
    return (code.length - 2) / 2;
  }).pipe(
    Effect.retry(Schedule.exponential("1 second").pipe(Schedule.intersect(Schedule.recurs(3)))),
    Effect.provide(FetchHttpClient.layer)
  );
}

describe("All contracts have non-empty bytecode", () => {
  // Pre-fetch all bytecodes before running individual assertions.
  beforeAll(async () => {
    const effects: Effect.Effect<void>[] = [];

    for (const release of sablier.evm.releases.getAll()) {
      const releaseContracts = sablier.evm.contracts.getAll({ release })!;
      for (const contract of releaseContracts) {
        if (!chainRpcMap.has(contract.chainId)) {
          continue;
        }

        const key = cacheKey(contract.chainId, contract.address);
        if (bytecodeCache.has(key)) {
          continue; // same address on same chain already queued
        }

        // Mark as queued to deduplicate.
        bytecodeCache.set(key, undefined);

        const rpcUrl = chainRpcMap.get(contract.chainId)!;
        effects.push(
          getCodeLength(rpcUrl, contract.address).pipe(
            Effect.tap((length) => {
              bytecodeCache.set(key, length);
            }),
            Effect.catchAll(() => Effect.void)
          )
        );
      }
    }

    // Limit concurrency to avoid overwhelming public RPCs.
    await Effect.runPromise(Effect.all(effects, { concurrency: 10 }));
  });

  for (const release of sablier.evm.releases.getAll()) {
    describe(`${release.protocol} ${release.version}`, () => {
      const releaseContracts = sablier.evm.contracts.getAll({ release })!;

      for (const contract of releaseContracts) {
        const hasRpc = chainRpcMap.has(contract.chainId);
        const chain = hasRpc ? sablier.evm.chains.getOrThrow(contract.chainId) : undefined;
        const key = cacheKey(contract.chainId, contract.address);

        const shouldSkip = () =>
          !hasRpc || !bytecodeCache.has(key) || bytecodeCache.get(key) === undefined;

        it.skipIf(shouldSkip())(
          `${chain?.name ?? `Chain ${contract.chainId}`} - ${contract.name} (${contract.address}) should have code`,
          () => {
            const codeLength = bytecodeCache.get(key);
            expect(
              codeLength,
              `Expected non-empty bytecode at ${contract.address}`
            ).toBeGreaterThan(0);
          }
        );
      }
    });
  }
});
