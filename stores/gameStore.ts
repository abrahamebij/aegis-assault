/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { GAME_CONFIG } from '@/config/gameConfig';
import { setPlayerHealth, setScore, setPlayerXP, setPlayerLevel } from '@/utils/gameVariables';

interface GameState {
  isGameOver: boolean;
  finalScore: number;
  isPaused: boolean;
  isLevelingUp: boolean;
  showTutorial: boolean;
  levelUpUpgrades: any[];
  triggerGameOver: (score: number) => void;
  restartGame: () => void;
  togglePause: () => void;
  triggerLevelUp: (upgrades: any[]) => void;
  selectUpgrade: (upgradeId: string) => void;
  closeTutorial: () => void;
}

export const useGameStore = create<GameState>((set, get) => {
  const shouldShowTutorial = typeof window !== 'undefined' && !localStorage.getItem('aegis-tutorial-seen');
  return {
    isGameOver: false,
    finalScore: 0,
    isPaused: false,
    isLevelingUp: false,
    showTutorial: shouldShowTutorial,
    levelUpUpgrades: [],
  triggerGameOver: (score: number) => set({ isGameOver: true, finalScore: score }),
  restartGame: () => {
    setPlayerHealth(GAME_CONFIG.PLAYER.INITIAL_HEALTH);
    setScore(0);
    setPlayerXP(0);
    setPlayerLevel(1);
    set({ isGameOver: false, finalScore: 0 });
  },
  togglePause: () => {
    const { isLevelingUp, showTutorial } = get();
    if (!isLevelingUp && !showTutorial) {
      set((state) => ({ isPaused: !state.isPaused }));
    }
  },
    triggerLevelUp: (upgrades: any[]) => set({ isLevelingUp: true, levelUpUpgrades: upgrades }),
    selectUpgrade: (upgradeId: string) => set({ isLevelingUp: false, levelUpUpgrades: [] }),
    closeTutorial: () => set({ showTutorial: false }),
  };
});