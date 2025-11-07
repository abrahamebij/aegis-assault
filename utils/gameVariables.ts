import { GAME_CONFIG } from "../config/gameConfig";

export let projectiles: Phaser.Physics.Arcade.StaticGroup;
export let enemies: Phaser.Physics.Arcade.StaticGroup;
export let playerHealth = GAME_CONFIG.PLAYER.INITIAL_HEALTH;
export let healthBar: Phaser.GameObjects.Graphics;
export let score = 0;
export let scoreText: Phaser.GameObjects.Text;
export let playerXP = 0;
export let playerLevel = 1;
export let xpBar: Phaser.GameObjects.Graphics;
export let levelText: Phaser.GameObjects.Text;

export const xpToNextLevel = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700, 3250];

export const setProjectiles = (value: Phaser.Physics.Arcade.StaticGroup) => { projectiles = value; };
export const setEnemies = (value: Phaser.Physics.Arcade.StaticGroup) => { enemies = value; };
export const setPlayerHealth = (value: number) => { playerHealth = value; };
export const setHealthBar = (value: Phaser.GameObjects.Graphics) => { healthBar = value; };
export const setScore = (value: number) => { score = value; };
export const setScoreText = (value: Phaser.GameObjects.Text) => { scoreText = value; };
export const setPlayerXP = (value: number) => { playerXP = value; };
export const setPlayerLevel = (value: number) => { playerLevel = value; };
export const setXpBar = (value: Phaser.GameObjects.Graphics) => { xpBar = value; };
export const setLevelText = (value: Phaser.GameObjects.Text) => { levelText = value; };