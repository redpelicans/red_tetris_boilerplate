import * as Grid from "hooks/tetris-game/grid/checks";
import { SHADOW_PIECE, CURRENT_PIECE, FREE } from "constants/tetris";

describe("Grid", () => {
  const mockGrid = [
    [FREE, CURRENT_PIECE, CURRENT_PIECE, CURRENT_PIECE, CURRENT_PIECE],
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, SHADOW_PIECE, SHADOW_PIECE, SHADOW_PIECE, SHADOW_PIECE],
    ["red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red"],
  ];

  describe("isPartOfPiece", () => {
    test("is a part of piece", () => {
      expect(Grid.isPartOfPiece(mockGrid[0][1])).toBe(true);
    });

    test("is not a part of piece", () => {
      expect(Grid.isPartOfPiece(mockGrid[1][0])).toBe(false);
      expect(Grid.isPartOfPiece(mockGrid[2][2])).toBe(false);
      expect(Grid.isPartOfPiece(mockGrid[4][0])).toBe(false);
    });
  });

  describe("isPartOfShadowPiece", () => {
    test("is a part of shadow piece", () => {
      expect(Grid.isPartOfShadowPiece(mockGrid[2][1])).toBe(true);
    });

    test("is not a part of shadow piece", () => {
      expect(Grid.isPartOfShadowPiece(mockGrid[0][1])).toBe(false);
      expect(Grid.isPartOfShadowPiece(mockGrid[1][2])).toBe(false);
      expect(Grid.isPartOfShadowPiece(mockGrid[4][0])).toBe(false);
    });
  });

  describe("isFree", () => {
    test("is a free space in the grid", () => {
      expect(Grid.isFree(mockGrid[0][0])).toBe(true);
    });

    test("is not a free space in the grid", () => {
      expect(Grid.isFree(mockGrid[0][1])).toBe(false);
      expect(Grid.isFree(mockGrid[2][1])).toBe(false);
      expect(Grid.isFree(mockGrid[4][0])).toBe(false);
    });
  });

  describe("isBottomLine", () => {
    const lastRow = mockGrid.length - 1;

    test("is bottom line", () => {
      expect(Grid.isBottomLine(mockGrid, lastRow)).toBe(true);
    });

    test("is not bottom line", () => {
      expect(Grid.isBottomLine(mockGrid, lastRow - 1)).toBe(false);
      expect(Grid.isBottomLine(mockGrid, lastRow + 1)).toBe(false);
      expect(Grid.isBottomLine(mockGrid, -1)).toBe(false);
    });
  });

  describe("isBottomBorder", () => {
    const gridLength = mockGrid.length;

    test("is bottom border", () => {
      expect(Grid.isBottomBorder(mockGrid, gridLength)).toBe(true);
    });

    test("is not bottom border", () => {
      expect(Grid.isBottomBorder(mockGrid, gridLength - 1)).toBe(false);
      expect(Grid.isBottomBorder(mockGrid, gridLength + 1)).toBe(false);
      expect(Grid.isBottomBorder(mockGrid, -1)).toBe(false);
    });
  });

  describe("isNotAnEmptyRow", () => {
    test("is an empty row", () => {
      expect(Grid.isNotAnEmptyRow(mockGrid[1])).toBe(false);
      expect(Grid.isNotAnEmptyRow(mockGrid[2])).toBe(false);
    });

    test("is not an empty row", () => {
      expect(Grid.isNotAnEmptyRow(mockGrid[0])).toBe(true);
      expect(Grid.isNotAnEmptyRow(mockGrid[3])).toBe(true);
    });
  });

  describe("isACompleteRow", () => {
    test("is a complete row", () => {
      expect(Grid.isACompleteRow(mockGrid[3])).toBe(true);
    });

    test("is not a complete row", () => {
      expect(Grid.isACompleteRow(mockGrid[0])).toBe(false);
      expect(Grid.isACompleteRow(mockGrid[1])).toBe(false);
      expect(Grid.isACompleteRow(mockGrid[2])).toBe(false);
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
        expect(Grid.canPutLayer(mockPlacementGrid, mockPiece)).toBe(true);
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
        expect(Grid.canPutLayer(mockPlacementGrid, mockPiece)).toBe(false);
      }
    });
  });
});
