import { getProtocolEvmReleasesWithArtifacts } from "../releases.js";
import { createTestSuite } from "./utils/generators.js";

/**
 * IMPORTANT: the tests have to be run in this order because the contracts in some releases
 * are found in the broadcast files of previous releases.
 */
for (const release of getProtocolEvmReleasesWithArtifacts("lockup")) {
  createTestSuite(release);
}
