import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import useNewGrid from "hooks/tetris-game/useNewGrid";
import { GameContextProvider } from "store/layers/game";

describe("useNewGrid", () => {
  const useContextStub = jest.spyOn(React, "useContext");
  const useEffectStub = jest.spyOn(React, "useEffect");

  test("should create a new Grid through context", () => {
    const wrapper = ({ children }) => (
      <GameContextProvider>{children}</GameContextProvider>
    );
    renderHook(() => useNewGrid(), { wrapper });

    expect(useContextStub).toHaveBeenCalled();
    expect(useEffectStub).toHaveBeenCalled();
  });
});
