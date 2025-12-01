import type { BN } from "@coral-xyz/anchor";
import type { PublicKey } from "@solana/web3.js";

export type Campaign = {
  airdropTokenMint: PublicKey;
  bump: number;
  campaignStartTime: BN;
  creator: PublicKey;
  expirationTime: BN;
  firstClaimTime: BN;
  ipfsCid: string;
  merkleRoot: number[];
  name: string;
};

export type Claim = {
  amount: BN;
  campaign: PublicKey;
  claimer: PublicKey;
  claimReceipt: PublicKey;
  feeInLamports: BN;
  index: number;
  recipient: PublicKey;
};

export type Clawback = {
  amount: BN;
  campaign: PublicKey;
  campaignCreator: PublicKey;
  clawbackRecipient: PublicKey;
};

export type CreateCampaign = {
  aggregateAmount: BN;
  campaign: PublicKey;
  campaignName: string;
  campaignStartTime: BN;
  creator: PublicKey;
  expirationTime: BN;
  ipfsCid: string;
  merkleRoot: number[];
  recipientCount: number;
  tokenDecimals: number;
  tokenMint: PublicKey;
};

export type FeesCollected = { feeAmount: BN; feeCollector: PublicKey; feeRecipient: PublicKey };

export type Treasury = {
  bump: number;
  feeCollector: PublicKey;
  chainlinkProgram: PublicKey;
  chainlinkSolUsdFeed: PublicKey;
};
