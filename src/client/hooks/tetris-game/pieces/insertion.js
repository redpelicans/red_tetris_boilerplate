import * as Grid from "../grid";
import { CURRENT_PIECE } from "constants/tetris";

function insertion(piece, grid) {
  const gridCopy = Grid.write(grid, piece, CURRENT_PIECE);

  return gridCopy;
}

function force(piece, grid) {
  const gridCopy = Grid.partialWrite(grid, piece, piece.color);

  return gridCopy;
}

function getNewPiece(piece, grid) {
  const insertPos = getInsertPos(piece, grid);
  const newPiece = {
    ...piece,
    coord: { x: insertPos, y: 0 - piece.padding.y },
  };

  return newPiece;
}

export { force, getNewPiece };
export default insertion;

function getMidGrid(colLength) {
  return Math.floor(colLength / 2);
}

function getInsertPos(piece, grid) {
  const midGrid = getMidGrid(grid[0].length);

  return midGrid - Math.ceil((piece.shape[0].length - piece.padding.x) / 2);
}
