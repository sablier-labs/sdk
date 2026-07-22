import { describe, expect, it } from "vitest";
import { sablier } from "@/src/sablier.js";
import { expectEntry } from "../../assertions.js";
import { allSolanaReleases } from "../releases.js";

describe("Program catalog", () => {
  for (const release of allSolanaReleases) {
    it(`should have a valid catalog for ${release.protocol} ${release.version}`, () => {
      for (const deployment of release.deployments) {
        for (const program of deployment.programs) {
          const entry = sablier.solana.programs.get({
            chainId: deployment.chainId,
            contractName: program.name,
            release,
          });
          expect(entry).toStrictEqual(program);
        }
      }
    });
  }
});

describe("alias lookups", () => {
  it("should resolve a program by alias", () => {
    const programWithAlias = allSolanaReleases
      .flatMap((release) => release.deployments)
      .flatMap((deployment) => deployment.programs)
      .find((entry) => entry.alias);

    const program = expectEntry(programWithAlias, "Expected an aliased Solana program");
    const resolved = sablier.solana.programs.getByAlias({
      alias: program.alias!,
      chainId: program.chainId,
      protocol: program.protocol,
    });

    expect(resolved).toStrictEqual(program);
  });
});
