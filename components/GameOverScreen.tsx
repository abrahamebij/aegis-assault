import { gameDB } from "@/lib/gameDatabase";
import { Button } from "./ui/button";
import { useAI } from "@/hooks/useAI";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useSubmitScore } from "@/hooks/useSession";
import { toast } from "sonner";

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

const GameOverScreen = ({ score, onRestart }: GameOverScreenProps) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const db = gameDB.getRecentSessions(5);
  const { mutate, isPending } = useAI();
  const { mutate: submitScore } = useSubmitScore();

  const handleOracleClick = () => {
    mutate(db, {
      onSuccess: (data) => {
        setAdvice(data);
      },
    });
  };

  useEffect(() => {
    const currentSession = gameDB.getRecentSessions(1)[0];
    if (currentSession) {
      const totalKills = Object.values(currentSession.enemyKillCount).reduce(
        (sum, count) => sum + count,
        0
      );
      submitScore(
        {
          runId: currentSession.id,
          finalScore: score,
          finalLevelReached: currentSession.finalLevelReached,
          timeSurvived: currentSession.timeSurvived,
          totalKills,
          totalUpgrades: currentSession.finalBuild.length,
          buildJson: `${JSON.stringify(currentSession.finalBuild)}`,
          killCountJson: `${JSON.stringify(currentSession.enemyKillCount)}`,
        },
        {
          onSuccess: (data) => {
            console.log("Score submitted:", data);
            toast.success("Score submitted", {
              description: "Your score has been updated in the leaderboard.",
            });
          },
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  return (
    <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-bold text-red-500 mb-5">GAME OVER</h1>
      <p className="text-2xl mb-10">Final Score: {score}</p>
      <div className="flex gap-4">
        <Button onClick={onRestart}>RESTART</Button>
        <Button
          variant={"outline"}
          onClick={handleOracleClick}
          disabled={isPending}
        >
          {isPending ? "CONSULTING..." : "ASK ORACLE"}
        </Button>
        {/* <Button
          variant={"outline"}
          onClick={() => {
            const currentSession = gameDB.getRecentSessions(1)[0];
            if (currentSession) {
              const totalKills = Object.values(
                currentSession.enemyKillCount
              ).reduce((sum, count) => sum + count, 0);
              submitScore(
                {
                  runId: currentSession.id,
                  finalScore: score,
                  finalLevelReached: currentSession.finalLevelReached,
                  timeSurvived: currentSession.timeSurvived,
                  totalKills,
                  totalUpgrades: currentSession.finalBuild.length,
                  buildJson: `${JSON.stringify(currentSession.finalBuild)}`,
                  killCountJson: `${JSON.stringify(
                    currentSession.enemyKillCount
                  )}`,
                },
                {
                  onSuccess: (data) => {
                    console.log("Score submitted:", data);
                  },
                }
              );
            }
          }}
        >
          Submit score
        </Button> */}
      </div>
      {advice && (
        <div className="mt-8 max-w-2xl relative bg-gray-900 p-6 rounded-lg border border-blue-500">
          <h3 className="text-xl font-bold text-blue-400 mb-4">
            🔮 Oracle&apos;s Wisdom:
          </h3>
          <p className="text-gray-300 leading-relaxed">{advice}</p>
          <Button
            variant="ghost"
            onClick={() => setAdvice(null)}
            className="mt-4 text-sm absolute top-0 right-4"
          >
            <FaTimes />
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameOverScreen;
