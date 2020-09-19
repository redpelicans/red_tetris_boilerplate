import * as Grid from "../grid";

function getHardDropPosition(grid, piece) {
  const maxY = grid.length;
  const newPiece = { ...piece };

  let hardDropCoord = piece.coord.y;

  for (let row = piece.coord.y; row < maxY; row++) {
    if (Grid.Check.canPutLayer(grid, newPiece)) {
      hardDropCoord = newPiece.coord;
      newPiece.coord = { ...newPiece.coord, y: newPiece.coord.y + 1 };
    } else {
      newPiece.coord = hardDropCoord;
      return newPiece;
    }
  }
  return piece;
}

function hardDrop(grid, piece) {
  const initialY = piece.coord.y;

  const cleanGrid = Grid.clear(grid);

  const newPiece = getHardDropPosition(cleanGrid, piece);

  const newGrid = Grid.write(cleanGrid, newPiece);
  const [gridAfterBind, additionalScore] = Grid.bind(newGrid, newPiece);
  const score = (newPiece.coord.y - initialY) * 2 + additionalScore;
  return [gridAfterBind, score];
}

export default hardDrop;
