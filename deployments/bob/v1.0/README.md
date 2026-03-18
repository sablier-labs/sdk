# v1.0.0

## Contracts deployed

- `SablierBob`
- `SablierEscrow`
- `SablierLidoAdapter`

## Sources

- Commit: [b7729a25](https://github.com/sablier-labs/evm-monorepo/commit/b7729a25)
- Package: [@sablier/bob@1.0.0](https://npmjs.com/package/@sablier/bob/v/1.0.0)

## Configurations

| Compiler Setting | Value    |
| ---------------- | -------- |
| Tool             | Foundry  |
| EVM              | Shanghai |
| Solc             | v0.8.29  |
| Via IR           | true     |
| Optimizer Runs   | 1000000  |

## Salts

All contracts are deployed using Foundry's `CREATE2` factory. The following salts are used:

### Mainnets

| Chain    | Salt                     |
| :------- | :----------------------- |
| Ethereum | ChainID 1, Version 1.0.0 |

### Testnets

| Chain   | Salt                            |
| :------ | :------------------------------ |
| Sepolia | ChainID 11155111, Version 1.0.0 |
