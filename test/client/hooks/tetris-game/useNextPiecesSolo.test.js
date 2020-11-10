import React from "react";
import {
  renderHook,
  act
} from "@testing-library/react-hooks";
import useNextPiecesSolo from "hooks/tetris-game/useNextPiecesSolo";

describe("useNextPiecesSolo", () => {
  const useStateStub = jest.spyOn(React, "useState");

  test("should create an interface to access nextPiecesSolo", () => {
    const {
      result
    } = renderHook(useNextPiecesSolo);

    expect(useStateStub).toHaveBeenCalledTimes(1);
    expect(result.current.nextPieces).toHaveLength(3);

    act(() => {
      result.current.pullNextPiece();
    });
    expect(useStateStub).toHaveBeenCalledTimes(2);
    expect(result.current.nextPieces).toHaveLength(3);
  });
});
