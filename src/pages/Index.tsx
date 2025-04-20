
import { useState, useEffect } from "react";
import GameBoard from "@/components/GameBoard";
import ScorePanel from "@/components/ScorePanel";
import GameHeader from "@/components/GameHeader";

const Index = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [moves, setMoves] = useState(15);

  const handleScoreUpdate = (points: number) => {
    setScore(prev => prev + points);
    
    // Проверка на переход на следующий уровень
    if (score + points >= level * 1000) {
      setLevel(prev => prev + 1);
      setMoves(prev => prev + 10);
    }
  };

  const handleMoveMade = () => {
    setMoves(prev => prev - 1);
  };

  // Сброс игры
  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setMoves(15);
  };

  // Проверка окончания игры
  useEffect(() => {
    if (moves <= 0) {
      // Можно добавить показ модального окна с результатами
      setTimeout(() => {
        alert(`Игра окончена! Ваш счёт: ${score}`);
        resetGame();
      }, 500);
    }
  }, [moves, score]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-amber-200 flex flex-col items-center">
      <GameHeader />
      
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 mt-4">
        <ScorePanel score={score} level={level} moves={moves} />
        
        <div className="mt-4">
          <GameBoard 
            onScoreUpdate={handleScoreUpdate} 
            onMoveMade={handleMoveMade}
            level={level} 
          />
        </div>
      </div>
      
      <div className="mt-6 text-center text-amber-800 text-sm">
        <p>Соединяйте 3 или более одинаковых предмета в ряд или столбец!</p>
        <p className="mt-2">© 2023 Индийский Кот • Игра "3 в ряд"</p>
      </div>
    </div>
  );
};

export default Index;
