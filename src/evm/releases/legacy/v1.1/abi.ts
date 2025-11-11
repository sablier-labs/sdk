import { sablierAbi } from "./abi/Sablier";
import manifest from "./manifest";

export const abi = {
  [manifest.SABLIER]: sablierAbi,
} as const;
