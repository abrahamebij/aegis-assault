"use client"
import GameCanvas from "@/components/GameCanvas";
import GameOverScreen from "@/components/GameOverScreen";
import { useUser } from "@/contexts/UserContext";
import { useGameState } from "@/hooks/useGameState";

const Game = () => {
  const { isGameOver, finalScore, triggerGameOver, restartGame } = useGameState();
  const {isLoggedIn} = useUser()

  if (!isLoggedIn) {
    return <div>Please log in to play the game.</div>;
  }

  return (
    <div style={{ position: "relative" }}>
      <GameCanvas onGameOver={triggerGameOver} />
      {isGameOver && (
        <GameOverScreen score={finalScore} onRestart={restartGame} />
      )}
    </div>
  );
};

export default Game;