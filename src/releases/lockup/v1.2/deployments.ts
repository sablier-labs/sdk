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
    version: "v1.2",
  });
}

/**
 * @description Mainnet deployments for Lockup v1.2
 */
export const mainnets: Sablier.Deployment.LockupV1[] = [
  get(chains.abstract.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xc69c06c030E825EDE13F1486078Aa9a2E2AAffaf", 72_821],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x7282d83E49363f373102d195F66649eBD6C57B9B", 72_822],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0x28fCAE6bda2546C93183EeC8638691B2EB184003", 72_823],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xAc2E42b520364940c90Ce164412Ca9BA212d014B",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0x2F1eB117A87217E8bE9AA96795F69c9e380686Db",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0xe2C0C3e0ff10Df4485a2dcbbdd1D002a40446164", 73_620],
    },
  }),
  get(chains.arbitrum.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x53F5eEB133B99C6e59108F35bCC7a116da50c5ce", 228_739_293],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x05a323a4C936fed6D02134c5f0877215CD186b51", 228_739_347],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0x0dA2c7Aa93E7CD43e6b8D043Aab5b85CfDDf3818", 228_739_366],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xacA12cdC4DcD7063c82E69A358549ba082463608",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0x785Edf1e617824A78EFE76295E040B1AE06002bf",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: [
        "0xc9A5a0Bc2D8E217BDbdFE7486E9E72c5c3308F01",
        228_753_235,
      ],
    },
  }),
  get(chains.avalanche.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xE3826241E5EeBB3F5fEde33F9f677047674D3FBF", 47_550_911],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xc0bF14AfB95CA4C049BDc19E06a3531D8065F6Fd", 47_550_912],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0xfA536049652BFb5f57ba8DCFbec1B2b2Dd9803D3", 47_550_912],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xcF24fb2a09227d955F8e9A12f36A26cf1ac079c6",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0xaBCdF4dcDBa57a04889784A670b862540758f9E7",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0x0430ed39EA2789AcdF27b89268117EBABc8176D1", 47_552_448],
    },
  }),
  get(chains.base.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xF9E9eD67DD2Fab3b3ca024A2d66Fcf0764d36742", 16_662_182],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x4CB16D4153123A74Bc724d161050959754f378D8", 16_662_182],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0xf4937657Ed8B3f3cB379Eed47b8818eE947BEb1e", 16_662_183],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x0fF9d05E6331A43A906fE1440E0C9D0742F475A3",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0xc1c548F980669615772dadcBfEBC29937c29481A",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0x58A51E5382318EeA6065BB7721eecdF4331c0B90", 16_664_178],
    },
  }),
  get(chains.blast.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xA705DE617673e2Fe63a4Ea0E58c26897601D32A5", 5_689_100],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x9b1468d29b4A5869f00c92517c57f8656E928B93", 5_689_100],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0x91FB72e5297e2728c10FDe73BdE74A4888A68570", 5_689_101],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x5f111b49f8f8bdb4A6001701E0D330fF52D6B370",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0xdc988d7AD6F186ea4a236f3E61A45a7851edF84E",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0x3aBCDDa756d069Cf3c7a17410602343966EAFf27", 5_689_067],
    },
  }),
  get(chains.bsc.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xeB6d84c585bf8AEA34F05a096D6fAA3b8477D146", 40_184_537],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x88ad3B5c62A46Df953A5d428d33D70408F53C408", 40_184_537],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0xAb5f007b33EDDA56962A0fC428B15D544EA46591", 40_184_537],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x27641f29b012d0d523EB5943011148c42c98e7F1",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0x70998557980CB6E8E63c46810081262B6c343051",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0x96Aa12809CAC29Bba4944fEca1dFDC8e1704e6c1", 40_185_848],
    },
  }),
  get(chains.chiliz.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xCff4a803b0Bf55dD1BE38Fb96088478F3D2eeCF2", 19_125_587],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xDf578C2c70A86945999c65961417057363530a1c", 19_125_587],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0xcb099EfC90e88690e287259410B9AE63e1658CC6", 19_125_587],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x2De92156000269fa2fde7544F10f01E8cBC80fFa",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0x0eDA15D606733f6CDe9DB67263E546bfcDDe9264",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0x92FC05e49c27884d554D98a5C01Ff0894a9DC29a", 19_125_620],
    },
  }),
  get(chains.coreDao.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xf0a7F2cCE911c298B5CB8106Db19EF1D00230710", 18_995_887],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x98Fe0d8b2c2c05d9C6a9e635f59474Aaa0000120", 18_995_887],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0x9C99EF88399bC1c1188399B39E7Cc667D78210ea", 18_995_887],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x64C734B2F1704822D8E69CAF230aE8d2eC18AA3e",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0xdE21BBFf718723E9069d8528d6Bb26c2971D58a7",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0x074CC814a8114126c505F5eecFC82A400B39cA03", 18_996_240],
    },
  }),
  get(chains.ethereum.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x9DeaBf7815b42Bf4E9a03EEc35a486fF74ee7459", 20_240_097],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x3962f6585946823440d274aD7C719B02b49DE51E", 20_240_097],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0xf86B359035208e4529686A1825F2D5BeE38c28A8", 20_240_098],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xAE32Ca14d85311A506Bb852D49bbfB315466bA26",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0xB5Ec9706C3Be9d22326D208f491E5DEef7C8d9f0",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0xF35aB407CF28012Ba57CAF5ee2f6d6E4420253bc", 20_240_153],
    },
  }),
  get(chains.gnosis.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x555eb55cbc477Aebbe5652D25d0fEA04052d3971", 34_797_841],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xf1cAeB104AB29271463259335357D57772C90758", 34_797_841],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0x59A4B7255A5D01247837600e7828A6F77f664b34", 34_797_842],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xA0B5C851E3E9fED83f387f4D8847DA398Da4A8E2",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0x0F324E5CB01ac98b2883c8ac4231aCA7EfD3e750",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0x5f12318fc6cCa518A950e2Ee16063a6317C2a9Ef", 34_798_524],
    },
  }),
  get(chains.iotex.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x6FcAB41e3b62d05aB4fC729586CB06Af2a2662D0", 31_786_505],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x84f092cf4d7d36c2d4987f672df81a39200a7146", 31_786_507],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0x179536f3289fb50076968b339C7EF0Dc0B38E3AF", 31_786_509],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x28eAB88ee8a951F78e1028557D0C3fD97af61A33",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0x711900e5f55d427cd88e5E3FCAe54Ccf02De71F4",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0xf978034bb3CAB5fe88d23DB5Cb38D510485DaB90", 31_787_815],
    },
  }),
  get(chains.linea.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xF2E46B249cFe09c2b3A2022dc81E0bB4bE3336F1", 7_728_316],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xB5d39049510F47EE7f74c528105D225E42747d63", 7_728_316],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0xC46ce4B77cBc46D17A2EceB2Cc8e2EE23D96529F", 7_728_316],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x2E72F7523cFeaed6B841aCe20060E0b203c312F5",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0x4259557F6665eCF5907c9019a30f3Cb009c20Ae7",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0x35E9C3445A039B258Eb7112A5Eea259a825E8AC0", 8_688_454],
    },
  }),
  get(chains.lightlink.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xAa05E418Fb7851C211351C65435F1b17cbFa88Bf", 90_214_120],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x6329591464FA6721c8E1c1271e4c6C41531Aea6b", 90_214_120],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0x83403c6426E6D044bF3B84EC1C007Db211AaA140", 90_214_120],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x5881ef3c0D3eB21b1b40E13b4a69c50754bc77C7",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0x5C847244649BD74aB41f09C893aF792AD87D32aA",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0x278AC15622846806BD46FBDbdB8dB8d09614173A", 90_212_375],
    },
  }),
  get(chains.meld.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xCff4a803b0Bf55dD1BE38Fb96088478F3D2eeCF2", 810_040],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xDf578C2c70A86945999c65961417057363530a1c", 810_040],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0xcb099EfC90e88690e287259410B9AE63e1658CC6", 810_040],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x2De92156000269fa2fde7544F10f01E8cBC80fFa",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0x0eDA15D606733f6CDe9DB67263E546bfcDDe9264",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0x92FC05e49c27884d554D98a5C01Ff0894a9DC29a", 810_043],
    },
  }),
  get(chains.mode.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x704552099f5aD679294D337638B9a57Fd4726F52", 11_343_389],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xD8C65Bd7CB6924EF895b2eDcA03407c652f5a2C5", 11_343_390],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0xBbfA51A10bE68714fa33281646B986dae9f52021", 11_343_390],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xA1976d4bd6572B68A677037B496D806ACC2cBdB3",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0x641A10A2c9e0CeB94F406e1EF68b1E1da002662d",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0x0Fd01Dd30F96A15dE6AfAd5627d45Ef94752460a", 11_343_396],
    },
  }),
  get(chains.morph.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x946654AB30Dd6eD10236C89f2C8B2719df653691", 45825],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xAC19F4181E58efb7094e0cb4e1BB18c79F6AAdf4", 45825],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0x63B92F7E2f69877184C955E63B9D8Dff55e52e14", 45826],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xe785101Cb228693cc3EFdCd5d637fEf6A6Ff7259",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0x28D116d7e917756310986C4207eA54183fcba06A",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0x5e73bb96493C10919204045fCdb639D35ad859f8", 45862],
    },
  }),
  get(chains.optimism.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x4994325F8D4B4A36Bd643128BEb3EC3e582192C0", 122_258_253],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x5C22471A86E9558ed9d22235dD5E0429207ccf4B", 122_258_253],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0x90952912a50079bef00D5F49c975058d6573aCdC", 122_258_253],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x1a4837b8c668b8F7BE22Ba156419b7b823Cfd05c",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0x6cd7bB0f63aFCc9F6CeDd1Bf1E3Bd4ED078CD019",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: [
        "0xe041629D99730b3EE4d6518097C45b4E3591992b",
        122_259_615,
      ],
    },
  }),
  get(chains.polygon.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x8D4dDc187a73017a5d7Cef733841f55115B13762", 58_956_745],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x8D87c5eddb5644D1a714F85930Ca940166e465f0", 58_956_745],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0xBF67f0A1E847564D0eFAD475782236D3Fa7e9Ec2", 58_956_745],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xf28BF9390fb57BB68386430550818D312699ED15",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0xD29EC4B9203f2d1C9Cd4Ba8c68FCFE4ECd85f6f5",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0xC28872e0c1f3633EeD467907123727ac0155029D", 58_958_044],
    },
  }),
  get(chains.scroll.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xAc199bFea92aa4D4C3d8A49fd463EAD99C7a6A8f", 7_137_181],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xBc5DC6D77612E636DA32af0d85Ca3179a57330fd", 7_137_182],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0xb0f78dDc01D829d8b567821Eb193De8082b57D9D", 7_137_183],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xA1A281BbcaED8f0A9Dcd0fe67cbC53e0993C24cb",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0x4B8BF9cD3274517609e7Fe905740fa151C9aa711",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0x344afe8ad5dBA3d55870dc398e0F53B635B2ed0d", 7_138_124],
    },
  }),
  get(chains.superseed.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x1fA500262b352d821B4e1c933A20f2242B45383d", 2_896_160],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x251FC799344151026d19b959B8f3667416d56B88", 2_896_160],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0x91211E1760280d3f7dF2182ce4D1Fd6A1735C202", 2_896_160],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x0a6C2E6B61cf05800F9aA91494480440843d6c3c",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0xc4DE6f667435d5Ce0150e08BcEc9722C9017e90b",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0xF60bEADEfbeb98C927E13C4165BCa7D85Ba32cB2", 2_896_477],
    },
  }),
  get(chains.taiko.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x238C830FA8E4ED0f0A4bc9C986BF338aEC9e38D1", 262_694],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x5Ec0a2e88dAd09ad940Be2639c9aDb24D186989E", 262_694],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0x6a619d35972578E8458E33B7d1e07b155A51585E", 262_694],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xBFD6048C80665792d949692CE77307e55dbb8986",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0x65E2C9990d4CAc5E54E65c1BD625CdcC9FDd1292",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0xd7df0b795756b60ab51a37e26f1edb7ef9e78828", 262_734],
    },
  }),
  get(chains.tangle.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x946654AB30Dd6eD10236C89f2C8B2719df653691", 2_515_961],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xAC19F4181E58efb7094e0cb4e1BB18c79F6AAdf4", 2_515_962],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0x63B92F7E2f69877184C955E63B9D8Dff55e52e14", 2_515_963],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xe785101Cb228693cc3EFdCd5d637fEf6A6Ff7259",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0x28D116d7e917756310986C4207eA54183fcba06A",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0x5e73bb96493C10919204045fCdb639D35ad859f8", 2_516_262],
    },
  }),
  get(chains.zksync.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xf03f4Bf48b108360bAf1597Fb8053Ebe0F5245dA", 38_311_104],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x8cB69b514E97a904743922e1adf3D1627deeeE8D", 38_311_152],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0x1fB145A47Eb9b8bf565273e137356376197b3559", 38_311_193],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x99BA0D464942e7166dEBb8BAaAF1192F8d4117eb",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0xAE1A55205A0499d6BBb0Cf0f1210641957e9cb7e",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0x8a84fCF962163A7E98Bf0daFD918973c846fa5C8", 38_312_643],
    },
  }),
];

/**
 * @description Testnet deployments for Lockup v1.2
 */
export const testnets: Sablier.Deployment.LockupV1[] = [
  get(chains.arbitrumSepolia.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x8127E8081C22807c8a786Af1e1b174939577144A", 64_010_288],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x9D1C257d9bc09E6E6B8E7e7c2496C12000f55457", 64_010_292],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0xaff2efFCF38Ea4A92E0cC5D7c48456C53358fE1a", 64_010_295],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x46AEd4FE32aE1306d8073FE54A4E844e10a3ca16",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0xC1FD380b3B0fF989C259D0b45B97F9663B638aA4",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0xa11561F9e418f2C431B411E1CA22FD3F85D4c831", 64_013_228],
    },
  }),
  get(chains.baseSepolia.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x6DCB73E5F7e8e70bE20b3B9CF50E3be4625A91C3", 12_641_001],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xFE7fc0Bbde84C239C0aB89111D617dC7cc58049f", 12_641_001],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0xb8c724df3eC8f2Bf8fA808dF2cB5dbab22f3E68c", 12_641_002],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x474dFf3Cdd6489523947bf08D538F56d07Ca699e",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0x23d0B7691F4Ca0E5477132a7C7F54fdCEd1814B9",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0x899a05feb160fe912f621733A1d0b39C1446B3eB", 12_641_193],
    },
  }),
  get(chains.blastSepolia.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x9dA09f4887FD3a78Ea237F74a456a82e4301F3D4", 8_184_206],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x07f1386803ab6e1D8b6AABD50A9772E45bEA08f1", 8_184_207],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0x7eB79ab3652713bBE989e7A0dCA61ba484CAED85", 8_184_207],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x93c0c4a57573C7056D7d63B536e33E28FB3ec2EE",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0xAC83E6aDA41a9251516601d8D5D0188466044Cc1",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0xb9fCF1f73DD941Dd1C589fCf8545E60133EE5eC2", 8_184_439],
    },
  }),
  get(chains.ethereumSepolia.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x73BB6dD3f5828d60F8b3dBc8798EB10fbA2c5636", 6_239_030],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x3E435560fd0a03ddF70694b35b673C25c65aBB6C", 6_239_030],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0x3a1beA13A8C24c0EA2b8fAE91E4b2762A59D7aF5", 6_239_031],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x56F2f7f4d15d1A9FF9d3782b6F6bB8f6fd690D33",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0x04A9c14b7a000640419aD5515Db4eF4172C00E31",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0x56E9180A8d2C35c99F2F8a1A5Ab8aBe79E876E8c", 6_240_754],
    },
  }),
  get(chains.lineaSepolia.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x95D29708be647BDD8dA0bdF82B84eB5f42d45918", 3_241_482],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x435F33C21B9Ea8BF207785616Bb28C46eDeD7366", 3_241_482],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0x5A52E9F4dFcdBcd68E50386D484378718167aB60", 3_241_482],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x237f114a9cF62b87383684529d889DdfEd917f0c",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0x8224eb5D7d76B2D7Df43b868D875E79B11500eA8",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0x83Dd52FCA44E069020b58155b761A590F12B59d3", 3661907],
    },
  }),
  get(chains.modeTestnet.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x5cD39Ec69F0Ed62733d0DA3E083E451334bA1f70", 17_492_744],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x61861e4C72EE2F6967C852FE79Eac0E7a9C4f466", 17_492_744],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0xc51346d1FD003E536530584eb4c8974BB279712D", 17_492_744],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xD3c856A7333c264475aD87F9E6f84Ef376AE250D",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0xece83740834694A6E204825e5bcD8774F26a2665",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0x900de6cC1021afa13f41e1067bEE681BbD661C69", 17_492_870],
    },
  }),
  get(chains.morphHolesky.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x36477f8FEf1fC3B0fe7F24b8F6d9561f0BeC30e7", 6_702_495],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x4b4126036726085636BC2A4788a448d5C26705E4", 6_702_496],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0x6AF155530D6360E789deD0CF88219f855CCb158F", 6_702_497],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x33BE6a7810B464B913052EC0436A067de25C164c",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0x728Ec8260Ea1115252D33c0D563d78CA18990dE4",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0x4B5F6B967dC61c2B39fa233092745B460eA1b433", 6_702_947],
    },
  }),
  get(chains.optimismSepolia.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x89EC3830040dec63E9dF0C904d649fda4d49DF16", 14_622_624],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x0a881bbd71a21710D56Ff1931EC8189d94019D60", 14_622_624],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0xb971A93608413C54F407eE86C7c15b295E0004bB", 14_622_624],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x48F8C05C721E27FA82aD6c8ddB1a88eF43864A9A",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0xd9dD971D4800100aED0BfF3535aB116D4Be5c420",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0x6CBe6e298A9354306e6ee65f63FF85CFA7062a39", 14_622_635],
    },
  }),
  get(chains.superseedSepolia.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xCff4a803b0Bf55dD1BE38Fb96088478F3D2eeCF2", 6_625_439],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xDf578C2c70A86945999c65961417057363530a1c", 6_625_439],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0xcb099EfC90e88690e287259410B9AE63e1658CC6", 6_625_439],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x2De92156000269fa2fde7544F10f01E8cBC80fFa",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0x0eDA15D606733f6CDe9DB67263E546bfcDDe9264",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0x92FC05e49c27884d554D98a5C01Ff0894a9DC29a", 6_625_700],
    },
  }),
  get(chains.taikoHekla.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x01565a1298d631302c114E13C431c9345ae5532e", 558_552],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x640376B26E5f57dCD385b394a24c91F4C60E4fAc", 558_552],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0xd040fa437021F771C307178F06183bffC36cb4A5", 558_552],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x49Fd46F7d897778205c00D5c1D943fCDc26Ed9E8",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0x6C6a4Ef6C0C1318C9FD60b5084B68E04FB5e9Db9",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0x4F0d64365EfA9D6D1B88FfC387Ce02e4A71d9f9f", 566_058],
    },
  }),
  get(chains.zksyncSepolia.id, {
    core: {
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xc4311a5913953162111bF75530f7BB14ec24e014", 3_249_096],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x43864C567b89FA5fEE8010f92d4473Bf19169BBA", 3_249_111],
      [manifest.core.SABLIER_V2_LOCKUP_TRANCHED]: ["0xF6e869b73E20b812dcf0E850AA8822F74f67f670", 3_249_123],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x477DDC91a7e13CBaC01c06737abF96d50ECa7961",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_BATCH_LOCKUP]: "0x1D68417ff71855Eb0237Ff03a8FfF02Ef67e4AFb",
      [manifest.periphery.SABLIER_V2_MERKLE_LOCKUP_FACTORY]: ["0x2CEf8C06dDF7a1440Ad2561c53821e43adDbfA31", 3_250_862],
    },
  }),
];
