import { describe, expect, it } from "vitest";
import { sablier } from "@/src/sablier.js";
import { Protocol } from "@/src/solana/enums.js";
import type { AliasedSolanaProgramEntry } from "../releases.js";
import { allAliasedSolanaProgramEntries } from "../releases.js";

function expectEntry<T>(entry: T | undefined, message: string): T {
  expect(entry).toBeDefined();
  if (!entry) {
    throw new Error(message);
  }

  return entry;
}

const aliasedProgramEntry: AliasedSolanaProgramEntry | undefined =
  allAliasedSolanaProgramEntries[0];

describe("programsQueries.getByAlias", () => {
  describe("{ alias, chainId }", () => {
    it("should return program for an existing alias", () => {
      const programEntry = expectEntry(aliasedProgramEntry, "Expected an aliased Solana program");

      const result = sablier.solana.programs.getByAlias({
        alias: programEntry.program.alias,
        chainId: programEntry.deployment.chainId,
      });

      expect(result).toBeDefined();
      expect(result?.alias).toBe(programEntry.program.alias);
      expect(result?.version).toBe(programEntry.release.version);
      expect(result?.address).toBe(programEntry.program.address);
    });

    it("should return undefined for non-existent alias", () => {
      const result = sablier.solana.programs.getByAlias({
        alias: "NONEXISTENT",
        chainId: 1,
      });

      expect(result).toBeUndefined();
    });

    it("should return undefined for valid alias on wrong chain", () => {
      const programEntry = expectEntry(aliasedProgramEntry, "Expected an aliased Solana program");

      const result = sablier.solana.programs.getByAlias({
        alias: programEntry.program.alias,
        chainId: 999_999, // Non-existent chain
      });

      expect(result).toBeUndefined();
    });
  });

  describe("{ alias, chainId, protocol }", () => {
    it("should scope search to specific protocol", () => {
      const programEntry = expectEntry(aliasedProgramEntry, "Expected an aliased Solana program");

      const result = sablier.solana.programs.getByAlias({
        alias: programEntry.program.alias,
        chainId: programEntry.deployment.chainId,
        protocol: programEntry.release.protocol,
      });

      expect(result).toBeDefined();
      expect(result?.protocol).toBe(programEntry.release.protocol);
      expect(result?.alias).toBe(programEntry.program.alias);
    });

    it("should return undefined when alias not in specified protocol", () => {
      const programEntry = expectEntry(aliasedProgramEntry, "Expected an aliased Solana program");

      const wrongProtocol =
        programEntry.release.protocol === Protocol.Lockup ? Protocol.Airdrops : Protocol.Lockup;

      const result = sablier.solana.programs.getByAlias({
        alias: programEntry.program.alias,
        chainId: programEntry.deployment.chainId,
        protocol: wrongProtocol,
      });

      expect(result).toBeUndefined();
    });
  });
});
