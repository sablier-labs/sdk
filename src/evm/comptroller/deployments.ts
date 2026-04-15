import { chains } from "@/src/evm/chains/index.js";
import type { Sablier } from "@/src/types.js";
import manifest from "./v2.0/manifest.js";

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
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 19_953_193],
  }),
  get(chains.arbitrum.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 382_523_565],
  }),
  get(chains.avalanche.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 69_219_791],
  }),
  get(chains.base.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 35_965_506],
  }),
  get(chains.berachain.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 10_905_957],
  }),
  get(chains.blast.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 24_955_461],
  }),
  get(chains.bsc.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 62_296_036],
  }),
  get(chains.chiliz.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 27_326_583],
  }),
  get(chains.coreDao.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 28_473_497],
  }),
  get(chains.denergy.id, {
    [manifest.SABLIER_COMPTROLLER]: ["0x946654AB30Dd6eD10236C89f2C8B2719df653691", 691_574],
  }),
  get(chains.gnosis.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 42_287_148],
  }),
  get(chains.hyperevm.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 14_716_634],
  }),
  get(chains.lightlink.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 166_583_712],
  }),
  get(chains.linea.id, {
    [manifest.SABLIER_COMPTROLLER]: ["0xF21b304A08993f98A79C7Eb841f812CCeab49B8b", 23_749_930],
  }),
  get(chains.mainnet.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 23_432_333],
  }),
  get(chains.mode.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 29_282_069],
  }),
  get(chains.monad.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 34_574_999],
  }),
  get(chains.morph.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 17_216_266],
  }),
  get(chains.optimism.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 141_566_602],
  }),
  get(chains.polygon.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 76_850_809],
  }),
  get(chains.scroll.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 21_895_919],
  }),
  get(chains.sei.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 169_828_207],
  }),
  get(chains.sonic.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 48_050_064],
  }),
  get(chains.superseed.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 16_276_550],
  }),
  get(chains.unichain.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 27_984_892],
  }),
  get(chains.xdc.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 94_010_976],
  }),
  get(chains.zksync.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 64_868_283],
  }),
];

/**
 * @description Testnet deployments for Comptroller.
 */
export const testnets = [
  get(chains.arbitrumSepolia.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 197_780_828],
  }),
  get(chains.baseSepolia.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 31_493_735],
  }),

  get(chains.optimismSepolia.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 33_476_910],
  }),
  get(chains.battlechainTestnet.id, {
    [manifest.SABLIER_COMPTROLLER]: ["0x0eDA15D606733f6CDe9DB67263E546bfcDDe9264", 5384],
  }),
  get(chains.sepolia.id, {
    [manifest.SABLIER_COMPTROLLER]: [DEFAULT_ADDRESS, 9_272_981],
  }),
];

export const deployments: Sablier.EVM.Contract[] = [...mainnets, ...testnets];
