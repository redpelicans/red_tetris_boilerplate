import insertion, { forceInsertion } from "hooks/tetris-game/pieces/insertion";
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

    const [newGrid, newPiece] = insertion(mockPiece, mockGridOdd);
    expect(newGrid).toEqual(expectedGrid);
    expect(newPiece).toEqual(expectedPiece);
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

    const [newGrid, newPiece] = insertion(mockPiece, mockGridEven);
    expect(newGrid).toEqual(expectedGrid);
    expect(newPiece).toEqual(expectedPiece);
  });

  test("Invalid insertion on Even sized grid", () => {
    expect(
      insertion(mockPiece, [
        ["red", "red", "red", "red"],
        ["red", "red", "red", "red"],
        ["red", "red", "red", "red"],
      ]),
    ).toBeNull();
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

    expect(forceInsertion(mockPiece, mockGridOdd)).toEqual(expected);
  });

  test("Valid forced insertion on Even sized grid", () => {
    const expected = [
      [FREE, "green", "green", "green", FREE, FREE],
      ["red", "red", "red", "red", "red", "red"],
      ["red", "red", "red", "red", "red", "red"],
    ];

    expect(forceInsertion(mockPiece, mockGridEven)).toEqual(expected);
  });

  test("Try forceInsertion when there is no empty space", () => {
    const expected = [
      ["red", "red", "red", "red", FREE],
      ["red", "red", "red", "red", "red"],
      ["red", "red", "red", "red", "red"],
    ];

    expect(forceInsertion(mockPiece, mockGridNoMoreSpace)).toEqual(expected);
  });

  test("Type Error", () => {
    expect(() => forceInsertion(null, mockGridNoMoreSpace)).toThrow(TypeError);
    expect(() => forceInsertion(mockPiece, null)).toThrow(TypeError);
  });
});
