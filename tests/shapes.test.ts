import { Version } from "@src/evm/enums";
import { Shape, shapes } from "@src/evm/shapes";
import {
  getContractMethodsForVersion,
  getLatestContractMethod,
  getShapesByVersion,
  isShapeAvailableInVersion,
} from "@src/evm/shapes/helpers";
import { describe, expect, it } from "vitest";

describe("shapes", () => {
  describe("lockup shapes", () => {
    it("exports all 11 lockup shapes", () => {
      const shapeIds = Object.keys(shapes.lockup);
      expect(shapeIds).toHaveLength(11);
    });

    it("has correct shape IDs", () => {
      expect(shapes.lockup.linear.id).toBe(Shape.Lockup.Linear);
      expect(shapes.lockup.cliff.id).toBe(Shape.Lockup.Cliff);
      expect(shapes.lockup.cliffExponential.id).toBe(Shape.Lockup.CliffExponential);
      expect(shapes.lockup.exponential.id).toBe(Shape.Lockup.Exponential);
      expect(shapes.lockup.backweighted.id).toBe(Shape.Lockup.Backweighted);
      expect(shapes.lockup.stepper.id).toBe(Shape.Lockup.Stepper);
      expect(shapes.lockup.monthly.id).toBe(Shape.Lockup.Monthly);
      expect(shapes.lockup.timelock.id).toBe(Shape.Lockup.Timelock);
      expect(shapes.lockup.unlockLinear.id).toBe(Shape.Lockup.UnlockLinear);
      expect(shapes.lockup.unlockCliff.id).toBe(Shape.Lockup.UnlockCliff);
      expect(shapes.lockup.doubleUnlock.id).toBe(Shape.Lockup.DoubleUnlock);
    });

    it("all shapes have protocol set to lockup", () => {
      for (const shape of Object.values(shapes.lockup)) {
        expect(shape.protocol).toBe("lockup");
      }
    });

    it("all shapes have contract mappings", () => {
      for (const shape of Object.values(shapes.lockup)) {
        expect(shape.contracts.length).toBeGreaterThan(0);
      }
    });

    it("LL shapes map to v3.0 SablierLockup with LL methods", () => {
      const llShapes = [
        shapes.lockup.linear,
        shapes.lockup.cliff,
        shapes.lockup.unlockLinear,
        shapes.lockup.unlockCliff,
      ];
      for (const shape of llShapes) {
        const v3Contract = shape.contracts.find((c) => c.version === "v3.0");
        expect(v3Contract).toBeDefined();
        expect(v3Contract?.contract).toBe("SablierLockup");
        expect(v3Contract?.methods).toContain("createWithDurationsLL");
        expect(v3Contract?.methods).toContain("createWithTimestampsLL");
      }
    });

    it("LD shapes map to v3.0 SablierLockup with LD methods", () => {
      const ldShapes = [
        shapes.lockup.exponential,
        shapes.lockup.cliffExponential,
        shapes.lockup.backweighted,
      ];
      for (const shape of ldShapes) {
        const v3Contract = shape.contracts.find((c) => c.version === "v3.0");
        expect(v3Contract).toBeDefined();
        expect(v3Contract?.contract).toBe("SablierLockup");
        expect(v3Contract?.methods).toContain("createWithDurationsLD");
        expect(v3Contract?.methods).toContain("createWithTimestampsLD");
      }
    });

    it("LT shapes map to v3.0 SablierLockup with LT methods", () => {
      const ltShapes = [
        shapes.lockup.stepper,
        shapes.lockup.monthly,
        shapes.lockup.timelock,
        shapes.lockup.doubleUnlock,
      ];
      for (const shape of ltShapes) {
        const v3Contract = shape.contracts.find((c) => c.version === "v3.0");
        expect(v3Contract).toBeDefined();
        expect(v3Contract?.contract).toBe("SablierLockup");
        expect(v3Contract?.methods).toContain("createWithDurationsLT");
        expect(v3Contract?.methods).toContain("createWithTimestampsLT");
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

    it("has protocol set to flow", () => {
      expect(shapes.flow.flow.protocol).toBe("flow");
    });

    it("maps to SablierFlow contract", () => {
      const v2Contract = shapes.flow.flow.contracts.find((c) => c.version === "v2.0");
      expect(v2Contract).toBeDefined();
      expect(v2Contract?.contract).toBe("SablierFlow");
      expect(v2Contract?.methods).toContain("create");
      expect(v2Contract?.methods).toContain("createAndDeposit");
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
      expect(shapes.airdrops.unlockLinear.id).toBe(Shape.Airdrops.UnlockLinear);
      expect(shapes.airdrops.unlockCliff.id).toBe(Shape.Airdrops.UnlockCliff);
      expect(shapes.airdrops.stepper.id).toBe(Shape.Airdrops.Stepper);
    });

    it("all shapes have protocol set to airdrops", () => {
      for (const shape of Object.values(shapes.airdrops)) {
        expect(shape.protocol).toBe("airdrops");
      }
    });

    it("all shapes have contract mappings", () => {
      for (const shape of Object.values(shapes.airdrops)) {
        expect(shape.contracts.length).toBeGreaterThan(0);
      }
    });

    it("instant shape maps to SablierMerkleInstant", () => {
      const v2Contract = shapes.airdrops.instant.contracts.find((c) => c.version === "v2.0");
      expect(v2Contract).toBeDefined();
      expect(v2Contract?.contract).toBe("SablierMerkleInstant");
      expect(v2Contract?.methods).toContain("claim");
    });

    it("linear shapes map to SablierMerkleLL", () => {
      const llShapes = [
        shapes.airdrops.linear,
        shapes.airdrops.cliff,
        shapes.airdrops.unlockLinear,
        shapes.airdrops.unlockCliff,
      ];
      for (const shape of llShapes) {
        const v2Contract = shape.contracts.find((c) => c.version === "v2.0");
        expect(v2Contract).toBeDefined();
        expect(v2Contract?.contract).toBe("SablierMerkleLL");
        expect(v2Contract?.methods).toContain("claim");
      }
    });

    it("stepper shape maps to SablierMerkleLT", () => {
      const v2Contract = shapes.airdrops.stepper.contracts.find((c) => c.version === "v2.0");
      expect(v2Contract).toBeDefined();
      expect(v2Contract?.contract).toBe("SablierMerkleLT");
      expect(v2Contract?.methods).toContain("claim");
    });
  });

  describe("Shape enums", () => {
    it("Lockup enum has all values", () => {
      expect(Shape.Lockup.Linear).toBe("linear");
      expect(Shape.Lockup.Cliff).toBe("cliff");
      expect(Shape.Lockup.CliffExponential).toBe("cliffExponential");
      expect(Shape.Lockup.Exponential).toBe("exponential");
      expect(Shape.Lockup.Backweighted).toBe("backweighted");
      expect(Shape.Lockup.Stepper).toBe("stepper");
      expect(Shape.Lockup.Monthly).toBe("monthly");
      expect(Shape.Lockup.Timelock).toBe("timelock");
      expect(Shape.Lockup.UnlockLinear).toBe("unlockLinear");
      expect(Shape.Lockup.UnlockCliff).toBe("unlockCliff");
      expect(Shape.Lockup.DoubleUnlock).toBe("doubleUnlock");
    });

    it("Flow enum has all values", () => {
      expect(Shape.Flow.Flow).toBe("flow");
    });

    it("Airdrops enum has all values", () => {
      expect(Shape.Airdrops.Instant).toBe("instant");
      expect(Shape.Airdrops.Linear).toBe("linear");
      expect(Shape.Airdrops.Cliff).toBe("cliff");
      expect(Shape.Airdrops.UnlockLinear).toBe("unlockLinear");
      expect(Shape.Airdrops.UnlockCliff).toBe("unlockCliff");
      expect(Shape.Airdrops.Stepper).toBe("stepper");
    });
  });

  describe("version ordering", () => {
    it("lockup shapes have contracts ordered by version (newest first)", () => {
      for (const shape of Object.values(shapes.lockup)) {
        if (shape.contracts.length > 1) {
          // v3.0 should come before v2.0, etc.
          const versions = shape.contracts.map((c) => c.version);
          const sortedVersions = [...versions].sort().reverse();
          expect(versions).toEqual(sortedVersions);
        }
      }
    });

    it("flow shapes have contracts ordered by version (newest first)", () => {
      const versions = shapes.flow.flow.contracts.map((c) => c.version);
      const sortedVersions = [...versions].sort().reverse();
      expect(versions).toEqual(sortedVersions);
    });

    it("airdrop shapes have contracts ordered by version (newest first)", () => {
      for (const shape of Object.values(shapes.airdrops)) {
        if (shape.contracts.length > 1) {
          const versions = shape.contracts.map((c) => c.version);
          const sortedVersions = [...versions].sort().reverse();
          expect(versions).toEqual(sortedVersions);
        }
      }
    });
  });

  describe("helper functions", () => {
    it("getShapesByVersion returns shapes available for v3.0", () => {
      const v3Shapes = getShapesByVersion(shapes.lockup, "v3.0");
      expect(v3Shapes.length).toBe(11); // All lockup shapes support v3.0
    });

    it("getShapesByVersion returns shapes available for v1.2", () => {
      const v12Shapes = getShapesByVersion(shapes.lockup, "v1.2");
      expect(v12Shapes.length).toBe(11); // All lockup shapes support v1.2
    });

    it("getShapesByVersion returns only LL/LD shapes for v1.0", () => {
      const v10Shapes = getShapesByVersion(shapes.lockup, "v1.0");
      // LT shapes (stepper, monthly, timelock, doubleUnlock) don't support v1.0
      expect(v10Shapes.length).toBe(7);
    });

    it("getContractMethodsForVersion returns correct contract", () => {
      const v3Contract = getContractMethodsForVersion(shapes.lockup.linear, "v3.0");
      expect(v3Contract?.contract).toBe("SablierLockup");
    });

    it("getContractMethodsForVersion returns undefined for unsupported version", () => {
      const v10Contract = getContractMethodsForVersion(shapes.lockup.stepper, "v1.0");
      expect(v10Contract).toBeUndefined();
    });

    it("isShapeAvailableInVersion returns true for supported version", () => {
      expect(isShapeAvailableInVersion(shapes.lockup.linear, "v3.0")).toBe(true);
    });

    it("isShapeAvailableInVersion returns false for unsupported version", () => {
      expect(isShapeAvailableInVersion(shapes.lockup.stepper, "v1.0")).toBe(false);
    });

    it("getLatestContractMethod returns first contract (newest)", () => {
      const latest = getLatestContractMethod(shapes.lockup.linear);
      expect(latest.version).toBe("v3.0");
    });
  });

  describe("version validation", () => {
    it("all lockup shape versions are valid Lockup versions", () => {
      const validVersions = Object.values(Version.Lockup);
      for (const shape of Object.values(shapes.lockup)) {
        for (const contract of shape.contracts) {
          expect(validVersions).toContain(contract.version);
        }
      }
    });

    it("all flow shape versions are valid Flow versions", () => {
      const validVersions = Object.values(Version.Flow);
      for (const contract of shapes.flow.flow.contracts) {
        expect(validVersions).toContain(contract.version);
      }
    });

    it("all airdrop shape versions are valid Airdrops versions", () => {
      const validVersions = Object.values(Version.Airdrops);
      for (const shape of Object.values(shapes.airdrops)) {
        for (const contract of shape.contracts) {
          expect(validVersions).toContain(contract.version);
        }
      }
    });
  });
});
