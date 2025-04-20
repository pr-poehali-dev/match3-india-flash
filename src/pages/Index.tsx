
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skull } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-repeat"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center z-10"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-red-500 mb-4 font-playfair tracking-tight">АПОКАЛИПСИС</h1>
        <p className="text-slate-300 mb-8 max-w-md mx-auto">Выживи в мире, захваченном зомби. Стреляй метко, двигайся быстро, и, может быть, ты доживешь до рассвета.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/game">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8">
              <Skull className="mr-2 h-5 w-5" />
              Начать игру
            </Button>
          </Link>
          
          <Link to="/leaderboard">
            <Button size="lg" variant="outline" className="border-red-500 text-red-500 hover:bg-red-900/20">
              Таблица лидеров
            </Button>
          </Link>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute bottom-4 text-slate-400 text-sm"
      >
        © 2024 Апокалипсис - Выжить любой ценой
      </motion.div>
    </div>
  );
};

export default Index;
