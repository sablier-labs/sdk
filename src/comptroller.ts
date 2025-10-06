import { chains } from "@src/chains";
import type { Sablier } from "@src/types";

const SABLIER_COMPTROLLER = "SablierComptroller";

/* -------------------------------------------------------------------------- */
/*                                    QUERY                                   */
/* -------------------------------------------------------------------------- */

export const comptroller = {
  /**
   * @notice Returns the comptroller deployment for a specific chain.
   * @param chainId The chain identifier.
   */
  get(chainId: number): Sablier.Contract | undefined {
    const deployment = deployments.find((item) => item.chainId === chainId);
    return deployment ? { ...deployment } : undefined;
  },

  /**
   * @notice Returns all comptroller deployments across mainnets and testnets.
   */
  getAll(): Sablier.Contract[] {
    return deployments.map((deployment) => ({ ...deployment }));
  },
};

/* -------------------------------------------------------------------------- */
/*                                 DEPLOYMENTS                                */
/* -------------------------------------------------------------------------- */

/**
 * @description Mainnet deployments for Comptroller.
 */
export const mainnets = [
  get(chains.abstract.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 19953193],
  }),
  get(chains.arbitrum.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 382523565],
  }),
  get(chains.avalanche.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 69219791],
  }),
  get(chains.base.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 35965506],
  }),
  get(chains.berachain.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 10905957],
  }),
  get(chains.blast.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 24955461],
  }),
  get(chains.bsc.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 62296036],
  }),
  get(chains.chiliz.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 27326583],
  }),
  get(chains.coreDao.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 28473497],
  }),
  get(chains.gnosis.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 42287148],
  }),
  get(chains.hyperevm.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 14716634],
  }),
  get(chains.lightlink.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 166583712],
  }),
  get(chains.linea.id, {
    [SABLIER_COMPTROLLER]: ["0xF21b304A08993f98A79C7Eb841f812CCeab49B8b", 23749930],
  }),
  get(chains.mainnet.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 23432333],
  }),
  get(chains.mode.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 29282069],
  }),
  get(chains.morph.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 17216266],
  }),
  get(chains.optimism.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 141566602],
  }),
  get(chains.polygon.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 76850809],
  }),
  get(chains.scroll.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 21895919],
  }),
  get(chains.sei.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 169828207],
  }),
  get(chains.sonic.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 48050064],
  }),
  get(chains.superseed.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 16276550],
  }),
  get(chains.unichain.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 27984892],
  }),
  get(chains.xdc.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 94010976],
  }),
  get(chains.zksync.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 64868283],
  }),
];

/**
 * @description Testnet deployments for Comptroller.
 */
export const testnets = [
  get(chains.arbitrumSepolia.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 197780828],
  }),
  get(chains.baseSepolia.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 31493735],
  }),
  get(chains.modeTestnet.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 35444141],
  }),
  get(chains.optimismSepolia.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 33476910],
  }),
  get(chains.sepolia.id, {
    [SABLIER_COMPTROLLER]: ["0x0000008ABbFf7a84a2fE09f9A9b74D3BC2072399", 9272981],
  }),
];

export const deployments: Sablier.Contract[] = [...mainnets, ...testnets];

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

function get(chainId: number, contractMap: Sablier.ContractMap): Sablier.Contract {
  const entry = contractMap[SABLIER_COMPTROLLER];

  if (!entry) {
    throw new Error(`Sablier SDK: Comptroller contract missing for chain ${chainId}.`);
  }

  const [address, block] = Array.isArray(entry) ? entry : [entry, undefined];

  return {
    address: address as Sablier.Address,
    block,
    chainId,
    name: SABLIER_COMPTROLLER,
    protocol: undefined,
    version: undefined,
  };
}
