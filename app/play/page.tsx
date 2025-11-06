"use client";
import { useEffect } from "react";
import GameOverScreen from "@/components/GameOverScreen";
import PauseScreen from "@/components/PauseScreen";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { useGameStore } from "@/stores/gameStore";
import Link from "next/link";
import dynamic from "next/dynamic";

const GameCanvas = dynamic(() => import("@/components/GameCanvas"), {
  ssr: false,
});

const Game = () => {
  const { isGameOver, finalScore, restartGame, isPaused, togglePause } =
    useGameStore();
  const { isLoggedIn, isLoading } = useUser();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !isPaused && !isGameOver) {
        togglePause();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isPaused, isGameOver, togglePause]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="p-8 rounded-2xl border border-gray-800">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
          <h2 className="text-xl font-gaming text-primary mt-4">
            Loading Game...
          </h2>
        </div>
      </div>
    );
  }

  if (isLoggedIn == false) {
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
      {!isGameOver && (
        <Button
          onClick={togglePause}
          className="absolute top-4 right-4 z-40"
          size="sm"
        >
          Pause
        </Button>
      )}
      <GameCanvas />
      {isPaused && <PauseScreen onResume={togglePause} />}
      {isGameOver && (
        <GameOverScreen score={finalScore} onRestart={restartGame} />
      )}
    </div>
  );
};

export default Game;
