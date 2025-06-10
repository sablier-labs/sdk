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
    protocol: Protocol.Airdrops,
    version: "v1.3",
  });
}

/**
 * @description Mainnet deployments for Airdrops v1.3
 */
export const mainnets: Sablier.Deployment[] = [
  get(chains.abstract.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0x0C72b957347B51285854f015e4D20641655B939A", 332_977],
  }),
  get(chains.arbitrum.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0x7efd170e3e32Dc1b4c17eb4cFFf92c81FF43a6cb", 299_968_163],
  }),
  get(chains.avalanche.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0x6bCD2260825CFed440Bb765f7A92f6CDBDc90f43", 564_499_33],
  }),
  get(chains.base.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0xD9e108f26fe104CE1058D48070438deDB3aD826A", 256_153_47],
  }),
  get(chains.berachain.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0x7868Af143cc5e6Cd03f9B4f5cdD2832695A85d6B", 780_306],
  }),
  get(chains.blast.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0xDd40b4F5B216F524a55E2e8F75637E8b453E4bd2", 146_051_20],
  }),
  get(chains.bsc.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0xf9f89d99fb702b06fba16a294b7614089defe068", 461_462_55],
  }),
  get(chains.chiliz.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0xf978034bb3CAB5fe88d23DB5Cb38D510485DaB90", 20_432_619],
  }),
  get(chains.ethereum.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0x71DD3Ca88E7564416E5C2E350090C12Bf8F6144a", 217_192_43],
  }),
  get(chains.form.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0xA9264Ef7cB1516cc27FCD5149A2909Ace885Ffb6", 3_359_651],
  }),
  get(chains.iotex.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0xf08548b1a6DB590FEC6f1B95e6B41d17791767C2", 34_468_349],
  }),
  get(chains.gnosis.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0x64ba580946985B4b87f4D9f7b6598C2156026775", 382_621_99],
  }),
  get(chains.lightlink.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0xC0107f368FBB50075d2190549055d9E6bf75c5c9", 125_554_946],
  }),
  get(chains.linea.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0xAa122611E0e3a0771127aA4cd4995A896BB2c20B", 151_222_91],
  }),
  get(chains.mode.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0xc472391DB89e7BE07170f18c4fdb010242507F2C", 18_926_259],
  }),
  get(chains.morph.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0xBE64e8718D82C598EBCDA5149D10eB68b79632a4", 4_040_364],
  }),
  get(chains.optimism.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0x2455bff7a71E6e441b2d0B1b1e480fe36EbF6D1E", 131_210_682],
  }),
  get(chains.polygon.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0xf0d61b42311C810dfdE191D58427d81E87c5d5F6", 672_256_65],
  }),
  get(chains.scroll.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0x6dF0bfFDb106b19d1e954853f4d14003E21B7854", 130_158_21],
  }),
  get(chains.sei.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0x0171A06878F7ff81c9955DEB5641f64f520d45E5", 138_904_383],
  }),
  get(chains.sophon.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0x9D4923e2ff0b9DAdc447A89f528760928f84D0F7", 11_290_094],
  }),
  get(chains.superseed.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0x3df48bb93509D9a041C81F6670C37B1eEb3E154B", 799_582],
  }),
  get(chains.taiko.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0x39D4D8C60D3596B75bc09863605BBB4dcE8243F1", 39_064],
  }),
  get(chains.tangle.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0xd641a0E4509Cced67cC24E7BDcDe2a31b7F7cF77", 4_004_609],
  }),
  get(chains.unichain.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0xC6fC028E988D158C52Aa2e38CDd6f969AA14bdCd", 138_851_93],
  }),
  get(chains.xdc.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0xe41909f5623c3b78219D9a2Bb92bE95AEe5bbC30", 852_264_52],
  }),
  get(chains.zksync.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0x8E7E78799F8cC87d4816112A758281dabc158452", 547_559_83],
  }),
];

/**
 * @description Testnet deployments for Airdrops v1.3.0
 */
export const testnets: Sablier.Deployment[] = [
  get(chains.arbitrumSepolia.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0x465E9218C1A8d36169e0c40C01b856A83CE44153", 118_530_219],
  }),
  get(chains.baseSepolia.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0x6a3466398A66c7Ce801989B45C390cdC8717102D", 21_167_425],
  }),
  get(chains.ethereumSepolia.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0xf642751d1271c88bBb8786067de808B32a016Fd4", 7_596_143],
  }),
  get(chains.lineaSepolia.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0x5ADE5DF4FB42e353223DFF677cbfec812c6C4Da7", 86_299_28],
  }),
  get(chains.modeTestnet.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0x659836D788cce324Ad8c445584b9c44c6a8c74b7", 25_076_216],
  }),
  get(chains.monadTestnet.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0x99846E1379fEBC91FCeC641097f8191b51ef0d34", 5_051_824],
  }),
  get(chains.optimismSepolia.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0x2934A7aDDC3000D1625eD1E8D21C070a89073702", 23_108_917],
  }),
  get(chains.superseedSepolia.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0xb5951501D416cb7326e5b9bEB6EF8840a8DF6910", 13_546_515],
  }),
  get(chains.taikoHekla.id, {
    [manifest.SABLIER_MERKLE_FACTORY]: ["0xB5F4FB527568f88F8898Ce5F366f4d72e2C742BE", 1_156_070],
  }),
];
