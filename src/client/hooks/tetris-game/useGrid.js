import React from "react";
import * as Grid from "./grid";

function useGrid(cols, rows) {
  const [grid, setGrid] = React.useState(() => Grid.create(cols, rows));

  const updateGrid = (newGrid) => setGrid(() => newGrid);

  return [grid, updateGrid];
}

export default useGrid;
