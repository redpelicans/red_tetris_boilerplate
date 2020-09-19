import * as Grid from "../grid";

function softDrop(grid, piece) {
  const newPiece = {
    ...piece,
    coord: { ...piece.coord, y: piece.coord.y + 1 },
  };

  const cleanGrid = Grid.clear(grid);
  if (!Grid.Check.canPutLayer(cleanGrid, newPiece)) {
    return null;
  }

  const newGrid = Grid.write(cleanGrid, newPiece);
  return [newGrid, newPiece];
}

export default softDrop;
