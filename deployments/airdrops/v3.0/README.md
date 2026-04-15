# v3.0.0

## Contracts deployed

- `SablierFactoryMerkleExecute`
- `SablierFactoryMerkleInstant`
- `SablierFactoryMerkleLL`
- `SablierFactoryMerkleLT`
- `SablierFactoryMerkleVCA`

## Sources

- Commit: [5ec262e1](https://github.com/sablier-labs/evm-monorepo/commit/5ec262e1)
- Package: [@sablier/airdrops@3.0.0](https://npmjs.com/package/@sablier/airdrops/v/3.0.0)

## Configurations

| Compiler Setting | Value    |
| ---------------- | -------- |
| Tool             | Foundry  |
| EVM              | Shanghai |
| Solc             | v0.8.29  |
| Via IR           | true     |
| Optimizer Runs   | 60,000   |

## Salt

By default, all deployments use Foundry's `CREATE2` factory with a few exceptions. Please refer to the table below:

### Mainnets

| Chain           | Salt                          |
| :-------------- | :---------------------------- |
| Abstract        | ChainID 2741, Version 3.0.0   |
| Arbitrum        | ChainID 42161, Version 3.0.0  |
| Avalanche       | ChainID 43114, Version 3.0.0  |
| Base            | ChainID 8453, Version 3.0.0   |
| Berachain       | ChainID 80094, Version 3.0.0  |
| BNB Smart Chain | ChainID 56, Version 3.0.0     |
| Chiliz          | ChainID 88888, Version 3.0.0  |
| Denergy         | No Salt                       |
| Ethereum        | ChainID 1, Version 3.0.0      |
| Gnosis          | ChainID 100, Version 3.0.0    |
| HyperEVM        | ChainID 999, Version 3.0.0    |
| LightLink       | ChainID 1890, Version 3.0.0   |
| Linea           | ChainID 59144, Version 3.0.0  |
| Mode            | ChainID 34443, Version 3.0.0  |
| Monad           | ChainID 143, Version 3.0.0    |
| Morph           | ChainID 2818, Version 3.0.0   |
| Optimism        | ChainID 10, Version 3.0.0     |
| Polygon         | ChainID 137, Version 3.0.0    |
| Scroll          | ChainID 534352, Version 3.0.0 |
| Sonic           | ChainID 146, Version 3.0.0    |
| Superseed       | ChainID 5330, Version 3.0.0   |
| Unichain        | ChainID 130, Version 3.0.0    |
| XDC             | ChainID 50, Version 3.0.0     |
| zkSync Era      | ChainID 324, Version 3.0.0    |

### Testnets

| Chain               | Salt                            |
| :------------------ | :------------------------------ |
| Arbitrum Sepolia    | ChainID 421614, Version 3.0.0   |
| Base Sepolia        | ChainID 84532, Version 3.0.0    |
| BattleChain Testnet | No Salt                         |
| Optimism Sepolia    | ChainID 11155420, Version 3.0.0 |
| Sepolia             | ChainID 11155111, Version 3.0.0 |
