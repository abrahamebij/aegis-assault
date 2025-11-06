import { GAME_CONFIG } from "../config/gameConfig";

export function fireProjectile(this: Phaser.Scene, player: Phaser.GameObjects.Sprite, projectiles: Phaser.Physics.Arcade.StaticGroup) {
    const projectile = this.physics.add.sprite(GAME_CONFIG.SCREEN.CENTER_X, GAME_CONFIG.SCREEN.CENTER_Y, "shooter-atlas", "spaceEffects_018.png");
    
    // Get angle between player and cursor
    const pointer = this.input.activePointer;
    const angle = Phaser.Math.Angle.Between(
        player.x,
        player.y,
        pointer.x,
        pointer.y
    );

    // Position projectile at player position
    const radius = 32;
    const offsetX = Math.cos(angle) * radius;
    const offsetY = Math.sin(angle) * radius;
    projectile.setPosition(player.x + offsetX, player.y + offsetY); 
    projectile.rotation = angle + Math.PI * 1.5

    // Set projectile velocity in direction of cursor
    const speed = GAME_CONFIG.PROJECTILES.SPEED;
    const velocityX = Math.cos(angle) * speed;
    const velocityY = Math.sin(angle) * speed;

    projectile.body.setAllowGravity(false);
    projectile.body.setVelocity(velocityX, velocityY);
    projectiles.add(projectile)
}