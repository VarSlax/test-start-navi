import { useState, useCallback } from "react";
import PickedSquaresList from "./components/PickedSquaresList";
import SelectMode from "./components/SelectMode";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [selectedSquares, setSelectedSquares] = useState([]);
  const [gridSize, setGridSize] = useState(5);

  const handleChangeGridSize = useCallback((size) => {
    setGridSize(size);
    setSelectedSquares([]);
    setIsGameStarted(false);
  }, []);

  const pickSquare = useCallback(
    (square) => {
      if (!isGameStarted) {
        return;
      }

      setSelectedSquares((prevSquares) => {
        const updatedSquares = prevSquares.filter(
          (sq) => sq.row !== square.row || sq.col !== square.col
        );

        return updatedSquares.length === prevSquares.length
          ? [...prevSquares, square]
          : updatedSquares;
      });
    },
    [isGameStarted]
  );

  return (
    <div className="w-fit m-2">
      <div className="flex mb-6">
        <SelectMode setGridSize={handleChangeGridSize} />
        <button
          onClick={() => setIsGameStarted((prev) => !prev)}
          className="px-4 py-1.5 ml-2 font-semibold rounded-md text-white bg-blue-600"
        >
          {!isGameStarted ? "START" : "STOP"}
        </button>
      </div>
      <div className="flex">
        <div className="w-fit h-fit border border-slate-700 mr-5">
          {Array.from({ length: gridSize }, (_, row) => (
            <div key={row} className="flex">
              {Array.from({ length: gridSize }, (_, col) => {
                const square = { row: row + 1, col: col + 1 };
                const isSelected = selectedSquares.some(
                  (sq) => sq.row === square.row && sq.col === square.col
                );
                return (
                  <div
                    key={col}
                    onMouseOver={() => pickSquare(square)}
                    className={`border border-slate-700 ${
                      gridSize > 10 ? "p-2" : "p-4"
                    } ${isSelected ? "bg-blue-400" : "bg-white"}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <PickedSquaresList selectedSquares={selectedSquares} />
      </div>
    </div>
  );
}

export default App;
