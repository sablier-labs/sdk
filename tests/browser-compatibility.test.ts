import { describe, expect, it, vi } from "vitest";
import { sortChains } from "../src/internal/utils/sort-chains.js";

describe("browser compatibility", () => {
  it("imports the public SDK without Array.prototype.toSorted", async () => {
    const originalToSorted = Array.prototype.toSorted;
    Reflect.deleteProperty(Array.prototype, "toSorted");

    try {
      vi.resetModules();
      const sdk = await import("../src/index.js");
      expect(sdk.evm).toBeDefined();
      expect(sdk.solana).toBeDefined();
    } finally {
      if (originalToSorted) {
        Object.defineProperty(Array.prototype, "toSorted", {
          configurable: true,
          enumerable: false,
          value: originalToSorted,
          writable: true,
        });
      }
    }
  });

  it("sorts frozen chain inputs without mutating them", () => {
    const chains = Object.freeze([{ name: "Zulu" }, { name: "Alpha" }]) as { name: string }[];

    expect(sortChains(chains)).toEqual([{ name: "Alpha" }, { name: "Zulu" }]);
    expect(chains.map((chain) => chain.name)).toEqual(["Zulu", "Alpha"]);
  });
});
