import insertion, {
  force,
  getNewPiece,
} from "hooks/tetris-game/pieces/insertion";
import { CURRENT_PIECE, FREE } from "constants/tetris";

describe("Insertion", () => {
  const mockGridOdd = [
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
    ["red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red"],
  ];

  const mockGridEven = [
    [FREE, FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE, FREE],
    ["red", "red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red", "red"],
  ];

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

  test("Valid insertion on Odd sized grid", () => {
    const expectedGrid = [
      [FREE, CURRENT_PIECE, FREE, FREE, FREE],
      [CURRENT_PIECE, CURRENT_PIECE, CURRENT_PIECE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      ["red", "red", "red", "red", "red"],
      ["red", "red", "red", "red", "red"],
    ];
    const expectedPiece = { ...mockPiece, coord: { x: 0, y: 0 } };

    const newPiece = getNewPiece(mockPiece, mockGridOdd);
    expect(newPiece).toEqual(expectedPiece);
    const newGrid = insertion(newPiece, mockGridOdd);
    expect(newGrid).toEqual(expectedGrid);
  });

  test("Valid insertion on Even sized grid", () => {
    const expectedGrid = [
      [FREE, FREE, CURRENT_PIECE, FREE, FREE, FREE],
      [FREE, CURRENT_PIECE, CURRENT_PIECE, CURRENT_PIECE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE, FREE],
      ["red", "red", "red", "red", "red", "red"],
      ["red", "red", "red", "red", "red", "red"],
    ];
    const expectedPiece = { ...mockPiece, coord: { x: 1, y: 0 } };

    const newPiece = getNewPiece(mockPiece, mockGridEven);
    expect(newPiece).toEqual(expectedPiece);
    const newGrid = insertion(newPiece, mockGridEven);
    expect(newGrid).toEqual(expectedGrid);
  });

  test("Type Error", () => {
    expect(() => insertion(mockPiece, null)).toThrow(TypeError);
    expect(() => insertion(null, mockGridEven)).toThrow(TypeError);
  });
});

describe("Force Insertion", () => {
  const mockGridOdd = [
    [FREE, FREE, FREE, FREE, FREE],
    ["red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red"],
  ];

  const mockGridEven = [
    [FREE, FREE, FREE, FREE, FREE, FREE],
    ["red", "red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red", "red"],
  ];

  const mockGridNoMoreSpace = [
    ["red", "red", "red", "red", FREE],
    ["red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red"],
  ];

  const mockPiece = {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "green",
    padding: { x: 0, y: 0 },
    dim: { height: 2, width: 3 },
  };

  test("Valid forced insertion on Odd sized grid", () => {
    const expected = [
      ["green", "green", "green", FREE, FREE],
      ["red", "red", "red", "red", "red"],
      ["red", "red", "red", "red", "red"],
    ];

    const newPiece = getNewPiece(mockPiece, mockGridOdd);
    expect(force(newPiece, mockGridOdd)).toEqual(expected);
  });

  test("Valid forced insertion on Even sized grid", () => {
    const expected = [
      [FREE, "green", "green", "green", FREE, FREE],
      ["red", "red", "red", "red", "red", "red"],
      ["red", "red", "red", "red", "red", "red"],
    ];

    const newPiece = getNewPiece(mockPiece, mockGridEven);
    expect(force(newPiece, mockGridEven)).toEqual(expected);
  });

  test("Try force when there is no empty space", () => {
    const expected = [
      ["red", "red", "red", "red", FREE],
      ["red", "red", "red", "red", "red"],
      ["red", "red", "red", "red", "red"],
    ];

    const newPiece = getNewPiece(mockPiece, mockGridNoMoreSpace);
    expect(force(newPiece, mockGridNoMoreSpace)).toEqual(expected);
  });

  test("Type Error", () => {
    expect(() => force(null, mockGridNoMoreSpace)).toThrow(TypeError);
    expect(() => force(mockPiece, null)).toThrow(TypeError);
  });
});
