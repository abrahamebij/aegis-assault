import { DecodedEntry, LeaderboardEntry } from "@/types/leaderboard";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function parseLeaderboard(decoded: DecodedEntry[]): LeaderboardEntry[] {
  const bestRuns = new Map<string, LeaderboardEntry>();

  for (const d of decoded) {
    const wallet = d.player.value;
    const score = Number(d.finalScore.value);

    const currentBest = bestRuns.get(wallet);

    // Keep only the highest score for each player
    if (!currentBest || score > currentBest.score) {
      bestRuns.set(wallet, {
        rank: 0, // placeholder; will be assigned after sorting
        wallet,
        score,
        level: d.finalLevelReached.value,
        kills: d.totalKills.value,
        upgrades: d.totalUpgrades.value,
        time: d.timeSurvived.value,
        runId: d.runId.value,
      });
    }
  }

  // Convert to array and sort by score descending
  const sorted = Array.from(bestRuns.values()).sort((a, b) => b.score - a.score);

  // Assign ranks
  return sorted.map((entry, i) => ({
    ...entry,
    rank: i + 1,
  }));
}