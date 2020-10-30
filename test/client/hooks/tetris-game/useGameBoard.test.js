import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import useGameBoard from "hooks/tetris-game/useGameBoard";
import { MOVE_RIGHT } from "constants/tetris";

describe("useGameBoard", () => {
  const useStateStub = jest.spyOn(React, "useState");
  const gameOver = jest.fn();
  const pullNextPiece = jest.fn().mockReturnValue({
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "green",
    padding: { x: 0, y: 0 },
    coord: { x: 0, y: 0 },
    dim: { height: 2, width: 3 },
  });
  const addScore = jest.fn();
  const addRemovedLines = jest.fn();

  test("should create the game main functions", () => {
    const { result } = renderHook(() =>
      useGameBoard(10, 10, gameOver, pullNextPiece, addScore, addRemovedLines),
    );

    expect(useStateStub).toHaveBeenCalledTimes(3);

    expect(result.current.grid).toEqual(initArrayWithPiece);

    act(() => {
      result.current.moveLateral(MOVE_RIGHT);
    });
    expect(result.current.grid).toEqual(afterLateralMove);
    expect(useStateStub).toHaveBeenCalledTimes(4);

    act(() => {
      result.current.moveDown(true);
    });
    expect(result.current.grid).toEqual(afterLatAndDownMove);
    expect(addScore).toHaveBeenCalledTimes(1);
    expect(useStateStub).toHaveBeenCalledTimes(5);

    act(() => {
      result.current.moveDown(false);
    });
    expect(result.current.grid).toEqual(afterLatAndDownMoveAUTO);
    expect(useStateStub).toHaveBeenCalledTimes(6);

    act(() => {
      result.current.dropDown();
    });
    expect(pullNextPiece).toHaveBeenCalled();
    expect(result.current.grid).toEqual(afterHavingDrop);
    expect(addScore).toHaveBeenCalledTimes(2);
    expect(useStateStub).toHaveBeenCalledTimes(8);

    act(() => {
      result.current.rotation();
    });
    expect(result.current.grid).toEqual(afterRotation);
    expect(useStateStub).toHaveBeenCalledTimes(9);

    act(() => {
      result.current.malus(2);
    });
    expect(result.current.grid).toEqual(afterMalus);
    expect(useStateStub).toHaveBeenCalledTimes(10);

    act(() => {
      result.current.malus(5);
    });
    expect(result.current.grid).toEqual(afterMoreMalus);
    expect(useStateStub).toHaveBeenCalledTimes(11);
  });
});

const initArrayWithPiece = [
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 2, 2, 0, 0, 0, 0],
];

const afterLateralMove = [
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 2, 2, 0, 0, 0],
];

const afterLatAndDownMove = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 2, 2, 0, 0, 0],
];

const afterLatAndDownMoveAUTO = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 2, 2, 0, 0, 0],
];

const afterHavingDrop = [
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 2, 2, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, "green", 0, 0, 0, 0],
  [0, 0, 0, 0, "green", "green", "green", 0, 0, 0],
];

const afterRotation = [
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, "green", 0, 0, 0, 0],
  [0, 0, 0, 0, "green", "green", "green", 0, 0, 0],
];

const afterMalus = [
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, "green", 0, 0, 0, 0],
  [0, 0, 0, 0, "green", "green", "green", 0, 0, 0],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
];

const afterMoreMalus = [
  [0, 0, 0, 0, "green", "green", 0, 0, 0, 0],
  [0, 0, 0, 0, "green", "green", 0, 0, 0, 0],
  [0, 0, 0, 0, "green", "green", "green", 0, 0, 0],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
];
