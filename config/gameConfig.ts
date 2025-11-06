"use client"
const isWindow = typeof window !== "undefined"
export class GameConfig {
  SCREEN = {
    WIDTH: isWindow ? window.innerWidth : 0,
    HEIGHT: isWindow ? window.innerHeight : 0,
    CENTER_X: isWindow ? window.innerWidth / 2 : 0,
    CENTER_Y: isWindow ? window.innerHeight / 2 : 0
  };
  
  UI = {
    HEALTH_BAR: { x: 20, y: 20, width: 200, height: 20 }
  };
  
  PLAYER = {
    INITIAL_HEALTH: 100,
    DAMAGE_PER_HIT: 10
  };
  
  ENEMIES = {
    SPAWN_INTERVAL: 1000
  };
  
  PROJECTILES = {
    SPEED: 500
  };
}

export const GAME_CONFIG = new GameConfig();