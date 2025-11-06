"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PauseScreenProps {
  onResume: () => void;
}

const PauseScreen = ({ onResume }: PauseScreenProps) => {
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="p-8 text-center max-w-md">
        <h2 className="text-2xl font-bold mb-6">Game Paused</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <span>Music</span>
            <Button
              variant={musicEnabled ? "default" : "secondary"}
              size="sm"
              onClick={() => setMusicEnabled(!musicEnabled)}
            >
              {musicEnabled ? "ON" : "OFF"}
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Sound Effects</span>
            <Button
              variant={soundEnabled ? "default" : "secondary"}
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
            >
              {soundEnabled ? "ON" : "OFF"}
            </Button>
          </div>
        </div>
        
        <Button onClick={onResume} size="lg" className="w-full">
          Resume Game
        </Button>
      </Card>
    </div>
  );
};

export default PauseScreen;