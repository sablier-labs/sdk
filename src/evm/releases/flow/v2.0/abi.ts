import { sablierFlowAbi } from "./abi/SablierFlow.js";
import manifest from "./manifest.js";

export const abi = {
  [manifest.SABLIER_FLOW]: sablierFlowAbi,
} as const;
