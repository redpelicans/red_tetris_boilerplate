import * as Grid from "../grid";
import { CURRENT_PIECE } from "../constants";

function insertion(piece, grid) {
  const insertPos = getInsertPos(piece, grid);
  const newPiece = {
    ...piece,
    coord: { x: insertPos, y: 0 - piece.padding.y },
  };

  if (!Grid.Check.canPutLayer(grid, newPiece)) {
    return null;
  }

  const gridCopy = Grid.write(grid, newPiece, CURRENT_PIECE);
  return [gridCopy, newPiece];
}

export default insertion;

function getMidGrid(colLength) {
  return Math.floor(colLength / 2);
}

function getInsertPos(piece, grid) {
  const midGrid = getMidGrid(grid[0].length);
  return midGrid - Math.ceil((piece.shape[0].length - piece.padding.x) / 2);
}
