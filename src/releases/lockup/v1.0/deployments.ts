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
    version: "v1.0",
  });
}

/**
 * @description Mainnet deployments for Lockup v1.2
 */
export const mainnets: Sablier.Deployment.LockupV1[] = [
  get(chains.ethereum.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0xC3Be6BffAeab7B297c03383B4254aa3Af2b9a5BA",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x39EFdC3dbB57B2388CcC4bb40aC4CB1226Bc9E44", 17_613_133],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xB10daee1FCF62243aE27776D7a92D39dC8740f95", 17_613_137],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x98F2196fECc01C240d1429B624d007Ca268EEA29",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_ARCHIVE]: "0x0Be20a8242B0781B6fd4d453e90DCC1CcF7DBcc6",
      [manifest.periphery.SABLIER_V2_PROXY_PLUGIN]: "0x9bdebF4F9adEB99387f46e4020FBf3dDa885D2b8",
      [manifest.periphery.SABLIER_V2_PROXY_TARGET]: "0x297b43aE44660cA7826ef92D8353324C018573Ef",
      [manifest.periphery.SABLIER_V2_PROXY_TARGET_APPROVE]: "0x638a7aC8315767cEAfc57a6f5e3559454347C3f6",
    },
  }),
  get(chains.arbitrum.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0x17Ec73692F0aDf7E7C554822FBEAACB4BE781762",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xA9EfBEf1A35fF80041F567391bdc9813b2D50197", 107_508_404],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x197D655F3be03903fD25e7828c3534504bfe525e", 107_508_435],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xc245d6C9608769CeF91C3858e4d2a74802B9f1bB",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_ARCHIVE]: "0xDFa4512d07AbD4eb8Be570Cd79e2e6Fe21ff15C9",
      [manifest.periphery.SABLIER_V2_PROXY_PLUGIN]: "0x9aB73CA73c89AF0bdc69642aCeb23CC6A55A514C",
      [manifest.periphery.SABLIER_V2_PROXY_TARGET]: "0xB7185AcAF42C4966fFA3c81486d9ED9633aa4c13",
      [manifest.periphery.SABLIER_V2_PROXY_TARGET_APPROVE]: "0x90cc23dc3e12e80f27c05b8137b5f0d2b1edfa20",
    },
  }),
  get(chains.avalanche.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0x66F5431B0765D984f82A4fc4551b2c9ccF7eAC9C",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x665d1C8337F1035cfBe13DD94bB669110b975f5F", 32_164_219],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x610346E9088AFA70D6B03e96A800B3267E75cA19", 32_164_219],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xFd050AFA2e04aA0596947DaD3Ec5690162aDc77F",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_ARCHIVE]: "0x7b1ef644ce9a625537e9e0c3d7fef3be667e6159",
      [manifest.periphery.SABLIER_V2_PROXY_PLUGIN]: "0x17167A7e2763121e263B4331B700a1BF9113b387",
      [manifest.periphery.SABLIER_V2_PROXY_TARGET]: "0x48B4889cf5d6f8360050f9d7606505F1433120BC",
      [manifest.periphery.SABLIER_V2_PROXY_TARGET_APPROVE]: "0x817fE1364A9d57d1fB951945B53942234163Ef10",
    },
  }),
  get(chains.base.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0x7Faaedd40B1385C118cA7432952D9DC6b5CbC49e",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x645B00960Dc352e699F89a81Fc845C0C645231cf", 1_750_275],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x6b9a46C8377f21517E65fa3899b3A9Fab19D17f5", 1_750_275],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xEFc2896c29F70bc23e82892Df827d4e2259028Fd",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_ARCHIVE]: "0x1C5Ac71dd48c7ff291743e5E6e3689ba92F73cC6",
      [manifest.periphery.SABLIER_V2_PROXY_PLUGIN]: "0x50E8B9dC7F28e5cA9253759455C1077e497c4232",
      [manifest.periphery.SABLIER_V2_PROXY_TARGET]: "0x0648C80b969501c7778b6ff3ba47aBb78fEeDF39",
      [manifest.periphery.SABLIER_V2_PROXY_TARGET_APPROVE]: "0xf19576Ab425753816eCbF98aca8132A0f693aEc5",
    },
  }),
  get(chains.bsc.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0x33511f69A784Fd958E6713aCaC7c9dCF1A5578E8",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xF2f3feF2454DcA59ECA929D2D8cD2a8669Cc6214", 29_646_271],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x3FE4333f62A75c2a85C8211c6AeFd1b9Bfde6e51", 29_646_271],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x3daD1bF57edCFF979Fb68a802AC54c5AAfB78F4c",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_ARCHIVE]: "0xeDe48EB173A869c0b27Cb98CC56d00BC391e5887",
      [manifest.periphery.SABLIER_V2_PROXY_PLUGIN]: "0xC43b2d8CedB71df30F45dFd9a21eC1E50A813bD6",
      [manifest.periphery.SABLIER_V2_PROXY_TARGET]: "0x135e78B8E17B1d189Af75FcfCC018ab2E6c7b879",
      [manifest.periphery.SABLIER_V2_PROXY_TARGET_APPROVE]: "0xc9bf2A6bD467A813908d836c1506efE61E465761",
    },
  }),
  get(chains.gnosis.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0x73962c44c0fB4cC5e4545FB91732a5c5e87F55C2",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xeb148E4ec13aaA65328c0BA089a278138E9E53F9", 28_766_600],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x685E92c9cA2bB23f1B596d0a7D749c0603e88585", 28_766_600],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x8CE9Cd651e03325Cf6D4Ce9cfa74BE79CDf6d530",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_ARCHIVE]: "0xF4A6F47Da7c6b26b6Dd774671aABA48fb4bFE309",
      [manifest.periphery.SABLIER_V2_PROXY_PLUGIN]: "0xc84f0e95815A576171A19EB9E0fA55a217Ab1536",
      [manifest.periphery.SABLIER_V2_PROXY_TARGET]: "0x5B144C3B9C8cfd48297Aeb59B90a024Ef3fCcE92",
      [manifest.periphery.SABLIER_V2_PROXY_TARGET_APPROVE]: "0x89AfE038714e547C29Fa881029DD4B5CFB008454",
    },
  }),
  get(chains.optimism.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0x1EECb6e6EaE6a1eD1CCB4323F3a146A7C5443A10",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x6f68516c21E248cdDfaf4898e66b2b0Adee0e0d6", 106_405_061],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xB923aBdCA17Aed90EB5EC5E407bd37164f632bFD", 106_405_061],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xe0138C596939CC0D2382046795bC163ad5755e0E",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_ARCHIVE]: "0x9A09eC6f991386718854aDDCEe68647776Befd5b",
      [manifest.periphery.SABLIER_V2_PROXY_PLUGIN]: "0x77C8516B1F327890C956bb38F93Ac2d6B24795Ea",
      [manifest.periphery.SABLIER_V2_PROXY_TARGET]: "0x194ed7D6005C8ba4084A948406545DF299ad37cD",
      [manifest.periphery.SABLIER_V2_PROXY_TARGET_APPROVE]: "0x8a6974c162fdc7Cb67996F7dB8bAAFb9a99566e0",
    },
  }),
  get(chains.polygon.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0x9761692EDf10F5F2A69f0150e2fd50dcecf05F2E",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x7313AdDb53f96a4f710D3b91645c62B434190725", 44_637_127],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x67422C3E36A908D5C3237e9cFfEB40bDE7060f6E", 44_637_129],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xA820946EaAceB2a85aF123f706f23192c28bC6B9",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_ARCHIVE]: "0xA2f5B2e798e7ADd59d85d9b76645E6AC13fC4e1f",
      [manifest.periphery.SABLIER_V2_PROXY_PLUGIN]: "0xBe4cad0e99865CC62787Ecf029aD9DD4815d3d2e",
      [manifest.periphery.SABLIER_V2_PROXY_TARGET]: "0x576743075fc5F771bbC1376c3267A6185Af9D62B",
      [manifest.periphery.SABLIER_V2_PROXY_TARGET_APPROVE]: "0xccA6dd77bA2cfcccEdA01A82CB309e2A17901682",
    },
  }),
  get(chains.scroll.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0x859708495E3B3c61Bbe19e6E3E1F41dE3A5C5C5b",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0xde6a30D851eFD0Fc2a9C922F294801Cfd5FCB3A1", 500_707],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0x80640ca758615ee83801EC43452feEA09a202D33", 501_170],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xC1fa624733203F2B7185c3724039C4D5E5234fE4",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_ARCHIVE]: "0x94A18AC6e4B7d97E31f1587f6a666Dc5503086c3",
      [manifest.periphery.SABLIER_V2_PROXY_PLUGIN]: "0xED1591BD6038032a74D786A452A23536b3201490",
      [manifest.periphery.SABLIER_V2_PROXY_TARGET]: "0x91154fc80933D25793E6B4D7CE19fb51dE6794B7",
      [manifest.periphery.SABLIER_V2_PROXY_TARGET_APPROVE]: "0x71CeA9c4d15fed2E58785cE0C05165CE34313A74",
    },
  }),
];

/**
 * @description Testnet deployments for Lockup v1.0
 */
export const testnets: Sablier.Deployment.LockupV1[] = [
  get(chains.arbitrumSepolia.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0xA6A0cfA3442053fbB516D55205A749Ef2D33aed9",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x7938c18a59FaD2bA11426AcfBe8d74F0F598a4D2", 2_838_657],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xa3e36b51B7A456812c92253780f4B15bad56e34c", 2_838_659],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0xEe93BFf599C17C6fF8e31F2De6c3e40bd5e51312",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_ARCHIVE]: "0x2C8fA48361C7D48Dc21b27a3D549402Cf8AE16B0",
      [manifest.periphery.SABLIER_V2_PROXY_PLUGIN]: "0x7D310803c3824636bAff74e4f80e81ece167c440",
      [manifest.periphery.SABLIER_V2_PROXY_TARGET]: "0x396A3a169918A4C0B339ECf86C583f46D696254E",
    },
  }),
  get(chains.ethereumSepolia.id, {
    core: {
      [manifest.core.SABLIER_V2_COMPTROLLER]: "0x2006d43E65e66C5FF20254836E63947FA8bAaD68",
      [manifest.core.SABLIER_V2_LOCKUP_DYNAMIC]: ["0x421e1E7a53FF360f70A2D02037Ee394FA474e035", 4_067_889],
      [manifest.core.SABLIER_V2_LOCKUP_LINEAR]: ["0xd4300c5bc0b9e27c73ebabdc747ba990b1b570db", 4_067_889],
      [manifest.core.SABLIER_V2_NFT_DESCRIPTOR]: "0x3cb51943EbcEA05B23C35c50491B3d296FF675db",
    },
    periphery: {
      [manifest.periphery.SABLIER_V2_ARCHIVE]: "0x83495d8DF6221f566232e1353a6e7231A86C61fF",
      [manifest.periphery.SABLIER_V2_PROXY_PLUGIN]: "0xa333c8233CfD04740E64AB4fd5447995E357561B",
      [manifest.periphery.SABLIER_V2_PROXY_TARGET]: "0x5091900B7cF803a7407FCE6333A6bAE4aA779Fd4",
      [manifest.periphery.SABLIER_V2_PROXY_TARGET_APPROVE]: "0x105E7728C5706Ad41d194EbDc7873B047352F3d2",
    },
  }),
];
