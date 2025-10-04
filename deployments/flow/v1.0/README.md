# v1.0.0

## Contract Deployed

- SablierFlow
- FlowNFTDescriptor

## Sources

- Commit: [ba8c67a](https://github.com/sablier-labs/flow/commit/ba8c67a35d9cfd4fe646c2ab7db2c40e93d7fd6f)
- Package: [@sablier/flow@1.0.0](https://npmjs.com/package/@sablier/flow/v/1.0.0)

## Compiler Settings

| Setting        | Value    |
| :------------- | :------- |
| EVM            | Shanghai |
| Optimizer      | Yes      |
| Optimizer Runs | 1000     |
| Solc           | 0.8.26   |
| Via IR         | true     |

### Abstract

Abstract is based on zkSync and therefore requires to be deployed using
[hardhat](https://docs.abs.xyz/build-on-abstract/smart-contracts/hardhat) using the following configurations:

| Setting        | Value  |
| :------------- | :----- |
| Hardhat-zksync | 1.3.0  |
| Optimizer      | Yes    |
| Optimizer Runs | 1000   |
| Solc           | 0.8.26 |
| Via IR         | true   |
| Zksolc         | 1.5.7  |

### IoTex and Tangle

Due to the lack of Foundry support and for newer Solidity versions, we had to use the following settings for IoTex and
Tangle:

| Setting        | Value  |
| :------------- | :----- |
| EVM            | Paris  |
| Optimizer      | Yes    |
| Optimizer Runs | 1000   |
| Solc           | 0.8.20 |
| Via IR         | true   |

### Linea

Due to the lack of [EIP-3855](https://eips.ethereum.org/EIPS/eip-3855) support, we had to use the following settings for
Linea:

| Setting        | Value  |
| :------------- | :----- |
| EVM            | Paris  |
| Optimizer      | Yes    |
| Optimizer Runs | 1000   |
| Solc           | 0.8.26 |
| Via IR         | true   |

### zkSync

Since `zkSync` has its own VM, we needed to use their tools,
[Hardhat zkSync](https://github.com/matter-labs/hardhat-zksync), to deploy the contracts with the following
configuration:

| Setting        | Value  |
| :------------- | :----- |
| zkSolc         | 1.5.6  |
| EVM            | Paris  |
| Optimizer      | Yes    |
| Optimizer Runs | 200    |
| Solc           | 0.8.26 |
| Via IR         | true   |

## Salts

The CREATE2 salts used during deployment:

### Mainnets

| Chain           | Salt                          |
| :-------------- | :---------------------------- |
| Abstract        | No Salt                       |
| Arbitrum One    | ChainID 42161, Version 1.0.0  |
| Avalanche       | ChainID 43114, Version 1.0.0  |
| Base            | ChainID 8453, Version 1.0.0   |
| Blast           | ChainID 81457, Version 1.0.0  |
| BNB Smart Chain | ChainID 56, Version 1.0.0     |
| Chiliz          | No Salt                       |
| Core Dao        | ChainID 1116, Version 1.0.0   |
| Gnosis          | ChainID 100, Version 1.0.0    |
| IoTex           | No Salt                       |
| Lightlink       | No Salt                       |
| Linea           | ChainID 59144, Version 1.0.0  |
| Mainnet         | ChainID 1, Version 1.0.0      |
| Meld            | No Salt                       |
| Mode            | No Salt                       |
| Morph           | No Salt                       |
| Optimism        | ChainID 10, Version 1.0.0     |
| Polygon         | ChainID 137, Version 1.0.0    |
| Scroll          | ChainID 534352, Version 1.0.0 |
| Superseed       | ChainID 5330, Version 1.0.0   |
| Taiko Mainnet   | ChainID 167000, Version 1.0.0 |
| Tangle          | No Salt                       |
| zkSync Era      | No Salt                       |

### Testnets

| Chain             | Salt                             |
| :---------------- | :------------------------------- |
| Arbitrum Sepolia  | ChainID 421614, Version 1.0.0    |
| Base Sepolia      | ChainID 84532, Version 1.0.0     |
| Berachain Bartio  | ChainID 80084, Version 1.0.0     |
| Blast Sepolia     | ChainID 168587773, Version 1.0.0 |
| Linea Sepolia     | No Salt                          |
| Mode Sepolia      | No Salt                          |
| Morph Holesky     | No Salt                          |
| Optimism Sepolia  | ChainID 11155420, Version 1.0.0  |
| Sepolia           | ChainID 11155111, Version 1.0.0  |
| Superseed Sepolia | ChainID 53302, Version 1.0.0     |
| Taiko Hekla       | ChainID 167009, Version 1.0.0    |
| zkSync Sepolia    | No Salt                          |
