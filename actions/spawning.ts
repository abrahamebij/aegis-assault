import { GAME_CONFIG } from "../config/gameConfig";

export function spawnEnemy(scene: Phaser.Scene, atlas: string, spriteName: string, enemies: Phaser.Physics.Arcade.StaticGroup) {
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
  
  // Move towards center
  scene.physics.moveTo(enemy, GAME_CONFIG.SCREEN.CENTER_X, GAME_CONFIG.SCREEN.CENTER_Y, 100);

  enemies.add(enemy)
  
  return enemy;
}