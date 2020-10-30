import { BLOCKED_PIECE } from "constants/tetris";

function malus(grid, nbLines) {
  const colLength = grid[0].length;
  const malusLines = Array.from(Array(nbLines), () =>
    new Array(colLength).fill(BLOCKED_PIECE),
  );
  const newGrid = [...grid.slice(nbLines), ...malusLines];
  return newGrid;
}

export default malus;
