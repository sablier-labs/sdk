# v3.0.0

## Contracts and Libraries Deployed

- `SablierBatchLockup`
- `SablierLockup`
- `Helpers`
- `LockupMath`

## Sources

- Commit: [0c3ea98](https://github.com/sablier-labs/lockup/commit/0c3ea987b00f12a57274556cd84bddaab92f5a16)
- Package: [@sablier/lockup@3.0.1](https://npmjs.com/package/@sablier/lockup/v/3.0.1)

## Configurations

| Compiler Setting | Value    |
| ---------------- | -------- |
| Tool             | Foundry  |
| EVM              | Shanghai |
| Solc             | v0.8.29  |
| Via IR           | true     |
| Optimizer Runs   | 500      |

### Exceptions

1. For Linea, `paris` is used as the EVM version.
2. For Abstract and ZkSync, `zksolc v1.5.15` is used.

## Salts

All contracts are deployed using Foundry's `CREATE2` factory. The following salts are used:

### Mainnets

| Chain           | Salt                          |
| :-------------- | :---------------------------- |
| Abstract        | ChainID 2741, Version 3.0.0   |
| Arbitrum        | ChainID 42161, Version 3.0.0  |
| Avalanche       | ChainID 43114, Version 3.0.0  |
| Base            | ChainID 8453, Version 3.0.0   |
| Berachain       | ChainID 80094, Version 3.0.0  |
| Blast           | ChainID 81457, Version 3.0.0  |
| BNB Smart Chain | ChainID 56, Version 3.0.0     |
| Chiliz          | ChainID 88888, Version 3.0.0  |
| Core DAO        | ChainID 1116, Version 3.0.0   |
| Ethereum        | ChainID 1, Version 3.0.0      |
| Gnosis          | ChainID 100, Version 3.0.0    |
| HyperEVM        | ChainID 999, Version 3.0.0    |
| LightLink       | ChainID 1890, Version 3.0.0   |
| Linea           | ChainID 59144, Version 3.0.0  |
| Mode            | ChainID 34443, Version 3.0.0  |
| Monad           | ChainID 143, Version 3.0.1    |
| Morph           | ChainID 2818, Version 3.0.0   |
| Optimism        | ChainID 10, Version 3.0.0     |
| Polygon         | ChainID 137, Version 3.0.0    |
| Scroll          | ChainID 534352, Version 3.0.0 |
| Sei             | ChainID 1329, Version 3.0.0   |
| Sonic           | ChainID 146, Version 3.0.0    |
| Superseed       | ChainID 5330, Version 3.0.0   |
| Unichain        | ChainID 130, Version 3.0.0    |
| XDC             | ChainID 50, Version 3.0.0     |
| zkSync Era      | ChainID 324, Version 3.0.0    |

### Testnets

| Chain            | Salt                            |
| :--------------- | :------------------------------ |
| Arbitrum Sepolia | ChainID 421614, Version 3.0.0   |
| Base Sepolia     | ChainID 84532, Version 3.0.0    |
| Mode Sepolia     | ChainID 919, Version 3.0.0      |
| Optimism Sepolia | ChainID 11155420, Version 3.0.0 |
| Sepolia          | ChainID 11155111, Version 3.0.0 |
