
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import GameHUD from "@/components/GameHUD";
import Zombie from "@/components/Zombie";
import Player from "@/components/Player";
import Bullet from "@/components/Bullet";

interface ZombieType {
  id: number;
  x: number;
  y: number;
  health: number;
  speed: number;
  size: number;
}

interface BulletType {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
}

const Game = () => {
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [kills, setKills] = useState(0);
  const [ammo, setAmmo] = useState(30);
  const [health, setHealth] = useState(100);
  const [level, setLevel] = useState(1);
  const [zombies, setZombies] = useState<ZombieType[]>([]);
  const [bullets, setBullets] = useState<BulletType[]>([]);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [isReloading, setIsReloading] = useState(false);
  const [lastSpawn, setLastSpawn] = useState(0);
  
  // Инициализация игры
  useEffect(() => {
    const gameArea = gameAreaRef.current;
    if (!gameArea) return;
    
    // Установка начальной позиции игрока в центр
    setPlayerPosition({
      x: gameArea.offsetWidth / 2,
      y: gameArea.offsetHeight / 2
    });
    
    // Отслеживание движения мыши для прицеливания
    const handleMouseMove = (e: MouseEvent) => {
      const rect = gameArea.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Угол между игроком и курсором для поворота игрока
      const playerAngle = Math.atan2(
        y - playerPosition.y,
        x - playerPosition.x
      ) * (180 / Math.PI);
      
      // Здесь можно обновить угол поворота игрока если нужно
    };
    
    // Отслеживание кликов для стрельбы
    const handleClick = (e: MouseEvent) => {
      if (ammo > 0 && !isReloading && !gameOver) {
        const rect = gameArea.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Рассчет угла выстрела
        const angle = Math.atan2(
          y - playerPosition.y,
          x - playerPosition.x
        );
        
        // Добавление новой пули
        const newBullet = {
          id: Date.now(),
          x: playerPosition.x,
          y: playerPosition.y,
          angle,
          speed: 10,
        };
        
        setBullets(prev => [...prev, newBullet]);
        setAmmo(prev => prev - 1);
        
        // Звук выстрела можно добавить здесь
      }
    };
    
    // Перезарядка по клавише R
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'r' && !isReloading && ammo < 30) {
        reload();
      }
    };
    
    gameArea.addEventListener('mousemove', handleMouseMove);
    gameArea.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      gameArea.removeEventListener('mousemove', handleMouseMove);
      gameArea.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [playerPosition, ammo, isReloading, gameOver]);
  
  // Игровой цикл
  useEffect(() => {
    if (gameOver) return;
    
    const gameLoop = setInterval(() => {
      // Спавн зомби
      const now = Date.now();
      if (now - lastSpawn > 2000 / level) { // Частота спавна зависит от уровня
        spawnZombie();
        setLastSpawn(now);
      }
      
      // Движение зомби к игроку
      setZombies(prev => prev.map(zombie => {
        const dx = playerPosition.x - zombie.x;
        const dy = playerPosition.y - zombie.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Если зомби достиг игрока
        if (distance < 30) {
          takeDamage(5); // Игрок получает урон
          return zombie;
        }
        
        // Передвижение зомби в направлении игрока
        const vx = (dx / distance) * zombie.speed;
        const vy = (dy / distance) * zombie.speed;
        
        return {
          ...zombie,
          x: zombie.x + vx,
          y: zombie.y + vy
        };
      }));
      
      // Движение пуль
      setBullets(prev => prev.map(bullet => {
        const vx = Math.cos(bullet.angle) * bullet.speed;
        const vy = Math.sin(bullet.angle) * bullet.speed;
        
        return {
          ...bullet,
          x: bullet.x + vx,
          y: bullet.y + vy
        };
      }).filter(bullet => {
        // Удаление пуль, вышедших за пределы игрового поля
        if (!gameAreaRef.current) return false;
        
        return (
          bullet.x > 0 &&
          bullet.x < gameAreaRef.current.offsetWidth &&
          bullet.y > 0 &&
          bullet.y < gameAreaRef.current.offsetHeight
        );
      }));
      
      // Проверка столкновений пуль с зомби
      setBullets(prev => {
        const remainingBullets = [...prev];
        
        setZombies(prevZombies => {
          let updatedZombies = [...prevZombies];
          
          for (let i = remainingBullets.length - 1; i >= 0; i--) {
            const bullet = remainingBullets[i];
            
            for (let j = updatedZombies.length - 1; j >= 0; j--) {
              const zombie = updatedZombies[j];
              const dx = bullet.x - zombie.x;
              const dy = bullet.y - zombie.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              // Если пуля попала в зомби
              if (distance < zombie.size / 2) {
                // Уменьшение здоровья зомби
                const updatedZombie = {
                  ...zombie,
                  health: zombie.health - 25
                };
                
                // Если зомби умер
                if (updatedZombie.health <= 0) {
                  // Удаление зомби
                  updatedZombies = updatedZombies.filter(z => z.id !== zombie.id);
                  setScore(prev => prev + 100);
                  setKills(prev => prev + 1);
                  
                  // Повышение уровня
                  if ((kills + 1) % 10 === 0) {
                    setLevel(prev => prev + 1);
                  }
                } else {
                  // Обновление зомби с уменьшенным здоровьем
                  updatedZombies[j] = updatedZombie;
                }
                
                // Удаление пули
                remainingBullets.splice(i, 1);
                break;
              }
            }
          }
          
          return updatedZombies;
        });
        
        return remainingBullets;
      });
      
    }, 16); // ~60 FPS
    
    return () => clearInterval(gameLoop);
  }, [playerPosition, gameOver, level, kills, lastSpawn]);
  
  // Проверка условий окончания игры
  useEffect(() => {
    if (health <= 0) {
      setGameOver(true);
    }
  }, [health]);
  
  // Функция для спавна зомби
  const spawnZombie = () => {
    if (!gameAreaRef.current) return;
    
    const gameWidth = gameAreaRef.current.offsetWidth;
    const gameHeight = gameAreaRef.current.offsetHeight;
    
    // Определение стороны спавна (0: верх, 1: право, 2: низ, 3: лево)
    const side = Math.floor(Math.random() * 4);
    
    let x, y;
    switch (side) {
      case 0: // Верх
        x = Math.random() * gameWidth;
        y = -50;
        break;
      case 1: // Право
        x = gameWidth + 50;
        y = Math.random() * gameHeight;
        break;
      case 2: // Низ
        x = Math.random() * gameWidth;
        y = gameHeight + 50;
        break;
      case 3: // Лево
        x = -50;
        y = Math.random() * gameHeight;
        break;
      default:
        x = 0;
        y = 0;
    }
    
    // Создание нового зомби
    const newZombie = {
      id: Date.now(),
      x,
      y,
      health: 50 + level * 10, // Здоровье увеличивается с уровнем
      speed: 1 + level * 0.2, // Скорость увеличивается с уровнем
      size: 40,
    };
    
    setZombies(prev => [...prev, newZombie]);
  };
  
  // Функция для перезарядки
  const reload = () => {
    if (isReloading || ammo === 30) return;
    
    setIsReloading(true);
    
    // Анимация перезарядки
    setTimeout(() => {
      setAmmo(30);
      setIsReloading(false);
    }, 2000);
  };
  
  // Функция для нанесения урона игроку
  const takeDamage = (amount: number) => {
    setHealth(prev => Math.max(0, prev - amount));
  };
  
  // Перезапуск игры
  const restartGame = () => {
    setGameOver(false);
    setScore(0);
    setKills(0);
    setAmmo(30);
    setHealth(100);
    setLevel(1);
    setZombies([]);
    setBullets([]);
    setIsReloading(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <div 
        ref={gameAreaRef}
        className="relative bg-slate-900 w-full max-w-4xl aspect-video overflow-hidden border-2 border-red-800"
      >
        {/* Игрок */}
        <Player position={playerPosition} />
        
        {/* Зомби */}
        <AnimatePresence>
          {zombies.map(zombie => (
            <Zombie key={zombie.id} zombie={zombie} />
          ))}
        </AnimatePresence>
        
        {/* Пули */}
        {bullets.map(bullet => (
          <Bullet key={bullet.id} bullet={bullet} />
        ))}
        
        {/* Интерфейс */}
        <GameHUD score={score} kills={kills} health={health} ammo={ammo} level={level} isReloading={isReloading} />
        
        {/* Экран окончания игры */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-8 rounded-lg bg-slate-900 border-2 border-red-700"
            >
              <h2 className="text-3xl text-red-500 font-bold mb-4">ИГРА ОКОНЧЕНА</h2>
              <p className="text-slate-300 mb-2">Счёт: <span className="text-red-400 font-bold">{score}</span></p>
              <p className="text-slate-300 mb-2">Убито зомби: <span className="text-red-400 font-bold">{kills}</span></p>
              <p className="text-slate-300 mb-6">Уровень: <span className="text-red-400 font-bold">{level}</span></p>
              
              <div className="flex gap-4 justify-center">
                <Button onClick={restartGame} className="bg-red-600 hover:bg-red-700">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Начать заново
                </Button>
                <Link to="/">
                  <Button variant="outline" className="border-red-500 text-red-500">
                    <Home className="mr-2 h-4 w-4" />
                    На главную
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
