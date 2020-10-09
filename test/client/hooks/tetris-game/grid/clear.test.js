import clear from "hooks/tetris-game/grid/clear";
import { SHADOW_PIECE, CURRENT_PIECE, FREE } from "constants/tetris";

describe("Clear", () => {
  const mockGrid = [
    [FREE, CURRENT_PIECE, CURRENT_PIECE, CURRENT_PIECE, CURRENT_PIECE],
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, SHADOW_PIECE, SHADOW_PIECE, SHADOW_PIECE, SHADOW_PIECE],
    ["red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red"],
  ];

  test("clear CURRENT_PIECE and SHADOW_PIECE", () => {
    const expected = [
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      ["red", "red", "red", "red", "red"],
      ["red", "red", "red", "red", "red"],
    ];

    expect(clear(mockGrid)).toEqual(expected);
  });
});
