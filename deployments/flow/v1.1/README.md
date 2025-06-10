# v1.1.0

## Contracts Deployed

- `SablierFlow`
- `FlowNFTDescriptor`

## Sources

- Commit: [4de537ca](https://github.com/sablier-labs/flow/commit/4de537ca582e9dc9bb95bbcf6f66df29d644d877)
- Package: [@sablier/flow@1.1.0](https://npmjs.com/package/@sablier/flow/v/1.1.0)

## Compiler Settings

| Chains  | Tool    | EVM      | Optimizer Runs | Solc Version | Via IR |
| :------ | :------ | :------- | :------------- | :----------- | :----- |
| Default | Foundry | Shanghai | 10000          | 0.8.26       | true   |
| IoTeX   | Hardhat | Paris    | 10000          | 0.8.20       | true   |
| Linea   | Foundry | Paris    | 10000          | 0.8.26       | true   |
| Tangle  | Hardhat | Paris    | 10000          | 0.8.20       | true   |
| Ultra   | Hardhat | Paris    | 10000          | 0.8.26       | true   |

For deployments on the zkSync based chains, the following settings were used:

| Chains   | Tool                                                                             | EVM   | Optimizer Runs | Solc Version | zkSolc | Via IR |
| :------- | :------------------------------------------------------------------------------- | :---- | :------------- | :----------- | :----- | :----- |
| Abstract | [Hardhat-zksync](https://docs.abs.xyz/build-on-abstract/smart-contracts/hardhat) | Paris | 10000          | 0.8.26       | 1.5.6  | true   |
| zkSync   | [Hardhat-zksync](https://docs.zksync.io/zksync-era/tooling/hardhat)              | Paris | 10000          | 0.8.26       | 1.5.6  | true   |

## Salts

The CREATE2 salts used during deployment. A "No Salt" value means that the contracts were deployed using the `CREATE`
opcode:

### Mainnets

| Chain           | Salt                          |
| :-------------- | :---------------------------- |
| Abstract        | No Salt                       |
| Arbitrum One    | ChainID 42161, Version 1.1.0  |
| Avalanche       | ChainID 43114, Version 1.1.0  |
| Base            | ChainID 8453, Version 1.1.0   |
| Berachain       | ChainID 80094, Version 1.1.0  |
| Blast           | ChainID 81457, Version 1.1.0  |
| BNB Smart Chain | ChainID 56, Version 1.1.0     |
| Chiliz          | No Salt                       |
| Form            | ChainID 478, Version 1.1.0    |
| Gnosis          | ChainID 100, Version 1.1.0    |
| IoTex           | No Salt                       |
| Linea           | ChainID 59144, Version 1.1.0  |
| LightLink       | ChainID 1890, Version 1.1.0   |
| Mainnet         | ChainID 1, Version 1.1.0      |
| Mode            | ChainID 34443, Version 1.1.0  |
| Optimism        | ChainID 10, Version 1.1.0     |
| Polygon         | ChainID 137, Version 1.1.0    |
| Scroll          | ChainID 534352, Version 1.1.0 |
| Sei             | ChainID 1329, Version 1.1.0   |
| Taiko Mainnet   | ChainID 167000, Version 1.1.0 |
| Tangle          | No Salt                       |
| Ultra           | No Salt                       |
| Unichain        | ChainID 130, Version 1.1.0    |
| XDC             | ChainID 50, Version 1.1.0     |
| zkSync Era      | No Salt                       |

### Testnets

| Chain            | Salt                             |
| :--------------- | :------------------------------- |
| Arbitrum Sepolia | ChainID 421614, Version 1.1.0    |
| Base Sepolia     | ChainID 84532, Version 1.1.0     |
| Blast Sepolia    | ChainID 168587773, Version 1.1.0 |
| Linea Sepolia    | ChainID 59141, Version 1.1.0     |
| Mode Sepolia     | ChainID 919, Version 1.1.0       |
| Morph Holesky    | ChainID 2810, Version 1.1.0      |
| Monad Testnet    | ChainID 10143, Version 1.1.0     |
| Optimism Sepolia | ChainID 11155420, Version 1.1.0  |
| Sepolia          | ChainID 11155111, Version 1.1.0  |
| Taiko Hekla      | ChainID 167009, Version 1.1.0    |
| zkSync Sepolia   | No Salt                          |
