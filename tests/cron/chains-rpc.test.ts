import { chains } from "@src/chains";
import axios from "axios";
import _ from "lodash";
import { describe, expect, it } from "vitest";

const MALFUNCTIONING_RPC: number[] = [chains.meld.id];

describe("Ping JSON-RPC server", () => {
  for (const chain of _.values(chains)) {
    const shouldSkip: boolean = MALFUNCTIONING_RPC.includes(chain.id);

    it.skipIf(shouldSkip)(`${chain.name} (ID: ${chain.id})`, async () => {
      const rpcRequest = {
        id: 1,
        jsonrpc: "2.0",
        method: "eth_chainId",
        params: [],
      };

      await expect(
        axios.post(chain.rpc.defaults[0], rpcRequest, {
          headers: { "Content-Type": "application/json" },
          timeout: 10_000, // 10 seconds
        }),
      ).resolves.toMatchObject({
        data: {
          id: 1,
          jsonrpc: "2.0",
          result: expect.any(String),
        },
        status: 200,
      });
    });
  }
});
