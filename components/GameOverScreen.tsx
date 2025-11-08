import { Button } from "./ui/button";

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

const GameOverScreen = ({ score, onRestart }: GameOverScreenProps) => (
  <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-white">
    <h1 className="text-5xl font-bold text-red-500 mb-5">GAME OVER</h1>
    <p className="text-2xl mb-10">Final Score: {score}</p>
    <div className="flex gap-4">
      <Button variant={"outline"}>ASK ORACLE</Button>
      <Button onClick={onRestart}>RESTART</Button>
    </div>
  </div>
);

export default GameOverScreen;
