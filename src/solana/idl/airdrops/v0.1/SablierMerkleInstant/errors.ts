export const errorCodes = {
  CampaignExpired: 6000,
  InvalidMerkleProof: 6001,
  CampaignNotStarted: 6002,
  ClawbackNotAllowed: 6003,
  CantCollectZeroFees: 6004,
} as const;

export type ErrorNames = keyof typeof errorCodes;
