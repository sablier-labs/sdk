import { erc1967ProxyAbi } from "./abi/ERC1967Proxy";
import { sablierComptrollerAbi } from "./abi/SablierComptroller";
import manifest from "./manifest";

export const abi = {
  [manifest.ERC1967_PROXY]: erc1967ProxyAbi,
  [manifest.SABLIER_COMPTROLLER]: sablierComptrollerAbi,
} as const;
