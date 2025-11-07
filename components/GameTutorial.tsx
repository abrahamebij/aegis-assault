"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGameStore } from "@/stores/gameStore";

const GameTutorial = () => {
  const { showTutorial, closeTutorial } = useGameStore();
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleStart = () => {
    if (dontShowAgain) {
      localStorage.setItem('aegis-tutorial-seen', 'true');
    }
    closeTutorial();
  };

  if (!showTutorial) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <Card className="p-8 max-w-xl min-w-sm w-1/2 text-center">
        <h2 className="text-2xl font-bold text-white mb-6">How to Play</h2>
        
        <div className="space-y-4 text-left text-gray-300 mb-6">
          <p><strong>🎯 Objective:</strong> Survive waves of enemies and level up!</p>
          <p><strong>🖱️ Controls:</strong> Move mouse to aim, SPACEBAR to shoot</p>
          <p><strong>⚡ Leveling:</strong> Kill enemies to gain XP and unlock upgrades <i>(only multi-shot and increased firing rate are working for now)</i></p>
          <p><strong>❤️ Health:</strong> Avoid enemies or you&apos;ll take damage</p>
          <p><strong>⏸️ Pause:</strong> Click pause button or switch tabs</p>
        </div>
        
        <div className="space-y-4">
          <label className="flex items-center space-x-3 text-sm text-gray-400">
            <input 
              type="checkbox" 
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded scale-125 accent-primary"
            />
            <span>Don&apos;t show this tutorial again</span>
          </label>
          
          <Button onClick={handleStart} size="lg" className="w-full">
            Start Playing!
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default GameTutorial;