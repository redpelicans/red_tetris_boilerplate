import shadow from "hooks/tetris-game/pieces/shadow";
import { SHADOW_PIECE, CURRENT_PIECE, FREE } from "constants/tetris";

describe("Shadow Piece", () => {
  const mockGrid = [
    [FREE, FREE, CURRENT_PIECE, FREE, FREE],
    [FREE, CURRENT_PIECE, CURRENT_PIECE, CURRENT_PIECE, FREE],
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
    coord: { x: 1, y: 0 },
    dim: { height: 2, width: 3 },
  };

  test("draw the shadow piece on top of the others", () => {
    const expected = [
      [FREE, FREE, CURRENT_PIECE, FREE, FREE],
      [FREE, CURRENT_PIECE, CURRENT_PIECE, CURRENT_PIECE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, SHADOW_PIECE, FREE, FREE],
      [FREE, SHADOW_PIECE, SHADOW_PIECE, SHADOW_PIECE, FREE],
      ["red", "red", "red", "red", "red"],
      ["red", "red", "red", "red", "red"],
    ];

    expect(shadow(mockGrid, mockPiece)).toEqual(expected);
  });
});
