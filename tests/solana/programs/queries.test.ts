import { describe, expect, it } from "vitest";
import { sablier } from "@/src/sablier.js";
import { allSolanaReleases } from "../releases.js";

describe("programsQueries.get", () => {
  describe("{ chainId, programName, release }", () => {
    for (const release of allSolanaReleases) {
      it("should return program when found", () => {
        const deployment = release.deployments[0];
        const program = deployment.programs[0];

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
    it("should return program when found in single release", () => {
      const release = allSolanaReleases[0];
      const deployment = release.deployments[0];
      const program = deployment.programs[0];

      const result = sablier.solana.programs.get({
        chainId: deployment.chainId,
        contractAddress: program.address,
        protocol: release.protocol,
      });

      expect(result).toStrictEqual(program);
    });
  });

  describe("{ chainId, programAddress, protocol, release }", () => {
    it("should return program when found", () => {
      const release = allSolanaReleases[0];
      const deployment = release.deployments[0];
      const program = deployment.programs[0];

      const result = sablier.solana.programs.get({
        chainId: deployment.chainId,
        contractAddress: program.address,
        protocol: release.protocol,
        release,
      });

      expect(result).toStrictEqual(program);
    });
  });

  describe("{ chainId, programAddress, release }", () => {
    it("should return program when found", () => {
      const release = allSolanaReleases[0];
      const deployment = release.deployments[0];
      const program = deployment.programs[0];

      const result = sablier.solana.programs.get({
        chainId: deployment.chainId,
        contractAddress: program.address,
        release,
      });

      expect(result).toStrictEqual(program);
    });
  });
});
