/**
 * @file This test suite validates CoinGecko IDs defined in the chains data.
 *
 * The test verifies that all CoinGecko IDs in the config are valid by pinging
 * the CoinGecko API for each coin.
 */
import axios from "axios";
import { describe, expect, it } from "vitest";

const COINGECKO_API_KEY = process.env.VITE_COINGECKO_API_KEY;
const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";

/**
 * CoinGecko IDs from src/chains/data.ts config.coinGeckoIds
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
  monad: "MONAD",
  "polygon-ecosystem-token": "POL",
  ronin: "RON",
  "sei-network": "SEI",
  "sonic-3": "S",
  sophon: "SOPH",
  "tangle-network": "TNT",
  "xdce-crowd-sale": "XDC",
};

describe("Validate CoinGecko IDs", () => {
  if (!COINGECKO_API_KEY) {
    it.skip("VITE_COINGECKO_API_KEY not set - skipping CoinGecko tests", () => {});
    return;
  }

  for (const [coinId, symbol] of Object.entries(COINGECKO_IDS)) {
    it(`${symbol}: ${coinId}`, async () => {
      const url = `${COINGECKO_BASE_URL}/coins/${coinId}`;

      await expect(
        axios.get(url, {
          headers: {
            "x-cg-demo-api-key": COINGECKO_API_KEY,
          },
          params: {
            community_data: false,
            developer_data: false,
            localization: false,
            market_data: false,
            tickers: false,
          },
          timeout: 10_000, // 10 seconds
        }),
      ).resolves.toMatchObject({
        data: {
          id: coinId,
        },
        status: 200,
      });
    });
  }
});
