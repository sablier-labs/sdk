import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

const CI = Boolean(process.env.CI);
const VITE_CHAINS_TESTS = Boolean(process.env.VITE_CHAINS_TESTS);
const VITE_CONTRACT_BLOCKS_TESTS = Boolean(process.env.VITE_CONTRACT_BLOCKS_TESTS);

function getInclude() {
  const paths: string[] = [];

  if (CI) {
    if (VITE_CHAINS_TESTS) {
      paths.push("tests/chains.test.ts");
    }
    if (VITE_CONTRACT_BLOCKS_TESTS) {
      paths.push("tests/contracts/blocks.test.ts");
    }
  }
  if (paths.length === 0) {
    paths.push("tests/**/*.test.ts");
  }

  return paths;
}

/**
 * These tests perform JSON-RPC calls to external services, which are flaky, so we need to retry them.
 */
function getRetry() {
  return VITE_CHAINS_TESTS || VITE_CONTRACT_BLOCKS_TESTS ? 10 : 0;
}

function getTimeout() {
  return !process.env.CI ? 10_000 : 60_000; // 10 seconds normally, 1 minute in CI
}

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    globalSetup: "./tests/helpers/global.ts",
    globals: true,
    include: getInclude(),
    retry: getRetry(),
    testTimeout: getTimeout(),
  },
});
