"use client"
import { useRef, useEffect } from "react";
import { GAME_CONFIG } from "@/config/gameConfig";
import { preload, create, update } from "@/scenes/MainScene";
import { useGameStore } from "@/stores/gameStore";
import { useUser } from "@/contexts/UserContext";
import * as Phaser from "phaser";

const GameCanvas = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const gameRef2 = useRef<Phaser.Game | null>(null);
  const { walletAddress } = useUser();
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
        init: function(this: Phaser.Scene & { walletAddress: string }, data: { walletAddress?: string }) {
          this.walletAddress = data.walletAddress || 'anonymous';
        }
      },
    };

    const game = new Phaser.Game(config);
    gameRef2.current = game;
    
    // Pass wallet address to the scene
    game.scene.start('MainScene', { walletAddress });

    return () => {
      game.destroy(true);
    };
  }, []);

  useEffect(() => {
    let prevIsGameOver = useGameStore.getState().isGameOver;
    let prevIsPaused = useGameStore.getState().isPaused;
    let prevShowTutorial = useGameStore.getState().showTutorial;
    
    const unsubscribe = useGameStore.subscribe((state) => {
      const currentIsGameOver = state.isGameOver;
      const currentIsPaused = state.isPaused;
      const currentShowTutorial = state.showTutorial;
      
      if (!currentIsGameOver && prevIsGameOver && gameRef2.current) {
        gameRef2.current.scene.stop("MainScene");
        gameRef2.current.scene.start("MainScene", { walletAddress });
      }

      if ((currentIsPaused !== prevIsPaused || currentShowTutorial !== prevShowTutorial) && gameRef2.current) {
        if (currentIsPaused || currentShowTutorial) {
          gameRef2.current.scene.pause("MainScene");
        } else {
          gameRef2.current.scene.resume("MainScene");
        }
      }

      prevIsGameOver = currentIsGameOver;
      prevIsPaused = currentIsPaused;
      prevShowTutorial = currentShowTutorial;
    });
    return unsubscribe;
  }, []);

  return <div className="overflow-hidden" ref={gameRef} />;
}

export default GameCanvas;