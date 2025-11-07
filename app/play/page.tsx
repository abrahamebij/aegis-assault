"use client";
import { useEffect } from "react";
import GameOverScreen from "@/components/GameOverScreen";
import PauseScreen from "@/components/PauseScreen";
import LevelUpScreen from "@/components/LevelUpScreen";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { useGameStore } from "@/stores/gameStore";
import Link from "next/link";
import dynamic from "next/dynamic";
import Loader from "@/components/game/Loader";
import { Pause } from "lucide-react";

const GameCanvas = dynamic(() => import("@/components/GameCanvas"), {
  ssr: false,
});

const Game = () => {
  const {
    isGameOver,
    finalScore,
    restartGame,
    isPaused,
    togglePause,
    isLevelingUp,
  } = useGameStore();
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
    return <Loader />;
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
      {!isGameOver && !isLevelingUp && (
        <Button
          onClick={togglePause}
          className="absolute bottom-4 right-4 z-40"
          size="sm"
        >
          <Pause />
        </Button>
      )}
      <GameCanvas />
      {isPaused && !isLevelingUp && <PauseScreen onResume={togglePause} />}
      <LevelUpScreen />
      {isGameOver && (
        <GameOverScreen score={finalScore} onRestart={restartGame} />
      )}
    </div>
  );
};

export default Game;
