import bind from "hooks/tetris-game/grid/bind";
import { FREE } from "constants/tetris";

describe("Bind", () => {
  const mockGrid = [
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
  ];

  const mockGridWithDeletion = [
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, "red", "red"],
  ];

  const mockPiece = {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "green",
    padding: { x: 0, y: 0 },
    coord: { x: 0, y: 3 },
    dim: { height: 2, width: 3 },
  };

  const addScore = jest.fn();
  const addRemovedLines = jest.fn();

  test("bind only", () => {
    const expectedGrid = [
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, "green", FREE, FREE, FREE],
      ["green", "green", "green", FREE, FREE],
    ];

    const newGrid = bind(mockGrid, mockPiece, addScore, addRemovedLines);
    expect(newGrid).toEqual(expectedGrid);
    expect(addScore).not.toHaveBeenCalled();
    expect(addRemovedLines).not.toHaveBeenCalled();
  });

  test("bind and remove", () => {
    const expectedGrid = [
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, FREE, FREE, FREE, FREE],
      [FREE, "green", FREE, FREE, FREE],
    ];

    const newGrid = bind(
      mockGridWithDeletion,
      mockPiece,
      addScore,
      addRemovedLines,
    );
    expect(newGrid).toEqual(expectedGrid);
    expect(addScore).toHaveBeenCalled();
    expect(addRemovedLines).toHaveBeenCalled();
  });
});
