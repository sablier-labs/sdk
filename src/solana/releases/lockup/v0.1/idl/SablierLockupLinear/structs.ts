import type { BN } from "@coral-xyz/anchor";
import type { PublicKey } from "@solana/web3.js";

export type Amounts = { startUnlock: BN; cliffUnlock: BN; deposited: BN; refunded: BN; withdrawn: BN };

export type CancelLockupStream = {
  depositedTokenMint: PublicKey;
  recipientAmount: BN;
  senderAmount: BN;
  streamData: PublicKey;
  streamNftMint: PublicKey;
};

export type CreateLockupLinearStream = {
  depositTokenDecimals: number;
  depositTokenMint: PublicKey;
  recipient: PublicKey;
  salt: BN;
  streamData: PublicKey;
  streamNftMint: PublicKey;
};

export type FeesCollected = { feeAmount: BN; feeCollector: PublicKey; feeRecipient: PublicKey };

export type NftCollectionData = { totalSupply: BN; bump: number };

export type RenounceLockupStream = { depositedTokenMint: PublicKey; streamData: PublicKey; streamNftMint: PublicKey };

export type StreamData = {
  amounts: Amounts;
  depositedTokenMint: PublicKey;
  bump: number;
  salt: BN;
  isCancelable: boolean;
  isDepleted: boolean;
  timestamps: Timestamps;
  sender: PublicKey;
  wasCanceled: boolean;
};

export type StreamStatus = "Pending" | "Streaming" | "Settled" | "Canceled" | "Depleted";

export type Timestamps = { cliff: BN; end: BN; start: BN };

export type Treasury = {
  bump: number;
  feeCollector: PublicKey;
  chainlinkProgram: PublicKey;
  chainlinkSolUsdFeed: PublicKey;
};

export type WithdrawFromLockupStream = {
  depositedTokenMint: PublicKey;
  feeInLamports: BN;
  streamData: PublicKey;
  streamNftMint: PublicKey;
  withdrawnAmount: BN;
};
