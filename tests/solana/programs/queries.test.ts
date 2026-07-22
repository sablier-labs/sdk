import { describe, expect, it } from "vitest";
import { sablier } from "@/src/sablier.js";
import { allSolanaReleases } from "../releases.js";

describe("programsQueries.get", () => {
  describe("{ chainId, programName, release }", () => {
    for (const release of allSolanaReleases) {
      it(`should return program when found for ${release.protocol} ${release.version}`, () => {
        const [deployment] = release.deployments;
        const [program] = deployment.programs;

        const result = sablier.solana.programs.get({
          chainId: deployment.chainId,
          contractName: program.name,
          release,
        });

        expect(result).toStrictEqual(program);
      });
    }
  });

  describe("{ chainId, programAddress, protocol }", () => {
    for (const release of allSolanaReleases) {
      it(`should return program when found in single release for ${release.protocol} ${release.version}`, () => {
        const [deployment] = release.deployments;
        const [program] = deployment.programs;

        const result = sablier.solana.programs.get({
          chainId: deployment.chainId,
          contractAddress: program.address,
          protocol: release.protocol,
        });

        expect(result).toStrictEqual(program);
      });
    }
  });

  describe("{ chainId, programAddress, protocol, release }", () => {
    for (const release of allSolanaReleases) {
      it(`should return program when found for ${release.protocol} ${release.version}`, () => {
        const [deployment] = release.deployments;
        const [program] = deployment.programs;

        const result = sablier.solana.programs.get({
          chainId: deployment.chainId,
          contractAddress: program.address,
          protocol: release.protocol,
          release,
        });

        expect(result).toStrictEqual(program);
      });
    }
  });

  describe("{ chainId, programAddress, release }", () => {
    for (const release of allSolanaReleases) {
      it(`should return program when found for ${release.protocol} ${release.version}`, () => {
        const [deployment] = release.deployments;
        const [program] = deployment.programs;

        const result = sablier.solana.programs.get({
          chainId: deployment.chainId,
          contractAddress: program.address,
          release,
        });

        expect(result).toStrictEqual(program);
      });
    }
  });
});
