import { sablierAbi } from "./abi/Sablier.js";
import manifest from "./manifest.js";

export const abi = {
  [manifest.SABLIER]: sablierAbi,
} as const;
