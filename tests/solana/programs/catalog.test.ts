import { describe, expect, it } from "vitest";
import { sablier } from "@/src/sablier.js";
import { allSolanaReleases } from "../releases.js";

describe("Program catalog", () => {
  for (const release of allSolanaReleases) {
    it(`should have a valid catalog for ${release.protocol} ${release.version}`, () => {
      const deployment = release.deployments[0];
      const program = deployment.programs[0];
      const entry = sablier.solana.programs.get({
        chainId: deployment.chainId,
        contractName: program.name,
        release,
      });
      expect(entry).toStrictEqual(program);
    });
  }
});

describe("alias lookups", () => {
  it("should resolve a program by alias", () => {
    const programWithAlias = allSolanaReleases
      .flatMap((release) => release.deployments)
      .flatMap((deployment) => deployment.programs)
      .find((program) => program.alias);

    expect(programWithAlias).toBeDefined();

    const program = programWithAlias!;
    const resolved = sablier.solana.programs.getByAlias({
      alias: program.alias!,
      chainId: program.chainId,
      protocol: program.protocol,
    });

    expect(resolved).toStrictEqual(program);
  });
});
