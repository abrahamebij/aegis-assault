"use client"
import { useRef, useEffect } from "react";
import { GAME_CONFIG } from "@/config/gameConfig";
import { preload, create, update } from "@/scenes/MainScene";

import * as Phaser from "phaser";

interface GameCanvasProps {
  onGameOver: (score: number) => void;
}

const GameCanvas = ({ onGameOver }: GameCanvasProps) => {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any & { triggerGameOver: (score: number) => void }).triggerGameOver = onGameOver;

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
        key: 'MainScene',
        preload,
        create,
        update,
      },
    };

    const game = new Phaser.Game(config);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any & { restartPhaserGame: () => void }).restartPhaserGame = () => {
      game.scene.stop('MainScene');
      game.scene.start('MainScene');
    };

    return () => {
      game.destroy(true);
    };
  }, [onGameOver]);

  return <div ref={gameRef} />;
};

export default GameCanvas;