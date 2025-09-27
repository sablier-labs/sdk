import { chains } from "@src/chains";
import { comptroller } from "@src/comptroller";
import { describe, expect, it } from "vitest";

describe("comptroller", () => {
  describe("getAll", () => {
    it("returns all deployments", () => {
      const entries = comptroller.getAll();

      for (const entry of entries) {
        const expectedAddress =
          entry.chainId === chains.linea.id
            ? "0xF21b304A08993f98A79C7Eb841f812CCeab49B8b"
            : "0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399";

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
      const nonExistingChainId = 98989898989;
      const deployment = comptroller.get(nonExistingChainId);

      expect(deployment).toBeUndefined();
    });
  });
});
