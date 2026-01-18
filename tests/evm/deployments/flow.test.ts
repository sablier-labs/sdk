import { releases } from "@/src/evm/releases/index.js";
import { createTestSuite } from "./utils/generators.js";

createTestSuite(releases.flow["v1.0"]);
createTestSuite(releases.flow["v1.1"]);
createTestSuite(releases.flow["v2.0"]);
