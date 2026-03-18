import { getProtocolEvmReleasesWithArtifacts } from "../releases.js";
import { createTestSuite } from "./utils/generators.js";

for (const release of getProtocolEvmReleasesWithArtifacts("flow")) {
  createTestSuite(release);
}
