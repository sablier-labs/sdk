# v1.1

## Contracts Deployed

- `SablierComptroller`

## Sources

- Commit: [b3ef1b4](https://github.com/sablier-labs/evm-monorepo/commit/b3ef1b487dd0d4cd940a937f13260e17640b6ed3)
- Package: [@sablier/evm-utils@2.0.0](https://www.npmjs.com/package/@sablier/evm-utils/v/2.0.0)

## Configurations

| Compiler Setting | Value    |
| ---------------- | -------- |
| Tool             | Foundry  |
| EVM              | Shanghai |
| Solc             | v0.8.29  |
| Via IR           | false    |
| Optimizer Runs   | 10000    |

### Salt

All deployments used Foundry's `CREATE2` factory.

1. Comptroller Implementation: `Version 1.1.0`
2. Robinhood Chain Comptroller Implementation: `Version 2.0.0`
3. Robinhood Chain Comptroller Proxy: `keccak256(abi.encode("Sablier Comptroller Proxy", 4663, "2.0.0"))`
