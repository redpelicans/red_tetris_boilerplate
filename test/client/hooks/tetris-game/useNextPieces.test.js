import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import useNextPieces from "hooks/tetris-game/useNextPieces";

describe("useNextPieces", () => {
  const useStateStub = jest.spyOn(React, "useState");

  test("should create an interface to access nextPieces", () => {
    const { result } = renderHook(useNextPieces);

    expect(useStateStub).toHaveBeenCalledTimes(1);
    expect(result.current.nextPieces).toHaveLength(3);

    act(() => {
      result.current.pullNextPiece();
    });
    expect(useStateStub).toHaveBeenCalledTimes(2);
    expect(result.current.nextPieces).toHaveLength(3);
  });
});
