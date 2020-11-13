import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import useNextPiecesMulti from "hooks/tetris-game/useNextPiecesMulti";

describe("useNextPiecesMulti", () => {
  const useStateStub = jest.spyOn(React, "useState");

  test("should create an interface to access nextPieces", () => {
    const { result } = renderHook(() => useNextPiecesMulti(42, [1, 2, 3]));

    expect(useStateStub).toHaveBeenCalledTimes(1);
    act(() => {
      result.current.pullNextPiece();
    });
    expect(useStateStub).toHaveBeenCalledTimes(2);
    expect(result.current.nextPieces).toHaveLength(2);
  });

  afterAll(() => {
    useStateStub.mockRestore();
  });
});
