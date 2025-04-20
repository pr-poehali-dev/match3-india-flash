
import React from "react";

interface BulletProps {
  bullet: {
    id: number;
    x: number;
    y: number;
    angle: number;
  };
}

const Bullet: React.FC<BulletProps> = ({ bullet }) => {
  return (
    <div
      className="absolute w-2 h-2 bg-yellow-400 rounded-full"
      style={{
        left: bullet.x - 1, // Центрирование
        top: bullet.y - 1,  // Центрирование
        boxShadow: '0 0 5px 2px rgba(255, 214, 0, 0.6)'
      }}
    />
  );
};

export default Bullet;
