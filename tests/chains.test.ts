/**
 * @file This test suite ensures consistency between chain definitions in the package and deployment files.
 *
 * The tests verify that:
 * 1. All chains defined in the package have corresponding deployment files
 * 2. All deployment files correspond to chains defined in the package
 *
 * The test searches through deployment directories for files and compares them against the chains
 * defined in the package.
 *
 * Additionally, it pings the public JSON-RPC servers of all chains to ensure they are reachable.
 */
import path from "node:path";
import { chains } from "@src/evm/chains";
import { getDeploymentsDir } from "@src/internal/helpers";
import globby from "globby";
import _ from "lodash";
import * as viem from "viem/chains";
import { beforeAll, describe, expect, it } from "vitest";
import {
  alchemyRPCs,
  fetchAlchemySupportedChains,
  fetchInfuraSupportedChains,
  formatResults,
  getChainName,
  infuraRPCs,
} from "./helpers/chains";
import { MISSING_CHAINS } from "./helpers/missing";

const KNOWN_SLUGS = _.values(chains)
  .filter((chain) => !MISSING_CHAINS.includes(chain.id))
  .map((chain) => chain.slug);

describe("Package chains are in sync with broadcasts", () => {
  let broadcastSlugs: string[] = [];
  const errors: Set<string> = new Set();

  beforeAll(async () => {
    // Get all deployment files
    broadcastSlugs = await getAllBroadcastSlugs();
  });

  it("should have every package chain in at least one broadcast", () => {
    errors.clear();
    const missingChains = _.difference(KNOWN_SLUGS, broadcastSlugs);

    for (const slug of missingChains) {
      errors.add(`Chain "${slug}" is defined in package but NOT found in any broadcast`);
    }

    if (errors.size > 0) {
      const msg = `❌ Missing chains:\n${[...errors].map((e) => `  🔍 ${e}`).join("\n")}`;
      throw new Error(msg);
    }
    expect(errors.size).toBe(0);
  });

  it("should not have any unknown chain in broadcasts", () => {
    errors.clear();
    const allowedSlugs = [...KNOWN_SLUGS, ...MISSING_CHAINS];
    const extraChains = _.difference(broadcastSlugs, allowedSlugs);

    for (const slug of extraChains) {
      errors.add(`Chain "${slug}" found in broadcasts but NOT defined in package`);
    }

    if (errors.size > 0) {
      const msg = `❌ Extra chains:\n${[...errors].map((e) => `  ⚠️ ${e}`).join("\n")}`;
      throw new Error(msg);
    }
    expect(errors.size).toBe(0);
  });
});

async function getAllBroadcastSlugs(): Promise<string[]> {
  const deploymentsPath = getDeploymentsDir();
  const dirs = await globby(
    [path.join(deploymentsPath, "**/broadcasts"), path.join(deploymentsPath, "**/broadcasts-zk")],
    {
      onlyDirectories: true,
    },
  );
  const results: string[] = [];

  for (const dir of dirs) {
    const entries = await globby(["*"], { cwd: dir, objectMode: true, onlyFiles: false });

    for (const entry of entries) {
      // It's a JSON file, use the basename without extension
      if (entry.path.endsWith(".json")) {
        results.push(path.basename(entry.path, ".json"));
      }
      // It's a directory, add its name
      else if (entry.dirent.isDirectory()) {
        results.push(entry.path);
      }
    }
  }

  return results;
}

describe("RPC Chain Coverage", () => {
  const VITE_ALCHEMY_API_KEY = process.env.VITE_ALCHEMY_API_KEY;
  const VITE_INFURA_API_KEY = process.env.VITE_INFURA_API_KEY;

  it("should have API keys configured", () => {
    expect(VITE_ALCHEMY_API_KEY, "VITE_ALCHEMY_API_KEY must be set in environment variables").toBeDefined();
    expect(VITE_INFURA_API_KEY, "VITE_INFURA_API_KEY must be set in environment variables").toBeDefined();
  });

  describe("Infura RPC Coverage", () => {
    it("should have working RPC endpoints for all chains in infuraRPCs", async () => {
      if (!VITE_INFURA_API_KEY) {
        throw new Error("VITE_INFURA_API_KEY not set");
      }

      const { supported, failed } = await fetchInfuraSupportedChains(VITE_INFURA_API_KEY);

      expect(failed, formatResults("Infura", supported, failed)).toHaveLength(0);
    });
  });

  describe("Alchemy RPC Coverage", () => {
    it("should have working RPC endpoints for all chains in alchemyRPCs", async () => {
      if (!VITE_ALCHEMY_API_KEY) {
        throw new Error("VITE_ALCHEMY_API_KEY not set");
      }

      const { supported, failed } = await fetchAlchemySupportedChains(VITE_ALCHEMY_API_KEY);

      expect(failed, formatResults("Alchemy", supported, failed)).toHaveLength(0);
    });
  });

  describe("RPC Object Structure", () => {
    it("should have valid RPC generator functions in alchemyRPCs", () => {
      const chainIds = Object.keys(alchemyRPCs).map(Number);

      expect(chainIds.length).toBeGreaterThan(0);

      for (const chainId of chainIds) {
        const generator = alchemyRPCs[chainId];
        expect(generator).toBeTypeOf("function");

        const url = generator("test-api-key");
        expect(url).toMatch(/^https:\/\/.+\.alchemy\.com\/v2\/.+$/);
        expect(url).toContain("test-api-key");
      }
    });

    it("should have valid RPC generator functions in infuraRPCs", () => {
      const chainIds = Object.keys(infuraRPCs).map(Number);

      expect(chainIds.length).toBeGreaterThan(0);

      for (const chainId of chainIds) {
        const generator = infuraRPCs[chainId];
        expect(generator).toBeTypeOf("function");

        const url = generator("test-api-key");
        expect(url).toMatch(/^https:\/\/.+\.infura\.io\/v3\/.+$/);
        expect(url).toContain("test-api-key");
      }
    });

    it("should have corresponding viem chain definitions for all RPC chains", () => {
      const alchemyChainIds = Object.keys(alchemyRPCs).map(Number);
      const infuraChainIds = Object.keys(infuraRPCs).map(Number);
      const allRPCChains = [...new Set([...alchemyChainIds, ...infuraChainIds])];

      const viemChainIds = Object.values(viem)
        .filter((chain: any) => typeof chain === "object" && chain.id)
        .map((chain: any) => chain.id);

      const missingFromViem = allRPCChains.filter((id) => !viemChainIds.includes(id));

      expect(
        missingFromViem,
        `Some chains in RPC objects are missing from viem/chains: ${missingFromViem.join(", ")}`,
      ).toHaveLength(0);
    });
  });
});

describe("Chain Name Resolution", () => {
  /**
   * Use Case: Validate chain name lookup functionality
   *
   * The getChainName function is responsible for converting chain IDs to
   * human-readable names using viem's chain definitions. This is critical for:
   * - Displaying user-friendly error messages
   * - Logging and debugging with recognizable chain names
   * - Creating readable test output
   *
   * What it tests:
   * - Successfully resolves known chain IDs to their proper names
   * - Returns fallback format for unknown/invalid chain IDs
   * - Handles edge cases (negative numbers, zero, very large numbers)
   */

  it("should return correct chain name for known chain IDs", () => {
    // Test well-known chain IDs
    expect(getChainName(viem.mainnet.id)).toBe("Ethereum");
    expect(getChainName(viem.polygon.id)).toBe("Polygon");
    expect(getChainName(viem.arbitrum.id)).toBe("Arbitrum One");
    expect(getChainName(viem.optimism.id)).toBe("OP Mainnet");
    expect(getChainName(viem.base.id)).toBe("Base");
  });

  it("should return fallback format for unknown chain IDs", () => {
    // Test chain IDs that don't exist in viem
    const unknownChainId = 999999;
    expect(getChainName(unknownChainId)).toBe(`Chain ${unknownChainId}`);

    const anotherUnknownId = 123456;
    expect(getChainName(anotherUnknownId)).toBe(`Chain ${anotherUnknownId}`);
  });

  it("should handle edge case chain IDs", () => {
    // Test edge cases
    expect(getChainName(0)).toBe("Chain 0");
    expect(getChainName(-1)).toBe("Chain -1");
    expect(getChainName(Number.MAX_SAFE_INTEGER)).toBe(`Chain ${Number.MAX_SAFE_INTEGER}`);
  });

  it("should return consistent results for the same chain ID", () => {
    // Test idempotency - calling multiple times should return same result
    const chainId = viem.mainnet.id;
    const firstCall = getChainName(chainId);
    const secondCall = getChainName(chainId);
    const thirdCall = getChainName(chainId);

    expect(firstCall).toBe(secondCall);
    expect(secondCall).toBe(thirdCall);
    expect(firstCall).toBe("Ethereum");
  });

  it("should handle all chain IDs in alchemyRPCs", () => {
    // Ensure all configured Alchemy chains have resolvable names
    const alchemyChainIds = Object.keys(alchemyRPCs).map(Number);

    for (const chainId of alchemyChainIds) {
      const name = getChainName(chainId);

      // Should not be undefined or null
      expect(name).toBeDefined();
      expect(name).not.toBeNull();

      // Should be a non-empty string
      expect(typeof name).toBe("string");
      expect(name.length).toBeGreaterThan(0);

      // Should either be a proper chain name or fallback format
      const isFallback = name.startsWith("Chain ");
      const isProperName = !isFallback;

      // All chains in alchemyRPCs should have proper names (not fallbacks)
      expect(isProperName).toBe(true);
    }
  });

  it("should handle all chain IDs in infuraRPCs", () => {
    // Ensure all configured Infura chains have resolvable names
    const infuraChainIds = Object.keys(infuraRPCs).map(Number);

    for (const chainId of infuraChainIds) {
      const name = getChainName(chainId);

      // Should not be undefined or null
      expect(name).toBeDefined();
      expect(name).not.toBeNull();

      // Should be a non-empty string
      expect(typeof name).toBe("string");
      expect(name.length).toBeGreaterThan(0);

      // All chains in infuraRPCs should have proper names (not fallbacks)
      const isFallback = name.startsWith("Chain ");
      expect(isFallback).toBe(false);
    }
  });
});
