import hardDrop from "hooks/tetris-game/pieces/hardDrop";
import { CURRENT_PIECE, FREE } from "constants/tetris";

describe("Hard Drop", () => {
  const mockGrid = [
    [FREE, CURRENT_PIECE, FREE, FREE, FREE],
    [CURRENT_PIECE, CURRENT_PIECE, CURRENT_PIECE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
  ];

  const mockGridWithDeletion = [
    [FREE, CURRENT_PIECE, FREE, FREE, FREE],
    [CURRENT_PIECE, CURRENT_PIECE, CURRENT_PIECE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, "red", "red"],
  ];

  const mockPiece = {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "green",
    padding: { x: 0, y: 0 },
    coord: { x: 0, y: 0 },
    dim: { height: 2, width: 3 },
  };

  test("Valid drop", () => {
    const expectedGrid = [
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, "green", FREE, FREE, FREE],
      ["green", "green", "green", FREE, FREE],
    ];

    const [newGrid, score, rowsRemoved] = hardDrop(mockGrid, mockPiece);
    expect(newGrid).toEqual(expectedGrid);
    expect(score).toEqual(6);
    expect(rowsRemoved).toEqual(0);
  });

  test("Valid drop with deletion", () => {
    const expectedGrid = [
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, "green", FREE, FREE, FREE],
    ];

    const [newGrid, score, rowsRemoved] = hardDrop(
      mockGridWithDeletion,
      mockPiece,
    );
    expect(newGrid).toEqual(expectedGrid);
    expect(score).toEqual(106);
    expect(rowsRemoved).toEqual(1);
  });

  test("Type Error", () => {
    expect(() => hardDrop(mockPiece, null)).toThrow(TypeError);
    expect(() => hardDrop(null, mockGrid)).toThrow(TypeError);
  });
});
