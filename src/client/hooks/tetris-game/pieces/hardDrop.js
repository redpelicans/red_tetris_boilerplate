import * as Grid from "../grid";
import { CURRENT_PIECE } from "../constants";
import { getDropPosition } from "./shadow";

function hardDrop(grid, piece) {
  const initialY = piece.coord.y;

  const cleanGrid = Grid.clear(grid);

  const newPiece = getDropPosition(cleanGrid, piece);

  const newGrid = Grid.write(cleanGrid, newPiece, CURRENT_PIECE);
  const [gridAfterBind, additionalScore] = Grid.bind(newGrid, newPiece);
  const score = (newPiece.coord.y - initialY) * 2 + additionalScore;
  return [gridAfterBind, score];
}

export default hardDrop;
