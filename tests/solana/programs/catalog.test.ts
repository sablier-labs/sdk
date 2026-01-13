import { sablier } from "@src/sablier.js";
import { releases } from "@src/solana/releases/index.js";
import { describe, expect, it } from "vitest";

describe("Program catalog", () => {
  const releasesToTest = [releases.airdrops["v0.1"], releases.lockup["v0.1"]];

  for (const release of releasesToTest) {
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
    const releasesList = Object.values(releases).flatMap((byVersion) => Object.values(byVersion));
    const programWithAlias = releasesList
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
