import * as Grid from "../grid";
import { CURRENT_PIECE, FREE } from "constants/tetris";

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

function forceInsertion(piece, grid) {
  const insertPos = getInsertPos(piece, grid);
  const newPiece = {
    ...piece,
    coord: { x: insertPos, y: 0 - piece.padding.y },
  };
  const heightLeft = getHeightLeft(insertPos, piece, grid);
  if (heightLeft === 0) {
    return null;
  }

  const gridCopy = Grid.partialWrite(
    grid,
    newPiece,
    newPiece.color,
    heightLeft,
  );
  return gridCopy;
}

export { forceInsertion };
export default insertion;

function getMidGrid(colLength) {
  return Math.floor(colLength / 2);
}

function getInsertPos(piece, grid) {
  const midGrid = getMidGrid(grid[0].length);
  return midGrid - Math.ceil((piece.shape[0].length - piece.padding.x) / 2);
}

function getHeightLeft(insertPos, piece, grid) {
  const {
    dim: { height, width },
  } = piece;
  const colLimit = insertPos + width;

  for (let row = 0; row < height; row++) {
    for (let col = insertPos; col < colLimit; col++) {
      if (grid[row][col] !== FREE) {
        return row;
      }
    }
  }
  return 0;
}
