import { CURRENT_PIECE, SHADOW_PIECE, FREE } from "../constants";

function clear(grid) {
  return grid.map((row) =>
    row.map((col) => {
      if (col === CURRENT_PIECE || col === SHADOW_PIECE) {
        return FREE;
      }
      return col;
    }),
  );
}

export default clear;
