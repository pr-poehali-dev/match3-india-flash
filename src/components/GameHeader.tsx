
import { Button } from "@/components/ui/button";
import { HelpCircle, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

const GameHeader = () => {
  const [isMuted, setIsMuted] = useState(false);
  
  return (
    <div className="w-full max-w-md flex flex-col items-center mt-6">
      <div className="flex items-center mb-2">
        <img 
          src="/placeholder.svg" 
          alt="Индийский Кот" 
          className="w-16 h-16 mr-2 rounded-full border-2 border-amber-500"
        />
        <h1 className="text-3xl font-bold text-amber-800">
          Индийский Кот <span className="text-orange-600">3 в ряд</span>
        </h1>
      </div>
      
      <div className="flex justify-between w-full px-2 mt-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-amber-700 hover:bg-amber-100"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <VolumeX /> : <Volume2 />}
        </Button>
        
        <Button 
          variant="outline" 
          className="text-amber-800 border-amber-500 hover:bg-amber-100"
          onClick={() => alert("Соедините 3 или более одинаковых предмета в ряд или столбец чтобы убрать их с поля. Чем больше предметов в комбинации, тем больше очков!")}
        >
          <HelpCircle className="mr-1" />
          Правила
        </Button>
      </div>
    </div>
  );
};

export default GameHeader;
