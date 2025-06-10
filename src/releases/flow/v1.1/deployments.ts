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
    version: "v1.1",
  });
}

/**
 * @description Mainnet deployments for Flow v1.1
 */
export const mainnets: Sablier.Deployment[] = [
  get(chains.abstract.id, {
    [manifest.SABLIER_FLOW]: ["0x555B0766f494c641bb522086da4E728AC08c1420", 281_608],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x6CefdBc5Ba80937235F012c83d6aA83F1200d6cC",
  }),
  get(chains.arbitrum.id, {
    [manifest.SABLIER_FLOW]: ["0x87CF87ec5de33DeB4a88787065373563Ba85Ee72", 299_902_462],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x5F23eF12A7e861CB92c24B4314Af2A5F363CDD4F",
  }),
  get(chains.avalanche.id, {
    [manifest.SABLIER_FLOW]: ["0xac7CB985d4022A5Ebd4a385374ac3d3B487b3C63", 56_440_631],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xb09b714B0feC83675E09fc997B7D532cF6620326",
  }),
  get(chains.base.id, {
    [manifest.SABLIER_FLOW]: ["0x6FE93c7f6cd1DC394e71591E3c42715Be7180A6A", 25_607_016],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x5b5e742305Be3A484EacCB124C83456463c24E6a",
  }),
  get(chains.berachain.id, {
    [manifest.SABLIER_FLOW]: ["0xA031544946ED769377128fBD961c9d621c4b4179", 780_382],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x581250eE4311F7Dc1afCF965cF8024004B423e9E",
  }),
  get(chains.blast.id, {
    [manifest.SABLIER_FLOW]: ["0x16b50eb5eAeF0366f1A4da594e2A8c8943A297e0", 14_596_787],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x92f1dB592C771D9Ec7708abFEe79771AbC1b4fAd",
  }),
  get(chains.bsc.id, {
    [manifest.SABLIER_FLOW]: ["0x4C4610aF3f3861EC99b6F6F8066C03E4C3a0E023", 46_140_698],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xAE557c04B46d47Ecac24edA63F22cabB4571Da61",
  }),
  get(chains.chiliz.id, {
    [manifest.SABLIER_FLOW]: ["0x28eAB88ee8a951F78e1028557D0C3fD97af61A33", 20_430_455],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xC7fd18CA19938d559dC45aDE362a850015CF0bd8",
  }),
  get(chains.coreDao.id, {
    [manifest.SABLIER_FLOW]: ["0xa0aE7F1bE0DB024Beda05c80722413EDDe7231Bd", 21_570_971],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x7293F2D4A4e676EF67C085E92277AdF560AECb88",
  }),
  get(chains.ethereum.id, {
    [manifest.SABLIER_FLOW]: ["0x3DF2AAEdE81D2F6b261F79047517713B8E844E04", 21_718_688],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x24bE13897eE1F83367661B6bA616a72523fC55C9",
  }),
  get(chains.form.id, {
    [manifest.SABLIER_FLOW]: ["0x5dd399bb320412dF92Df5c10484d3F8d481FE231", 3_359_543],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x88E64227D4DcF8De1141bb0807A9DC04a5Be9251",
  }),
  get(chains.gnosis.id, {
    [manifest.SABLIER_FLOW]: ["0x34Bc0C2BF1F2DA51c65cd821bA4133aFCacdb8f5", 38_258_920],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x5A47FC8732d399a2f3845c4FC91aB91bb97da31F",
  }),
  get(chains.iotex.id, {
    [manifest.SABLIER_FLOW]: ["0xCD8871a22640C57ba36984Fb57E9c794f5Df7F40", 34_453_553],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x91D7B990B1aCDfB2F38189c646371377416c641E",
  }),
  get(chains.lightlink.id, {
    [manifest.SABLIER_FLOW]: ["0x89d964E0b508234bCfDc7a32aE0aA0356f422B70", 125_538_058],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xc58E948Cb0a010105467C92856bcd4842B759fb1",
  }),
  get(chains.linea.id, {
    [manifest.SABLIER_FLOW]: ["0xEFc6e4C7DC5faA0CfBFEbB5e04eA7Cd47f64012f", 15_120_566],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x294D7fceBa43C4507771707CeBBB7b6d81d0BFdE",
  }),
  get(chains.mode.id, {
    [manifest.SABLIER_FLOW]: ["0xc968E8eEFe19BD6De8868df40D9740Be127a172a", 18_917_939],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xD9E2822a33606741BeDbA31614E68A745e430102",
  }),
  get(chains.morph.id, {
    [manifest.SABLIER_FLOW]: ["0xf31c8E7D9a0Bd310a9d5Fb317ba67BB1f0101c6D", 40_330_21],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x1dd4dcE2BB742908b4062E583d9c035973413A3F",
  }),
  get(chains.optimism.id, {
    [manifest.SABLIER_FLOW]: ["0xC5612feA2D370127ac67048115bd6b1dF7b7F7C0", 131_202_347],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x7AD245b74bBC1B71Da1713D53238931F791b90A3",
  }),
  get(chains.polygon.id, {
    [manifest.SABLIER_FLOW]: ["0x3e5c4130Ea7cfbD364FA5f170289d697865cA94b", 67_217_839],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x87B836a9e26673feB3E409A0da2EAf99C79f26C3",
  }),
  get(chains.scroll.id, {
    [manifest.SABLIER_FLOW]: ["0xC4F104cE12cb12484Ff67cF0C4Bd0561F0014ec2", 13_011_209],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x797Fe78c41d9cbE81BBEA2f420101be5e47d2aFf",
  }),
  get(chains.sei.id, {
    [manifest.SABLIER_FLOW]: ["0xdEF70082ebda4944A55311624900E42A720b4Ec9", 138_911_958],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xF3D18b06c87735a58DAb3baC45af058b3772fD54",
  }),
  get(chains.sophon.id, {
    [manifest.SABLIER_FLOW]: ["0x20C9A3E27322Fc2b21Ced430D1B2e12d90804db6", 11_341_394],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x2F1eB117A87217E8bE9AA96795F69c9e380686Db",
  }),
  get(chains.superseed.id, {
    [manifest.SABLIER_FLOW]: ["0x40E75bb2F2aA3507D3a332872829c71be19eF623", 5_911_913],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xd932fDA016eE9d9F70f745544b4F56715b1E723b",
  }),
  get(chains.taiko.id, {
    [manifest.SABLIER_FLOW]: ["0x9d4bc7f013cCddAE1658dc28F981C2D424d7F0Dd", 799_142],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x80Bde7C505eFE9960b673567CB25Cd8af85552BE",
  }),
  get(chains.tangle.id, {
    [manifest.SABLIER_FLOW]: ["0xcb099EfC90e88690e287259410B9AE63e1658CC6", 3_996_271],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xDf578C2c70A86945999c65961417057363530a1c",
  }),
  get(chains.unichain.id, {
    [manifest.SABLIER_FLOW]: ["0x9797B40340be0bFc9EC0dBb8712627Bcdd17E771", 13_883_575],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x89824A7e48dcf6B7AE9DeE6E566f62A5aDF037F2",
  }),
  get(chains.xdc.id, {
    [manifest.SABLIER_FLOW]: ["0xD6482334242862951dA3E730F818c3f6E3f45A30", 85_226_840],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x9D3F0122b260D2218ecf681c416495882003deDd",
  }),
  get(chains.zksync.id, {
    [manifest.SABLIER_FLOW]: ["0xE3747379bF7282e0ab5389A63eA053a5256042df", 54_711_342],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x423C1b454250992Ede8516D36DE456F609714B53",
  }),
];

/**
 * @description Testnet deployments for Flow v1.1
 */
export const testnets: Sablier.Deployment[] = [
  get(chains.arbitrumSepolia.id, {
    [manifest.SABLIER_FLOW]: ["0xF9cbfFAe10010475A2800a5eFC11f4D4780cA48d", 118_469_567],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x3E64A31C3974b6ae9f09a8fbc784519bF551e795",
  }),
  get(chains.baseSepolia.id, {
    [manifest.SABLIER_FLOW]: ["0xFB6B72a5988A7701a9090C56936269241693a9CC", 21_117_359],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xcb5591F6d0e0fFC03037ef7b006D1361C6D33D25",
  }),
  get(chains.blastSepolia.id, {
    [manifest.SABLIER_FLOW]: ["0x027b55FD4b26A78a0463304C63f35e97A35246FD", 16_658_165],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x42Abaf2c1E36624FD0084998A9BeA4a753A93e45",
  }),
  get(chains.ethereumSepolia.id, {
    [manifest.SABLIER_FLOW]: ["0x93FE8f86e881a23e5A2FEB4B160514Fd332576A6", 7_583_391],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xc9dBf2D207D178875b698e5f7493ce2d8BA88994",
  }),
  get(chains.lineaSepolia.id, {
    [manifest.SABLIER_FLOW]: ["0x3D0804610dE1b8DC19B1DDf90C26d5a51ab2B6b6", 8_627_791],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xbd17DFd74078dB49f12101Ca929b5153E924e9C7",
  }),
  get(chains.modeTestnet.id, {
    [manifest.SABLIER_FLOW]: ["0x1063D400953441F1C6d8EF6406e1E6aa5684B82d", 25_067_549],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xe1eDdA64eea2173a015A3738171C3a1C263324C7",
  }),
  get(chains.morphHolesky.id, {
    [manifest.SABLIER_FLOW]: ["0x9efc8663cab0e2d97ad17c9fbfc8392445517e94", 13_919_654],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x3d664b2da905ddd0db931982fd9a759ea950d6e1",
  }),
  get(chains.optimismSepolia.id, {
    [manifest.SABLIER_FLOW]: ["0x77873085a88189c8B82B3a01BcbC294108D02805", 23_100_249],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0x4739327acfb56E90177d44Cb0845e759276BCA88",
  }),
  get(chains.superseedSepolia.id, {
    [manifest.SABLIER_FLOW]: ["0x905756b52efeaf75f6b1bb1bb0fc35eea15ae260", 11_235_331],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xc43fb9fe4477d8e8bf68b9fd3a0163a4cffcbb31",
  }),
  get(chains.taikoHekla.id, {
    [manifest.SABLIER_FLOW]: ["0xb528AF43fFEe6d4B702CF6235d2380e1828eD852", 1_155_593],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xB197D4142b9DBf34979588cf8BF1222Ea3907916",
  }),
  get(chains.zksyncSepolia.id, {
    [manifest.SABLIER_FLOW]: ["0xf499b35e2e932a05ecD6115Aa4DcCeb29aF55E3D", 4_570_709],
    [manifest.FLOW_NFT_DESCRIPTOR]: "0xb3eCE4451825f865479813d42f74a080D2CcC928",
  }),
];
