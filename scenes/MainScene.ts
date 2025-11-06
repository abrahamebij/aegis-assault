import { fireProjectile } from "../actions/combat";
import { spawnEnemy } from "../actions/spawning";
import { gameOver } from "../actions/state";
import { GAME_CONFIG } from "../config/gameConfig";
import {
  projectiles, enemies, playerHealth, healthBar, score, scoreText,
  setProjectiles, setEnemies, setPlayerHealth, setHealthBar, setScore, setScoreText
} from "../utils/gameVariables";

export function preload(this: Phaser.Scene) {
  this.load.image("bg", "assets/bg.svg");
  this.load.atlasXML(
    "shooter-atlas",
    "assets/spaceShooter2_spritesheet.png",
    "assets/spaceShooter2_spritesheet.xml"
  );
}

export function create(this: Phaser.Scene) {
  this.add.tileSprite(0, 0, GAME_CONFIG.SCREEN.WIDTH, GAME_CONFIG.SCREEN.HEIGHT, "bg").setOrigin(0, 0);

  const particles = this.add.particles(0, 0, "shooter-atlas", {
    frame: "spaceEffects_008.png",
    scale: { start: 1, end: 0 },
    speed: { min: 50, max: 100 },
    lifespan: 300,
    emitting: false,
  });

  const damageParticles = this.add.particles(0, 0, "shooter-atlas", {
    frame: "spaceEffects_008.png",
    scale: { start: 0.5, end: 0 },
    speed: { min: 100, max: 200 },
    lifespan: 500,
    emitting: false,
    tint: 0xd30d05,
  });

  (this as Phaser.Scene & { particles: Phaser.GameObjects.Particles.ParticleEmitter; damageParticles: Phaser.GameObjects.Particles.ParticleEmitter }).particles = particles;
  (this as Phaser.Scene & { particles: Phaser.GameObjects.Particles.ParticleEmitter; damageParticles: Phaser.GameObjects.Particles.ParticleEmitter }).damageParticles = damageParticles;

  const newHealthBar = this.add.graphics();
  newHealthBar.fillStyle(0x00ff00);
  newHealthBar.fillRect(GAME_CONFIG.UI.HEALTH_BAR.x, GAME_CONFIG.UI.HEALTH_BAR.y, GAME_CONFIG.UI.HEALTH_BAR.width, GAME_CONFIG.UI.HEALTH_BAR.height);
  newHealthBar.lineStyle(2, 0xffffff);
  newHealthBar.strokeRect(GAME_CONFIG.UI.HEALTH_BAR.x, GAME_CONFIG.UI.HEALTH_BAR.y, GAME_CONFIG.UI.HEALTH_BAR.width, GAME_CONFIG.UI.HEALTH_BAR.height);
  setHealthBar(newHealthBar);

  const newScoreText = this.add.text(GAME_CONFIG.SCREEN.WIDTH - 100, 20, "Score: 0", {
    fontSize: "16px",
    color: "#ffffff",
  });
  setScoreText(newScoreText);

  const player = this.physics.add.sprite(GAME_CONFIG.SCREEN.CENTER_X, GAME_CONFIG.SCREEN.CENTER_Y, "shooter-atlas", "spaceShips_002.png");
  player.setName("player");
  player.body.setAllowGravity(false);

  this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
    const angle = Phaser.Math.Angle.Between(player.x, player.y, pointer.x, pointer.y);
    player.rotation = angle + Math.PI / 2;
  });

  setProjectiles(this.physics.add.staticGroup());
  setEnemies(this.physics.add.staticGroup());

  const spaceBar = this?.input?.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  spaceBar?.on("down", () => {
    fireProjectile.call(this, player, projectiles);
  });

  const spawnEnemyTimer = setInterval(() => {
    spawnEnemy(this, "shooter-atlas", `spaceShips_00${Math.ceil(Math.random() * 9)}.png`, enemies);
  }, GAME_CONFIG.ENEMIES.SPAWN_INTERVAL);

  this.events.on('shutdown', () => {
    clearInterval(spawnEnemyTimer);
  });}

export function update(this: Phaser.Scene) {
  if (playerHealth <= 0) {
    this.scene.pause();
    return;
  }

  projectiles.children.entries.forEach((p) => {
    const projectile = p as Phaser.Physics.Arcade.Sprite;
    if (projectile.x < 0 || projectile.x > GAME_CONFIG.SCREEN.WIDTH || projectile.y < 0 || projectile.y > GAME_CONFIG.SCREEN.HEIGHT) {
      projectile.destroy(true);
    }

    enemies.children.entries.forEach((enemy) => {
      const enemySprite = enemy as Phaser.Physics.Arcade.Sprite;
      this.physics.add.overlap(projectile, enemySprite, () => {
        const particles = (this as Phaser.Scene & { particles: Phaser.GameObjects.Particles.ParticleEmitter }).particles;
        particles.emitParticleAt(enemySprite.x, enemySprite.y, 10);
        enemySprite.destroy(true);
        projectile.destroy(true);

        setScore(score + 10);
        scoreText.setText("Score: " + score);
      });
    });
  });

  const player = this.children.getByName("player") as Phaser.Physics.Arcade.Sprite;
  if (player) {
    enemies.children.entries.forEach((enemy) => {
      const enemySprite = enemy as Phaser.Physics.Arcade.Sprite;
      this.physics.add.overlap(player, enemySprite, () => {
        if (playerHealth > 0) {
          setPlayerHealth(playerHealth - GAME_CONFIG.PLAYER.DAMAGE_PER_HIT);

          const damageParticles = (this as Phaser.Scene & { damageParticles: Phaser.GameObjects.Particles.ParticleEmitter }).damageParticles;
          damageParticles.emitParticleAt(enemySprite.x, enemySprite.y, 15);

          enemySprite.destroy(true);

          healthBar.clear();
          healthBar.fillStyle(0x00ff00);
          healthBar.fillRect(GAME_CONFIG.UI.HEALTH_BAR.x, GAME_CONFIG.UI.HEALTH_BAR.y, Math.max(0, (playerHealth / GAME_CONFIG.PLAYER.INITIAL_HEALTH) * GAME_CONFIG.UI.HEALTH_BAR.width), GAME_CONFIG.UI.HEALTH_BAR.height);
          healthBar.lineStyle(2, 0xffffff);
          healthBar.strokeRect(GAME_CONFIG.UI.HEALTH_BAR.x, GAME_CONFIG.UI.HEALTH_BAR.y, GAME_CONFIG.UI.HEALTH_BAR.width, GAME_CONFIG.UI.HEALTH_BAR.height);

          if (playerHealth <= 0) {
            gameOver.call(this, score);
          }
        }
      });
    });
  }
}