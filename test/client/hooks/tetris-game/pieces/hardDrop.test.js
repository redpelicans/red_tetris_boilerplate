import hardDrop, { getNewPiece } from "hooks/tetris-game/pieces/hardDrop";
import { FREE } from "constants/tetris";

describe("Hard Drop", () => {
  const mockGrid = [
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
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
    const expectedPiece = {
      ...mockPiece,
      coord: { x: 0, y: 3 },
    };

    const newPiece = getNewPiece(mockGrid, mockPiece);
    expect(newPiece).toEqual(expectedPiece);
    const newGrid = hardDrop(mockGrid, newPiece);
    expect(newGrid).toEqual(expectedGrid);
  });

  test("Type Error", () => {
    expect(() => hardDrop(mockPiece, null)).toThrow(TypeError);
    expect(() => hardDrop(null, mockGrid)).toThrow(TypeError);
  });
});
