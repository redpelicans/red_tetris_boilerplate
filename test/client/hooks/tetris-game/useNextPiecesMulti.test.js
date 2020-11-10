import React from "react";
import {
  renderHook,
  act
} from "@testing-library/react-hooks";
import useNextPiecesMulti from "hooks/tetris-game/useNextPiecesMulti";

describe("useNextPiecesMulti", () => {
  const useStateStub = jest.spyOn(React, "useState");

  test.skip("should create an interface to access nextPieces", () => {
    const {
      result
    } = renderHook(useNextPiecesMulti);

    expect(useStateStub).toHaveBeenCalledTimes(1);
    expect(result.current.nextPieces).toHaveLength(3);

    act(() => {
      result.current.pullNextPiece();
    });
    expect(useStateStub).toHaveBeenCalledTimes(2);
    expect(result.current.nextPieces).toHaveLength(2);
  });
});
