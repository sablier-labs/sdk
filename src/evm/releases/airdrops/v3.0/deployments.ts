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
    protocol: Protocol.Airdrops,
    version: "v3.0",
  });
}

/**
 * @description Mainnet deployments for Airdrops v3.0
 */
export const mainnets: Sablier.EVM.Deployment[] = [
  get(chains.abstract.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0x8D9C6a53893372E95D61decec80AFD696bb36D4D",
      46_445_317,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x3a310776ABF7741719d2d61d0937004021575469",
      46_445_343,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0xf0340224A37146F59901BD8C5e8632E3519a1E16",
      46_450_148,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0x8B5BC2d3FE5EB515594aCEC7E30E5009dc699Bff",
      46_450_333,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0xEBd2e17C86a6eA828B6FE6e6ce665fF118746Aec",
      46_450_514,
    ],
  }),
  get(chains.arbitrum.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0xb697A544775ddA92216E2B59130DA2896bc15549",
      442_795_440,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0xEdA6c634c556897C1A04779E4C6331591801d266",
      442_795_454,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0x5Fc7d1693E050D63F80fdAE3061206fCa32C0825",
      442_795_477,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0xfF39df1AA44E1C0010ec6843746c1B2795a7Bac5",
      442_795_501,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0x77a8Ac18d4429Cd1Ff19592EC4c9E4037EA16e98",
      442_795_521,
    ],
  }),
  get(chains.avalanche.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0x744cf052c8BB4bb4468D602FBf400FE447398bd3",
      80_591_926,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x97b3AbE13960B05D527938c7D5b75806827A32Dd",
      80_591_926,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0x1bd887156fFBC602F891c3e3099b37a6dFfb2f1d",
      80_591_927,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0x56D3E0A59Cfc9AF1528779f563664eB5e436897e",
      80_591_927,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0xC087410c9d0D1D73326534d551Ab9a43497d336B",
      80_591_927,
    ],
  }),
  get(chains.base.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0xF2b9aa7600f93a40fA42D8639e85BDD634F2a036",
      43_488_120,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0xD5a361519F6c417Cc4bCfcC15501191C816705a6",
      43_488_121,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0x417b374a774D9Ba2F32Dc1D8c0b1BDd90E3538a6",
      43_488_121,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0xE88dff96832454a0F075698d501889A59D4145DA",
      43_488_121,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0xe595d4Df663a63B963edA8DAeE77f31D46B75d4b",
      43_488_121,
    ],
  }),
  get(chains.berachain.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0xe2ffc214d23D745560542AE6BC7C997Ec28b006F",
      18_375_422,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0xf2C3741C4E982Ca4523709Faa2Dff725d3D8f144",
      18_375_422,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0x8c1E55013DA152DBc5401773fc1c488a22Ee8c93",
      18_375_422,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0x244F45342248f8eBe7Dce39510BE427895F6E1d4",
      18_375_422,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0xA399a66D9172ae5D81e7e455CB774018e93eb002",
      18_375_422,
    ],
  }),
  get(chains.bsc.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0x23Ee0Ff8217d27813d47C98257EBc90F1cb55F61",
      87_151_098,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x34187693b957C055da3fF0Af9DcE46E981d55225",
      87_151_099,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0x17AC0d83FF9b9f8A271Bd6f9C36A469089b45e1C",
      87_151_104,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0xB295B2F76268CCE9a9d48875158F0d6457Deb39E",
      87_151_099,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0x6f8DF5B18D4FA0D54cb40d386D6f1a84Bd350359",
      87_151_099,
    ],
  }),
  get(chains.chiliz.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0x9ce2201f7D731cd37ffc7c4Dde522846c68f5b60",
      32_339_261,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x9eB917d6709a0C974a6ddeB82724Fef175c49165",
      32_339_574,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0x5F2874d710a2441586C239e8bD8cF0BBb22b19CA",
      32_339_575,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0xFB600862fdA55A30239c3741762Cc5A9f5bFDa54",
      32_340_675,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0xdAa4E52fa675E8dD6E04437Ba9887462561047bE",
      32_340_688,
    ],
  }),
  get(chains.denergy.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0x075765fE96d9a445C5C792FfA0Ce64A1647f0821",
      3_448_878,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0xf6843cDBA4bd27c59C008f4e5a9572350Ca2BACA",
      3_448_878,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0xa089d1179C09B5E1c07B0a03A2D8eb181E20aA43", 3_448_878],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x80Ffa31C7D1762748366C5E34D932369deB11B54", 3_448_878],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0x17409C2DDFd247F8adC4e1035eF4CDD2F5C5E700",
      3_448_878,
    ],
  }),
  get(chains.gnosis.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0x90D02b8FeB69a127e8137885dFB60f4Cc5e4De0e",
      45_198_670,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0xaef7BFC6B9b8B7e0Bfa6EE994F47ed6b03DfdE60",
      45_198_670,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0x703315dCE1b017199dBb5ae38960c681F9F642dA",
      45_198_670,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0x803cBAB11B9Fd0e252A603523958a81f9b4A582B",
      45_198_671,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0x697c180776FF9B9693363B9fC028B0275CE3d202",
      45_198_671,
    ],
  }),
  get(chains.hyperevm.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0x4757bAabcDD572a9574C6335570DAaeAA847c033",
      30_002_989,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x45C11bbF49eF2C14AD0D5BDfCa80DE55C40523aa",
      30_002_989,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0x89390675C2F197C2C41654dCdDa8bd4ee5a8A1fd",
      30_002_989,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0x360c237DF86F9e6F1F265EFA560d81fbed63ec4f",
      30_002_989,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0x5A7B2AA82C658f03726dF4029b7368932B7C1124",
      30_002_989,
    ],
  }),
  get(chains.lightlink.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0xcbcd885258ab33261bF1c626FC0181739Bfaf32E",
      196_407_601,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x2DD8D43045417324d218f937698F9B7905D73E85",
      196_413_228,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0x2B24f16991D67C8753658664Cd806dbb767DC479",
      196_407_602,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0x199822A2d20D125c41d4c0b7bd4cc92904735e9f",
      196_407_602,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0x28926d9471DD4E4Fdec929CE7027bcF7235eE603",
      196_413_228,
    ],
  }),
  get(chains.linea.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0x1BA93dfacb5D776E42fDeddd7A1174083bA5bf72",
      29_767_712,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0xCd8c670C191eF5cE0bC1B5F11D7c0544cBB11Ccb",
      29_767_713,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0x5E28690AE0b74d9dB25AB95594eF2e3BD9b3A677",
      29_767_714,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0xbC94aBe081BFEDE4c4Fbd5c5Abe50Edca238e35f",
      29_767_714,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0x36f2F0db9100d8a0d42f24eA1e5f572932f96D87",
      29_767_714,
    ],
  }),
  get(chains.mainnet.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0x75ca3677966737E70649336ee8f9be57AC9f74bA",
      24_678_459,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0xb2855845067e126207DE2155Ad1c8AD5C495cb3F",
      24_678_552,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0x3210E9b8ed75f9E2Db00ef17167C775e658c2221",
      24_678_555,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0x239BD5431aDa12F09cA95d0a5d4388A5644268e9",
      24_678_639,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0xe60Df8e04cE1616a06db8AD11ce71c05dDcB5D88",
      24_678_640,
    ],
  }),
  get(chains.mode.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0x454A43a29a9f33F02acCC7F5fFf206d9E74C3892",
      36_799_122,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x9E70fa6d6EC8b63F31F3229a36c5f996A0674D7D",
      36_799_122,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0xFA3Dcb7cA02B5A5F0392Fb7fD56f297969495657",
      36_799_123,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0x56a3221660aa342411AAA2a1D292478021E8716c",
      36_799_123,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0x3cC064358252353068a124013Fa141414a4C0c17",
      36_799_123,
    ],
  }),
  get(chains.monad.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0x44a17c7F546ed6c360CcDc69B87B054801b4B6c8",
      62_054_068,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0xEFaC414CDAB5A042D9443e7916dE02D06d64ecc3",
      62_054_069,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0xBE5Ba6bBFB497433522622Dc99a43346eFFdf53c",
      62_054_069,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0x169579acb65698A56cf358B55a668Ff880E83078",
      62_054_069,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0x5238d6cE52E9c69FC89FEB19F249FE515eDd85b0",
      62_054_069,
    ],
  }),
  get(chains.morph.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0x63Ca542C5A52c3Ad664083AecA74003E1F719CA8",
      21_507_397,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x752A62f7750ddcA07Fc7D7cb42D0652457C36feF",
      21_507_399,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0xc3974B6DFa98AB07Ecf004C42b2bdb4A9617bd39",
      21_507_398,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0xE87ebfFB866c71388F53bDc05C945A88d41Fd628",
      21_507_399,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0xfb180bB0c67554F858A5d0c47b7849103d0F456d",
      21_507_400,
    ],
  }),
  get(chains.optimism.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0xBA25926A37Ea36BcE117DDC9524565B02C7A4232",
      149_083_538,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0xFAb60A7B98D3c2357E99D5B67beD8cE418CEAc32",
      149_083_538,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0x178eCB817585ef37Fa13b91600800053029F1ddd",
      149_083_539,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0x978Ff13F638326E8cE8c1f49e22066d437798630",
      149_083_539,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0x8a1b5A122cc01d2ADDFFD1359a5B1ce82F5Cad8b",
      149_083_539,
    ],
  }),
  get(chains.polygon.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0xc6d9039603320d253526D25Cfa6572bC450D997C",
      84_322_904,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x372a591B311d05dD51749F1c5F8074989a6d831c",
      84_324_133,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0xe6843bB4ED3BdCab6415610bFA82f32e1dd48b31",
      84_322_908,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0x00940E58a0Ca942b5A100820B10758c655bcB78A",
      84_324_133,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0x9577143ad5A95391d78ECeB0C76D836bE7075592",
      84_324_133,
    ],
  }),
  get(chains.scroll.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0xbc77E627b176087c446F15f192D631CB7BEC5381",
      32_083_537,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x536C7e834e746F1365DaF381776d70eC855D1bcD",
      32_083_538,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0xF11DdEBC9BfbA0B803e2ab201EdfbaE9a8557c03",
      32_083_539,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0x7216A9Dc9462354fD8707c5fdf0D29F2fBA86d97",
      32_083_539,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0x4bE09E22eC5fa9BE267Ea955b3a54406023c67DD",
      32_083_539,
    ],
  }),
  get(chains.sonic.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0x73f0d7C6D52876C22bC83c8Af39B44c98aAB8EBd",
      65_573_776,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x90967cBfBCe9EC637BC17707AeE1849869A79b8e",
      65_573_775,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0x86B1F07ddF6d2Acf332743E0B72248C898ECB904",
      65_573_776,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0x3a43C37637C6594b724Fa221C989be66a33eE2e8",
      65_573_776,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0x529b08972710636C7b602C879F23638b8caDd152",
      65_573_776,
    ],
  }),
  get(chains.superseed.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0x82f9A5AB00a95f7D95D6F5204E8640482DE49EF2",
      23_793_091,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x982D9a3C53e8c2162E42a2f8BaA4E3171Ed7B873",
      23_793_091,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0x05dEb48116442Bb93C0E411Aa095F45d6f29B92a",
      23_793_091,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0x1e250B33B468a24003A4F32706125667BD953D7b",
      23_793_091,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0x8ffD310773C8840f4c4698BFA6D9850b44c2A7Fc",
      23_793_091,
    ],
  }),
  get(chains.unichain.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0xbC7D4Fe222Ee68BD63e8b65C3e9c9B4B61Cf56d2",
      43_017_515,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0xb69510A4505f654412030A7D16ba164C72f653c5",
      43_017_515,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0x2b76DF77Cd627603B108E4D017d0A22f379b5AEd",
      43_017_515,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0x5f264f649b51742201fe14164C088249DD10D208",
      43_017_515,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0x3358471Ee9A7C7ddd115eD7800CA8D6b1dd5A5F8",
      43_017_515,
    ],
  }),
  get(chains.xdc.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0x1844A37e5D4C7e00B4f91DB41A78aeaF6A5B9CA8",
      100_419_033,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x9CFA27760D3aE595e6829AaA11f31b16b04fdf1d",
      100_419_033,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0x65Bc0c39A6F33F7093555c24bb358Dc0ABd6eCa2",
      100_419_033,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0xD5286D2cA959Bd75CFF66CD1aeDb76F2B61EEc29",
      100_419_033,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0x6F5E5f039FA2446C58Ec514c0C18E0C2Cbd7059E",
      100_419_033,
    ],
  }),
  get(chains.zksync.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0x886E737c9Ad626f007a570D5866E3F7a9bA785a0",
      69_122_791,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x5fdbD5a1B55C6a104E6A749d6805D1c05132694d",
      69_122_793,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0x491f3aa4021abe8744EA94572Fa7f5A7a2810999",
      69_122_798,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0x565F1ec207328C585563B8Db647B66cFF275dF62",
      69_122_801,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0x0B877D6523056B1eaaE38b89633E0eF6235AeE11",
      69_122_806,
    ],
  }),
];

/**
 * @description Testnet deployments for Airdrops v3.0
 */
export const testnets: Sablier.EVM.Deployment[] = [
  get(chains.arbitrumSepolia.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0xdE22693D3E51188A71F081E3eA3C9705C667F125",
      251_012_461,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x0bbd202049835E9179BBE3c16d65E5b7CE0b6B19",
      251_012_482,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0x4fAc09B6cc545646e2840F14d5BcC68C9DB6A5f9",
      251_012_495,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0x18385F06f053899CaE3C66F68135435eA3607bEb",
      251_012_510,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0xed41ca6Ee2B0f3C4E5A32d5daB2051C47349add6",
      251_012_523,
    ],
  }),
  get(chains.baseSepolia.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0xb15286F3CD1CC3003637fEB187EbB8b9702Ed707",
      39_001_920,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x863b326Ef7Ce2B82d881931bE577Ba04dd4D58BE",
      39_001_920,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0x7eBF0f960415a477fBb46A280B5DcaA1A6b1D0f9",
      39_001_920,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0xFc7C08dFE26d461b0dE0c0BF1D787D019fCB8861",
      39_001_920,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0x13CBF2aC8EE2321a2e0F4DDFFDD0A2D7167967a7",
      39_001_920,
    ],
  }),
  get(chains.optimismSepolia.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0xF330b56C17eC43071058700E65adB2874f661050",
      40_984_813,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x6b2d32f2844632b6910C32e1FC8eAA2b902525fE",
      40_984_813,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0xca6BCdce07A2cc7f2eDAc34CC18CF2cE42F635D7",
      40_984_814,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0x0F40cB83423faCd072855ED54368B765C5121693",
      40_984_814,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0x56f5105cF557FEDb3078740E7d4B30e645e993EA",
      40_984_815,
    ],
  }),
  get(chains.battlechainTestnet.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: ["0x95EC0f86cB1f4FeeeB82924d70C6bba4fF49F2Aa", 5392],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: ["0x4259557F6665eCF5907c9019a30f3Cb009c20Ae7", 5393],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: ["0x8224eb5D7d76B2D7Df43b868D875E79B11500eA8", 5434],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: ["0x83Dd52FCA44E069020b58155b761A590F12B59d3", 5434],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: ["0x1DdC1c21CD39c2Fa16366E6036c95342A31831Ba", 5435],
  }),
  get(chains.sepolia.id, {
    [manifest.SABLIER_FACTORY_MERKLE_EXECUTE]: [
      "0xF1bf5DdE27c4C265AC5B86A26494BcdB9C0B84b8",
      10_465_275,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_INSTANT]: [
      "0x857A37BE6536F5cb7470462e22D47d639F8f5aeD",
      10_465_276,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LL]: [
      "0x3279f698708A07e3DE1Bc89A5e64dC302F4Fd90C",
      10_465_276,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_LT]: [
      "0x93891075D2eFbBa3A2dD359e348820CFc56A40d1",
      10_465_276,
    ],
    [manifest.SABLIER_FACTORY_MERKLE_VCA]: [
      "0x4331C17fD94369E9605971B914bd23614d6A5526",
      10_465_276,
    ],
  }),
];
