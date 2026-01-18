import { erc1967ProxyAbi } from "./abi/ERC1967Proxy.js";
import { sablierComptrollerAbi } from "./abi/SablierComptroller.js";
import manifest from "./manifest.js";

export const abi = {
  [manifest.ERC1967_PROXY]: erc1967ProxyAbi,
  [manifest.SABLIER_COMPTROLLER]: sablierComptrollerAbi,
} as const;
