const HoveredSquares = ({ selectedSquares }) => {
  return (
    <div className="mr-2 text-sm font-semibold">
      Hovered Squares
      <div className="px-2 min-w-max overflow-y-auto max-h-screen">
        {selectedSquares.map(({ row, col }, i) => (
          <div
            className="mt-2 p-2 rounded border bg-lime-50 text-lime-700 text-sm font-semibold border-lime-300"
            key={i}
          >
            row {row} col {col}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoveredSquares;
