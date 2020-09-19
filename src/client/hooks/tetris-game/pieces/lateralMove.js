import * as Grid from "../grid";

function lateralMove(grid, piece, direction) {
  const newPiece = {
    ...piece,
    coord: { ...piece.coord, x: piece.coord.x + direction },
  };

  const cleanGrid = Grid.clear(grid);
  if (!Grid.Check.canPutLayer(cleanGrid, newPiece)) {
    return null;
  }

  const newGrid = Grid.write(cleanGrid, newPiece);
  return [newGrid, newPiece];
}

export default lateralMove;
