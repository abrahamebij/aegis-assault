"use client"
import { useState } from "react";
import { GAME_CONFIG } from "../config/gameConfig";
import { setPlayerHealth, setScore } from "../utils/gameVariables";

export const useGameState = () => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const triggerGameOver = (score: number) => {
    setFinalScore(score);
    setIsGameOver(true);
  };

  const restartGame = () => {
    setPlayerHealth(GAME_CONFIG.PLAYER.INITIAL_HEALTH);
    setScore(0);
    setIsGameOver(false);
    setFinalScore(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any & { restartPhaserGame: () => void }).restartPhaserGame();
  };

  return {
    isGameOver,
    finalScore,
    triggerGameOver,
    restartGame
  };
};