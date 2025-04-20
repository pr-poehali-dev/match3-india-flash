
import React from "react";
import { Heart, Skull, Target, Box } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface GameHUDProps {
  score: number;
  kills: number;
  health: number;
  ammo: number;
  level: number;
  isReloading: boolean;
}

const GameHUD: React.FC<GameHUDProps> = ({ score, kills, health, ammo, level, isReloading }) => {
  return (
    <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-20">
      {/* Левая панель - здоровье и очки */}
      <div className="bg-black/60 backdrop-blur-sm p-3 rounded-lg border border-red-900/50">
        <div className="flex items-center mb-2">
          <Heart className="text-red-500 w-5 h-5 mr-2" />
          <div className="w-48">
            <Progress
              className="h-3 bg-slate-800 [&>div]:bg-gradient-to-r [&>div]:from-red-700 [&>div]:to-red-500"
              value={health}
            />
          </div>
          <span className="text-white ml-2 font-bold">{health}%</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Target className="text-yellow-500 w-5 h-5 mr-2" />
            <span className="text-white font-bold">{score}</span>
          </div>
          
          <div className="flex items-center">
            <Skull className="text-gray-400 w-5 h-5 mr-2" />
            <span className="text-white font-bold">{kills}</span>
          </div>
          
          <div className="flex items-center">
            <Box className="text-purple-400 w-5 h-5 mr-2" />
            <span className="text-white font-bold">{level}</span>
          </div>
        </div>
      </div>
      
      {/* Правая панель - патроны */}
      <div className="bg-black/60 backdrop-blur-sm p-3 rounded-lg border border-red-900/50">
        <div className="flex items-center">
          {isReloading ? (
            <span className="text-yellow-500 font-bold text-sm animate-pulse">ПЕРЕЗАРЯДКА...</span>
          ) : (
            <>
              <span className="text-white font-bold">{ammo}</span>
              <span className="text-gray-500 mx-1">/</span>
              <span className="text-gray-400">30</span>
            </>
          )}
        </div>
        
        <div className="flex mt-1">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-6 mx-px ${i < ammo / 3 ? 'bg-yellow-500' : 'bg-gray-700'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameHUD;
