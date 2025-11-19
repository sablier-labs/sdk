import { sablier } from "@src/sablier";
import { releases } from "@src/solana/releases";
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
        release: release,
      });
      expect(entry).toStrictEqual(program);
    });
  }
});
