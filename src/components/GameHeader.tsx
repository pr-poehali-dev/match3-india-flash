
import { Sparkles } from "lucide-react";

const GameHeader = () => {
  return (
    <div className="w-full text-center py-4">
      <div className="flex items-center justify-center">
        <Sparkles className="h-8 w-8 text-amber-400 mr-2" />
        <h1 className="text-3xl font-bold text-amber-400 font-playfair">Алатырь</h1>
        <Sparkles className="h-8 w-8 text-amber-400 ml-2" />
      </div>
      <p className="text-blue-100 mt-1">Древняя сила в твоих руках</p>
    </div>
  );
};

export default GameHeader;
