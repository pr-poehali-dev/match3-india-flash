
import { useState, useEffect } from "react";
import GameBoard from "@/components/GameBoard";
import ScorePanel from "@/components/ScorePanel";
import GameHeader from "@/components/GameHeader";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Index = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [moves, setMoves] = useState(20);
  const [gameOver, setGameOver] = useState(false);

  const handleScoreUpdate = (points: number) => {
    setScore(prev => prev + points);
    
    // Проверка на переход на следующий уровень
    if (score + points >= level * 1000) {
      setLevel(prev => prev + 1);
      setMoves(prev => prev + 15);
    }
  };

  const handleMoveMade = () => {
    setMoves(prev => prev - 1);
  };

  // Сброс игры
  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setMoves(20);
    setGameOver(false);
  };

  // Проверка окончания игры
  useEffect(() => {
    if (moves <= 0) {
      setGameOver(true);
    }
  }, [moves]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-blue-800 flex flex-col items-center">
      <GameHeader />
      
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-sm rounded-lg shadow-lg p-4 mt-4 border border-amber-500/30">
        <ScorePanel score={score} level={level} moves={moves} />
        
        <div className="mt-4">
          <GameBoard 
            onScoreUpdate={handleScoreUpdate} 
            onMoveMade={handleMoveMade}
            level={level}
            disabled={gameOver}
          />
        </div>
        
        {gameOver && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-10 backdrop-blur-sm">
            <div className="bg-slate-900 p-6 rounded-lg border-2 border-amber-400 max-w-sm w-full text-center">
              <h2 className="text-2xl font-bold text-amber-400 mb-4">Игра окончена!</h2>
              <p className="text-blue-100 mb-2">Ваша сила Алатыря: <span className="text-amber-400 font-bold">{score}</span></p>
              <p className="text-blue-100 mb-6">Достигнутый уровень: <span className="text-amber-400 font-bold">{level}</span></p>
              
              <Button 
                onClick={resetGame}
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Начать заново
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 text-center text-blue-100 text-sm">
        <p>Соединяйте 3 или более символов в ряд, чтобы раскрыть силу Алатыря!</p>
        <p className="mt-2">© 2024 Алатырь • Древнерусская игра "3 в ряд"</p>
      </div>
    </div>
  );
};

export default Index;
