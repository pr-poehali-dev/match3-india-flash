
import { useState, useEffect } from "react";
import GameTile from "./GameTile";

// Типы игровых элементов
type TileType = "samosa" | "curry" | "chai" | "naan" | "mango" | "lotus";

interface GameBoardProps {
  onScoreUpdate: (points: number) => void;
  onMoveMade: () => void;
  level: number;
}

const GameBoard = ({ onScoreUpdate, onMoveMade, level }: GameBoardProps) => {
  const boardSize = 8;
  const [board, setBoard] = useState<TileType[][]>([]);
  const [selectedTile, setSelectedTile] = useState<{row: number, col: number} | null>(null);
  const [isSwapping, setIsSwapping] = useState(false);
  const [isCheckingMatches, setIsCheckingMatches] = useState(false);
  
  // Элементы для игрового поля
  const tileTypes: TileType[] = ["samosa", "curry", "chai", "naan", "mango", "lotus"];
  
  // Инициализация игрового поля
  useEffect(() => {
    initializeBoard();
  }, []);
  
  const initializeBoard = () => {
    const newBoard: TileType[][] = [];
    
    for (let i = 0; i < boardSize; i++) {
      const row: TileType[] = [];
      for (let j = 0; j < boardSize; j++) {
        // Выбираем случайный элемент, но избегаем создания совпадений при старте
        let validTypes = [...tileTypes];
        
        // Проверка горизонтальных совпадений
        if (j >= 2) {
          if (row[j-1] === row[j-2]) {
            validTypes = validTypes.filter(type => type !== row[j-1]);
          }
        }
        
        // Проверка вертикальных совпадений
        if (i >= 2) {
          if (newBoard[i-1][j] === newBoard[i-2][j]) {
            validTypes = validTypes.filter(type => type !== newBoard[i-1][j]);
          }
        }
        
        const randomIndex = Math.floor(Math.random() * validTypes.length);
        row.push(validTypes[randomIndex]);
      }
      newBoard.push(row);
    }
    
    setBoard(newBoard);
  };
  
  // Обработка выбора плитки
  const handleTileClick = (row: number, col: number) => {
    if (isSwapping || isCheckingMatches) return;
    
    if (selectedTile === null) {
      // Первый выбор
      setSelectedTile({row, col});
    } else {
      // Второй выбор - проверяем, можно ли поменять местами
      const { row: selectedRow, col: selectedCol } = selectedTile;
      
      // Проверяем, что плитки соседние
      const isAdjacent = 
        (Math.abs(row - selectedRow) === 1 && col === selectedCol) || 
        (Math.abs(col - selectedCol) === 1 && row === selectedRow);
      
      if (isAdjacent) {
        // Меняем местами
        swapTiles(selectedRow, selectedCol, row, col);
      }
      
      // Снимаем выделение в любом случае
      setSelectedTile(null);
    }
  };
  
  // Смена плиток местами
  const swapTiles = async (row1: number, col1: number, row2: number, col2: number) => {
    setIsSwapping(true);
    
    // Создаем копию доски
    const newBoard = [...board];
    const temp = newBoard[row1][col1];
    newBoard[row1][col1] = newBoard[row2][col2];
    newBoard[row2][col2] = temp;
    
    setBoard(newBoard);
    
    // Проверка на совпадения после обмена
    const hasMatches = await checkMatches();
    
    if (hasMatches) {
      // Если есть совпадения, считаем ход
      onMoveMade();
    } else {
      // Если совпадений нет, возвращаем плитки на место
      setTimeout(() => {
        const revertBoard = [...newBoard];
        revertBoard[row2][col2] = revertBoard[row1][col1];
        revertBoard[row1][col1] = temp;
        
        setBoard(revertBoard);
        setIsSwapping(false);
      }, 500);
      return;
    }
    
    setIsSwapping(false);
  };
  
  // Проверка на совпадения
  const checkMatches = async (): Promise<boolean> => {
    setIsCheckingMatches(true);
    let hasMatches = false;
    
    // Создаем матрицу совпадений
    const matchMatrix: boolean[][] = Array(boardSize)
      .fill(false)
      .map(() => Array(boardSize).fill(false));
    
    // Проверка горизонтальных совпадений
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize - 2; j++) {
        if (
          board[i][j] !== null && 
          board[i][j] === board[i][j+1] && 
          board[i][j] === board[i][j+2]
        ) {
          matchMatrix[i][j] = true;
          matchMatrix[i][j+1] = true;
          matchMatrix[i][j+2] = true;
          hasMatches = true;
          
          // Проверяем, есть ли дополнительные совпадения
          let k = j + 3;
          while (k < boardSize && board[i][j] === board[i][k]) {
            matchMatrix[i][k] = true;
            k++;
          }
        }
      }
    }
    
    // Проверка вертикальных совпадений
    for (let j = 0; j < boardSize; j++) {
      for (let i = 0; i < boardSize - 2; i++) {
        if (
          board[i][j] !== null && 
          board[i][j] === board[i+1][j] && 
          board[i][j] === board[i+2][j]
        ) {
          matchMatrix[i][j] = true;
          matchMatrix[i+1][j] = true;
          matchMatrix[i+2][j] = true;
          hasMatches = true;
          
          // Проверяем, есть ли дополнительные совпадения
          let k = i + 3;
          while (k < boardSize && board[i][j] === board[k][j]) {
            matchMatrix[k][j] = true;
            k++;
          }
        }
      }
    }
    
    if (hasMatches) {
      // Подсчитываем количество совпадений и обновляем счет
      let matchCount = 0;
      for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
          if (matchMatrix[i][j]) {
            matchCount++;
          }
        }
      }
      
      // Даем больше очков за большие комбинации
      let points = matchCount * 10;
      if (matchCount >= 4) points += 50;
      if (matchCount >= 5) points += 100;
      
      // Умножаем на уровень для увеличения сложности
      points *= level;
      
      onScoreUpdate(points);
      
      // Анимация исчезновения и заполнения новыми
      await removeMatches(matchMatrix);
    }
    
    setIsCheckingMatches(false);
    return hasMatches;
  };
  
  // Удаление совпадений и заполнение новыми элементами
  const removeMatches = async (matchMatrix: boolean[][]) => {
    return new Promise<void>((resolve) => {
      // Создаем новую доску
      const newBoard = [...board];
      
      // Удаляем совпадения (заменяем на null)
      for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
          if (matchMatrix[i][j]) {
            newBoard[i][j] = null!;
          }
        }
      }
      
      setBoard(newBoard);
      
      // Ждем анимацию исчезновения
      setTimeout(() => {
        // "Гравитация" - опускаем элементы вниз
        const boardAfterGravity = applyGravity(newBoard);
        
        // Заполняем пустые места новыми случайными элементами
        const filledBoard = fillEmptySpaces(boardAfterGravity);
        
        setBoard(filledBoard);
        
        // Проверяем, появились ли новые совпадения
        setTimeout(async () => {
          const hasMatches = await checkMatches();
          
          // Если новых совпадений нет, завершаем процесс
          if (!hasMatches) {
            resolve();
          }
        }, 300);
      }, 300);
    });
  };
  
  // Применение "гравитации" - опускаем элементы вниз
  const applyGravity = (currentBoard: TileType[][]) => {
    const newBoard = [...currentBoard.map(row => [...row])];
    
    for (let j = 0; j < boardSize; j++) {
      let emptySpaces = 0;
      
      // Снизу вверх
      for (let i = boardSize - 1; i >= 0; i--) {
        if (newBoard[i][j] === null) {
          emptySpaces++;
        } else if (emptySpaces > 0) {
          // Перемещаем элемент вниз
          newBoard[i + emptySpaces][j] = newBoard[i][j];
          newBoard[i][j] = null!;
        }
      }
    }
    
    return newBoard;
  };
  
  // Заполнение пустых мест новыми элементами
  const fillEmptySpaces = (currentBoard: TileType[][]) => {
    const newBoard = [...currentBoard.map(row => [...row])];
    
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (newBoard[i][j] === null) {
          const randomIndex = Math.floor(Math.random() * tileTypes.length);
          newBoard[i][j] = tileTypes[randomIndex];
        }
      }
    }
    
    return newBoard;
  };
  
  return (
    <div className="grid grid-cols-8 gap-1 bg-amber-100 p-2 rounded-lg shadow-inner">
      {board.map((row, i) => 
        row.map((tile, j) => (
          <GameTile 
            key={`${i}-${j}`}
            type={tile} 
            isSelected={selectedTile?.row === i && selectedTile?.col === j}
            onClick={() => handleTileClick(i, j)}
          />
        ))
      )}
    </div>
  );
};

export default GameBoard;
