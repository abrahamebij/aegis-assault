export type LeaderboardEntry = {
  rank: number;
  wallet: string;
  score: number;
  level: number;
  kills: number;
  upgrades: number;
  time: number;
  runId: string;
};

export type DecodedEntry = {
  runId: { value: string };
  finalScore: { value: bigint };
  finalLevelReached: { value: number };
  timeSurvived: { value: number };
  totalKills: { value: number };
  totalUpgrades: { value: number };
  buildJson: { value: string };
  killCountJson: { value: string };
  player: { value: string };
};