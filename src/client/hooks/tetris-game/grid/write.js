import { shallowCopy } from "helpers/functional";
import { CURRENT_PIECE } from "../constants";
import * as Check from "./checks";

function write(grid, piece) {
  const { shape, padding, coord } = piece;
  const newGrid = shallowCopy(grid);

  const colLength = shape[0].length;
  const rowLength = shape.length;

  for (let col = padding.x; col < colLength; col++) {
    for (let row = padding.y; row < rowLength; row++) {
      if (Check.isPartOfPiece(shape[row][col])) {
        newGrid[coord.y + row][coord.x + col] = CURRENT_PIECE;
      }
    }
  }
  return newGrid;
}

export default write;
