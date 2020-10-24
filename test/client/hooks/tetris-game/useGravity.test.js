import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import useGravity from "hooks/tetris-game/useGravity";
import { GameContextProvider } from "store/layers/game";
import { INTERVAL_MS } from "constants/tetris";

describe("useGravity", () => {
  const useContextStub = jest.spyOn(React, "useContext");
  const useMemoStub = jest.spyOn(React, "useMemo");

  test("should compute the gravity time interval", () => {
    const wrapper = ({ children }) => (
      <GameContextProvider>{children}</GameContextProvider>
    );
    const { result } = renderHook(() => useGravity(), { wrapper });

    expect(useContextStub).toHaveBeenCalled();
    expect(useMemoStub).toHaveBeenCalled();
    expect(result.current).toEqual(INTERVAL_MS);
  });
});
