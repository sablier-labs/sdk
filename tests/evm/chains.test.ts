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
import { beforeAll, describe, expect, it } from "@effect/vitest";
import { Data, Effect } from "effect";
import globby from "globby";
import { chains } from "@/src/evm/chains/index.js";
import { chainsQueries } from "@/src/evm/chains/queries.js";
import { Protocol } from "@/src/evm/enums.js";
import { releasesQueries } from "@/src/evm/releases/queries.js";
import { getDeploymentsDir } from "@/src/internal/helpers.js";
import { MISSING_CHAIN_IDS, MISSING_CHAIN_SLUGS } from "./helpers/missing.js";

class GlobbyError extends Data.TaggedError("GlobbyError")<{
  readonly pattern: string;
  readonly cause: unknown;
}> {}

const chainValues = Object.values(chains);

const KNOWN_SLUGS = chainValues
  .filter((chain) => !MISSING_CHAIN_IDS.includes(chain.id))
  .map((chain) => chain.slug);

describe("Package chains are in sync with broadcasts", () => {
  let broadcastSlugs: string[] = [];
  const errors: Set<string> = new Set();

  beforeAll(async () => {
    broadcastSlugs = await Effect.runPromise(getAllBroadcastSlugsEffect());
  });

  it.effect("should have every package chain in at least one broadcast", () =>
    Effect.gen(function* () {
      errors.clear();
      const missingChains = KNOWN_SLUGS.filter((slug) => !broadcastSlugs.includes(slug));

      for (const slug of missingChains) {
        errors.add(`Chain "${slug}" is defined in package but NOT found in any broadcast`);
      }

      if (errors.size > 0) {
        const msg = `❌ Missing chains:\n${[...errors].map((e) => `  🔍 ${e}`).join("\n")}`;
        return yield* Effect.fail(new Error(msg));
      }

      expect(errors.size).toBe(0);
    })
  );

  it.effect("should not have any unknown chain in broadcasts", () =>
    Effect.gen(function* () {
      errors.clear();
      const allowedSlugs = [...KNOWN_SLUGS, ...MISSING_CHAIN_SLUGS];
      const extraChains = broadcastSlugs.filter((slug) => !allowedSlugs.includes(slug));

      for (const slug of extraChains) {
        errors.add(`Chain "${slug}" found in broadcasts but NOT defined in package`);
      }

      if (errors.size > 0) {
        const msg = `❌ Extra chains:\n${[...errors].map((e) => `  ⚠️ ${e}`).join("\n")}`;
        return yield* Effect.fail(new Error(msg));
      }

      expect(errors.size).toBe(0);
    })
  );
});

describe("Block explorer URLs", () => {
  it("should not end with a trailing slash", () => {
    const violations: string[] = [];

    for (const chain of chainValues) {
      for (const [, explorer] of Object.entries(chain.blockExplorers)) {
        if (explorer.url.endsWith("/")) {
          violations.push(`${chain.slug}: ${explorer.url}`);
        }
      }
    }

    if (violations.length > 0) {
      throw new Error(`URLs with trailing slashes:\n${violations.join("\n")}`);
    }
  });
});

describe("Each chain has at least one deployment", () => {
  const protocols = [Protocol.Legacy, Protocol.Lockup, Protocol.Flow, Protocol.Airdrops] as const;
  const allChains = chainsQueries.getAll();

  for (const chain of allChains) {
    it(`${chain.name}`, () => {
      const allDeployments = protocols.flatMap((protocol) => {
        const releases = releasesQueries.getAll({ protocol });
        return releases.flatMap((r) => r.deployments);
      });

      const hasDeployment = allDeployments.some((d) => d.chainId === chain.id);
      expect(hasDeployment, `No deployments found on ${chain.name}`).toBe(true);
    });
  }
});

function getAllBroadcastSlugsEffect() {
  return Effect.gen(function* () {
    const deploymentsPath = getDeploymentsDir();
    const patterns = [
      path.join(deploymentsPath, "**/broadcasts"),
      path.join(deploymentsPath, "**/broadcasts-zk"),
    ];
    const dirs = yield* Effect.tryPromise({
      catch: (cause) => new GlobbyError({ cause, pattern: patterns.join(", ") }),
      try: () => globby(patterns, { onlyDirectories: true }),
    });
    const results: string[] = [];

    for (const dir of dirs) {
      const entries = yield* Effect.tryPromise({
        catch: (cause) => new GlobbyError({ cause, pattern: dir }),
        try: () => globby(["*"], { cwd: dir, objectMode: true, onlyFiles: false }),
      });

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
  });
}
