import { chains } from "@/src/evm/chains/index.js";
import { Protocol } from "@/src/evm/enums.js";
import { resolvers } from "@/src/evm/releases/resolvers.js";
import type { Sablier } from "@/src/types.js";
import aliases from "./aliases.js";
import manifest from "./manifest.js";

function get(chainId: number, contractMap: Sablier.EVM.ContractMap): Sablier.EVM.Deployment {
  return resolvers.deployment.standard({
    aliasMap: aliases,
    chainId,
    contractMap,
    protocol: Protocol.Flow,
    version: "v3.0",
  });
}

/**
 * @description Mainnet deployments for Flow v3.0
 */
export const mainnets: Sablier.EVM.Deployment[] = [
  get(chains.abstract.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x6CefdBc5Ba80937235F012c83d6aA83F1200d6cC",
    [manifest.SABLIER_FLOW]: ["0x2fac86e709bac0d970c0e103d3b9580d2df4be5d", 46_400_365],
  }),
  get(chains.arbitrum.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x5F23eF12A7e861CB92c24B4314Af2A5F363CDD4F",
    [manifest.SABLIER_FLOW]: ["0xa70b8555157500b11f41a37dd93f4b4e997d583d", 442_729_583],
  }),
  get(chains.avalanche.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xb09b714B0feC83675E09fc997B7D532cF6620326",
    [manifest.SABLIER_FLOW]: ["0x980878b890e755c788bce5db7725bcc6df76bf5b", 80_577_875],
  }),
  get(chains.base.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x5b5e742305Be3A484EacCB124C83456463c24E6a",
    [manifest.SABLIER_FLOW]: ["0x0cbfe6ce6f05c47d6243bb3818837971c6ccb46b", 43_479_933],
  }),
  get(chains.berachain.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x581250eE4311F7Dc1afCF965cF8024004B423e9E",
    [manifest.SABLIER_FLOW]: ["0x1794f514d7c1d771055ffd2a880148f619107945", 18_367_280],
  }),
  get(chains.bsc.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xAE557c04B46d47Ecac24edA63F22cabB4571Da61",
    [manifest.SABLIER_FLOW]: ["0xa9b86b045caedb791af729f6c15435b978c34f7f", 87_114_895],
  }),
  get(chains.chiliz.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xC7fd18CA19938d559dC45aDE362a850015CF0bd8",
    [manifest.SABLIER_FLOW]: ["0x4d3cecb8eeddd5e69c201017e884ae5e8338474f", 32_333_859],
  }),
  get(chains.mainnet.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x24bE13897eE1F83367661B6bA616a72523fC55C9",
    [manifest.SABLIER_FLOW]: ["0x844344cd871b28221d725ece9630e8bde4e3a181", 24_677_127],
  }),
  get(chains.gnosis.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x5A47FC8732d399a2f3845c4FC91aB91bb97da31F",
    [manifest.SABLIER_FLOW]: ["0xb3a9a358794b101962a3741ef882b367e9e56c72", 45_195_522],
  }),
  get(chains.hyperevm.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x91B9B0e3be6EeE0556f1cf5bCba2f2673AA28dFE",
    [manifest.SABLIER_FLOW]: ["0x70ce7795896c1e226C71360F9d77B743d8302182", 30_004_514],
  }),
  get(chains.lightlink.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xc58E948Cb0a010105467C92856bcd4842B759fb1",
    [manifest.SABLIER_FLOW]: ["0x95f0d947befaecafa8b1e89bbada723d81783d4b", 196_375_557],
  }),
  get(chains.linea.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x294D7fceBa43C4507771707CeBBB7b6d81d0BFdE",
    [manifest.SABLIER_FLOW]: ["0x7a92392b7c35610a861f82c42043e6705979369c", 29_763_278],
  }),
  get(chains.mode.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xD9E2822a33606741BeDbA31614E68A745e430102",
    [manifest.SABLIER_FLOW]: ["0x5a51fd153874429f4cad36cc54560beffeead6df", 36_791_010],
  }),
  get(chains.monad.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xf51BB8bd1cfc7C890dB68c39dCCA67CAd7810Ce4",
    [manifest.SABLIER_FLOW]: ["0x95004df5abe86a246664d8f5fb2683f24df768d1", 62_021_792],
  }),
  get(chains.morph.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x1dd4dcE2BB742908b4062E583d9c035973413A3F",
    [manifest.SABLIER_FLOW]: ["0x5ba4cc0a1014faf0967624f3f1c3d63b9ffeb287", 21_502_779],
  }),
  get(chains.optimism.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x7AD245b74bBC1B71Da1713D53238931F791b90A3",
    [manifest.SABLIER_FLOW]: ["0xe8a69dabae3003df4cb0901389766c4b2d34c2eb", 149_075_438],
  }),
  get(chains.polygon.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x87B836a9e26673feB3E409A0da2EAf99C79f26C3",
    [manifest.SABLIER_FLOW]: ["0x20080f7e2d58b5cfc4e6d997c841999e3416843c", 84_314_843],
  }),
  get(chains.scroll.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x797Fe78c41d9cbE81BBEA2f420101be5e47d2aFf",
    [manifest.SABLIER_FLOW]: ["0xd3dec781af1f5ccb828f97d3e5deb86f6efc5e5a", 32_068_904],
  }),
  get(chains.sonic.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xAab30e5CB903f67F109aFc7102ac8ED803681EA5",
    [manifest.SABLIER_FLOW]: ["0x1598ed7ffb006a4e233268e7846faa9e17ac9c16", 65_560_367],
  }),
  get(chains.superseed.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xd932fDA016eE9d9F70f745544b4F56715b1E723b",
    [manifest.SABLIER_FLOW]: ["0xa80de83ea03335396161bb267e1250fb5cc99cdf", 23_785_112],
  }),
  get(chains.unichain.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x89824A7e48dcf6B7AE9DeE6E566f62A5aDF037F2",
    [manifest.SABLIER_FLOW]: ["0x12a6a5f809d451d29e4c1a6bca31b88c914100ac", 43_001_569],
  }),
  get(chains.xdc.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x9D3F0122b260D2218ecf681c416495882003deDd",
    [manifest.SABLIER_FLOW]: ["0x2a89ddeafebf51cb8517da2d00df2365bf3ef49e", 100_412_971],
  }),
  get(chains.zksync.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x423C1b454250992Ede8516D36DE456F609714B53",
    [manifest.SABLIER_FLOW]: ["0xa1b75ac1e36504c93279c69c2583ff0c73eb036b", 69_118_542],
  }),
];

/**
 * @description Testnet deployments for Flow v3.0
 */
export const testnets: Sablier.EVM.Deployment[] = [
  get(chains.arbitrumSepolia.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x3E64A31C3974b6ae9f09a8fbc784519bF551e795",
    [manifest.SABLIER_FLOW]: ["0x2c81c86a66c9459f461eb0c49963b9539eca87ef", 250_923_525],
  }),
  get(chains.baseSepolia.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xcb5591F6d0e0fFC03037ef7b006D1361C6D33D25",
    [manifest.SABLIER_FLOW]: ["0xc1ba5a41936aaab0ff920446db556efe17fc1c5d", 38_990_480],
  }),

  get(chains.optimismSepolia.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x4739327acfb56E90177d44Cb0845e759276BCA88",
    [manifest.SABLIER_FLOW]: ["0xf1c1411b446bd630791de95b6a503871f7bbac5f", 40_973_572],
  }),
  get(chains.sepolia.id, {
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xc9dBf2D207D178875b698e5f7493ce2d8BA88994",
    [manifest.SABLIER_FLOW]: ["0xbd9326f6366c95e39bd8ef825c1b2f2ee0dceaa1", 10_463_693],
  }),
];
