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
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x6CefdBc5Ba80937235F012c83d6aA83F1200d6cC",
  }),
  get(chains.arbitrum.id, {
    [manifest.SABLIER_FLOW]: ["0xf0f6477422a346378458f73cf02f05a7492e0c25", 386120714],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x5F23eF12A7e861CB92c24B4314Af2A5F363CDD4F",
  }),
  get(chains.avalanche.id, {
    [manifest.SABLIER_FLOW]: ["0x64dc318ba879eca8222e963d319728f211c600c7", 69776725],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xb09b714B0feC83675E09fc997B7D532cF6620326",
  }),
  get(chains.base.id, {
    [manifest.SABLIER_FLOW]: ["0x8551208f75375abfaee1fbe0a69e390a94000ec2", 36413487],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x5b5e742305Be3A484EacCB124C83456463c24E6a",
  }),
  get(chains.berachain.id, {
    [manifest.SABLIER_FLOW]: ["0xb89cc68b2ef376ca1b9645f109f7a490b180cf1b", 11353858],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x581250eE4311F7Dc1afCF965cF8024004B423e9E",
  }),
  get(chains.blast.id, {
    [manifest.SABLIER_FLOW]: ["0x13ce2ca4602d5d1dd323014cd5a4e8414d310a06", 25403293],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x92f1dB592C771D9Ec7708abFEe79771AbC1b4fAd",
  }),
  get(chains.bsc.id, {
    [manifest.SABLIER_FLOW]: ["0x5505c2397B0BeBEEE64919F21Df84F83C008C51b", 63552929],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xAE557c04B46d47Ecac24edA63F22cabB4571Da61",
  }),
  get(chains.chiliz.id, {
    [manifest.SABLIER_FLOW]: ["0x21797da50e180d24d6a68e8be6f8daca1c06f0ee", 27623892],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xC7fd18CA19938d559dC45aDE362a850015CF0bd8",
  }),
  get(chains.coreDao.id, {
    [manifest.SABLIER_FLOW]: ["0x4cb7fb49e4b646b472a5609804004722b3b94f93", 28769906],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x7293F2D4A4e676EF67C085E92277AdF560AECb88",
  }),
  get(chains.gnosis.id, {
    [manifest.SABLIER_FLOW]: ["0xcdd3eb5283e4a675f16ba83e9d8c28c871a550a2", 42459081],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x5A47FC8732d399a2f3845c4FC91aB91bb97da31F",
  }),
  get(chains.hyperevm.id, {
    [manifest.SABLIER_FLOW]: ["0x70ce7795896c1e226C71360F9d77B743d8302182", 15760743],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x81Cc8C4B57B9A60a56330d087D6854A8E17Dfc7A",
  }),
  get(chains.lightlink.id, {
    [manifest.SABLIER_FLOW]: ["0x5f742f6becc61e76ae67b0dc29d58f5c964e2c78", 168340950],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xc58E948Cb0a010105467C92856bcd4842B759fb1",
  }),
  get(chains.linea.id, {
    [manifest.SABLIER_FLOW]: ["0x977FDf70abeD6b60eECcee85322beA4575B0b6Ed", 168340950],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x294D7fceBa43C4507771707CeBBB7b6d81d0BFdE",
  }),
  get(chains.mainnet.id, {
    [manifest.SABLIER_FLOW]: ["0x7a86d3e6894f9c5b5f25ffbdaae658cfc7569623", 23507359],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x24bE13897eE1F83367661B6bA616a72523fC55C9",
  }),
  get(chains.mode.id, {
    [manifest.SABLIER_FLOW]: ["0xbed2f163cc0aa3278261ef1c3fa51b98db270829", 29724479],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xD9E2822a33606741BeDbA31614E68A745e430102",
  }),
  get(chains.morph.id, {
    [manifest.SABLIER_FLOW]: ["0xbf407836021c993dfa27cb8232415d15faea709a", 17522576],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x1dd4dcE2BB742908b4062E583d9c035973413A3F",
  }),
  get(chains.optimism.id, {
    [manifest.SABLIER_FLOW]: ["0xd18491649440d6338532f260761cee64e79d7bb2", 142008894],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x7AD245b74bBC1B71Da1713D53238931F791b90A3",
  }),
  get(chains.polygon.id, {
    [manifest.SABLIER_FLOW]: ["0x62b6d5a3ac0cc91ecebd019d1c70fe955d8c7426", 77265843],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x87B836a9e26673feB3E409A0da2EAf99C79f26C3",
  }),
  get(chains.scroll.id, {
    [manifest.SABLIER_FLOW]: ["0xc3e92b9714ed01b51fdc29bb88b17af5cddd2c22", 22568050],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x797Fe78c41d9cbE81BBEA2f420101be5e47d2aFf",
  }),
  get(chains.sei.id, {
    [manifest.SABLIER_FLOW]: ["0x9eaf5a3f23964148a1321078f9cce4c2325c603e", 171667597],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xF3D18b06c87735a58DAb3baC45af058b3772fD54",
  }),
  get(chains.sonic.id, {
    [manifest.SABLIER_FLOW]: ["0x3954146884425accb86a6476dad69ec3591838cd", 49351959],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xAab30e5CB903f67F109aFc7102ac8ED803681EA5",
  }),
  get(chains.superseed.id, {
    [manifest.SABLIER_FLOW]: ["0xe91bbae6c7d67b7c5055de1c9635c17af056211b", 16718519],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xd932fDA016eE9d9F70f745544b4F56715b1E723b",
  }),
  get(chains.unichain.id, {
    [manifest.SABLIER_FLOW]: ["0x170ecc032c96aa976fa702e94fbc9fa5bb64ee7c", 28868371],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x89824A7e48dcf6B7AE9DeE6E566f62A5aDF037F2",
  }),
  get(chains.xdc.id, {
    [manifest.SABLIER_FLOW]: ["0x3F00b8334EBE2A85875D1F8b50a43a12db67ACAD", 94421891],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x9D3F0122b260D2218ecf681c416495882003deDd",
  }),
  get(chains.zksync.id, {
    [manifest.SABLIER_FLOW]: ["0xa7f02e692973b6315eaca7fb4285ad2536a89cd0", 65054681],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x423C1b454250992Ede8516D36DE456F609714B53",
  }),
];

/**
 * @description Testnet deployments for Flow v2.0
 */
export const testnets: Sablier.Deployment[] = [
  get(chains.arbitrumSepolia.id, {
    [manifest.SABLIER_FLOW]: ["0x73a474c9995b659bc4736486f25501e0a4a671ed", 201220855],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x3E64A31C3974b6ae9f09a8fbc784519bF551e795",
  }),
  get(chains.baseSepolia.id, {
    [manifest.SABLIER_FLOW]: ["0x19e99dcdbaf2fbf43c60cfd026d571860da29d43", 31923790],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xcb5591F6d0e0fFC03037ef7b006D1361C6D33D25",
  }),
  get(chains.modeTestnet.id, {
    [manifest.SABLIER_FLOW]: ["0xed1bde07c0af4a2b27301555af0ac26ab1b727a8", 35875839],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xe1eDdA64eea2173a015A3738171C3a1C263324C7",
  }),
  get(chains.optimismSepolia.id, {
    [manifest.SABLIER_FLOW]: ["0x4cc7b50b0856c607edee0b6547221360e82e768c", 33906679],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x4739327acfb56E90177d44Cb0845e759276BCA88",
  }),
  get(chains.sepolia.id, {
    [manifest.SABLIER_FLOW]: ["0xde489096eC9C718358c52a8BBe4ffD74857356e9", 9343957],
    [manifest.FLOW_NFT_DESCRIPTOR]: ["0xc9dBf2D207D178875b698e5f7493ce2d8BA88994", 7583391],
  }),
];
