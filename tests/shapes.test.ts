import { Version } from "@src/evm/enums";
import { releases } from "@src/evm/releases";
import type { ShapeWithSolanaSupport } from "@src/shapes";
import {
  airdropShapeIds,
  flowShapeIds,
  getEvmContractMethodsForVersion,
  getEvmShapesByVersion,
  getLatestEvmContractMethod,
  getLatestSolanaProgramMethod,
  getSolanaProgramMethodsForVersion,
  getSolanaShapesByVersion,
  hasSolanaAirdropSupport,
  hasSolanaLockupSupport,
  hasSolanaSupport,
  isAirdropShape,
  isEvmShapeAvailableInVersion,
  isFlowShape,
  isLockupShape,
  isSolanaShapeAvailableInVersion,
  lockupShapeIds,
  Shape,
  shapes,
  solanaAirdropShapeIds,
  solanaLockupShapeIds,
} from "@src/shapes";
import { describe, expect, it } from "vitest";

describe("shapes", () => {
  describe("lockup shapes", () => {
    it("exports all 17 lockup shapes", () => {
      const shapeIds = Object.keys(shapes.lockup);
      expect(shapeIds).toHaveLength(17);
    });

    it("has correct shape IDs", () => {
      // LL shapes
      expect(shapes.lockup.linear.id).toBe(Shape.Lockup.Linear);
      expect(shapes.lockup.cliff.id).toBe(Shape.Lockup.Cliff);
      expect(shapes.lockup.linearUnlockLinear.id).toBe(Shape.Lockup.LinearUnlockLinear);
      expect(shapes.lockup.linearUnlockCliff.id).toBe(Shape.Lockup.LinearUnlockCliff);
      expect(shapes.lockup.linearTimelock.id).toBe(Shape.Lockup.LinearTimelock);
      // LD shapes
      expect(shapes.lockup.dynamicExponential.id).toBe(Shape.Lockup.DynamicExponential);
      expect(shapes.lockup.dynamicCliffExponential.id).toBe(Shape.Lockup.DynamicCliffExponential);
      expect(shapes.lockup.dynamicTimelock.id).toBe(Shape.Lockup.DynamicTimelock);
      expect(shapes.lockup.dynamicMonthly.id).toBe(Shape.Lockup.DynamicMonthly);
      expect(shapes.lockup.dynamicStepper.id).toBe(Shape.Lockup.DynamicStepper);
      expect(shapes.lockup.dynamicUnlockCliff.id).toBe(Shape.Lockup.DynamicUnlockCliff);
      expect(shapes.lockup.dynamicUnlockLinear.id).toBe(Shape.Lockup.DynamicUnlockLinear);
      // LT shapes
      expect(shapes.lockup.tranchedStepper.id).toBe(Shape.Lockup.TranchedStepper);
      expect(shapes.lockup.tranchedMonthly.id).toBe(Shape.Lockup.TranchedMonthly);
      expect(shapes.lockup.tranchedTimelock.id).toBe(Shape.Lockup.TranchedTimelock);
      expect(shapes.lockup.tranchedBackweighted.id).toBe(Shape.Lockup.TranchedBackweighted);
      expect(shapes.lockup.dynamicDoubleUnlock.id).toBe(Shape.Lockup.DynamicDoubleUnlock);
    });

    it("all shapes have evm contract mappings", () => {
      for (const shape of Object.values(shapes.lockup)) {
        expect(shape.evm.length).toBeGreaterThan(0);
      }
    });

    it("LL shapes map to v3.0 SablierLockup with LL methods", () => {
      const llShapes = [
        shapes.lockup.linear,
        shapes.lockup.cliff,
        shapes.lockup.linearUnlockLinear,
        shapes.lockup.linearUnlockCliff,
        shapes.lockup.linearTimelock,
      ];
      for (const shape of llShapes) {
        const v3Contract = shape.evm.find((c) => c.version === "v3.0");
        expect(v3Contract).toBeDefined();
        expect(v3Contract?.contract).toBe("SablierLockup");
        expect(v3Contract?.createMethods).toContain("createWithDurationsLL");
        expect(v3Contract?.createMethods).toContain("createWithTimestampsLL");
      }
    });

    it("LD shapes map to v3.0 SablierLockup with LD methods", () => {
      const ldShapes = [
        shapes.lockup.dynamicExponential,
        shapes.lockup.dynamicCliffExponential,
        shapes.lockup.dynamicTimelock,
        shapes.lockup.dynamicMonthly,
        shapes.lockup.dynamicStepper,
        shapes.lockup.dynamicUnlockCliff,
        shapes.lockup.dynamicUnlockLinear,
        shapes.lockup.tranchedBackweighted,
      ];
      for (const shape of ldShapes) {
        const v3Contract = shape.evm.find((c) => c.version === "v3.0");
        expect(v3Contract).toBeDefined();
        expect(v3Contract?.contract).toBe("SablierLockup");
        expect(v3Contract?.createMethods).toContain("createWithDurationsLD");
        expect(v3Contract?.createMethods).toContain("createWithTimestampsLD");
      }
    });

    it("LT shapes map to v3.0 SablierLockup with LT methods", () => {
      const ltShapes = [
        shapes.lockup.tranchedStepper,
        shapes.lockup.tranchedMonthly,
        shapes.lockup.tranchedTimelock,
        shapes.lockup.dynamicDoubleUnlock,
      ];
      for (const shape of ltShapes) {
        const v3Contract = shape.evm.find((c) => c.version === "v3.0");
        expect(v3Contract).toBeDefined();
        expect(v3Contract?.contract).toBe("SablierLockup");
        expect(v3Contract?.createMethods).toContain("createWithDurationsLT");
        expect(v3Contract?.createMethods).toContain("createWithTimestampsLT");
      }
    });
  });

  describe("flow shapes", () => {
    it("exports 1 flow shape", () => {
      const shapeIds = Object.keys(shapes.flow);
      expect(shapeIds).toHaveLength(1);
    });

    it("has correct shape ID", () => {
      expect(shapes.flow.flow.id).toBe(Shape.Flow.Flow);
    });

    it("maps to SablierFlow contract", () => {
      const v2Contract = shapes.flow.flow.evm.find((c) => c.version === "v2.0");
      expect(v2Contract).toBeDefined();
      expect(v2Contract?.contract).toBe("SablierFlow");
      expect(v2Contract?.createMethods).toContain("create");
      expect(v2Contract?.createMethods).toContain("createAndDeposit");
    });
  });

  describe("airdrop shapes", () => {
    it("exports all 6 airdrop shapes", () => {
      const shapeIds = Object.keys(shapes.airdrops);
      expect(shapeIds).toHaveLength(6);
    });

    it("has correct shape IDs", () => {
      expect(shapes.airdrops.instant.id).toBe(Shape.Airdrops.Instant);
      expect(shapes.airdrops.linear.id).toBe(Shape.Airdrops.Linear);
      expect(shapes.airdrops.cliff.id).toBe(Shape.Airdrops.Cliff);
      expect(shapes.airdrops.linearUnlockLinear.id).toBe(Shape.Airdrops.LinearUnlockLinear);
      expect(shapes.airdrops.linearUnlockCliff.id).toBe(Shape.Airdrops.LinearUnlockCliff);
      expect(shapes.airdrops.tranchedStepper.id).toBe(Shape.Airdrops.TranchedStepper);
    });

    it("all shapes have evm contract mappings", () => {
      for (const shape of Object.values(shapes.airdrops)) {
        expect(shape.evm.length).toBeGreaterThan(0);
      }
    });

    it("instant shape maps to SablierFactoryMerkleInstant", () => {
      const v2Contract = shapes.airdrops.instant.evm.find((c) => c.version === "v2.0");
      expect(v2Contract).toBeDefined();
      expect(v2Contract?.contract).toBe("SablierFactoryMerkleInstant");
      expect(v2Contract?.createMethods).toContain("createMerkleInstant");
    });

    it("linear shapes map to SablierFactoryMerkleLL", () => {
      const llShapes = [
        shapes.airdrops.linear,
        shapes.airdrops.cliff,
        shapes.airdrops.linearUnlockLinear,
        shapes.airdrops.linearUnlockCliff,
      ];
      for (const shape of llShapes) {
        const v2Contract = shape.evm.find((c) => c.version === "v2.0");
        expect(v2Contract).toBeDefined();
        expect(v2Contract?.contract).toBe("SablierFactoryMerkleLL");
        expect(v2Contract?.createMethods).toContain("createMerkleLL");
      }
    });

    it("tranchedStepper shape maps to SablierFactoryMerkleLT", () => {
      const v2Contract = shapes.airdrops.tranchedStepper.evm.find((c) => c.version === "v2.0");
      expect(v2Contract).toBeDefined();
      expect(v2Contract?.contract).toBe("SablierFactoryMerkleLT");
      expect(v2Contract?.createMethods).toContain("createMerkleLT");
    });
  });

  describe("Shape enums", () => {
    it("Lockup enum has all values", () => {
      expect(Shape.Lockup.Linear).toBe("linear");
      expect(Shape.Lockup.Cliff).toBe("cliff");
      expect(Shape.Lockup.DynamicCliffExponential).toBe("dynamicCliffExponential");
      expect(Shape.Lockup.DynamicExponential).toBe("dynamicExponential");
      expect(Shape.Lockup.TranchedBackweighted).toBe("tranchedBackweighted");
      expect(Shape.Lockup.TranchedStepper).toBe("tranchedStepper");
      expect(Shape.Lockup.TranchedMonthly).toBe("tranchedMonthly");
      expect(Shape.Lockup.TranchedTimelock).toBe("tranchedTimelock");
      expect(Shape.Lockup.LinearUnlockLinear).toBe("linearUnlockLinear");
      expect(Shape.Lockup.LinearUnlockCliff).toBe("linearUnlockCliff");
      expect(Shape.Lockup.DynamicDoubleUnlock).toBe("dynamicDoubleUnlock");
    });

    it("Flow enum has all values", () => {
      expect(Shape.Flow.Flow).toBe("flow");
    });

    it("Airdrops enum has all values", () => {
      expect(Shape.Airdrops.Instant).toBe("instant");
      expect(Shape.Airdrops.Linear).toBe("linear");
      expect(Shape.Airdrops.Cliff).toBe("cliff");
      expect(Shape.Airdrops.LinearUnlockLinear).toBe("linearUnlockLinear");
      expect(Shape.Airdrops.LinearUnlockCliff).toBe("linearUnlockCliff");
      expect(Shape.Airdrops.TranchedStepper).toBe("tranchedStepper");
    });
  });

  describe("version ordering", () => {
    it("lockup shapes have contracts ordered by version (newest first)", () => {
      for (const shape of Object.values(shapes.lockup)) {
        if (shape.evm.length > 1) {
          // v3.0 should come before v2.0, etc.
          const versions = shape.evm.map((c) => c.version);
          const sortedVersions = [...versions].sort().reverse();
          expect(versions).toEqual(sortedVersions);
        }
      }
    });

    it("flow shapes have contracts ordered by version (newest first)", () => {
      const versions = shapes.flow.flow.evm.map((c) => c.version);
      const sortedVersions = [...versions].sort().reverse();
      expect(versions).toEqual(sortedVersions);
    });

    it("airdrop shapes have contracts ordered by version (newest first)", () => {
      for (const shape of Object.values(shapes.airdrops)) {
        if (shape.evm.length > 1) {
          const versions = shape.evm.map((c) => c.version);
          const sortedVersions = [...versions].sort().reverse();
          expect(versions).toEqual(sortedVersions);
        }
      }
    });
  });

  describe("helper functions", () => {
    it("getEvmShapesByVersion returns shapes available for v3.0", () => {
      const v3Shapes = getEvmShapesByVersion(shapes.lockup, "v3.0");
      expect(v3Shapes.length).toBe(17); // All lockup shapes support v3.0
    });

    it("getEvmShapesByVersion returns shapes available for v1.2", () => {
      const v12Shapes = getEvmShapesByVersion(shapes.lockup, "v1.2");
      // All except v2.0+ only shapes (linearUnlock*, linearTimelock)
      expect(v12Shapes.length).toBe(14);
    });

    it("getEvmShapesByVersion returns only LL/LD shapes for v1.0", () => {
      const v10Shapes = getEvmShapesByVersion(shapes.lockup, "v1.0");
      // Only linear, cliff (LL) + 8 LD shapes; LT and v2.0+ shapes excluded
      expect(v10Shapes.length).toBe(10);
    });

    it("getEvmContractMethodsForVersion returns correct contract", () => {
      const v3Contract = getEvmContractMethodsForVersion(shapes.lockup.linear, "v3.0");
      expect(v3Contract?.contract).toBe("SablierLockup");
    });

    it("getEvmContractMethodsForVersion returns undefined for unsupported version", () => {
      const v10Contract = getEvmContractMethodsForVersion(shapes.lockup.tranchedStepper, "v1.0");
      expect(v10Contract).toBeUndefined();
    });

    it("isEvmShapeAvailableInVersion returns true for supported version", () => {
      expect(isEvmShapeAvailableInVersion(shapes.lockup.linear, "v3.0")).toBe(true);
    });

    it("isEvmShapeAvailableInVersion returns false for unsupported version", () => {
      expect(isEvmShapeAvailableInVersion(shapes.lockup.tranchedStepper, "v1.0")).toBe(false);
    });

    it("getLatestEvmContractMethod returns first contract (newest)", () => {
      const latest = getLatestEvmContractMethod(shapes.lockup.linear);
      expect(latest.version).toBe("v3.0");
    });
  });

  describe("version validation", () => {
    it("all lockup shape versions are valid Lockup versions", () => {
      const validVersions = Object.values(Version.Lockup);
      for (const shape of Object.values(shapes.lockup)) {
        for (const contract of shape.evm) {
          expect(validVersions).toContain(contract.version);
        }
      }
    });

    it("all flow shape versions are valid Flow versions", () => {
      const validVersions = Object.values(Version.Flow);
      for (const contract of shapes.flow.flow.evm) {
        expect(validVersions).toContain(contract.version);
      }
    });

    it("all airdrop shape versions are valid Airdrops versions", () => {
      const validVersions = Object.values(Version.Airdrops);
      for (const shape of Object.values(shapes.airdrops)) {
        for (const contract of shape.evm) {
          expect(validVersions).toContain(contract.version);
        }
      }
    });
  });

  describe("shape ID arrays", () => {
    it("lockupShapeIds contains all 17 lockup shapes", () => {
      expect(lockupShapeIds).toHaveLength(17);
      expect(lockupShapeIds).toContain(Shape.Lockup.Linear);
      expect(lockupShapeIds).toContain(Shape.Lockup.Cliff);
      expect(lockupShapeIds).toContain(Shape.Lockup.TranchedStepper);
    });

    it("flowShapeIds contains all 1 flow shape", () => {
      expect(flowShapeIds).toHaveLength(1);
      expect(flowShapeIds).toContain(Shape.Flow.Flow);
    });

    it("airdropShapeIds contains all 6 airdrop shapes", () => {
      expect(airdropShapeIds).toHaveLength(6);
      expect(airdropShapeIds).toContain(Shape.Airdrops.Instant);
      expect(airdropShapeIds).toContain(Shape.Airdrops.Linear);
      expect(airdropShapeIds).toContain(Shape.Airdrops.TranchedStepper);
    });
  });

  describe("type guards", () => {
    it("isLockupShape returns true for valid lockup shapes", () => {
      expect(isLockupShape("linear")).toBe(true);
      expect(isLockupShape("cliff")).toBe(true);
      expect(isLockupShape("tranchedStepper")).toBe(true);
      expect(isLockupShape(Shape.Lockup.Linear)).toBe(true);
    });

    it("isLockupShape returns false for invalid values", () => {
      expect(isLockupShape("invalid")).toBe(false);
      expect(isLockupShape("flow")).toBe(false);
      expect(isLockupShape("instant")).toBe(false);
      expect(isLockupShape(null)).toBe(false);
      expect(isLockupShape(undefined)).toBe(false);
      expect(isLockupShape(123)).toBe(false);
    });

    it("isFlowShape returns true for valid flow shapes", () => {
      expect(isFlowShape("flow")).toBe(true);
      expect(isFlowShape(Shape.Flow.Flow)).toBe(true);
    });

    it("isFlowShape returns false for invalid values", () => {
      expect(isFlowShape("invalid")).toBe(false);
      expect(isFlowShape("linear")).toBe(false);
      expect(isFlowShape(null)).toBe(false);
    });

    it("isAirdropShape returns true for valid airdrop shapes", () => {
      expect(isAirdropShape("instant")).toBe(true);
      expect(isAirdropShape("linear")).toBe(true);
      expect(isAirdropShape("tranchedStepper")).toBe(true);
      expect(isAirdropShape(Shape.Airdrops.Instant)).toBe(true);
    });

    it("isAirdropShape returns false for invalid values", () => {
      expect(isAirdropShape("invalid")).toBe(false);
      expect(isAirdropShape("flow")).toBe(false);
      expect(isAirdropShape("dynamicExponential")).toBe(false);
      expect(isAirdropShape(null)).toBe(false);
    });
  });

  describe("Solana support", () => {
    it("hasSolanaSupport returns true for shapes with solana field", () => {
      expect(hasSolanaSupport(shapes.lockup.linear)).toBe(true);
      expect(hasSolanaSupport(shapes.lockup.cliff)).toBe(true);
      expect(hasSolanaSupport(shapes.lockup.linearUnlockLinear)).toBe(true);
      expect(hasSolanaSupport(shapes.lockup.linearUnlockCliff)).toBe(true);
      expect(hasSolanaSupport(shapes.airdrops.instant)).toBe(true);
    });

    it("hasSolanaSupport returns false for shapes without solana field", () => {
      expect(hasSolanaSupport(shapes.lockup.tranchedBackweighted)).toBe(false);
      expect(hasSolanaSupport(shapes.lockup.dynamicExponential)).toBe(false);
      expect(hasSolanaSupport(shapes.lockup.tranchedStepper)).toBe(false);
      expect(hasSolanaSupport(shapes.flow.flow)).toBe(false);
      expect(hasSolanaSupport(shapes.airdrops.linear)).toBe(false);
    });

    it("hasSolanaLockupSupport returns true for supported lockup shapes", () => {
      expect(hasSolanaLockupSupport(Shape.Lockup.Linear)).toBe(true);
      expect(hasSolanaLockupSupport(Shape.Lockup.Cliff)).toBe(true);
      expect(hasSolanaLockupSupport(Shape.Lockup.LinearUnlockLinear)).toBe(true);
      expect(hasSolanaLockupSupport(Shape.Lockup.LinearUnlockCliff)).toBe(true);
    });

    it("hasSolanaLockupSupport returns false for unsupported lockup shapes", () => {
      expect(hasSolanaLockupSupport(Shape.Lockup.TranchedBackweighted)).toBe(false);
      expect(hasSolanaLockupSupport(Shape.Lockup.DynamicExponential)).toBe(false);
      expect(hasSolanaLockupSupport(Shape.Lockup.TranchedStepper)).toBe(false);
    });

    it("hasSolanaAirdropSupport returns true for supported airdrop shapes", () => {
      expect(hasSolanaAirdropSupport(Shape.Airdrops.Instant)).toBe(true);
    });

    it("hasSolanaAirdropSupport returns false for unsupported airdrop shapes", () => {
      expect(hasSolanaAirdropSupport(Shape.Airdrops.Linear)).toBe(false);
      expect(hasSolanaAirdropSupport(Shape.Airdrops.Cliff)).toBe(false);
      expect(hasSolanaAirdropSupport(Shape.Airdrops.TranchedStepper)).toBe(false);
    });

    it("solanaLockupShapeIds matches shapes with actual Solana support", () => {
      const shapesWithSolana = Object.values(shapes.lockup).filter(hasSolanaSupport);
      expect(solanaLockupShapeIds).toHaveLength(shapesWithSolana.length);
      for (const shape of shapesWithSolana) {
        expect(solanaLockupShapeIds).toContain(shape.id);
      }
    });

    it("solanaAirdropShapeIds matches shapes with actual Solana support", () => {
      const shapesWithSolana = Object.values(shapes.airdrops).filter(hasSolanaSupport);
      expect(solanaAirdropShapeIds).toHaveLength(shapesWithSolana.length);
      for (const shape of shapesWithSolana) {
        expect(solanaAirdropShapeIds).toContain(shape.id);
      }
    });
  });

  describe("Solana helper functions", () => {
    it("getSolanaShapesByVersion returns shapes available for v0.1", () => {
      const lockupShapesWithSolana = Object.fromEntries(
        Object.entries(shapes.lockup).filter(([_, shape]) => hasSolanaSupport(shape)),
      ) as Record<string, ShapeWithSolanaSupport>;
      const v01Shapes = getSolanaShapesByVersion(lockupShapesWithSolana, "v0.1");
      // linear, cliff, linearUnlockLinear, linearUnlockCliff, linearTimelock
      expect(v01Shapes.length).toBe(5);
    });

    it("getSolanaProgramMethodsForVersion returns correct program", () => {
      const linearShape = shapes.lockup.linear;
      if (hasSolanaSupport(linearShape)) {
        const v01Program = getSolanaProgramMethodsForVersion(linearShape, "v0.1");
        expect(v01Program?.program).toBe("SablierLockupLinear");
      }
    });

    it("getSolanaProgramMethodsForVersion returns undefined for unsupported version", () => {
      const linearShape = shapes.lockup.linear;
      if (hasSolanaSupport(linearShape)) {
        // v0.2 doesn't exist
        const v02Program = getSolanaProgramMethodsForVersion(linearShape, "v0.2" as "v0.1");
        expect(v02Program).toBeUndefined();
      }
    });

    it("isSolanaShapeAvailableInVersion returns true for supported version", () => {
      const linearShape = shapes.lockup.linear;
      if (hasSolanaSupport(linearShape)) {
        expect(isSolanaShapeAvailableInVersion(linearShape, "v0.1")).toBe(true);
      }
    });

    it("isSolanaShapeAvailableInVersion returns false for unsupported version", () => {
      const linearShape = shapes.lockup.linear;
      if (hasSolanaSupport(linearShape)) {
        expect(isSolanaShapeAvailableInVersion(linearShape, "v0.2" as "v0.1")).toBe(false);
      }
    });

    it("getLatestSolanaProgramMethod returns first program (newest)", () => {
      const linearShape = shapes.lockup.linear;
      if (hasSolanaSupport(linearShape)) {
        const latest = getLatestSolanaProgramMethod(linearShape);
        expect(latest.version).toBe("v0.1");
        expect(latest.program).toBe("SablierLockupLinear");
      }
    });
  });

  describe("contract existence validation", () => {
    it("all airdrop shape contracts exist in their version manifests", () => {
      for (const shape of Object.values(shapes.airdrops)) {
        for (const { contract, version } of shape.evm) {
          const release = releases.airdrops[version as Version.Airdrops];
          expect(
            release.contractNames,
            `${shape.id}: contract "${contract}" not found in airdrops ${version} manifest`,
          ).toContain(contract);
        }
      }
    });

    it("all flow shape contracts exist in their version manifests", () => {
      for (const shape of Object.values(shapes.flow)) {
        for (const { contract, version } of shape.evm) {
          const release = releases.flow[version as Version.Flow];
          expect(
            release.contractNames,
            `${shape.id}: contract "${contract}" not found in flow ${version} manifest`,
          ).toContain(contract);
        }
      }
    });

    it("all lockup shape contracts exist in their version manifests", () => {
      for (const shape of Object.values(shapes.lockup)) {
        for (const { contract, version } of shape.evm) {
          const release = releases.lockup[version as Version.Lockup];
          expect(
            release.contractNames,
            `${shape.id}: contract "${contract}" not found in lockup ${version} manifest`,
          ).toContain(contract);
        }
      }
    });
  });

  describe("airdrop shape contract type validation", () => {
    // Factory contracts create campaigns:
    // - v2.0: Type-specific factories ending with LT/LL/Instant
    // - v1.3: SablierMerkleFactory (unified, supports all types)
    // - v1.2: SablierV2MerkleLockupFactory (unified, supports LT/LL)
    // - v1.1: SablierV2MerkleStreamerFactory (supports LL only)
    const ltFactoryPattern = /LT$|MerkleLockupFactory$|^SablierMerkleFactory$/;
    const llFactoryPattern =
      /LL$|MerkleLockupFactory$|MerkleStreamerFactory$|^SablierMerkleFactory$/;
    const instantFactoryPattern = /Instant$|^SablierMerkleFactory$/;

    it("tranchedStepper shape only maps to LT (tranched) factory contracts", () => {
      for (const { contract, version } of shapes.airdrops.tranchedStepper.evm) {
        expect(
          ltFactoryPattern.test(contract),
          `tranchedStepper shape has non-LT factory contract "${contract}" in ${version}`,
        ).toBe(true);
      }
    });

    it("linear shapes only map to LL (linear) factory contracts", () => {
      const llShapes = [
        shapes.airdrops.linear,
        shapes.airdrops.cliff,
        shapes.airdrops.linearUnlockLinear,
        shapes.airdrops.linearUnlockCliff,
      ];
      for (const shape of llShapes) {
        for (const { contract, version } of shape.evm) {
          expect(
            llFactoryPattern.test(contract),
            `${shape.id} shape has non-LL factory contract "${contract}" in ${version}`,
          ).toBe(true);
        }
      }
    });

    it("instant shape only maps to Instant factory contracts", () => {
      for (const { contract, version } of shapes.airdrops.instant.evm) {
        expect(
          instantFactoryPattern.test(contract),
          `instant shape has non-Instant factory contract "${contract}" in ${version}`,
        ).toBe(true);
      }
    });
  });
});
