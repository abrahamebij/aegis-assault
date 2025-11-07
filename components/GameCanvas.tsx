"use client"
import { useRef, useEffect } from "react";
import { GAME_CONFIG } from "@/config/gameConfig";
import { preload, create, update } from "@/scenes/MainScene";
import { useGameStore } from "@/stores/gameStore";
import * as Phaser from "phaser";

const GameCanvas = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const gameRef2 = useRef<Phaser.Game | null>(null);
  // const restartGame = useGameStore(state => state.restartGame);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: gameRef.current!,
      width: GAME_CONFIG.SCREEN.WIDTH,
      height: GAME_CONFIG.SCREEN.HEIGHT,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 20, x: 0 },
          debug: false,
        },
      },
      scene: {
        key: "MainScene",
        preload,
        create,
        update,
      },
    };

    const game = new Phaser.Game(config);
    gameRef2.current = game;

    return () => {
      game.destroy(true);
    };
  }, []);

  useEffect(() => {
    let prevIsGameOver = useGameStore.getState().isGameOver;
    let prevIsPaused = useGameStore.getState().isPaused;
    const unsubscribe = useGameStore.subscribe((state) => {
      const currentIsGameOver = state.isGameOver;
      const currentIsPaused = state.isPaused;

      if (!currentIsGameOver && prevIsGameOver && gameRef2.current) {
        gameRef2.current.scene.stop("MainScene");
        gameRef2.current.scene.start("MainScene");
      }

      if (currentIsPaused !== prevIsPaused && gameRef2.current) {
        if (currentIsPaused) {
          gameRef2.current.scene.pause("MainScene");
        } else {
          gameRef2.current.scene.resume("MainScene");
        }
      }

      prevIsGameOver = currentIsGameOver;
      prevIsPaused = currentIsPaused;
    });
    return unsubscribe;
  }, []);

  return <div ref={gameRef} />;
}

export default GameCanvas;