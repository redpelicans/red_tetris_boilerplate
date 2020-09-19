import { CURRENT_PIECE, FREE } from "../constants";

function clear(grid) {
  return grid.map((row) =>
    row.map((col) => (col === CURRENT_PIECE ? FREE : col)),
  );
}

export default clear;
