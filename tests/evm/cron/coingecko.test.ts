/**
 * @file This test suite validates CoinGecko IDs and platform IDs defined in the chains data.
 *
 * The test verifies that all CoinGecko coin IDs and asset platform IDs in the
 * config are valid by pinging the CoinGecko API.
 */

import { constants as http2Constants } from "node:http2";
import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "@effect/platform";
import { describe, expect, it } from "@effect/vitest";
import { Config, Effect, Redacted, Schema } from "effect";

const COINGECKO_DEMO_API_KEY = process.env.VITE_COINGECKO_DEMO_API_KEY;
const COINGECKO_DEMO_API_BASE_URL = "https://api.coingecko.com/api/v3";

const CoinGeckoApiKeyConfig = Config.redacted("VITE_COINGECKO_DEMO_API_KEY");

/*
 * CoinGecko IDs from src/evm/data.ts config.coinGeckoIds
 */
const COINGECKO_IDS = {
  "avalanche-2": "AVAX",
  "berachain-bera": "BERA",
  binancecoin: "BNB",
  chiliz: "CHZ",
  coredaoorg: "CORE",
  dai: "DAI",
  ethereum: "ETH",
  hyperliquid: "HYPE",
  iotex: "IOTX",
  "meld-2": "MELD",
  monad: "MON",
  "polygon-ecosystem-token": "POL",
  ronin: "RON",
  "sei-network": "SEI",
  "sonic-3": "S",
  sophon: "SOPH",
  "tangle-network": "TNT",
  "xdce-crowd-sale": "XDC",
};

const CoinGeckoResponseSchema = Schema.Struct({
  id: Schema.String,
});

const AssetPlatformSchema = Schema.Struct({
  chain_identifier: Schema.NullOr(Schema.Number),
  id: Schema.String,
});
const AssetPlatformsSchema = Schema.Array(AssetPlatformSchema);

function validateCoinGeckoId(coinId: string) {
  return Effect.gen(function* () {
    const apiKey = yield* CoinGeckoApiKeyConfig;
    const client = yield* HttpClient.HttpClient;
    const url = `${COINGECKO_DEMO_API_BASE_URL}/coins/${coinId}`;
    const urlWithParams = new URL(url);
    urlWithParams.searchParams.set("community_data", "false");
    urlWithParams.searchParams.set("developer_data", "false");
    urlWithParams.searchParams.set("localization", "false");
    urlWithParams.searchParams.set("market_data", "false");
    urlWithParams.searchParams.set("tickers", "false");

    const request = HttpClientRequest.get(urlWithParams.toString()).pipe(
      HttpClientRequest.setHeader("x-cg-demo-api-key", Redacted.value(apiKey))
    );

    const response = yield* client.execute(request);
    const body = yield* HttpClientResponse.schemaBodyJson(CoinGeckoResponseSchema)(response);

    return { id: body.id, status: response.status };
  }).pipe(Effect.provide(FetchHttpClient.layer));
}

/**
 * CoinGecko platform IDs from chain specs, keyed by platform ID → display label.
 */
const COINGECKO_PLATFORM_IDS = {
  abstract: "Abstract",
  "arbitrum-one": "Arbitrum",
  avalanche: "Avalanche",
  base: "Base",
  berachain: "Berachain",
  "binance-smart-chain": "BNB Chain",
  blast: "Blast",
  chiliz: "Chiliz",
  core: "Core DAO",
  ethereum: "Ethereum",
  hyperevm: "HyperEVM",
  iotex: "IoTeX",
  lightlink: "Lightlink",
  linea: "Linea",
  meld: "MELD",
  mode: "Mode",
  monad: "Monad",
  "morph-l2": "Morph",
  "optimistic-ethereum": "Optimism",
  "polygon-pos": "Polygon",
  ronin: "Ronin",
  scroll: "Scroll",
  "sei-v2": "Sei",
  sonic: "Sonic",
  sophon: "Sophon",
  superseed: "Superseed",
  taiko: "Taiko",
  unichain: "Unichain",
  xdai: "Gnosis",
  "xdc-network": "XDC",
  zksync: "zkSync",
};

function fetchAssetPlatforms() {
  return Effect.gen(function* () {
    const apiKey = yield* CoinGeckoApiKeyConfig;
    const client = yield* HttpClient.HttpClient;
    const url = `${COINGECKO_DEMO_API_BASE_URL}/asset_platforms`;

    const request = HttpClientRequest.get(url).pipe(
      HttpClientRequest.setHeader("x-cg-demo-api-key", Redacted.value(apiKey))
    );

    const response = yield* client.execute(request);
    const body = yield* HttpClientResponse.schemaBodyJson(AssetPlatformsSchema)(response);

    return new Set(body.map((p) => p.id));
  }).pipe(Effect.provide(FetchHttpClient.layer));
}

describe("Validate CoinGecko IDs", () => {
  if (!COINGECKO_DEMO_API_KEY) {
    it.skip("VITE_COINGECKO_API_KEY not set - skipping CoinGecko tests");
    return;
  }

  for (const [coinId, symbol] of Object.entries(COINGECKO_IDS)) {
    it.effect(`${symbol}: ${coinId}`, () =>
      Effect.gen(function* () {
        const result = yield* validateCoinGeckoId(coinId);
        expect(result).toMatchObject({
          id: coinId,
          status: http2Constants.HTTP_STATUS_OK,
        });
      })
    );
  }
});

describe("Validate CoinGecko Platform IDs", () => {
  if (!COINGECKO_DEMO_API_KEY) {
    it.skip("VITE_COINGECKO_API_KEY not set - skipping CoinGecko tests");
    return;
  }

  it.effect("all platform IDs exist in CoinGecko asset_platforms", () =>
    Effect.gen(function* () {
      const platforms = yield* fetchAssetPlatforms();

      for (const [platformId, label] of Object.entries(COINGECKO_PLATFORM_IDS)) {
        expect(platforms.has(platformId), `${label}: ${platformId} not found`).toBe(true);
      }
    })
  );
});
