import { releases } from "@/src/evm/releases/index.js";
import { createTestSuite } from "./utils/generators.js";

// v1.1 and v1.2 are purposefully skipped as they are re-exports of Lockup v1.1 and v1.2
createTestSuite(releases.airdrops["v1.3"]);
createTestSuite(releases.airdrops["v2.0"]);
