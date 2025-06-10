import { releases } from "@src/releases";
import { createTestSuite } from "./utils/generators";

createTestSuite(releases.flow["v1.0"]);
createTestSuite(releases.flow["v1.1"]);
