/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { GAME_CONFIG } from '@/config/gameConfig';
import { setPlayerHealth, setScore } from '@/utils/gameVariables';

interface GameState {
  isGameOver: boolean;
  finalScore: number;
  isPaused: boolean;
  isLevelingUp: boolean;
  levelUpUpgrades: any[];
  triggerGameOver: (score: number) => void;
  restartGame: () => void;
  togglePause: () => void;
  triggerLevelUp: (upgrades: any[]) => void;
  selectUpgrade: (upgradeId: string) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  isGameOver: false,
  finalScore: 0,
  isPaused: false,
  isLevelingUp: false,
  levelUpUpgrades: [],
  triggerGameOver: (score: number) => set({ isGameOver: true, finalScore: score }),
  restartGame: () => {
    setPlayerHealth(GAME_CONFIG.PLAYER.INITIAL_HEALTH);
    setScore(0);
    set({ isGameOver: false, finalScore: 0 });
  },
  togglePause: () => {
    const { isLevelingUp } = get();
    if (!isLevelingUp) {
      set((state) => ({ isPaused: !state.isPaused }));
    }
  },
  triggerLevelUp: (upgrades: any[]) => set({ isLevelingUp: true, levelUpUpgrades: upgrades }),
  selectUpgrade: (upgradeId: string) => set({ isLevelingUp: false, levelUpUpgrades: [] }),
}));