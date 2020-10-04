import lateralMove from "hooks/tetris-game/pieces/lateralMove";
import { CURRENT_PIECE, FREE, MOVE_LEFT, MOVE_RIGHT } from "constants/tetris";

describe("Lateral Move", () => {
  const mockGrid = [
    [FREE, CURRENT_PIECE, FREE, FREE, FREE],
    [CURRENT_PIECE, CURRENT_PIECE, CURRENT_PIECE, FREE, FREE],
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

    const [newGrid, newPiece] = lateralMove(mockGrid, mockPiece, MOVE_RIGHT);
    expect(newGrid).toEqual(expectedGrid);
    expect(newPiece).toEqual(expectedPiece);
  });

  test("Invalid Lateral Move", () => {
    expect(lateralMove(mockGrid, mockPiece, MOVE_LEFT)).toBeNull();
  });

  test("Type Error", () => {
    expect(() => lateralMove(mockPiece, null, MOVE_RIGHT)).toThrow(TypeError);
    expect(() => lateralMove(null, mockGrid, MOVE_RIGHT)).toThrow(TypeError);
    expect(() => lateralMove(mockPiece, mockGrid, null)).toThrow(TypeError);
  });
});
