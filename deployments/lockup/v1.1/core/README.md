# v1.1.2

See the [changelog](https://github.com/sablier-labs/v2-periphery/blob/main/CHANGELOG.md).

## Contract Deployed

- SablierV2LockupLinear
- SablierV2LockupDynamic

## Sources

- Commit: [a4bf69c](https://github.com/sablier-labs/lockup/commit/a4bf69cf7024006b9a324eef433f20b74597eaaf)
- Package: [@sablier/v2-core@1.1.2](https://npmjs.com/package/@sablier/v2-core/v/1.1.2)

## Compiler Settings

| Setting        | Value  |
| :------------- | :----- |
| Version        | 0.8.23 |
| EVM            | Paris  |
| Optimizer      | Yes    |
| Optimizer Runs | 1000   |
| Via IR         | true   |

## Salts

The CREATE2 salts used during deployment:

### Mainnets

| Chain           | Salt                                     |
| :-------------- | :--------------------------------------- |
| Arbitrum One    | ChainID 42161, Version 1.1.2             |
| Avalanche       | ChainID 43114, Version 1.1.2             |
| Base            | ChainID 8453, Version 1.1.2              |
| BNB Smart Chain | ChainID $BSC_CHAIN_ID, Version 1.1.2     |
| Gnosis          | ChainID $GNOSIS_CHAIN_ID, Version 1.1.2  |
| LightLink       | ChainID 1890, Version 1.1.2              |
| Mainnet         | ChainID 1, Version 1.1.2                 |
| Optimism        | ChainID 10, Version 1.1.2                |
| Polygon         | ChainID $POLYGON_CHAIN_ID, Version 1.1.2 |
| Scroll          | ChainID 534352, Version 1.1.2            |
| Taiko           | No salt                                  |
| zkSync          | No salt                                  |

### Testnets

| Chain            | Salt                                              |
| :--------------- | :------------------------------------------------ |
| Arbitrum Sepolia | ChainID $ARBITRUM_SEPOLIA_CHAIN_ID, Version 1.1.2 |
| Base Sepolia     | ChainID 84532, Version 1.1.2                      |
| Optimism Sepolia | ChainID 11155420, Version 1.1.2                   |
| Sepolia          | ChainID 11155111, Version 1.1.2                   |

The chain ids should have all been numerical values, but we have accidentally used the literal strings (e.g.
`$GNOSIS_CHAIN_ID`) instead. The CREATE2 salts do not affect the behavior of the contracts, so this is not a problem.
