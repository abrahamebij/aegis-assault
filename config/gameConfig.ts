export class GameConfig {
  SCREEN = {
    WIDTH: window.innerWidth,
    HEIGHT: window.innerHeight,
    CENTER_X: window.innerWidth / 2,
    CENTER_Y: window.innerHeight / 2
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