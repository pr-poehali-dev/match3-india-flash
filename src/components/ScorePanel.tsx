
import { Progress } from "@/components/ui/progress";

interface ScorePanelProps {
  score: number;
  level: number;
  moves: number;
}

const ScorePanel = ({ score, level, moves }: ScorePanelProps) => {
  // Расчет прогресса для текущего уровня
  const levelProgress = Math.min(100, (score / (level * 1000)) * 100);
  
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-3 shadow-inner">
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center">
          <div className="text-amber-800 font-bold text-lg">{score}</div>
          <div className="text-amber-600 text-xs">Очки</div>
        </div>
        
        <div className="text-center">
          <div className="text-amber-800 font-bold text-lg">{level}</div>
          <div className="text-amber-600 text-xs">Уровень</div>
        </div>
        
        <div className="text-center">
          <div className="text-amber-800 font-bold text-lg">{moves}</div>
          <div className="text-amber-600 text-xs">Ходы</div>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between items-center text-xs text-amber-700">
          <span>Прогресс уровня</span>
          <span>{Math.floor(levelProgress)}%</span>
        </div>
        <Progress 
          value={levelProgress} 
          className="h-2 bg-amber-100" 
        />
      </div>
    </div>
  );
};

export default ScorePanel;
