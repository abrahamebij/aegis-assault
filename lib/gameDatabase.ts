
interface GameSession {
  walletAddress: string;
  finalScore: number;
  finalLevelReached: number;
  timeSurvived: number; // in seconds
  finalBuild: string[];
  enemyKillCount: Record<string, number>;
  // Internal tracking
  id: string;
  startTime: number;
  endTime?: number;
  isActive: boolean;
}

interface GameStats {
  totalGamesPlayed: number;
  highScore: number;
  totalTimeAlive: number;
  totalEnemiesKilled: number;
  averageScore: number;
  favoriteUpgrades: Record<string, number>;
}

class GameDatabase {
  private currentSession: GameSession | null = null;
  private sessions: GameSession[] = [];
  private stats: GameStats = {
    totalGamesPlayed: 0,
    highScore: 0,
    totalTimeAlive: 0,
    totalEnemiesKilled: 0,
    averageScore: 0,
    favoriteUpgrades: {}
  };

  constructor() {
    this.loadFromStorage();
  }

  startSession(walletAddress: string = 'anonymous'): string {
    const sessionId = Date.now().toString();
    this.currentSession = {
      walletAddress,
      finalScore: 0,
      finalLevelReached: 1,
      timeSurvived: 0,
      finalBuild: [],
      enemyKillCount: {},
      id: sessionId,
      startTime: Date.now(),
      isActive: true
    };
    return sessionId;
  }

  updateSession(data: Partial<Pick<GameSession, 'finalScore' | 'finalLevelReached' | 'finalBuild' | 'enemyKillCount'>>) {
    if (!this.currentSession) return;
    
    Object.assign(this.currentSession, data);
    this.currentSession.timeSurvived = Math.floor((Date.now() - this.currentSession.startTime) / 1000);
    this.saveToStorage();
  }

  addUpgrade(upgradeId: string) {
    if (!this.currentSession) return;
    this.currentSession.finalBuild.push(upgradeId);
    this.saveToStorage();
  }

  addEnemyKill(enemyType: string = 'basic') {
    if (!this.currentSession) return;
    this.currentSession.enemyKillCount[enemyType] = (this.currentSession.enemyKillCount[enemyType] || 0) + 1;
    this.saveToStorage();
  }

  endSession(finalScore: number) {
    if (!this.currentSession) return;

    this.currentSession.endTime = Date.now();
    this.currentSession.finalScore = finalScore;
    this.currentSession.timeSurvived = Math.floor((this.currentSession.endTime - this.currentSession.startTime) / 1000);
    this.currentSession.isActive = false;

    this.sessions.push({ ...this.currentSession });
    this.updateStats();
    this.currentSession = null;
    this.saveToStorage();
  }

  getCurrentSession(): GameSession | null {
    return this.currentSession;
  }

  getStats(): GameStats {
    return { ...this.stats };
  }

  getRecentSessions(limit: number = 10): GameSession[] {
    return this.sessions
      .filter(s => !s.isActive)
      .sort((a, b) => (b.endTime || 0) - (a.endTime || 0))
      .slice(0, limit);
  }

  private updateStats() {
    if (!this.currentSession) return;

    this.stats.totalGamesPlayed++;
    this.stats.highScore = Math.max(this.stats.highScore, this.currentSession.finalScore);
    this.stats.totalTimeAlive += this.currentSession.timeSurvived;
    
    const totalEnemies = Object.values(this.currentSession.enemyKillCount).reduce((sum, count) => sum + count, 0);
    this.stats.totalEnemiesKilled += totalEnemies;
    
    const totalScore = this.sessions.reduce((sum, s) => sum + s.finalScore, 0);
    this.stats.averageScore = totalScore / this.stats.totalGamesPlayed;

    // Track upgrade usage
    this.currentSession.finalBuild.forEach(upgrade => {
      this.stats.favoriteUpgrades[upgrade] = (this.stats.favoriteUpgrades[upgrade] || 0) + 1;
    });
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aegis-game-data', JSON.stringify({
        sessions: this.sessions,
        stats: this.stats,
        currentSession: this.currentSession
      }));
    }
  }

  private loadFromStorage() {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('aegis-game-data');
      if (data) {
        const parsed = JSON.parse(data);
        this.sessions = parsed.sessions || [];
        this.stats = parsed.stats || this.stats;
        this.currentSession = parsed.currentSession || null;
      }
    }
  }
}

export const gameDB = new GameDatabase();
export type { GameSession, GameStats };