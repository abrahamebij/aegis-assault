/* eslint-disable @typescript-eslint/no-explicit-any */
import { GAME_CONFIG } from "../config/gameConfig";
import { playerLevel } from "../utils/gameVariables";

export function spawnEnemy(scene: Phaser.Scene, atlas: string, spriteName: string, enemies: Phaser.Physics.Arcade.StaticGroup) {
  if (!scene.physics) return;

  const side = Phaser.Math.Between(0, 3);
  let x: number, y: number;

  // Spawn from off-screen edges
  if (side === 0) { // Left
    x = -50;
    y = Phaser.Math.Between(0, GAME_CONFIG.SCREEN.HEIGHT);
  } else if (side === 1) { // Right
    x = GAME_CONFIG.SCREEN.WIDTH + 50;
    y = Phaser.Math.Between(0, GAME_CONFIG.SCREEN.HEIGHT);
  } else if (side === 2) { // Top
    x = Phaser.Math.Between(0, GAME_CONFIG.SCREEN.WIDTH);
    y = -50;
  } else { // Bottom
    x = Phaser.Math.Between(0, GAME_CONFIG.SCREEN.WIDTH);
    y = GAME_CONFIG.SCREEN.HEIGHT + 50;
  }

  const enemy = scene.physics.add.sprite(x, y, atlas, spriteName)
  .setScale(0.6);
  (enemy.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
  
  // Increase health enemy chance based on level
  const healthEnemyChance = Math.min(0.3 + (playerLevel - 1) * 0.1, 0.8);
  const hasHealth = Math.random() < healthEnemyChance;
  const maxHealth = hasHealth ? Phaser.Math.Between(2, 3) : 1;
  (enemy as any).health = maxHealth;
  (enemy as any).maxHealth = maxHealth;

  // Create health bar for multi-hit enemies
  if (hasHealth) {
    const healthBar = scene.add.graphics();
    healthBar.fillStyle(0x00ff00);
    healthBar.fillRect(-15, -25, 30, 4);
    healthBar.lineStyle(1, 0xffffff);
    healthBar.strokeRect(-15, -25, 30, 4);
    (enemy as any).healthBar = healthBar;
  }

  // Move towards center
  scene.physics.moveTo(enemy, GAME_CONFIG.SCREEN.CENTER_X, GAME_CONFIG.SCREEN.CENTER_Y, 100);

  enemies.add(enemy)

  return enemy;
}