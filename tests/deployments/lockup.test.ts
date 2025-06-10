import { releases } from "@src/releases";
import { createTestSuite } from "./utils/generators";

/**
 * IMPORTANT: the tests have to be run in this order because the contracts in some releases
 * are found in the broadcast files of previous releases.
 */
createTestSuite(releases.lockup["v1.0"]);
createTestSuite(releases.lockup["v1.1"]);
createTestSuite(releases.lockup["v1.2"]);
createTestSuite(releases.lockup["v2.0"]);
