interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

const GameOverScreen = ({ score, onRestart }: GameOverScreenProps) => (
  <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-white">
    <h1 className="text-5xl font-bold text-red-500 mb-5">
      GAME OVER
    </h1>
    <p className="text-2xl mb-10">
      Final Score: {score}
    </p>
    <button
      onClick={onRestart}
      className="text-2xl px-8 py-4 bg-linear-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white border-none cursor-pointer rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
    >
      RESTART
    </button>
  </div>
);

export default GameOverScreen;