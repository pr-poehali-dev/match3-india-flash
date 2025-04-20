
import React from "react";
import { motion } from "framer-motion";

interface PlayerProps {
  position: {
    x: number;
    y: number;
  };
}

const Player: React.FC<PlayerProps> = ({ position }) => {
  return (
    <motion.div
      className="absolute w-10 h-10 bg-blue-600 rounded-full border-2 border-blue-400 z-10 flex items-center justify-center"
      style={{
        left: position.x - 20, // Центрирование
        top: position.y - 20,  // Центрирование
      }}
    >
      <div className="w-2 h-8 bg-gray-700 absolute"></div>
      <div className="w-8 h-2 bg-gray-700 absolute"></div>
    </motion.div>
  );
};

export default Player;
