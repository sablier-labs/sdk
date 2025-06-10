# v1.2.0

See the [changelog](https://github.com/sablier-labs/v2-periphery/blob/main/CHANGELOG.md).

## Contract Deployed

- SablierV2BatchLockup
- SablierV2MerkleLockupFactory

## Sources

- Commit: [ed3be5dc](https://github.com/sablier-labs/v2-periphery/commit/ed3be5dc823dd81219f8060a6e6b32ead6c8de84)
- Package: [@sablier/v2-periphery@1.2.0](https://www.npmjs.com/package/@sablier/v2-periphery/v/1.2.0)

## Compiler Settings

| Setting        | Value    |
| :------------- | :------- |
| EVM            | Shanghai |
| Optimizer      | Yes      |
| Optimizer Runs | 10000    |
| Solc           | 0.8.26   |
| Via IR         | true     |

### Abstract

Abstract is based on zkSync and therefore requires to be deployed using
[hardhat](https://docs.abs.xyz/build-on-abstract/smart-contracts/hardhat) using the following configurations:

| Setting        | Value  |
| :------------- | :----- |
| Hardhat-zksync | 1.3.0  |
| Optimizer      | Yes    |
| Optimizer Runs | 10000  |
| Solc           | 0.8.26 |
| Via IR         | true   |
| Zksolc         | 1.5.7  |

### Linea

Due to the lack of [EIP-3855](https://eips.ethereum.org/EIPS/eip-3855) support, we had to use the following settings for
Linea:

| Setting        | Value  |
| :------------- | :----- |
| EVM            | Paris  |
| Optimizer      | Yes    |
| Optimizer Runs | 10000  |
| Solc           | 0.8.26 |
| Via IR         | true   |

## Salts

The CREATE2 salts used during deployment:

### Mainnets

| Chain           | Salt                          |
| :-------------- | :---------------------------- |
| Abstract        | No Salt                       |
| Arbitrum One    | ChainID 42161, Version 1.2.0  |
| Avalanche       | ChainID 43114, Version 1.2.0  |
| Base            | ChainID 8453, Version 1.2.0   |
| Blast           | ChainID 81457, Version 1.2.0  |
| BNB Smart Chain | ChainID 56, Version 1.2.0     |
| Chiliz          | No Salt                       |
| Gnosis          | ChainID 100, Version 1.2.0    |
| LightLink       | ChainID 1890, Version 1.2.0   |
| Mainnet         | ChainID 1, Version 1.2.0      |
| Mode            | ChainID 34443, Version 1.2.0  |
| Optimism        | ChainID 10, Version 1.2.0     |
| Polygon         | ChainID 137, Version 1.2.0    |
| Scroll          | ChainID 534352, Version 1.2.0 |
| Taiko Mainnet   | ChainID 167000, Version 1.2.0 |

### Testnets

| Chain            | Salt                             |
| :--------------- | :------------------------------- |
| Arbitrum Sepolia | ChainID 421611, Version 1.2.0    |
| BeraChain Artio  | ChainID 80084, Version 1.2.0     |
| Blast Sepolia    | ChainID 168587773, Version 1.2.0 |
| Mode Sepolia     | ChainID 919, Version 1.2.0       |
| Morph Holesky    | ChainID 2810, Version 1.2.0      |
| Optimism Sepolia | ChainID 11155420, Version 1.2.0  |
| Sepolia          | ChainID 11155111, Version 1.2.0  |
| Taiko Hekla      | ChainID 167009, Version 1.2.0    |
