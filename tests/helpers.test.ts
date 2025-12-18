import { Protocol as EvmProtocol } from "@src/evm/enums";
import { resolveStreamId } from "@src/helpers";
import { CHAIN_ID_SOLANA_DEVNET, CHAIN_ID_SOLANA_MAINNET_BETA } from "@src/solana/chains/data";
import { Protocol as SolanaProtocol } from "@src/solana/enums";
import { describe, expect, it } from "vitest";

describe("resolveStreamId", () => {
  describe("EVM chains", () => {
    it("routes to EVM implementation for Ethereum (chainId: 1)", () => {
      const result = resolveStreamId({
        alias: "LL2",
        chainId: 1,
        protocol: EvmProtocol.Lockup,
        tokenId: 123,
      });

      // Should return EVM format: lowercase address-chainId-tokenId
      expect(result).toMatch(/^0x[a-f0-9]{40}-1-123$/);
    });

    it("routes to EVM implementation for other EVM chains", () => {
      const result = resolveStreamId({
        alias: "LL2",
        chainId: 8453, // Base
        protocol: EvmProtocol.Lockup,
        tokenId: 456n,
      });

      // Should return EVM format
      expect(result).toMatch(/^0x[a-f0-9]{40}-8453-456$/);
    });

    it("supports bigint tokenId for EVM", () => {
      const result = resolveStreamId({
        alias: "LL2",
        chainId: 1,
        protocol: EvmProtocol.Lockup,
        tokenId: 999n,
      });

      expect(result).toMatch(/^0x[a-f0-9]{40}-1-999$/);
    });

    it("supports string tokenId for EVM", () => {
      const result = resolveStreamId({
        alias: "LL2",
        chainId: 1,
        protocol: EvmProtocol.Lockup,
        tokenId: "789",
      });

      expect(result).toMatch(/^0x[a-f0-9]{40}-1-789$/);
    });

    it("throws for unknown EVM alias", () => {
      expect(() =>
        resolveStreamId({
          alias: "UNKNOWN_ALIAS",
          chainId: 1,
          tokenId: 1,
        }),
      ).toThrowError(/Unknown EVM contract alias/);
    });
  });

  describe("Solana chains", () => {
    it("routes to Solana implementation for mainnet-beta", () => {
      const result = resolveStreamId({
        alias: "LL",
        chainId: CHAIN_ID_SOLANA_MAINNET_BETA,
        protocol: SolanaProtocol.Lockup,
        tokenId: 123,
      });

      // Should return Solana format: base58 address-chainId-tokenId
      expect(result).toBe(
        `4EauRKrNErKfsR4XetEZJNmvACGHbHnHV4R5dvJuqupC-${CHAIN_ID_SOLANA_MAINNET_BETA}-123`,
      );
    });

    it("routes to Solana implementation for devnet", () => {
      const result = resolveStreamId({
        alias: "LL",
        chainId: CHAIN_ID_SOLANA_DEVNET,
        protocol: SolanaProtocol.Lockup,
        tokenId: 456,
      });

      // Should return Solana format with devnet chainId (same address as mainnet)
      expect(result).toBe(
        `4EauRKrNErKfsR4XetEZJNmvACGHbHnHV4R5dvJuqupC-${CHAIN_ID_SOLANA_DEVNET}-456`,
      );
    });

    it("supports bigint tokenId for Solana", () => {
      const result = resolveStreamId({
        alias: "LL",
        chainId: CHAIN_ID_SOLANA_MAINNET_BETA,
        protocol: SolanaProtocol.Lockup,
        tokenId: 999n,
      });

      expect(result).toBe(
        `4EauRKrNErKfsR4XetEZJNmvACGHbHnHV4R5dvJuqupC-${CHAIN_ID_SOLANA_MAINNET_BETA}-999`,
      );
    });

    it("supports string tokenId for Solana", () => {
      const result = resolveStreamId({
        alias: "LL",
        chainId: CHAIN_ID_SOLANA_MAINNET_BETA,
        protocol: SolanaProtocol.Lockup,
        tokenId: "789",
      });

      expect(result).toBe(
        `4EauRKrNErKfsR4XetEZJNmvACGHbHnHV4R5dvJuqupC-${CHAIN_ID_SOLANA_MAINNET_BETA}-789`,
      );
    });

    it("throws for unknown Solana alias", () => {
      expect(() =>
        resolveStreamId({
          alias: "UNKNOWN_ALIAS",
          chainId: CHAIN_ID_SOLANA_MAINNET_BETA,
          tokenId: 1,
        }),
      ).toThrowError(/Unknown Solana program alias/);
    });
  });

  describe("chain ID threshold", () => {
    it("correctly distinguishes EVM from Solana chains", () => {
      // Regular EVM chain (< 900000000)
      const evmResult = resolveStreamId({
        alias: "LL2",
        chainId: 8453, // Base
        protocol: EvmProtocol.Lockup,
        tokenId: 1,
      });
      expect(evmResult).toMatch(/^0x[a-f0-9]{40}-8453-1$/);

      // Solana chain (>= 900000000)
      const solanaResult = resolveStreamId({
        alias: "LL",
        chainId: CHAIN_ID_SOLANA_MAINNET_BETA, // 900000010
        protocol: SolanaProtocol.Lockup,
        tokenId: 1,
      });
      expect(solanaResult).toContain(`${CHAIN_ID_SOLANA_MAINNET_BETA}-1`);
    });
  });

  describe("protocol disambiguation", () => {
    it("uses protocol to disambiguate EVM aliases", () => {
      const result = resolveStreamId({
        alias: "LL2",
        chainId: 1,
        protocol: EvmProtocol.Lockup,
        tokenId: 123,
      });

      expect(result).toMatch(/^0x[a-f0-9]{40}-1-123$/);
    });

    it("uses protocol to disambiguate Solana aliases", () => {
      const result = resolveStreamId({
        alias: "LL",
        chainId: CHAIN_ID_SOLANA_MAINNET_BETA,
        protocol: SolanaProtocol.Lockup,
        tokenId: 123,
      });

      expect(result).toBe(
        `4EauRKrNErKfsR4XetEZJNmvACGHbHnHV4R5dvJuqupC-${CHAIN_ID_SOLANA_MAINNET_BETA}-123`,
      );
    });
  });

  describe("protocol/chain validation", () => {
    it("throws when EVM-only protocol (Flow) is used with Solana chain", () => {
      expect(() =>
        resolveStreamId({
          alias: "LL",
          chainId: CHAIN_ID_SOLANA_MAINNET_BETA,
          protocol: EvmProtocol.Flow,
          tokenId: 1,
        }),
      ).toThrowError(/Protocol "flow" is EVM-only and not valid for Solana chain/);
    });

    it("throws when EVM-only protocol (Legacy) is used with Solana chain", () => {
      expect(() =>
        resolveStreamId({
          alias: "LL",
          chainId: CHAIN_ID_SOLANA_DEVNET,
          protocol: EvmProtocol.Legacy,
          tokenId: 1,
        }),
      ).toThrowError(/Protocol "legacy" is EVM-only and not valid for Solana chain/);
    });

    it("allows shared protocols (Lockup) on Solana chains", () => {
      const result = resolveStreamId({
        alias: "LL",
        chainId: CHAIN_ID_SOLANA_MAINNET_BETA,
        protocol: SolanaProtocol.Lockup,
        tokenId: 1,
      });

      expect(result).toContain(`${CHAIN_ID_SOLANA_MAINNET_BETA}-1`);
    });

    it("allows shared protocols (Airdrops) on Solana chains", () => {
      const result = resolveStreamId({
        alias: "merkleFactoryInstant",
        chainId: CHAIN_ID_SOLANA_MAINNET_BETA,
        protocol: SolanaProtocol.Airdrops,
        tokenId: 1,
      });

      expect(result).toContain(`${CHAIN_ID_SOLANA_MAINNET_BETA}-1`);
    });
  });
});
