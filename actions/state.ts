
export function gameOver(this: Phaser.Scene, score: number) {
  this.scene.pause();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).triggerGameOver(score);
}