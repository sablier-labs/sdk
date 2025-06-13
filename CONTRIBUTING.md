## Contributing

### Prerequisites

- [Node.js](https://nodejs.org) (v20+)
- [Just](https://github.com/casey/just) (command runner)
- [Bun](https://bun.sh) (package manager)
- [Ni](https://github.com/antfu-collective/ni) (package manager resolver)

### Setup

```bash
git clone https://github.com/sablier-labs/sdk.git sablier-sdk
cd sablier-sdk
just install
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
