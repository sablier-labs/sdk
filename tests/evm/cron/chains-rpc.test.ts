import { constants as http2Constants } from "node:http2";
import {
  FetchHttpClient,
  HttpBody,
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "@effect/platform";
import { describe, expect, it } from "@effect/vitest";
import { chains } from "@src/evm/chains";
import { Effect, Schema } from "effect";
import _ from "lodash";

const MALFUNCTIONING_RPC: number[] = [chains.form.id, chains.meld.id, chains.taikoHekla.id];

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
  }).pipe(Effect.provide(FetchHttpClient.layer));
}

describe("Ping JSON-RPC server", () => {
  for (const chain of _.values(chains)) {
    const shouldSkip: boolean = MALFUNCTIONING_RPC.includes(chain.id) || !chain.rpc.defaults[0];

    it.effect.skipIf(shouldSkip)(`${chain.name} (ID: ${chain.id})`, () =>
      Effect.gen(function* () {
        const result = yield* pingRpcServer(chain.rpc.defaults[0]);
        expect(result).toMatchObject({
          data: {
            id: 1,
            jsonrpc: "2.0",
            result: expect.any(String),
          },
          status: http2Constants.HTTP_STATUS_OK,
        });
      }),
    );
  }
});
