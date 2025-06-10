import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

const TEST_ONLY_CONTRACTS = Boolean(process.env.TEST_ONLY_CONTRACTS);
const TEST_ONLY_CHAINS = Boolean(process.env.TEST_ONLY_CHAINS);

function getInclude() {
  const paths: string[] = [];

  if (TEST_ONLY_CONTRACTS) {
    paths.push("tests/contracts/**/*.test.ts");
  }
  if (TEST_ONLY_CHAINS) {
    paths.push("tests/chains.test.ts");
  }
  if (paths.length === 0) {
    paths.push("tests/**/*.test.ts");
  }

  return paths;
}

function getRetry() {
  return TEST_ONLY_CONTRACTS || TEST_ONLY_CHAINS ? 5 : 0;
}

function getTimeout() {
  return !process.env.CI ? 10000 : 60000; // 10 seconds normally, 1 minute in CI
}

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    globalSetup: "./tests/setup/global.ts",
    globals: true,
    include: getInclude(),
    retry: getRetry(),
    testTimeout: getTimeout(),
  },
});
