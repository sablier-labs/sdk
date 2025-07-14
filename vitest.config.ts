import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

const CI = Boolean(process.env.CI);
const VITE_CRON_TESTS = Boolean(process.env.VITE_CRON_TESTS);

function getInclude() {
  if (CI && VITE_CRON_TESTS) {
    return ["tests/cron/**/*.test.ts"];
  }

  return ["tests/**/*.test.ts", "!tests/cron/**/*.ts"];
}

/**
 * These tests perform JSON-RPC calls to external services, which are flaky, so we need to retry them.
 */
function getRetry() {
  return !CI ? 0 : 10;
}

function getTimeout() {
  return !CI ? 10_000 : 60_000; // 10 seconds normally, 1 minute in CI
}

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    globalSetup: "./tests/helpers/setup.ts",
    globals: true,
    include: getInclude(),
    retry: getRetry(),
    testTimeout: getTimeout(),
  },
});
