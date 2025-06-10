import { releases } from "@src/releases";
import { createTestSuite } from "./utils/generators";

// v1.1 and v1.2 are purposefully skipped as they are re-exports of Lockup v1.1 and v1.2
createTestSuite(releases.airdrops["v1.3"]);
