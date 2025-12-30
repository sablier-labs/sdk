import { chains } from "@src/evm/chains";
import { Protocol } from "@src/evm/enums";
import { resolvers } from "@src/evm/releases/resolvers";
import type { Sablier } from "@src/types";
import aliases from "./aliases";
import manifest from "./manifest";

function get(chainId: number, contractMap: Sablier.EVM.ContractMap): Sablier.EVM.Deployment {
  return resolvers.deployment.standard({
    aliasMap: aliases,
    chainId,
    contractMap,
    protocol: Protocol.Airdrops,
    version: "v2.0",
  });
}

/**
 * @description Mainnet deployments for Airdrops v2.0
 */
export const mainnets: Sablier.EVM.Deployment[] = [
  get(chains.abstract.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x15C9d45FB210B11cF5fD16C35ed3C31D7ca475Cb",
      20333279,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0x9cD6c1Df185CFBa590AFcEEBe9fCFE8d273c9187", 20333327],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x5f3A9E8e6979e9edC5738983D909617d4f2db882", 20333415],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0xAD49814f588085f5DE4fE5a210cA82054D0Ba693", 20333417],
  }),
  get(chains.arbitrum.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x4273c32a668ee9d8b24c4d774635134c72974077",
      384587456,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0xf8224aa806510041aeab338d1667b152ed549983", 384587460],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x011c08d385c3df8d5da4edf804b4cf8b9f4a0187", 384587464],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0x199de153773ac81494978d7b313e7402d2fa2425",
      384587468,
    ],
  }),
  get(chains.avalanche.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x25df49158cd5d9fc9def1dae57cf891310d6bfa0",
      69539847,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0x21617a5835b77fa06669402d1b60b26179c5dfc3", 69539847],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x3d4da59b6ac3ad42840ecc3ae1988d3045f6f178", 69539848],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0x4489610db7937acdb975528f692011d324195763", 69539848],
  }),
  get(chains.base.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x4b2aa7e2a47b5cfd67a4943de2952d0f4ca683cd",
      36223040,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0xc89936e84375b80d3ec435020b3ee07c84dc49e1", 36223040],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0xd97e6e03693c817e583a5046bc22d457ec503d46", 36223040],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0xb1f20bbe05463e9a5de67d9ff8a0107aa3c9e143", 36223040],
  }),
  get(chains.berachain.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0xc4ca662dce3a32ee3b592c0af35013d5ff8d6738",
      11163598,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0xa7ffc4c7b7a333519a5b1f16617316e3545f535d", 11163598],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x6b108108b7a2fdf95743d7959e9bbc665aea24ad", 11163598],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0x1ed18ffff2e36d0198053c1b9ceb8ec1806b0e0b", 11163598],
  }),
  get(chains.blast.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0xc880032820f62d3fbc48bc56890ee774c3741b69",
      25213122,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0x51ab2f957e353b96ac631da75941cd18ce57900a", 25213122],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x8cd6cd223305ddb28432ce0f6bb129561a7e46af", 25213123],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0xa6e02ee60c7b7ee3e1806914f99f53551b3c9789", 25213123],
  }),
  get(chains.bsc.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0xd3195b706056349e8b371150220bf95cc6fb098b",
      62982924,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0xe58e61ec19938c02055ef386873901bef08f23ff", 62982924],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x61b571ad105240bca4dc3a757e9b62ef2390179f", 62982924],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0xfa1bf34fcacf54c5d11733dd487b3484dff07abc", 62982924],
  }),
  get(chains.chiliz.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x197d5bad8e769ddba86ed4adcc2f467b82364874",
      27498599,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0x11aa6b13a7a96b38a067aed21e2a01a9e99604ca", 27498599],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x8ccf1c388c3f679623effe54422ca09c2687220d", 27498599],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0x166D9de7685c3a78fecBF1fb2e20D32DB6c206aB", 27498561],
  }),
  get(chains.coreDao.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0xcd7606fddbf113f7d35081950a65abd6ad2f7d84",
      28645207,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0x8716b9de62dbc08e5cb56b912dbfd6fd0c9d45a8", 28645207],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0xc31c3f1735155451a36d88e0aaeaa3d7c1065a32", 28645207],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0xa06b797ffa2652f7411e256d3e9d3fc44874db47", 28645207],
  }),
  // This is not the actual start block. The Denergy custom Graph node does not index events before the block 710000.
  get(chains.denergy.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x63b92f7e2f69877184c955e63b9d8dff55e52e14",
      710000,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0x28d116d7e917756310986c4207ea54183fcba06a", 710000],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x5e73bb96493c10919204045fcdb639d35ad859f8", 710000],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0x6d64fc0bb0291c6a4f416ec1c379815c06967eaf", 710000],
  }),
  get(chains.gnosis.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0xcd307b7ceb5a73c6d3c247d9aafc61851a6bedaf",
      42386251,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0xfd95edeac8979492813de5d2a968cded164cd2ee", 42386251],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x70a4c689894d834b48f1aa85b8b847be7143b581", 42386251],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0x96dd74883b920fd098893e4254d9fe119f35a662", 42386251],
  }),
  get(chains.hyperevm.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x17ccf6a73047eb6e477feb1d3bdac727425392a6",
      15236266,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0xfbe39a52d26025d0fdde694b8cd16d0585022f8e", 15236266],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x936f86ba4ea97ebcb0659eac0885afc44b7baef1", 15236266],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0xb229842fcf90dcb5d9832fd9401ee191e6ad355a", 15236266],
  }),
  get(chains.lightlink.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0xb677dBC0d05b2d51C9A4c333d5d41e46ea3C9787",
      167599942,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0xbE6A1337228AD28ccfAb97b2Ce52fCb7DEa48f5F", 167599942],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x52b40612E91A21CE6a55314520a9A4174Aa512D3", 167601559],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0x6437ECad55D68BB4B3b53a9A330D6cd7Fa8e687c",
      167601559,
    ],
  }),
  get(chains.linea.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0xbc378d190647154e8b193505a5e575e28c132fe6",
      23987894,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0x224f6e6a1b71012428e93b666472b9052d7fda63", 23987894],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x5229beabd7d669e1142f989e78c09a7d716cb927", 23987894],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0xa911c0f815d2d80fa6b4cdb81ebd252e308b80f8", 23987894],
  }),
  get(chains.mainnet.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x7f70ba7c7373baa4047ce450168cd24968321bda",
      23478565,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0x0781ad660a5ed0041b45d44d45009a163cc0b578", 23478565],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x336d464276e2c7c76927d975ef866df8a7ecf8dd", 23478566],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0x91fdbd7077d615f951a0defa81ec30bfd68dbd8d", 23478566],
  }),
  get(chains.mode.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0xc36ffed30c17f7b044975baee75ed41090df9d20",
      29539361,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0xe7d5af3d04d55f1b1b7d71fcd8283f07c3553f61", 29539361],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x90f20c6a71775cb4e5a4f59ad0086e28b42b8c39", 29539361],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0x0787a601b523138513368fa725209773c69d41d5", 29539361],
  }),
  get(chains.monad.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0xaB15e653cD3bBCe7B7412f81056a450BC0f2e7B9",
      34590049,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0x7DcAB43465c1EbDA92133c92262a6c55394dD69e", 34590049],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0xfA2Bf3EDdEfE67631BfFA5C53b621A9C6BEbc9C3", 34590049],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0xCdCc46A7759dE01271E533BBC3b0F32899545a76", 34715834],
  }),
  get(chains.morph.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x39CBF38BDa1A629fcb17949cD7F8b2de2Bf6686b",
      17414372,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0xbae3528d0f1963e0ca55f8816cc7174ea3da016f", 17417218],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x36e6ac1d0bef5414855c62513be9723173526094", 17417218],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0xf93b0dfa6770b6a989203395dd20560d68b09d3d", 17417218],
  }),
  get(chains.optimism.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x2e0d590a0e48da5078c2a51d9638c6260a99915e",
      141829590,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0x3f46f5d034af96248a59cd1319bf51b048938af0", 141829590],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x564631122bb104721629a64c5b32cb6e3e32e75d", 141829590],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0xaadd56cf2e781476fe49a8b36aeda84097b8f957",
      141829590,
    ],
  }),
  get(chains.polygon.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x77efc83efdfc4fa4a0d9e6a535c2efe00bdaff62",
      77100975,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0x75cb79d603ba5ef927639aeb5b20690516e2cd08", 77100976],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x1bb7e55cdb042d0ee2a074393eab66b8e04abd33", 77100976],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0x8b7e26c9a2dc8f24261ad7c103ba2cc524c8c21d", 77100976],
  }),
  get(chains.scroll.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x29593be78eb8c0885a2ebcba4752574e48716eb4",
      22280785,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0xec5a923f0dc3cc0df5e2032e97c830ccff063447", 22280785],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x9a666e9781c487fe628fff297cdd100517aaacfa", 22280785],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0x71c17ef6bd5fd2e0cc1734ec207fb0a2858e78c8", 22280786],
  }),
  get(chains.sei.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0xaea21609d62d58c8775d59ed584338b24bbc6eb2",
      170944331,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0x37720179ff6b3795607f113789cd78415beda80e", 170944332],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x020bc6160fcaf7ebc75844d4d8f7a3b6095aac0f", 170944333],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0x43da38c9a7fafe822465e023a75b85cf012b3f7a",
      170944334,
    ],
  }),
  get(chains.sonic.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0xc310f89972a576c3ec510c9a3265dea01a2fecdb",
      48898081,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0x829ad061e203361f5333787ee99e9f5e403fc627", 48898081],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x01e368a15bfb058968fe617c9e5dc403b45f75e0", 48898083],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0xd3c8f98e6f9cac5aebd5d653e2331c1e6fdc16a9", 48898083],
  }),
  get(chains.superseed.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x9f91de05cceb13b3fbe764bdcdd1659e447d3f63",
      16543797,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0x1e83629989a3340f68d76dd770f271b06cb38e15", 16543797],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x84328296e172146f2c58097d12f7049d0e5c28c1", 16543797],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0x38b33ab1c8697edfe68d177d50908bad9d66c2f7", 16543797],
  }),
  get(chains.unichain.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x2f87acb56a7b1bf6ec76ac62c3880d87af025172",
      28491280,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0x1e2cc73bed5d4225b46fdaccc4e3b7aa07fb1016", 28491280],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0xf6456cd10d3b27120d637f391743de960d819abb", 28491280],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0x994ed981a908f6c8c6dc86fb56fede1444f38759", 28491280],
  }),
  get(chains.xdc.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x0543a1aa6abf1b5b69bfd159ebb4bcaaa7b27aa7",
      94261051,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0x670b50259d979854c15494476938dec79c85ba29", 94261051],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x075202c1224457d46d25cb481325a0218197682b", 94261051],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0x49e616b0123fd05d70355c472266c647a099936e", 94261051],
  }),
  get(chains.zksync.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x27e0076b5be25d604e201bb602d7713dcf267a30",
      64987387,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0x2c62a3a177101ce56b3de95b11d686973956e7f0", 64987389],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x38be7df6bd31cd0f74bb9089751620102e776976", 64987391],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0xe2b3edb3b49bf65ec7d48322d1c24dee2d27c9b1", 64987392],
  }),
];

/**
 * @description Testnet deployments for Airdrops v2.0
 */
export const testnets: Sablier.EVM.Deployment[] = [
  get(chains.arbitrumSepolia.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0xea37da106ce1ad0264b20764824baca76bb88bd0",
      199683214,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0xaaaf38c81fec5dc0b32c4b53f3aab31f37d76046", 199683218],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x02ab5777c9a91b2d29e215ad2b7a49332755af8f", 199683222],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0x686f70dfc05a52f2842b4a7f7963b3fa0f8f9a40",
      199683225,
    ],
  }),
  get(chains.baseSepolia.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0xb04a60866516e335471b801a65812c1eb02fcc75",
      31731891,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0x1ea20273d24aa570074f390b9f9666e8c775afff", 31731891],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x04de506964b7ca8f4031bbd7f34376eb8c714764", 31731891],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0x9a4acab21921c0e874095aeec9d49ce15a452bfc", 31731891],
  }),
  get(chains.modeTestnet.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x05a666850b88a9b2f02ed851fee9a7ffc013deec",
      35682183,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0xb2217bda352d15c7c1972b6419f37b408b770aba", 35682183],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x2c88ce3d64d8f51834ffa81f092558c7e52874c0", 35682183],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0x134243bdfac6547f3cda2ccb7a5f2fdc1e390ba0", 35682183],
  }),
  get(chains.optimismSepolia.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x15917930cc30093823790c9d1f83d550c0de33d3",
      33715307,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0x5796005a94e119ff282a2783dc46eaf543e498cd", 33715308],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x4894387bec155e73fa0b7673c11bc7074949f2a1", 33715308],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0xd3d12e4281f56fc3f97b9373d7085e694a2ec438", 33715308],
  }),
  get(chains.sepolia.id, {
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x3633462151339dea950cBED2fd4d132Bd942b64b",
      9311858,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0x24e7707BdE221D711CbA180385cd419A43E87c5A", 9311858],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x4b1764eD795948273D3D7360D885DDEB9CF48Fc6", 9311858],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0x960b2fdfaf112edc66da793db96b0dc732d91483", 9311858],
  }),
];
