import {
  FetchHttpClient,
  HttpBody,
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "@effect/platform";
import { describe, expect, it } from "@effect/vitest";
import { Effect, Schedule, Schema } from "effect";
import { chains } from "@/src/evm/chains/index.js";

const ROUTEMESH_API_KEY = process.env.VITE_ROUTEMESH_API_KEY;

const JsonRpcResponseSchema = Schema.Struct({
  id: Schema.Number,
  jsonrpc: Schema.Literal("2.0"),
  result: Schema.String,
});

function pingRpcServer(url: string) {
  return Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient;
    const rpcRequest = {
      id: 1,
      jsonrpc: "2.0" as const,
      method: "eth_chainId",
      params: [] as const,
    };

    const requestBody = yield* HttpBody.json(rpcRequest);
    const request = HttpClientRequest.post(url, {
      body: requestBody,
      headers: { "Content-Type": "application/json" },
    });

    const response = yield* client.execute(request);
    const responseBody = yield* HttpClientResponse.schemaBodyJson(JsonRpcResponseSchema)(response);

    return { data: responseBody, status: response.status };
  }).pipe(
    Effect.retry(Schedule.exponential("1 second").pipe(Schedule.intersect(Schedule.recurs(3)))),
    Effect.provide(FetchHttpClient.layer)
  );
}

describe("Ping JSON-RPC server", () => {
  if (!ROUTEMESH_API_KEY) {
    it.skip("VITE_ROUTEMESH_API_KEY not set - skipping RPC tests");
    return;
  }

  for (const chain of Object.values(chains)) {
    const rpcUrl = chain.rpc.routemesh?.(ROUTEMESH_API_KEY);

    it.effect.skipIf(!rpcUrl)(`${chain.name} (ID: ${chain.id})`, () =>
      Effect.gen(function* () {
        const result = yield* pingRpcServer(rpcUrl!);
        expect(result).toMatchObject({
          status: 200,
          data: {
            id: 1,
            jsonrpc: "2.0",
            result: expect.any(String),
          },
        });
      })
    );
  }
});
