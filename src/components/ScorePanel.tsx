
import { Star, ZapIcon, Timer } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ScorePanelProps {
  score: number;
  level: number;
  moves: number;
}

const ScorePanel = ({ score, level, moves }: ScorePanelProps) => {
  // Расчет прогресса к следующему уровню
  const progressToNextLevel = Math.min(100, (score / (level * 1000)) * 100);
  
  return (
    <div className="bg-slate-800 rounded-lg p-3 shadow-inner border border-amber-500/20">
      <div className="flex justify-between mb-3">
        <div className="flex items-center">
          <Star className="h-5 w-5 text-amber-400 mr-1" />
          <span className="text-amber-100 text-sm font-medium">Сила:</span>
          <span className="text-amber-400 font-bold ml-1">{score}</span>
        </div>
        
        <div className="flex items-center">
          <ZapIcon className="h-5 w-5 text-amber-400 mr-1" />
          <span className="text-amber-100 text-sm font-medium">Уровень:</span>
          <span className="text-amber-400 font-bold ml-1">{level}</span>
        </div>
        
        <div className="flex items-center">
          <Timer className="h-5 w-5 text-amber-400 mr-1" />
          <span className="text-amber-100 text-sm font-medium">Ходы:</span>
          <span className={`font-bold ml-1 ${moves <= 5 ? 'text-red-400' : 'text-amber-400'}`}>{moves}</span>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center text-xs text-amber-200 mb-1">
          <span>Прогресс</span>
          <span>{Math.round(progressToNextLevel)}%</span>
        </div>
        <Progress value={progressToNextLevel} className="h-2 bg-slate-700" 
          indicatorClassName="bg-gradient-to-r from-amber-400 to-amber-500" />
      </div>
    </div>
  );
};

export default ScorePanel;
