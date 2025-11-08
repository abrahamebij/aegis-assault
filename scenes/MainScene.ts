/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireProjectile } from "../actions/combat";
import { spawnEnemy } from "../actions/spawning";
import { gameOver } from "../actions/state";
import { GAME_CONFIG } from "../config/gameConfig";
import {
  projectiles, enemies, playerHealth, healthBar, score, scoreText, playerXP, playerLevel, xpBar, levelText, xpToNextLevel,
  setProjectiles, setEnemies, setPlayerHealth, setHealthBar, setScore, setScoreText, setPlayerXP, setPlayerLevel, setXpBar, setLevelText
} from "../utils/gameVariables";
import { allUpgrades } from "../config/upgrades";
import { useGameStore } from "@/stores/gameStore";
import { gameDB } from "@/lib/gameDatabase";

export function preload(this: Phaser.Scene) {
  this.load.image("bg", "assets/bg.svg");
  this.load.atlasXML(
    "shooter-atlas",
    "assets/spaceShooter2_spritesheet.png",
    "assets/spaceShooter2_spritesheet.xml"
  );
  this.load.audio("battle", "music/battle.wav");
  this.load.audio("shoot", "music/shoot.mp3");
}

export function create(this: Phaser.Scene) {
  // Start game session tracking with wallet address
  const walletAddress = (this as any).walletAddress || 'anonymous';
  gameDB.startSession(walletAddress);

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

  const newScoreText = this.add.text(GAME_CONFIG.SCREEN.WIDTH * .87, 20, "Score: 0", {
    fontSize: "16px",
    color: "#ffffff",
  });
  setScoreText(newScoreText);

  // XP Bar
  const newXpBar = this.add.graphics();
  newXpBar.lineStyle(2, 0xffffff);
  newXpBar.strokeRect(GAME_CONFIG.UI.XP_BAR.x, GAME_CONFIG.UI.XP_BAR.y, GAME_CONFIG.UI.XP_BAR.width, GAME_CONFIG.UI.XP_BAR.height);
  setXpBar(newXpBar);

  // Level Text
  const newLevelText = this.add.text(GAME_CONFIG.UI.XP_BAR.x + 10, GAME_CONFIG.UI.XP_BAR.y + 2, "Level: 1", {
    fontSize: "16px",
    color: "#ffffff",
  });
  setLevelText(newLevelText);

  const player = this.physics.add.sprite(GAME_CONFIG.SCREEN.CENTER_X, GAME_CONFIG.SCREEN.CENTER_Y, "shooter-atlas", "spaceShips_002.png");
  player.setName("player");
  player.body.setAllowGravity(false);

  this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
    const angle = Phaser.Math.Angle.Between(player.x, player.y, pointer.x, pointer.y);
    player.rotation = angle + Math.PI / 2;
  });

  setProjectiles(this.physics.add.staticGroup());
  setEnemies(this.physics.add.staticGroup());

  // Set up battle music
  const battleMusic = this.sound.add('battle', { loop: true, volume: 0.5 });
  (this as any).battleMusic = battleMusic;
  (this as any).musicStarted = false;
  
  // Set up shoot sound
  (this as any).shootSound = this.sound.add('shoot', { volume: 0.3 });

  const spaceBar = this?.input?.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  spaceBar?.on("down", () => {
    // Start music on first interaction
    if (!(this as any).musicStarted) {
      battleMusic.play();
      (this as any).musicStarted = true;
    }
    fireProjectile.call(this, player, projectiles);
  });

  const spawnEnemyTimer = setInterval(() => {
    if (playerHealth > 0 && this.scene && !this.scene.isPaused()) {
      spawnEnemy(this, "shooter-atlas", `spaceShips_00${Math.ceil(Math.random() * 9)}.png`, enemies);
    }
  }, Math.max(300, GAME_CONFIG.ENEMIES.SPAWN_INTERVAL - (playerLevel - 1) * 100));

  // (this as any).spawnEnemyTimer = spawnEnemyTimer;

  this.events.on('shutdown', () => {
    clearInterval(spawnEnemyTimer);
  });
}

export function update(this: Phaser.Scene) {
  if (playerHealth <= 0) {
    this.scene.pause();
    return;
  }

  // Update enemy health bar positions
  enemies.children.entries.forEach((enemy) => {
    const enemySprite = enemy as Phaser.Physics.Arcade.Sprite;
    if ((enemySprite as any).healthBar) {
      (enemySprite as any).healthBar.x = enemySprite.x;
      (enemySprite as any).healthBar.y = enemySprite.y;
    }
  });

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

        // Handle enemy health
        (enemySprite as any).health -= 1;

        if ((enemySprite as any).health <= 0) {
          // Destroy health bar if exists
          const enemyType = (enemySprite as any).healthBar ? 'advanced' : 'basic';
          if ((enemySprite as any).healthBar) {
            (enemySprite as any).healthBar.destroy();
          }
          enemySprite.destroy(true);
          setScore(score + 10);

          // Update game database
          gameDB.addEnemyKill(enemyType);
          gameDB.updateSession({ 
            finalScore: score + 10,
            finalLevelReached: playerLevel
          });

          // Grant XP
          setPlayerXP(playerXP + 15);
          checkForLevelUp.call(this);
        } else {
          // Update health bar
          const healthBar = (enemySprite as any).healthBar;
          if (healthBar) {
            const healthPercent = (enemySprite as any).health / (enemySprite as any).maxHealth;
            healthBar.clear();
            healthBar.fillStyle(healthPercent > 0.5 ? 0x00ff00 : healthPercent > 0.25 ? 0xffff00 : 0xff0000);
            healthBar.fillRect(-15, -25, 30 * healthPercent, 4);
            healthBar.lineStyle(1, 0xffffff);
            healthBar.strokeRect(-15, -25, 30, 4);
          }
          setScore(score + 5);
        }

        projectile.destroy(true);
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

          // Destroy health bar if exists
          if ((enemySprite as any).healthBar) {
            (enemySprite as any).healthBar.destroy();
          }
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

function checkForLevelUp(this: Phaser.Scene) {
  if (playerLevel < xpToNextLevel.length - 1 && playerXP >= xpToNextLevel[playerLevel]) {
    setPlayerLevel(playerLevel + 1);
    levelText.setText(`Level: ${playerLevel}`);
    triggerLevelUpScreen.call(this);
  }

  // Update XP bar
  const currentLevelXP = playerLevel > 1 ? xpToNextLevel[playerLevel - 1] : 0;
  const nextLevelXP = xpToNextLevel[playerLevel] || xpToNextLevel[xpToNextLevel.length - 1];
  const xpProgress = (playerXP - currentLevelXP) / (nextLevelXP - currentLevelXP);

  xpBar.clear();
  xpBar.fillStyle(0x0066ff);
  xpBar.fillRect(GAME_CONFIG.UI.XP_BAR.x, GAME_CONFIG.UI.XP_BAR.y, GAME_CONFIG.UI.XP_BAR.width * Math.min(xpProgress, 1), GAME_CONFIG.UI.XP_BAR.height);
  xpBar.lineStyle(2, 0xffffff);
  xpBar.strokeRect(GAME_CONFIG.UI.XP_BAR.x, GAME_CONFIG.UI.XP_BAR.y, GAME_CONFIG.UI.XP_BAR.width, GAME_CONFIG.UI.XP_BAR.height);
}

function triggerLevelUpScreen(this: Phaser.Scene) {
  this.scene.pause();
  const selectedUpgrades = Phaser.Utils.Array.Shuffle([...allUpgrades]).slice(0, 3);
  useGameStore.getState().triggerLevelUp(selectedUpgrades);

  // Set up global apply upgrade function
  (window as any).applyUpgrade = (upgradeId: string) => {
    applyUpgrade.call(this, upgradeId);
    this.scene.resume();
  };
}

function applyUpgrade(this: Phaser.Scene, upgradeId: string) {
  const player = this.children.getByName('player') as Phaser.Physics.Arcade.Sprite;
  
  // Track upgrade in database
  gameDB.addUpgrade(upgradeId);

  switch (upgradeId) {
    case 'multiShot':
      player.setData('hasMultiShot', true);
      setTimeout(() => {
        player.setData('hasMultiShot', false);
      }, 15000);
      break;
    case 'piercing':
      player.setData('hasPiercing', true);
      break;
    case 'fireRate':
      player.setData('fireRateBoost', (player.getData('fireRateBoost') || 1) * 1.5);
      break;
    case 'damage':
      player.setData('damageMultiplier', (player.getData('damageMultiplier') || 1) * 2);
      break;
    case 'health':
      const newMaxHealth = GAME_CONFIG.PLAYER.INITIAL_HEALTH + 25;
      GAME_CONFIG.PLAYER.INITIAL_HEALTH = newMaxHealth;
      setPlayerHealth(Math.min(playerHealth + 25, newMaxHealth));
      break;
    case 'speed':
      player.setData('speedBoost', (player.getData('speedBoost') || 1) * 1.3);
      break;
  }
}