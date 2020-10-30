import { FREE, BLOCKED_PIECE } from "constants/tetris";
import malus from "hooks/tetris-game/grid/malus";

describe("malus", () => {
  const mockGrid = [
    [FREE, FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE, FREE],
    [FREE, "blue", "blue", FREE, FREE, "blue"],
    ["blue", "blue", "blue", "blue", FREE, "blue"],
  ];

  test("add two malus lines", () => {
    const expectedGrid = [
      [FREE, FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE, FREE],
      [FREE, "blue", "blue", FREE, FREE, "blue"],
      ["blue", "blue", "blue", "blue", FREE, "blue"],
      [
        BLOCKED_PIECE,
        BLOCKED_PIECE,
        BLOCKED_PIECE,
        BLOCKED_PIECE,
        BLOCKED_PIECE,
        BLOCKED_PIECE,
      ],
      [
        BLOCKED_PIECE,
        BLOCKED_PIECE,
        BLOCKED_PIECE,
        BLOCKED_PIECE,
        BLOCKED_PIECE,
        BLOCKED_PIECE,
      ],
    ];

    expect(malus(mockGrid, 2)).toEqual(expectedGrid);
  });

  test("TypeError", () => {
    expect(() => malus(null, 2)).toThrow(TypeError);
  });
});
