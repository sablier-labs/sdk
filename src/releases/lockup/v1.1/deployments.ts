import { chains } from "@src/chains";
import { Protocol } from "@src/enums";
import { resolvers } from "@src/releases/resolvers";
import type { Sablier } from "@src/types";
import aliases from "./aliases";
import manifest from "./manifest";

function get(
  chainId: number,
  contractMap: {
    core: Sablier.ContractMap;
    periphery: Sablier.ContractMap;
  },
): Sablier.Deployment.LockupV1 {
  return resolvers.deployment.lockupV1({
    aliasMap: aliases,
    chainId,
    contractMap,
    protocol: Protocol.Lockup,
    version: "v1.1",
  });
}

/**
 * @description Mainnet deployments for Lockup v1.1
 */
export const mainnets: Sablier.Deployment.LockupV1[] = [
  get(chains.arbitrum.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0x17Ec73692F0aDf7E7C554822FBEAACB4BE781762",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xf390cE6f54e4dc7C5A5f7f8689062b7591F7111d", 161_612_601],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xFDD9d122B451F549f48c4942c6fa6646D849e8C1", 161_611_816],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x2fb103fC853b2F5022a840091ab1cDf5172E7cfa",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH]: "0xAFd1434296e29a0711E24014656158055F00784c",
      [manifest.periphery.SABLIER_V2_MERKLE_STREAMER_FACTORY]: [
        "0x237400eF5a41886a75B0e036228221Df075b3B80",
        161_026_555,
      ],
    },
  }),
  get(chains.avalanche.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0x66F5431B0765D984f82A4fc4551b2c9ccF7eAC9C",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x0310Da0D8fF141166eD47548f00c96464880781F", 41_023_369],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xB24B65E015620455bB41deAAd4e1902f1Be9805f", 41_023_370],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xaBEdCf46c5D1d8eD8B9a487144189887695835DC",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH]: "0x68f156E5fa8C23D65B33aBEbbA50e0CA3626F741",
      [manifest.periphery.SABLIER_V2_MERKLE_STREAMER_FACTORY]: [
        "0x4849e797d7Aab20FCC8f807EfafDffF98A83412E",
        41_023_959,
      ],
    },
  }),
  get(chains.base.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0x7Faaedd40B1385C118cA7432952D9DC6b5CbC49e",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x461E13056a3a3265CEF4c593F01b2e960755dE91", 8_103_277],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xFCF737582d167c7D20A336532eb8BCcA8CF8e350", 8_103_056],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x67e0a126b695DBA35128860cd61926B90C420Ceb",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH]: "0x94E596EEd73b4e3171c067f05A87AB0268cA993c",
      [manifest.periphery.SABLIER_V2_MERKLE_STREAMER_FACTORY]: [
        "0x5545c8E7c3E1F74aDc98e518F2E8D23A002C4412",
        8_026_894,
      ],
    },
  }),
  get(chains.blast.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0x2De92156000269fa2fde7544F10f01E8cBC80fFa",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xDf578C2c70A86945999c65961417057363530a1c", 243_844],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xcb099EfC90e88690e287259410B9AE63e1658CC6", 243_845],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xCff4a803b0Bf55dD1BE38Fb96088478F3D2eeCF2",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH]: "0x0eDA15D606733f6CDe9DB67263E546bfcDDe9264",
      [manifest.periphery.SABLIER_V2_MERKLE_STREAMER_FACTORY]: ["0x92FC05e49c27884d554D98a5C01Ff0894a9DC29a", 244_740],
    },
  }),
  get(chains.bsc.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0x33511f69A784Fd958E6713aCaC7c9dCF1A5578E8",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xf900c5E3aA95B59Cc976e6bc9c0998618729a5fa", 34_492_523],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x14c35E126d75234a90c9fb185BF8ad3eDB6A90D2", 34_492_553],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xEcAfcF09c23057210cB6470eB5D0FD8Bafd1755F",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH]: "0x2E30a2ae6565Db78C06C28dE937F668597c80a1c",
      [manifest.periphery.SABLIER_V2_MERKLE_STREAMER_FACTORY]: [
        "0x434D73465aAc4125d204A6637eB6C579d8D69f48",
        34_438_438,
      ],
    },
  }),
  get(chains.ethereum.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0xC3Be6BffAeab7B297c03383B4254aa3Af2b9a5BA",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x7CC7e125d83A581ff438608490Cc0f7bDff79127", 18_821_269],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xAFb979d9afAd1aD27C5eFf4E27226E3AB9e5dCC9", 18_820_775],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x23eD5DA55AF4286c0dE55fAcb414dEE2e317F4CB",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH]: "0xEa07DdBBeA804E7fe66b958329F8Fa5cDA95Bd55",
      [manifest.periphery.SABLIER_V2_MERKLE_STREAMER_FACTORY]: [
        "0x1A272b596b10f02931480BC7a3617db4a8d154E3",
        18_811_605,
      ],
    },
  }),
  get(chains.gnosis.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0x73962c44c0fB4cC5e4545FB91732a5c5e87F55C2",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x1DF83C7682080B0f0c26a20C6C9CB8623e0Df24E", 31_521_496],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xce49854a647a1723e8Fb7CC3D190CAB29A44aB48", 31_521_155],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x01dbFE22205d8B109959e2Be02d0095379309eed",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH]: "0xBd9DDbC55B85FF6Dc0b76E9EFdCd2547Ab482501",
      [manifest.periphery.SABLIER_V2_MERKLE_STREAMER_FACTORY]: [
        "0x777F66477FF83aBabADf39a3F22A8CC3AEE43765",
        31_491_795,
      ],
    },
  }),
  get(chains.lightlink.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0xb568f9Bc0dcE39B9B64e843bC19DA102B5E3E939",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x49d753422ff05daa291A9efa383E4f57daEAd889", 63_524_930],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x17c4f98c40e69a6A0D5c42B11E3733f076A99E20", 63_524_931],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xda55fB3E53b7d205e37B6bdCe990b789255e4302",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH]: "0x3eb9F8f80354a157315Fce64990C554434690c2f",
      [manifest.periphery.SABLIER_V2_MERKLE_STREAMER_FACTORY]: [
        "0xdB07a1749D5Ca49909C7C4159652Fbd527c735B8",
        63_526_311,
      ],
    },
  }),
  get(chains.optimism.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0x1EECb6e6EaE6a1eD1CCB4323F3a146A7C5443A10",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xd6920c1094eABC4b71f3dC411A1566f64f4c206e", 113_697_819],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x4b45090152a5731b5bc71b5baF71E60e05B33867", 113_697_735],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xF5050c04425E639C647F5ED632218b16ce96694d",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH]: "0x8145429538dDBdDc4099B2bAfd24DD8958fa03b8",
      [manifest.periphery.SABLIER_V2_MERKLE_STREAMER_FACTORY]: [
        "0x044EC80FbeC40f0eE7E7b3856828170971796C19",
        113_621_901,
      ],
    },
  }),
  get(chains.polygon.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0x9761692EDf10F5F2A69f0150e2fd50dcecf05F2E",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xB194c7278C627D52E440316b74C5F24FC70c1565", 51_312_683],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x5f0e1dea4A635976ef51eC2a2ED41490d1eBa003", 51_313_973],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x8683da9DF8c5c3528e8251a5764EC7DAc7264795",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH]: "0x5865C73789C4496665eDE1CAF018dc52ac248598",
      [manifest.periphery.SABLIER_V2_MERKLE_STREAMER_FACTORY]: [
        "0xF4906225e783fb8977410BDBFb960caBed6C2EF4",
        51_245_836,
      ],
    },
  }),
  get(chains.scroll.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0x859708495E3B3c61Bbe19e6E3E1F41dE3A5C5C5b",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xAaff2D11f9e7Cd2A9cDC674931fAC0358a165995", 1_725_016],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x57e14AB4DAd920548899d86B54AD47Ea27F00987", 1_724_959],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xB71440B85172332E8B768e85EdBfdb34CB457c1c",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH]: "0xD18faa233E02d41EDFFdb64f20281dE0592FA3b5",
      [manifest.periphery.SABLIER_V2_MERKLE_STREAMER_FACTORY]: [
        "0xb3ade5463000E6c0D376e7d7570f372eBf98BDAf",
        1_675_340,
      ],
    },
  }),
  get(chains.zksync.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0xD05bdb4cF6Be7D647c5FEcC7952660bdD82cE44C",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xE6c7324BEA8474209103e407779Eec600c07cF3F", 32_472_581],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x2FcA69fa0a318EFDf4c15eE8F13A873347a8A8D4", 32_472_620],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xf12d2B8ff4Fc0495Db9c6d16b6a03bff9a10657A",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH]: "0x37A20Fb12DD6e0ADA47B327C0466A231dDc4504A",
      [manifest.periphery.SABLIER_V2_MERKLE_STREAMER_FACTORY]: [
        "0x46DE683D20c3575A0381fFd66C10Ab6836390140",
        33_148_970,
      ],
    },
  }),
];

/**
 * @description Testnet deployments for Lockup v1.1
 */
export const testnets: Sablier.Deployment.LockupV1[] = [
  get(chains.arbitrumSepolia.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0xA6A0cfA3442053fbB516D55205A749Ef2D33aed9",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x8c8102b92B1f31cC304A085D490796f4DfdF7aF3", 3_070_425],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x483bdd560dE53DC20f72dC66ACdB622C5075de34", 3_070_374],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x593050f0360518C3A4F11c32Eb936146e1096FD1",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH]: "0x72D921E579aB7FC5D19CD398B6be24d626Ccb6e7",
      [manifest.periphery.SABLIER_V2_MERKLE_STREAMER_FACTORY]: [
        "0xcc87b1A4de285832f226BD585bd54a2184D32105",
        2_972_055,
      ],
    },
  }),
  get(chains.baseSepolia.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0x90b1C663314cFb55c8FF6f9a50a8D57a2D83a664",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xF46d5fA9bFC964E8d06846c8739AEc69BC06344d", 7_545_175],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xbd7AAA2984c0a887E93c66baae222749883763d3", 7_545_175],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xb2b4b1E69B16411AEBD30c8EA5aB395E13069160",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH]: "0xbD636B8EF09760aC91f6Df3c6AC5531250420200",
      [manifest.periphery.SABLIER_V2_MERKLE_STREAMER_FACTORY]: [
        "0xf632521bbAb0dBC2bEf169865e6c8e285AFe0a42",
        7_545_874,
      ],
    },
  }),
  get(chains.blastSepolia.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0x9e216126115AFcdA9531232D3B735731905B4DC4",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x8aB55a8E046634D5AD87f64d65C1E96275e48712", 2_306_760],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xe31Ac61c7762930625D4700D7ea9282B7E57b816", 2_306_760],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x1e7217Aa198A17F79cc45aB5C90277Ff1d18b5DB",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH]: "0x72D91DB141fd38eD5DDc0D4b00BdDd2A17Cf6D55",
      [manifest.periphery.SABLIER_V2_MERKLE_STREAMER_FACTORY]: [
        "0x6F147f9A251A1F004A1d043b8E486aAb00A49cef",
        2_306_998,
      ],
    },
  }),
  get(chains.optimismSepolia.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0x6587166c4F4E0b6203549463EbAB4dBeFA63fd8f",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xf9e4095C1dfC058B34135C5c48cae66a8D2b3Aa5", 7_451_817],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xe59D28bEF2D37E99b93E734ed1dDcFc4B9C1bf73", 7_451_817],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x3590f54c5d3d83BA68c17cF5C28DB89C5d1DfA10",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH]: "0x65D3A5b99372ef59E741EE768443dF884aB56E0b",
      [manifest.periphery.SABLIER_V2_MERKLE_STREAMER_FACTORY]: [
        "0x9b6cC73522f22Ad3f2F8187e892A51b95f1A0E8a",
        7_452_590,
      ],
    },
  }),
  get(chains.ethereumSepolia.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0x2006d43E65e66C5FF20254836E63947FA8bAaD68",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xc9940AD8F43aAD8e8f33A4D5dbBf0a8F7FF4429A", 4_917_331],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x7a43F8a888fa15e68C103E18b0439Eb1e98E4301", 4_917_297],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xE8fFEbA8963CD9302ffD39c704dc2c027128D36F",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH]: "0xd2569DC4A58dfE85d807Dffb976dbC0a3bf0B0Fb",
      [manifest.periphery.SABLIER_V2_MERKLE_STREAMER_FACTORY]: [
        "0xBacC1d151A78eeD71D504f701c25E8739DC0262D",
        4_904_900,
      ],
    },
  }),
  get(chains.taikoHekla.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0x2De92156000269fa2fde7544F10f01E8cBC80fFa",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xDf578C2c70A86945999c65961417057363530a1c", 39_025],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xcb099EfC90e88690e287259410B9AE63e1658CC6", 39_025],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xCff4a803b0Bf55dD1BE38Fb96088478F3D2eeCF2",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH]: "0xd641a0E4509Cced67cC24E7BDcDe2a31b7F7cF77",
      [manifest.periphery.SABLIER_V2_MERKLE_STREAMER_FACTORY]: ["0x29a8d9F67608d77D0B4544A70FC2ab80BA5525f5", 39_064],
    },
  }),
  get(chains.zksyncSepolia.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0xEB4570723ae207a0473D73B3c2B255b0D5Ec9f01",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xe101C69A6f9c071Ab79aEE0be56928565962F56d", 2_108_902],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xdFC6F5D327dcF5DB579eC1b47fb260F93e042409", 2_108_909],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xABF4a24519c9A3c68a354FD6d5D4429De0A0D36C",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH]: "0x5F812F1332A2294149b9e1cBd216a5eED12cEbDD",
      [manifest.periphery.SABLIER_V2_MERKLE_STREAMER_FACTORY]: [
        "0xd9a834135c816FFd133a411a36219aAFD190fF97",
        2_107_139,
      ],
    },
  }),
];
