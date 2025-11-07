/* eslint-disable @typescript-eslint/no-explicit-any */

import { useGameStore } from '../stores/gameStore';

export function gameOver(this: Phaser.Scene, score: number) {
  if ((this as any).spawnEnemyTimer) {
    clearInterval((this as any).spawnEnemyTimer);
  }
  this.scene.pause();
  useGameStore.getState().triggerGameOver(score);
}