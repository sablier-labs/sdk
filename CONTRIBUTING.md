## Contributing

### Prerequisites

- [Node.js](https://nodejs.org) (v20+)
- [Bun](https://bun.sh) (package manager)
- [Just](https://github.com/casey/just) (command runner)
- [Ni](https://github.com/antfu-collective/ni) (package manager resolver)

### Setup

```bash
git clone https://github.com/sablier-labs/sdk.git sablier-sdk
cd sablier-sdk
bun install
```

### Available Commands

```bash
just --list                 # Show all available commands
just build                  # Build the TypeScript package
just full-check             # Run all code quality checks
just full-write             # Auto-fix formatting and linting
just test                   # Run test suite
```

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `just full-check` to verify code quality
5. Submit a pull request

### Adding New Chains

TODO

### Adding New Deployments

TODO
