
// Импорт иконок для символов
import { Star, Sun, Zap, Shield, Flame, Heart } from "lucide-react";

interface GameTileProps {
  type: "alatyr" | "svarog" | "perun" | "veles" | "yarilo" | "makosh" | null;
  isSelected: boolean;
  onClick: () => void;
  disabled: boolean;
}

const GameTile = ({ type, isSelected, onClick, disabled }: GameTileProps) => {
  // Если тип null, возвращаем пустой элемент (для анимации исчезновения)
  if (type === null) {
    return (
      <div className="w-full aspect-square animate-fade-out" />
    );
  }
  
  // Получаем иконку и цвет для типа плитки
  const getTileContent = () => {
    switch (type) {
      case "alatyr":
        return { 
          icon: <Star className="h-6 w-6" />, 
          color: "bg-gradient-to-br from-amber-400 to-amber-600 text-amber-900",
          border: "border-amber-700"
        };
      case "svarog":
        return { 
          icon: <Sun className="h-6 w-6" />, 
          color: "bg-gradient-to-br from-orange-400 to-orange-600 text-orange-900",
          border: "border-orange-700"
        };
      case "perun":
        return { 
          icon: <Zap className="h-6 w-6" />, 
          color: "bg-gradient-to-br from-blue-400 to-blue-600 text-blue-900",
          border: "border-blue-700"
        };
      case "veles":
        return { 
          icon: <Shield className="h-6 w-6" />, 
          color: "bg-gradient-to-br from-emerald-400 to-emerald-600 text-emerald-900",
          border: "border-emerald-700"
        };
      case "yarilo":
        return { 
          icon: <Flame className="h-6 w-6" />, 
          color: "bg-gradient-to-br from-red-400 to-red-600 text-red-900",
          border: "border-red-700"
        };
      case "makosh":
        return { 
          icon: <Heart className="h-6 w-6" />, 
          color: "bg-gradient-to-br from-purple-400 to-purple-600 text-purple-900",
          border: "border-purple-700"
        };
      default:
        return { 
          icon: <Star className="h-6 w-6" />, 
          color: "bg-gradient-to-br from-gray-400 to-gray-600 text-gray-900",
          border: "border-gray-700" 
        };
    }
  };
  
  const { icon, color, border } = getTileContent();
  
  return (
    <div 
      className={`
        w-full aspect-square rounded-md flex items-center justify-center cursor-pointer
        ${color} hover:brightness-110 transition-all duration-200
        ${isSelected ? 'ring-2 ring-white scale-110 shadow-lg shadow-amber-500/20' : ''}
        animate-fade-in border ${border}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
      `}
      onClick={disabled ? undefined : onClick}
    >
      {icon}
    </div>
  );
};

export default GameTile;
