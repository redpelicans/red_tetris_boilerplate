import softDrop, { getNewPiece } from "hooks/tetris-game/pieces/softDrop";
import { CURRENT_PIECE, FREE } from "constants/tetris";

describe("Soft Drop", () => {
  const mockGrid = [
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
    ["red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red"],
  ];

  const mockPiece = {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "red",
    padding: { x: 0, y: 0 },
    coord: { x: 0, y: 0 },
    dim: { height: 2, width: 3 },
  };

  test("getNewPiece", () => {
    const expectedPiece = {
      ...mockPiece,
      coord: { ...mockPiece.coord, y: mockPiece.coord.y + 1 },
    };

    const newPiece = getNewPiece(mockPiece);
    expect(newPiece).toEqual(expectedPiece);
  });

  test("drop", () => {
    const expectedGrid = [
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, CURRENT_PIECE, FREE, FREE, FREE],
      [CURRENT_PIECE, CURRENT_PIECE, CURRENT_PIECE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      ["red", "red", "red", "red", "red"],
      ["red", "red", "red", "red", "red"],
    ];

    const newPiece = getNewPiece(mockPiece);
    const newGrid = softDrop(mockGrid, newPiece);
    expect(newGrid).toEqual(expectedGrid);
  });

  test("Type Error", () => {
    expect(() => softDrop(mockPiece, null)).toThrow(TypeError);
    expect(() => softDrop(null, mockGrid)).toThrow(TypeError);
  });
});
