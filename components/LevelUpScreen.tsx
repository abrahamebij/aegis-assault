/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGameStore } from "@/stores/gameStore";
import Img from "./ui/Img";

const LevelUpScreen = () => {
  const { isLevelingUp, levelUpUpgrades, selectUpgrade } = useGameStore();

  if (!isLevelingUp) return null;

  const handleUpgradeSelect = (upgradeId: string) => {
    selectUpgrade(upgradeId);
    // Apply upgrade logic will be handled by the game scene
    (window as any).applyUpgrade?.(upgradeId);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-8">LEVEL UP!</h2>
        <div className="flex gap-6">
          {levelUpUpgrades.map((upgrade, index) => (
            <Card key={index} className="p-6 w-64 h-80 cursor-pointer hover:bg-gray-700 transition-colors">
              <Button
                onClick={() => handleUpgradeSelect(upgrade.id)}
                className="w-full h-full flex flex-col items-center justify-center gap-4 hover:bg-transparent"
                variant="ghost"
              >
                <div className="text-6xl">
                  <Img src={`/assets/789_icons/Icon${upgrade.icon.split(" ")[0]}_${upgrade.icon.split(" ")[1]}.png`} alt="Icon"/>
                </div>
                <h3 className="text-xl font-bold text-white">{upgrade.name}</h3>
                <p className="text-sm text-gray-300 text-center">{upgrade.description}</p>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelUpScreen;