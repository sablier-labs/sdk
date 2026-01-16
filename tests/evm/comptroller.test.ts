import { chains } from "@src/evm/chains";
import { comptrollerQueries } from "@src/evm/comptroller/queries";
import { describe, expect, it } from "vitest";

/**
 * @see https://etherscan.io/address/0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399
 */
const DEFAULT_ADDRESS = "0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399";

describe("comptroller", () => {
  describe("getAll", () => {
    it("returns all deployments", () => {
      const entries = comptrollerQueries.getAll();

      for (const entry of entries) {
        if (entry.chainId === chains.linea.id) {
          expect(entry.address).toBe("0xF21b304A08993f98A79C7Eb841f812CCeab49B8b");
        } else if (entry.chainId === chains.denergy.id) {
          expect(entry.address).toBe("0x946654AB30Dd6eD10236C89f2C8B2719df653691");
        } else {
          expect(entry.address).toBe(DEFAULT_ADDRESS);
        }

        expect((entry.block ?? 0) > 0).toBe(true);
        expect(entry.name).toBe("SablierComptroller");
      }
    });
  });

  describe("get", () => {
    it("returns the deployment for a specific chain", () => {
      const deployment = comptrollerQueries.get(chains.base.id);

      expect(deployment?.chainId).toBe(chains.base.id);
      expect(deployment?.address).toMatch(DEFAULT_ADDRESS);
    });

    it("returns undefined for chains without a deployment", () => {
      const nonExistingChainId = 98989898989;
      const deployment = comptrollerQueries.get(nonExistingChainId);

      expect(deployment).toBeUndefined();
    });
  });
});
