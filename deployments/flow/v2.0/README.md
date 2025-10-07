# v2.0.0

## Contracts deployed

- `SablierFlow`

## Sources

<!-- TODO: update commit after launch -->

- Commit: [fe7cf4e](https://github.com/sablier-labs/flow/commit/2959b41c85f50ee527132b733fa6e817fbe5a727)
- Package: [@sablier/flow@3.0.0](https://npmjs.com/package/@sablier/flow/v/2.0.0)

## Configurations

| Compiler Setting | Value    |
| ---------------- | -------- |
| Tool             | Foundry  |
| EVM              | Shanghai |
| Solc             | v0.8.29  |
| Via IR           | true     |
| Optimizer Runs   | 1000     |

### Exceptions

1. For Linea, `paris` is used as the EVM version.
2. For Abstract and ZkSync, `zksolc v1.5.15` is used.

## Salts

All contracts are deployed using Foundry's `CREATE2` factory. The following salts are used:

### Mainnets

| Chain           | Salt                          |
| :-------------- | :---------------------------- |
| Abstract        | ChainID 2741, Version 2.0.0   |
| Arbitrum        | ChainID 42161, Version 2.0.0  |
| Avalanche       | ChainID 43114, Version 2.0.0  |
| Base            | ChainID 8453, Version 2.0.0   |
| Berachain       | ChainID 80094, Version 2.0.0  |
| Blast           | ChainID 81457, Version 2.0.0  |
| BNB Smart Chain | ChainID 56, Version 2.0.0     |
| Chiliz          | ChainID 88888, Version 2.0.0  |
| Core DAO        | ChainID 1116, Version 2.0.0   |
| Ethereum        | ChainID 1, Version 2.0.0      |
| Gnosis          | ChainID 100, Version 2.0.0    |
| HyperEVM        | ChainID 999, Version 2.0.0    |
| LightLink       | ChainID 1890, Version 2.0.0   |
| Linea           | ChainID 59144, Version 2.0.0  |
| Mode            | ChainID 34443, Version 2.0.0  |
| Morph           | ChainID 2818, Version 2.0.0   |
| Optimism        | ChainID 10, Version 2.0.0     |
| Polygon         | ChainID 137, Version 2.0.0    |
| Scroll          | ChainID 534352, Version 2.0.0 |
| Sei             | ChainID 1329, Version 2.0.0   |
| Sonic           | ChainID 146, Version 2.0.0    |
| Superseed       | ChainID 5330, Version 2.0.0   |
| Unichain        | ChainID 130, Version 2.0.0    |
| XDC             | ChainID 50, Version 2.0.0     |
| zkSync Era      | ChainID 324, Version 2.0.0    |

### Testnets

| Chain            | Salt                            |
| :--------------- | :------------------------------ |
| Arbitrum Sepolia | ChainID 421614, Version 2.0.0   |
| Base Sepolia     | ChainID 84532, Version 2.0.0    |
| Mode Sepolia     | ChainID 919, Version 2.0.0      |
| Optimism Sepolia | ChainID 11155420, Version 2.0.0 |
| Sepolia          | ChainID 11155111, Version 2.0.0 |
