import React from "react";
import * as Grid from "./grid";

function useGrid(cols, rows) {
  const [piece, setPiece] = React.useState(() => Grid.create(cols, rows));

  const updatePiece = (newGrid) => setPiece(() => newGrid);

  return [grid, updateGrid];
}

export default useGrid;
