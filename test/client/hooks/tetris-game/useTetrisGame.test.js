import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { GameContextProvider } from "store/layers/game";
import useTetrisGame from "hooks/tetris-game/useTetrisGame";

describe("useTetrisGame", () => {
  const useContextStub = jest.spyOn(React, "useContext");
  const mockMethods = {
    moveDown: jest.fn(),
    moveLateral: jest.fn(),
    rotation: jest.fn(),
    dropDown: jest.fn(),
  };

  test("should manage the env around the GameBoard Hook", () => {
    const wrapper = ({ children }) => (
      <GameContextProvider>{children}</GameContextProvider>
    );
    const { result } = renderHook(() => useTetrisGame(mockMethods), {
      wrapper,
    });

    expect(useContextStub).toHaveBeenCalled();

    act(() => {
      result.current.movePiece({ code: "ArrowDown" });
    });
    expect(mockMethods.moveDown).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.movePiece({ code: "ArrowLeft" });
    });
    expect(mockMethods.moveLateral).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.movePiece({ code: "ArrowRight" });
    });
    expect(mockMethods.moveLateral).toHaveBeenCalledTimes(2);

    act(() => {
      result.current.movePiece({ code: "ArrowUp" });
    });
    expect(mockMethods.rotation).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.movePiece({ code: "Space" });
    });
    expect(mockMethods.dropDown).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.movePiece({ code: "INVALID CODE" });
    });
    expect(mockMethods.moveDown).toHaveBeenCalledTimes(1);
    expect(mockMethods.moveLateral).toHaveBeenCalledTimes(2);
    expect(mockMethods.rotation).toHaveBeenCalledTimes(1);
    expect(mockMethods.dropDown).toHaveBeenCalledTimes(1);
  });

  afterAll(() => {
    useContextStub.mockRestore();
  });
});
