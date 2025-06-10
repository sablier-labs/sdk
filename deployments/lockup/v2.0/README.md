# v2.0.0

## Contracts and Libraries Deployed

- `SablierBatchLockup`
- `SablierLockup`
- `LockupNFTDescriptor`
- `Helpers`
- `VestingMath`

## Sources

- Commit: [835cac35](https://github.com/sablier-labs/lockup/commit/835cac359e03700cfd713313991e9430d8760c42)
- Package: [@sablier/lockup@2.0.0](https://npmjs.com/package/@sablier/lockup/v/2.0.0)

## Compiler Settings

| Chains  | Tool    | EVM      | Optimizer Runs | Solc Version | Via IR |
| :------ | :------ | :------- | :------------- | :----------- | :----- |
| Default | Foundry | Shanghai | 570            | 0.8.26       | true   |
| IoTeX   | Hardhat | Paris    | 10             | 0.8.26       | true   |
| Linea   | Foundry | Paris    | 100            | 0.8.26       | true   |
| Tangle  | Hardhat | Paris    | 100            | 0.8.26       | true   |
| Ultra   | Hardhat | Paris    | 100            | 0.8.26       | true   |

For deployments on the zkSync based chains, the following settings were used:

| Chains   | Tool                                                                             | EVM   | Optimizer Runs | Solc Version | zkSolc | Via IR |
| :------- | :------------------------------------------------------------------------------- | :---- | :------------- | :----------- | :----- | :----- |
| Abstract | [Hardhat-zksync](https://docs.abs.xyz/build-on-abstract/smart-contracts/hardhat) | Paris | 1000           | 0.8.26       | 1.5.11 | true   |
| zkSync   | [Hardhat-zksync](https://docs.zksync.io/zksync-era/tooling/hardhat)              | Paris | 1000           | 0.8.26       | 1.5.11 | true   |

## Salts

The CREATE2 salts used during deployment. A "No Salt" value means that the contracts were deployed using the `CREATE`
opcode:

### Mainnets

| Chain           | Salt                          |
| :-------------- | :---------------------------- |
| Abstract        | No Salt                       |
| Arbitrum One    | ChainID 42161, Version 2.0.0  |
| Avalanche       | ChainID 43114, Version 2.0.0  |
| Base            | ChainID 8453, Version 2.0.0   |
| Berachain       | ChainID 80094, Version 2.0.0  |
| Blast           | ChainID 81457, Version 2.0.0  |
| BNB Smart Chain | ChainID 56, Version 2.0.0     |
| Chiliz          | No Salt                       |
| Form            | ChainID 478, Version 2.0.0    |
| Gnosis          | ChainID 100, Version 2.0.0    |
| Linea           | ChainID 59144, Version 2.0.0  |
| LightLink       | ChainID 1890, Version 2.0.0   |
| Mainnet         | ChainID 1, Version 2.0.0      |
| Mode            | ChainID 34443, Version 2.0.0  |
| Optimism        | ChainID 10, Version 2.0.0     |
| Polygon         | ChainID 137, Version 2.0.0    |
| Scroll          | ChainID 534352, Version 2.0.0 |
| Sei             | ChainID 1329, Version 2.0.0   |
| Taiko Mainnet   | ChainID 167000, Version 2.0.0 |
| Tangle          | No Salt                       |
| Ultra           | No Salt                       |
| Unichain        | ChainID 130, Version 2.0.0    |
| XDC             | ChainID 50, Version 2.0.0     |
| zkSync Era      | No Salt                       |

### Testnets

| Chain            | Salt                             |
| :--------------- | :------------------------------- |
| Arbitrum Sepolia | No Salt                          |
| Base Sepolia     | No Salt                          |
| Blast Sepolia    | ChainID 168587773, Version 2.0.0 |
| Linea Sepolia    | ChainID 59141, Version 2.0.0     |
| Mode Sepolia     | ChainID 919, Version 2.0.0       |
| Monad Testnet    | ChainID 10143, Version 2.0.0     |
| Morph Holesky    | ChainID 2810, Version 2.0.0      |
| Optimism Sepolia | ChainID 11155420, Version 2.0.0  |
| Sepolia          | ChainID 11155111, Version 2.0.0  |
| Taiko Hekla      | ChainID 167009, Version 2.0.0    |
| zkSync Sepolia   | No Salt                          |
