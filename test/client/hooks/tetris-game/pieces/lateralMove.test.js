import lateralMove, { getNewPiece } from "hooks/tetris-game/pieces/lateralMove";
import { CURRENT_PIECE, FREE, MOVE_RIGHT } from "constants/tetris";

describe("Lateral Move", () => {
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

  test("Valid Lateral Move", () => {
    const expectedGrid = [
      [FREE, FREE, CURRENT_PIECE, FREE, FREE],
      [FREE, CURRENT_PIECE, CURRENT_PIECE, CURRENT_PIECE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      ["red", "red", "red", "red", "red"],
      ["red", "red", "red", "red", "red"],
    ];

    const expectedPiece = {
      ...mockPiece,
      coord: { ...mockPiece.coord, x: mockPiece.coord.x + 1 },
    };

    const newPiece = getNewPiece(mockPiece, MOVE_RIGHT);
    expect(newPiece).toEqual(expectedPiece);
    const newGrid = lateralMove(mockGrid, newPiece);
    expect(newGrid).toEqual(expectedGrid);
  });

  test("Type Error", () => {
    expect(() => lateralMove(mockPiece, null, MOVE_RIGHT)).toThrow(TypeError);
    expect(() => lateralMove(null, mockGrid, MOVE_RIGHT)).toThrow(TypeError);
    expect(() => lateralMove(mockPiece, mockGrid, null)).toThrow(TypeError);
  });
});
