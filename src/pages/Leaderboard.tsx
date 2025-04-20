
import React from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

// Примеры данных для таблицы лидеров
const leaderboardData = [
  { name: "Сталкер", score: 12500, kills: 125, level: 8 },
  { name: "Выживший", score: 10200, kills: 102, level: 7 },
  { name: "Хищник", score: 9800, kills: 98, level: 6 },
  { name: "Охотник", score: 8600, kills: 86, level: 6 },
  { name: "Зачистка", score: 7400, kills: 74, level: 5 },
  { name: "Отряд_404", score: 6200, kills: 62, level: 5 },
  { name: "МЧС", score: 5000, kills: 50, level: 4 },
  { name: "Последний", score: 3800, kills: 38, level: 3 },
  { name: "Новичок", score: 2600, kills: 26, level: 2 },
  { name: "Турист", score: 1400, kills: 14, level: 1 },
];

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center py-12">
      <div className="w-full max-w-4xl px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-red-500 font-playfair">Лучшие выжившие</h1>
          <Link to="/">
            <Button variant="outline" className="border-red-500 text-red-500">
              <Home className="mr-2 h-4 w-4" />
              На главную
            </Button>
          </Link>
        </div>
        
        <div className="bg-slate-900/80 backdrop-blur-sm border border-red-900/50 rounded-lg overflow-hidden shadow-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b border-red-900/30 bg-black/30">
                <th className="px-6 py-3 text-left text-xs font-medium text-red-400 uppercase tracking-wider">Позиция</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-400 uppercase tracking-wider">Имя</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-400 uppercase tracking-wider">Счёт</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-400 uppercase tracking-wider">Убито</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-400 uppercase tracking-wider">Уровень</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {leaderboardData.map((entry, index) => (
                <tr key={index} className={index < 3 ? "bg-red-900/10" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`
                      flex items-center justify-center w-8 h-8 rounded-full 
                      ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-slate-300' : index === 2 ? 'bg-amber-700' : 'bg-slate-800'}
                      text-black font-bold text-sm
                    `}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {entry.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {entry.score.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {entry.kills}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-900/40 text-red-300">
                      Уровень {entry.level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 text-center text-slate-400 text-sm">
          <p>Станьте лучшим выжившим в апокалипсисе и запишите своё имя в историю.</p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
