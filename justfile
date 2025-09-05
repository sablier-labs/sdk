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
test *args:
    bun vitest run --hideSkippedTests {{args}}
alias t := test

# Run tests with UI
test-ui *args:
    bun vitest --hideSkippedTests --ui {{args}}
alias tui := test-ui

# Build with TypeScript CLI
tsc-build:
    bun tsc -p tsconfig.build.json
    bun tsc-alias -p tsconfig.build.json
    bun copyfiles --up 2 src/abi/**/*.json "dist/abi"

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


# Run CLI commands. Usage: just cli <command> [args]
[private]
@cli *args:
    bun run cli {{ args }}
