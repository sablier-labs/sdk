# See https://github.com/sablier-labs/devkit/blob/main/just/base.just
import "./node_modules/@sablier/devkit/just/base.just"

# ---------------------------------------------------------------------------- #
#                                 DEPENDENCIES                                 #
# ---------------------------------------------------------------------------- #

# https://github.com/jqlang/jq
jq := require("jq")

# ---------------------------------------------------------------------------- #
#                                    RECIPES                                   #
# ---------------------------------------------------------------------------- #

# Default recipe
default:
    just --list

# Build the project
build: clean tsc-build
alias b := build

# Clean the dist directory
clean:
    bunx del-cli dist

# Setup Husky
setup:
    bun husky

# Run tests
test args="--silent":
    bun vitest run {{ args }}
alias t := test

# Run tests in watch mode
test-watch:
    bun vitest --silent

# Build with TypeScript CLI
tsc-build:
    bun tsc -p tsconfig.build.json
    bun tsc-alias -p tsconfig.build.json

# ---------------------------------------------------------------------------- #
#                                     PRINT                                    #
# ---------------------------------------------------------------------------- #

# Run print CLI commands.
[group("print")]
@print-aliases:
    just cli print aliases

# Run print CLI commands.
[group("print")]
@print-chains:
    just cli print chains

# Run print CLI commands.
[group("print")]
@print-missing-broadcasts protocol:
    just cli print missing-broadcasts --protocol {{ protocol }}

# Run print CLI commands.
[group("print")]
@print-versions:
    just cli print versions

# ---------------------------------------------------------------------------- #
#                                    PUBLISH                                   #
# ---------------------------------------------------------------------------- #

# Publish the npm package, e.g. v1.0.0
# Make sure you are authenticated with npm, run `npm whoami` to check.
[group("publish")]
publish *args:
  npm publish {{ args }}
  @just tag $(jq -r '.version' package.json)

# Publish the npm package using the `beta` tag, e.g. v1.0.0-beta.1
[group("publish")]
publish-beta *args:
  @just _check-beta-version
  npm publish --tag beta {{ args }}

# Tag the new version
[group("publish")]
tag *version:
  git tag -am "{{ version }}" {{ version }}
  git push origin --tags

# ---------------------------------------------------------------------------- #
#                                PRIVATE HELPERS                               #
# ---------------------------------------------------------------------------- #

# Check that package.json version includes -beta.x suffix
[private]
_check-beta-version:
  #!/usr/bin/env sh

  # Extract version from package.json using jq for reliable JSON parsing
  version=$(jq -r '.version' package.json)

  # Check if version contains -beta suffix
  if [[ "$version" =~ -beta\.[0-9]+$ ]]; then
    echo "✓ Version $version includes beta suffix"
  else
    echo "✗ Error: Version $version does not include -beta.x suffix"
    echo "Please update package.json version to include -beta.x (e.g., 1.0.0-beta.1)"
    exit 1
  fi


# Run CLI commands. Usage: just cli <command> [args]
[private]
@cli *args:
    bun run cli {{ args }}
