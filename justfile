# See https://github.com/sablier-labs/devkit/blob/main/just/base.just
import "./node_modules/@sablier/devkit/just/base.just"

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
    bunx rimraf dist

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

# Setup Husky
setup:
    bun husky

# Run tests
test:
    bun vitest run --silent
alias t := test

# Run tests with UI
test-ui:
    bun vitest --silent --ui

# Run tests in watch mode
test-watch:
    bun vitest --silent

# Build TypeScript
tsc-build:
    bun tsc -p tsconfig.build.json
    bun tsc-alias -p tsconfig.build.json


# ---------------------------------------------------------------------------- #
#                               RECIPES: PRIVATE                               #
# ---------------------------------------------------------------------------- #


# Run CLI commands. Usage: just cli <command> [args]
[private]
@cli *args:
    bun run cli {{ args }}
