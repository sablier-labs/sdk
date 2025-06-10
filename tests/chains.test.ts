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
import { chains } from "@src/chains";
import { getDeploymentsDir } from "@src/internal/helpers";
import axios from "axios";
import globby from "globby";
import _ from "lodash";
import { beforeAll, describe, expect, it } from "vitest";
import { MISSING_CHAINS } from "./setup/missing";

const MALFUNCTIONING_RPC: number[] = [chains.meld.id];
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

const envVarsSet = Boolean(process.env.CI && process.env.TEST_ONLY_CHAINS);
describe.runIf(envVarsSet)("Ping JSON-RPC server", () => {
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
        axios.post(chain.rpc.default, rpcRequest, {
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
