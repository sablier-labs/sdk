import { chains } from "@src/chains";
import { Protocol } from "@src/enums";
import { resolvers } from "@src/releases/resolvers";
import type { Sablier } from "@src/types";
import aliases from "./aliases";
import manifest from "./manifest";

function get(chainId: number, contractMap: Sablier.ContractMap): Sablier.Deployment {
  return resolvers.deployment.standard({
    aliasMap: aliases,
    chainId,
    contractMap,
    protocol: Protocol.Flow,
    version: "v2.0",
  });
}

/**
 * @description Mainnet deployments for Flow v2.0
 */
export const mainnets: Sablier.Deployment[] = [
  get(chains.abstract.id, {
    [manifest.SABLIER_FLOW]: ["0xc415425e56cc6c42b87bacffb276db2292cc1e50", 20608071],
  }),
  get(chains.arbitrum.id, {
    [manifest.SABLIER_FLOW]: ["0xf0f6477422a346378458f73cf02f05a7492e0c25", 386120714],
  }),
  get(chains.avalanche.id, {
    [manifest.SABLIER_FLOW]: ["0x64dc318ba879eca8222e963d319728f211c600c7", 69776725],
  }),
  get(chains.base.id, {
    [manifest.SABLIER_FLOW]: ["0x8551208f75375abfaee1fbe0a69e390a94000ec2", 36413487],
  }),
  get(chains.berachain.id, {
    [manifest.SABLIER_FLOW]: ["0xb89cc68b2ef376ca1b9645f109f7a490b180cf1b", 11353858],
  }),
  get(chains.blast.id, {
    [manifest.SABLIER_FLOW]: ["0x13ce2ca4602d5d1dd323014cd5a4e8414d310a06", 25403293],
  }),
  get(chains.chiliz.id, {
    [manifest.SABLIER_FLOW]: ["0x21797da50e180d24d6a68e8be6f8daca1c06f0ee", 27623892],
  }),
  get(chains.coreDao.id, {
    [manifest.SABLIER_FLOW]: ["0x4cb7fb49e4b646b472a5609804004722b3b94f93", 28769906],
  }),
  get(chains.gnosis.id, {
    [manifest.SABLIER_FLOW]: ["0xcdd3eb5283e4a675f16ba83e9d8c28c871a550a2", 42459081],
  }),
  get(chains.lightlink.id, {
    [manifest.SABLIER_FLOW]: ["0x5f742f6becc61e76ae67b0dc29d58f5c964e2c78", 168340950],
  }),
  get(chains.mainnet.id, {
    [manifest.SABLIER_FLOW]: ["0x7a86d3e6894f9c5b5f25ffbdaae658cfc7569623", 23507359],
  }),
  get(chains.mode.id, {
    [manifest.SABLIER_FLOW]: ["0xbed2f163cc0aa3278261ef1c3fa51b98db270829", 29724479],
  }),
  get(chains.morph.id, {
    [manifest.SABLIER_FLOW]: ["0xbf407836021c993dfa27cb8232415d15faea709a", 17522576],
  }),
  get(chains.optimism.id, {
    [manifest.SABLIER_FLOW]: ["0xd18491649440d6338532f260761cee64e79d7bb2", 142008894],
  }),
  get(chains.polygon.id, {
    [manifest.SABLIER_FLOW]: ["0x62b6d5a3ac0cc91ecebd019d1c70fe955d8c7426", 77265843],
  }),
  get(chains.scroll.id, {
    [manifest.SABLIER_FLOW]: ["0xc3e92b9714ed01b51fdc29bb88b17af5cddd2c22", 22568050],
  }),
  get(chains.sei.id, {
    [manifest.SABLIER_FLOW]: ["0x9eaf5a3f23964148a1321078f9cce4c2325c603e", 171667597],
  }),
  get(chains.sonic.id, {
    [manifest.SABLIER_FLOW]: ["0x3954146884425accb86a6476dad69ec3591838cd", 49351959],
  }),
  get(chains.superseed.id, {
    [manifest.SABLIER_FLOW]: ["0xe91bbae6c7d67b7c5055de1c9635c17af056211b", 16718519],
  }),
  get(chains.unichain.id, {
    [manifest.SABLIER_FLOW]: ["0x170ecc032c96aa976fa702e94fbc9fa5bb64ee7c", 28868371],
  }),
  get(chains.xdc.id, {
    [manifest.SABLIER_FLOW]: ["0x3F00b8334EBE2A85875D1F8b50a43a12db67ACAD", 94421891],
  }),
  get(chains.zksync.id, {
    [manifest.SABLIER_FLOW]: ["0xa7f02e692973b6315eaca7fb4285ad2536a89cd0", 65054681],
  }),
];

/**
 * @description Testnet deployments for Flow v2.0
 */
export const testnets: Sablier.Deployment[] = [
  get(chains.arbitrumSepolia.id, {
    [manifest.SABLIER_FLOW]: ["0x73a474c9995b659bc4736486f25501e0a4a671ed", 201220855],
  }),
  get(chains.baseSepolia.id, {
    [manifest.SABLIER_FLOW]: ["0x19e99dcdbaf2fbf43c60cfd026d571860da29d43", 31923790],
  }),
  get(chains.modeTestnet.id, {
    [manifest.SABLIER_FLOW]: ["0xed1bde07c0af4a2b27301555af0ac26ab1b727a8", 35875839],
  }),
  get(chains.optimismSepolia.id, {
    [manifest.SABLIER_FLOW]: ["0x4cc7b50b0856c607edee0b6547221360e82e768c", 33906679],
  }),
  get(chains.sepolia.id, {
    [manifest.SABLIER_FLOW]: ["0xde489096eC9C718358c52a8BBe4ffD74857356e9", 9343957],
    [manifest.FLOW_NFT_DESCRIPTOR]: ["0xc9dBf2D207D178875b698e5f7493ce2d8BA88994", 7583391],
  }),
];
