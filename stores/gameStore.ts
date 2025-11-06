import { create } from 'zustand';
import { GAME_CONFIG } from '@/config/gameConfig';
import { setPlayerHealth, setScore } from '@/utils/gameVariables';

interface GameState {
  isGameOver: boolean;
  finalScore: number;
  isPaused: boolean;
  triggerGameOver: (score: number) => void;
  restartGame: () => void;
  togglePause: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  isGameOver: false,
  finalScore: 0,
  isPaused: false,
  triggerGameOver: (score: number) => set({ isGameOver: true, finalScore: score }),
  restartGame: () => {
    setPlayerHealth(GAME_CONFIG.PLAYER.INITIAL_HEALTH);
    setScore(0);
    set({ isGameOver: false, finalScore: 0 });
  },
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
}));