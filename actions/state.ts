/* eslint-disable @typescript-eslint/no-explicit-any */

import { gameDB } from '@/lib/gameDatabase';
import { useGameStore } from '../stores/gameStore';

export function gameOver(this: Phaser.Scene, score: number) {
  if ((this as any).spawnEnemyTimer) {
    clearInterval((this as any).spawnEnemyTimer);
  }

  // End game session tracking
  gameDB.endSession(score);

  // Log game database to console
  console.log('=== GAME OVER - DATABASE STATS ===');
  console.log('Current Session:', gameDB.getCurrentSession());
  console.log('Game Stats:', gameDB.getStats());
  console.log('Recent Sessions:', gameDB.getRecentSessions(5));
  console.log('===================================');

  this.scene.pause();
  useGameStore.getState().triggerGameOver(score);
}