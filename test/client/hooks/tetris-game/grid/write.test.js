import write, { partialWrite } from "hooks/tetris-game/grid/write";
import { SHADOW_PIECE, CURRENT_PIECE, FREE } from "constants/tetris";

describe("Write", () => {
  let mockGrid;

  beforeEach(() => {
    mockGrid = [
      [FREE, FREE, FREE],
      [FREE, FREE, FREE],
      [FREE, FREE, SHADOW_PIECE],
      [SHADOW_PIECE, SHADOW_PIECE, SHADOW_PIECE],
    ];
  });

  const mockPiece = {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "red",
    padding: { x: 0, y: 0 },
    dim: { height: 2, width: 3 },
  };

  test("write CURRENT_PIECE", () => {
    mockPiece.coord = { x: 0, y: 0 };
    const expected = [
      [FREE, CURRENT_PIECE, FREE],
      [CURRENT_PIECE, CURRENT_PIECE, CURRENT_PIECE],
      [FREE, FREE, SHADOW_PIECE],
      [SHADOW_PIECE, SHADOW_PIECE, SHADOW_PIECE],
    ];

    expect(write(mockGrid, mockPiece, CURRENT_PIECE)).toEqual(expected);
  });

  test("write SHADOW_PIECE", () => {
    mockPiece.coord = { x: 0, y: 0 };
    const expected = [
      [FREE, SHADOW_PIECE, FREE],
      [SHADOW_PIECE, SHADOW_PIECE, SHADOW_PIECE],
      [FREE, FREE, SHADOW_PIECE],
      [SHADOW_PIECE, SHADOW_PIECE, SHADOW_PIECE],
    ];

    expect(write(mockGrid, mockPiece, SHADOW_PIECE)).toEqual(expected);
  });

  test("write CURRENT_PIECE over SHADOW_PIECE", () => {
    mockPiece.coord = { x: 0, y: 2 };
    const expected = [
      [FREE, FREE, FREE],
      [FREE, FREE, FREE],
      [FREE, CURRENT_PIECE, SHADOW_PIECE],
      [CURRENT_PIECE, CURRENT_PIECE, CURRENT_PIECE],
    ];

    expect(write(mockGrid, mockPiece, CURRENT_PIECE)).toEqual(expected);
  });
});

describe("PartialWrite", () => {
  let mockGrid;

  beforeEach(() => {
    mockGrid = [
      [FREE, FREE, FREE],
      ["red", "red", "red"],
      ["red", "red", "red"],
      ["red", "red", "red"],
    ];
  });

  const mockPiece = {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "red",
    padding: { x: 0, y: 0 },
    dim: { height: 2, width: 3 },
  };

  test("should print bottom of the piece only", () => {
    mockPiece.coord = { x: 0, y: 0 };
    const expected = [
      [CURRENT_PIECE, CURRENT_PIECE, CURRENT_PIECE],
      ["red", "red", "red"],
      ["red", "red", "red"],
      ["red", "red", "red"],
    ];

    expect(partialWrite(mockGrid, mockPiece, CURRENT_PIECE)).toEqual(expected);
  });

  test("should not print anything", () => {
    mockPiece.coord = { x: 0, y: 0 };
    mockGrid[0] = mockGrid[1];
    const expected = [
      ["red", "red", "red"],
      ["red", "red", "red"],
      ["red", "red", "red"],
      ["red", "red", "red"],
    ];

    expect(partialWrite(mockGrid, mockPiece, CURRENT_PIECE)).toEqual(expected);
  });

  test("should throw an Error", () => {
    mockPiece.coord = { x: 0, y: 0 };
    mockPiece.dim.height = 0;

    expect(() => partialWrite(mockGrid, mockPiece, CURRENT_PIECE)).toThrow();
  });
});
