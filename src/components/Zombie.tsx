
import React from "react";
import { motion } from "framer-motion";

interface ZombieProps {
  zombie: {
    id: number;
    x: number;
    y: number;
    health: number;
    size: number;
  };
}

const Zombie: React.FC<ZombieProps> = ({ zombie }) => {
  // Рассчет процента здоровья для цвета
  const healthPercent = zombie.health / (50 + 10); // Базовое здоровье + добавка первого уровня
  const green = Math.floor(healthPercent * 128);
  const red = 128 + Math.floor((1 - healthPercent) * 127);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
      className="absolute flex flex-col items-center"
      style={{
        left: zombie.x - zombie.size / 2,
        top: zombie.y - zombie.size / 2,
      }}
    >
      {/* Тело зомби */}
      <div
        className="rounded-full flex items-center justify-center border-2 border-gray-900"
        style={{
          width: zombie.size,
          height: zombie.size,
          backgroundColor: `rgb(${red}, ${green}, 0)`,
        }}
      >
        <div className="flex flex-col items-center">
          {/* Глаза */}
          <div className="flex space-x-2 mb-1">
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
          </div>
          {/* Рот */}
          <div className="w-4 h-1 bg-black rounded"></div>
        </div>
      </div>
      
      {/* Индикатор здоровья */}
      <div className="w-full h-1 bg-gray-800 mt-1 rounded">
        <div
          className="h-full bg-red-600 rounded"
          style={{ width: `${(zombie.health / (50 + 10)) * 100}%` }}
        ></div>
      </div>
    </motion.div>
  );
};

export default Zombie;
