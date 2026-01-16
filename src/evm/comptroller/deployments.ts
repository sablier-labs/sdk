import { chains } from "@src/evm/chains";
import type { Sablier } from "@src/types";
import manifest from "./manifest";

/**
 * The default fixed comptroller address on all chains, with the exception of Linea.
 * @see {@link file://./../../deployments/comptroller/v1.0/README.md#exceptions}
 */
const DEFAULT_ADDRESS = "0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399";

function get(chainId: number, contractMap: Sablier.EVM.ContractMap): Sablier.EVM.Contract {
  const entry = contractMap[manifest.SABLIER_COMPTROLLER];

  if (!entry) {
    throw new Error(`Sablier SDK: Comptroller contract missing for chain ${chainId}.`);
  }

  const [address, block] = Array.isArray(entry) ? entry : [entry, undefined];

  return {
    address: address as Sablier.EVM.Address,
    block,
    chainId,
    name: manifest.SABLIER_COMPTROLLER,
    protocol: undefined,
    version: undefined,
  };
}

/**
 * @description Mainnet deployments for Comptroller.
 */
export const mainnets = [
  get(chains.abstract.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 19953193],
  }),
  get(chains.arbitrum.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 382523565],
  }),
  get(chains.avalanche.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 69219791],
  }),
  get(chains.base.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 35965506],
  }),
  get(chains.berachain.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 10905957],
  }),
  get(chains.blast.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 24955461],
  }),
  get(chains.bsc.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 62296036],
  }),
  get(chains.chiliz.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 27326583],
  }),
  get(chains.coreDao.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 28473497],
  }),
  get(chains.denergy.id, {
    [manifest.SABLIER_COMPTROLLER]: ["0x946654AB30Dd6eD10236C89f2C8B2719df653691", 691574],
  }),
  get(chains.gnosis.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 42287148],
  }),
  get(chains.hyperevm.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 14716634],
  }),
  get(chains.lightlink.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 166583712],
  }),
  get(chains.linea.id, {
    [manifest.SABLIER_COMPTROLLER]: ["0xF21b304A08993f98A79C7Eb841f812CCeab49B8b", 23749930],
  }),
  get(chains.mainnet.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 23432333],
  }),
  get(chains.mode.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 29282069],
  }),
  get(chains.monad.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 34574999],
  }),
  get(chains.morph.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 17216266],
  }),
  get(chains.optimism.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 141566602],
  }),
  get(chains.polygon.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 76850809],
  }),
  get(chains.scroll.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 21895919],
  }),
  get(chains.sei.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 169828207],
  }),
  get(chains.sonic.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 48050064],
  }),
  get(chains.superseed.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 16276550],
  }),
  get(chains.unichain.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 27984892],
  }),
  get(chains.xdc.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 94010976],
  }),
  get(chains.zksync.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 64868283],
  }),
];

/**
 * @description Testnet deployments for Comptroller.
 */
export const testnets = [
  get(chains.arbitrumSepolia.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 197780828],
  }),
  get(chains.baseSepolia.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 31493735],
  }),
  get(chains.modeTestnet.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 35444141],
  }),
  get(chains.optimismSepolia.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 33476910],
  }),
  get(chains.sepolia.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 9272981],
  }),
];

export const deployments: Sablier.EVM.Contract[] = [...mainnets, ...testnets];
