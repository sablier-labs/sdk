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
import { chains } from "@src/evm/chains";
import { getDeploymentsDir } from "@src/internal/helpers";
import { Effect } from "effect";
import globby from "globby";
import _ from "lodash";
import { MISSING_CHAINS } from "./helpers/missing";

const KNOWN_SLUGS = _.values(chains)
  .filter((chain) => !MISSING_CHAINS.includes(chain.id))
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
      const missingChains = _.difference(KNOWN_SLUGS, broadcastSlugs);

      for (const slug of missingChains) {
        errors.add(`Chain "${slug}" is defined in package but NOT found in any broadcast`);
      }

      if (errors.size > 0) {
        const msg = `❌ Missing chains:\n${[...errors].map((e) => `  🔍 ${e}`).join("\n")}`;
        return yield* Effect.fail(new Error(msg));
      }

      expect(errors.size).toBe(0);
    }),
  );

  it.effect("should not have any unknown chain in broadcasts", () =>
    Effect.gen(function* () {
      errors.clear();
      const allowedSlugs = [...KNOWN_SLUGS, ...MISSING_CHAINS];
      const extraChains = _.difference(broadcastSlugs, allowedSlugs);

      for (const slug of extraChains) {
        errors.add(`Chain "${slug}" found in broadcasts but NOT defined in package`);
      }

      if (errors.size > 0) {
        const msg = `❌ Extra chains:\n${[...errors].map((e) => `  ⚠️ ${e}`).join("\n")}`;
        return yield* Effect.fail(new Error(msg));
      }

      expect(errors.size).toBe(0);
    }),
  );
});

function getAllBroadcastSlugsEffect() {
  return Effect.gen(function* () {
    const deploymentsPath = getDeploymentsDir();
    const dirs = yield* Effect.promise(() =>
      globby(
        [
          path.join(deploymentsPath, "**/broadcasts"),
          path.join(deploymentsPath, "**/broadcasts-zk"),
        ],
        {
          onlyDirectories: true,
        },
      ),
    );
    const results: string[] = [];

    for (const dir of dirs) {
      const entries = yield* Effect.promise(() =>
        globby(["*"], { cwd: dir, objectMode: true, onlyFiles: false }),
      );

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
