import rotation, { getNewPiece } from "hooks/tetris-game/pieces/rotation";
import { CURRENT_PIECE, FREE } from "constants/tetris";

describe("Rotation", () => {
  let mockGrid, mockPiece, mockPieceRotationPush;

  beforeEach(() => {
    mockGrid = [
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
    ];

    mockPiece = {
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

    mockPieceRotationPush = {
      shape: [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
      color: "green",
      padding: { x: 1, y: 0 },
      coord: { x: 0, y: 0 },
      dim: { height: 3, width: 2 },
    };
  });

  test("Valid rotation", () => {
    const expectedGrid = [
      [FREE, CURRENT_PIECE, FREE, FREE, FREE],
      [FREE, CURRENT_PIECE, CURRENT_PIECE, FREE, FREE],
      [FREE, CURRENT_PIECE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
    ];

    const expectedPiece = {
      shape: [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
      color: "green",
      padding: { x: 1, y: 0 },
      coord: { x: 0, y: 0 },
      dim: { height: 3, width: 2 },
    };

    const newPiece = getNewPiece(mockPiece, mockGrid);
    expect(newPiece).toEqual(expectedPiece);
    const newGrid = rotation(newPiece, mockGrid);
    expect(newGrid).toEqual(expectedGrid);
  });

  test("Valid rotation that pushes from the corner", () => {
    const expectedGrid = [
      [FREE, FREE, FREE, FREE, FREE],
      [CURRENT_PIECE, CURRENT_PIECE, CURRENT_PIECE, FREE, FREE],
      [FREE, CURRENT_PIECE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
    ];

    const expectedPiece = {
      shape: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      color: "green",
      padding: { x: 0, y: 1 },
      coord: { x: 0, y: 0 },
      dim: { height: 2, width: 3 },
    };

    const newPiece = getNewPiece(mockPieceRotationPush, mockGrid);
    expect(newPiece).toEqual(expectedPiece);
    const newGrid = rotation(newPiece, mockGrid);
    expect(newGrid).toEqual(expectedGrid);
  });

  test("Type Error", () => {
    expect(() => rotation(mockPiece, null)).toThrow(TypeError);
    expect(() => rotation(null, mockGrid)).toThrow(TypeError);
  });
});
