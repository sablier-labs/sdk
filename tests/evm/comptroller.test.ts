import { chains } from "@src/evm/chains/index.js";
import { comptroller } from "@src/evm/comptroller.js";
import { describe, expect, it } from "vitest";

/** Chain-specific comptroller addresses */
const COMPTROLLER_ADDRESSES: Record<number, string> = {
  [chains.linea.id]: "0xF21b304A08993f98A79C7Eb841f812CCeab49B8b",
  [chains.denergy.id]: "0x946654ab30dd6ed10236c89f2c8b2719df653691",
};
const DEFAULT_COMPTROLLER_ADDRESS = "0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399";

describe("comptroller", () => {
  describe("getAll", () => {
    it("returns all deployments", () => {
      const entries = comptroller.getAll();

      for (const entry of entries) {
        const expectedAddress = COMPTROLLER_ADDRESSES[entry.chainId] ?? DEFAULT_COMPTROLLER_ADDRESS;

        expect(entry.address).toBe(expectedAddress);
        expect((entry.block ?? 0) > 0).toBe(true);
        expect(entry.name).toBe("SablierComptroller");
      }
    });
  });

  describe("get", () => {
    it("returns the deployment for a specific chain", () => {
      const deployment = comptroller.get(chains.base.id);

      expect(deployment?.chainId).toBe(chains.base.id);
      expect(deployment?.address).toMatch("0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399");
    });

    it("returns undefined for chains without a deployment", () => {
      const nonExistingChainId = 98_989_898_989;
      const deployment = comptroller.get(nonExistingChainId);

      expect(deployment).toBeUndefined();
    });
  });
});
