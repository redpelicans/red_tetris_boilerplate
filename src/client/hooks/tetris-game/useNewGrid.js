import React from "react";
import * as Grid from "./grid";

function useNewGrid(cols, rows) {
  const grid = React.useRef(Grid.create(cols, rows));

  return grid.current;
}

export default useNewGrid;
