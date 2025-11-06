"use client";
import GameCanvas from "@/components/GameCanvas";
import GameOverScreen from "@/components/GameOverScreen";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { useGameState } from "@/hooks/useGameState";
import Link from "next/link";

const Game = () => {
  const { isGameOver, finalScore, triggerGameOver, restartGame } =
    useGameState();
  const { isLoggedIn, isLoading } = useUser();
  console.log("isLoading: ", isLoading);
  console.log("isLoggedIn: ", isLoggedIn);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center text-center min-h-screen">
        <div className="p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-200 mb-4">
            Welcome to the Game!
          </h2>
          <p className="text-gray-400 mb-6">Please log in to start playing</p>
          <Button size={"lg"}>
            <Link href={"/login"}>Log In</Link>
          </Button>
        </div>
      </div>
    );
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
