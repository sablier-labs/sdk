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
bun setup
```

### Available Commands

```bash
just --list                 # Show all available commands
just build                  # Build the TypeScript package
just full-check             # Run all code quality checks
just biome-write <files>    # Auto-fix changed code
just prettier-write <files> # Format changed docs
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

### Adding New Protocol Deployments

TODO

### Versioning and Publishing

> [!IMPORTANT]
>
> Make sure the `CHANGELOG.md` is updated with the new version and the changes.

- After adding new chains or new deployments, bump the minor version. E.g. if the current version is `v1.0.0`, the next
  version should be `v1.1.0`.
- Commit the version and changelog changes.
- Create an annotated tag matching the package version, e.g. `git tag -a v1.1.0 -m "v1.1.0"`.
- Use `v1.1.0-beta.1` for an experimental prerelease.
- Push the commit.
- Push the tag with `git push origin <tag>`.
- `.github/workflows/release.yml` stages the package through npm trusted publishing. Prereleases use their identifier as
  the dist-tag, e.g. `beta`.
- A maintainer approves the staged version with 2FA on npmjs.com under Staged Packages or with
  `npm stage approve <stage-id>`. The version stays unpublished until approval.
- Do not run `npm publish`, `just publish`, `just publish-beta`, or `just tag` locally. Agents must also leave staged
  package approval or rejection to a maintainer.
