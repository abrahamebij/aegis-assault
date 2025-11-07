/* eslint-disable @typescript-eslint/no-explicit-any */
import { GAME_CONFIG } from "../config/gameConfig";

export function fireProjectile(this: Phaser.Scene, player: Phaser.GameObjects.Sprite, projectiles: Phaser.Physics.Arcade.StaticGroup) {
    const pointer = this.input.activePointer;
    const angle = Phaser.Math.Angle.Between(player.x, player.y, pointer.x, pointer.y);
    const hasMultiShot = (player as any).getData('hasMultiShot');
    const speedBoost = (player as any).getData('speedBoost') || 1;

    const angles = hasMultiShot ? [angle - 0.3, angle, angle + 0.3] : [angle];

    angles.forEach(shootAngle => {
        const projectile = this.physics.add.sprite(GAME_CONFIG.SCREEN.CENTER_X, GAME_CONFIG.SCREEN.CENTER_Y, "shooter-atlas", "spaceEffects_018.png");

        const radius = 32;
        const offsetX = Math.cos(shootAngle) * radius;
        const offsetY = Math.sin(shootAngle) * radius;
        projectile.setPosition(player.x + offsetX, player.y + offsetY);
        projectile.rotation = shootAngle + Math.PI * 1.5;

        const speed = GAME_CONFIG.PROJECTILES.SPEED * speedBoost;
        const velocityX = Math.cos(shootAngle) * speed;
        const velocityY = Math.sin(shootAngle) * speed;

        projectile.body.setAllowGravity(false);
        projectile.body.setVelocity(velocityX, velocityY);
        projectiles.add(projectile);
    });

    // Play shoot sound if it exists
    if ((this as any).shootSound) {
      (this as any).shootSound.play();
    }


}