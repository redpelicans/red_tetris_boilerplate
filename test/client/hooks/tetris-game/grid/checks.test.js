import * as Check from "hooks/tetris-game/grid/checks";
import {
  SHADOW_PIECE,
  CURRENT_PIECE,
  FREE,
  BLOCKED_PIECE,
} from "constants/tetris";

describe("Check", () => {
  const mockGrid = [
    [FREE, CURRENT_PIECE, CURRENT_PIECE, CURRENT_PIECE, CURRENT_PIECE],
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, SHADOW_PIECE, SHADOW_PIECE, SHADOW_PIECE, SHADOW_PIECE],
    ["red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red"],
    [BLOCKED_PIECE, BLOCKED_PIECE, BLOCKED_PIECE, BLOCKED_PIECE, BLOCKED_PIECE],
  ];

  describe("isPartOfPiece", () => {
    test("is a part of piece", () => {
      expect(Check.isPartOfPiece(mockGrid[0][1])).toBe(true);
    });

    test("is not a part of piece", () => {
      expect(Check.isPartOfPiece(mockGrid[1][0])).toBe(false);
      expect(Check.isPartOfPiece(mockGrid[2][2])).toBe(false);
      expect(Check.isPartOfPiece(mockGrid[4][0])).toBe(false);
    });
  });

  describe("isPartOfShadowPiece", () => {
    test("is a part of shadow piece", () => {
      expect(Check.isPartOfShadowPiece(mockGrid[2][1])).toBe(true);
    });

    test("is not a part of shadow piece", () => {
      expect(Check.isPartOfShadowPiece(mockGrid[0][1])).toBe(false);
      expect(Check.isPartOfShadowPiece(mockGrid[1][2])).toBe(false);
      expect(Check.isPartOfShadowPiece(mockGrid[4][0])).toBe(false);
    });
  });

  describe("isFree", () => {
    test("is a free space in the grid", () => {
      expect(Check.isFree(mockGrid[0][0])).toBe(true);
    });

    test("is not a free space in the grid", () => {
      expect(Check.isFree(mockGrid[0][1])).toBe(false);
      expect(Check.isFree(mockGrid[2][1])).toBe(false);
      expect(Check.isFree(mockGrid[4][0])).toBe(false);
    });
  });

  describe("isBottomLine", () => {
    const lastRow = mockGrid.length - 1;

    test("is bottom line", () => {
      expect(Check.isBottomLine(mockGrid, lastRow)).toBe(true);
    });

    test("is not bottom line", () => {
      expect(Check.isBottomLine(mockGrid, lastRow - 1)).toBe(false);
      expect(Check.isBottomLine(mockGrid, lastRow + 1)).toBe(false);
      expect(Check.isBottomLine(mockGrid, -1)).toBe(false);
    });
  });

  describe("isBottomBorder", () => {
    const gridLength = mockGrid.length;

    test("is bottom border", () => {
      expect(Check.isBottomBorder(mockGrid, gridLength)).toBe(true);
    });

    test("is not bottom border", () => {
      expect(Check.isBottomBorder(mockGrid, gridLength - 1)).toBe(false);
      expect(Check.isBottomBorder(mockGrid, gridLength + 1)).toBe(false);
      expect(Check.isBottomBorder(mockGrid, -1)).toBe(false);
    });
  });

  describe("isNotAnEmptyRow", () => {
    test("is an empty row", () => {
      expect(Check.isNotAnEmptyRow(mockGrid[1])).toBe(false);
      expect(Check.isNotAnEmptyRow(mockGrid[2])).toBe(false);
    });

    test("is not an empty row", () => {
      expect(Check.isNotAnEmptyRow(mockGrid[0])).toBe(true);
      expect(Check.isNotAnEmptyRow(mockGrid[3])).toBe(true);
    });
  });

  describe("isACompleteRow", () => {
    test("is a complete row", () => {
      expect(Check.isACompleteRow(mockGrid[3])).toBe(true);
    });

    test("is not a complete row", () => {
      expect(Check.isACompleteRow(mockGrid[0])).toBe(false);
      expect(Check.isACompleteRow(mockGrid[1])).toBe(false);
      expect(Check.isACompleteRow(mockGrid[2])).toBe(false);
      expect(Check.isACompleteRow(mockGrid[5])).toBe(false);
    });
  });

  describe("canPutLayer", () => {
    const mockPlacementGrid = [
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, "red"],
      [FREE, "red", "red", "red", "red"],
      ["red", "red", FREE, FREE, "red"],
    ];

    const mockPiece = {
      shape: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      color: "red",
      padding: { x: 0, y: 1 },
      dim: { height: 1, width: 4 },
    };

    test("valid coords", () => {
      const validCoords = [
        { x: 0, y: -1 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
      ];
      for (const coord of validCoords) {
        mockPiece.coord = coord;
        expect(Check.canPutLayer(mockPlacementGrid, mockPiece)).toBe(true);
      }
    });

    test("invalid coords", () => {
      const validCoords = [
        { x: -2, y: 0 },
        { x: 0, y: -2 },
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 3 },
        { x: 3, y: 3 },
        { x: 2, y: 4 },
      ];
      for (const coord of validCoords) {
        mockPiece.coord = coord;
        expect(Check.canPutLayer(mockPlacementGrid, mockPiece)).toBe(false);
      }
    });
  });
});
