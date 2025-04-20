
// Изображения для типов плиток
import { Coffee, Circle, Triangle, Square, Star, Flower } from "lucide-react";

interface GameTileProps {
  type: "samosa" | "curry" | "chai" | "naan" | "mango" | "lotus" | null;
  isSelected: boolean;
  onClick: () => void;
}

const GameTile = ({ type, isSelected, onClick }: GameTileProps) => {
  // Если тип null, возвращаем пустой элемент (для анимации исчезновения)
  if (type === null) {
    return (
      <div className="w-full aspect-square animate-fade-out" />
    );
  }
  
  // Получаем иконку и цвет для типа плитки
  const getTileContent = () => {
    switch (type) {
      case "samosa":
        return { icon: <Triangle className="h-6 w-6" />, color: "bg-amber-300 text-amber-700" };
      case "curry":
        return { icon: <Circle className="h-6 w-6" />, color: "bg-orange-300 text-orange-700" };
      case "chai":
        return { icon: <Coffee className="h-6 w-6" />, color: "bg-red-300 text-red-700" };
      case "naan":
        return { icon: <Square className="h-6 w-6" />, color: "bg-yellow-300 text-yellow-700" };
      case "mango":
        return { icon: <Star className="h-6 w-6" />, color: "bg-green-300 text-green-700" };
      case "lotus":
        return { icon: <Flower className="h-6 w-6" />, color: "bg-pink-300 text-pink-700" };
      default:
        return { icon: <Circle className="h-6 w-6" />, color: "bg-gray-300 text-gray-700" };
    }
  };
  
  const { icon, color } = getTileContent();
  
  return (
    <div 
      className={`
        w-full aspect-square rounded-md flex items-center justify-center cursor-pointer
        ${color} hover:brightness-110 transition-all duration-200 hover:scale-105
        ${isSelected ? 'ring-2 ring-amber-500 scale-110 shadow-md' : ''}
        animate-fade-in
      `}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

export default GameTile;
