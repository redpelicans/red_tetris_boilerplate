import { renderHook, act } from "@testing-library/react-hooks";
import useGameStats from "hooks/tetris-game/useGameStats";

describe("useGameStats", () => {
  test("lines removed", () => {
    const { result } = renderHook(() => useGameStats());

    expect(result.current.linesRemoved).toEqual(0);
    act(() => {
      result.current.addRemovedLines(2);
    });
    expect(result.current.linesRemoved).toEqual(2);
    act(() => {
      result.current.addRemovedLines(3);
    });
    expect(result.current.linesRemoved).toEqual(5);
  });

  test("add score", () => {
    const { result } = renderHook(() => useGameStats());

    expect(result.current.score).toEqual(0);
    act(() => {
      result.current.addScore(200);
    });
    expect(result.current.score).toEqual(200);
    act(() => {
      result.current.addScore(5);
    });
    expect(result.current.score).toEqual(205);
  });

  test("level", () => {
    const { result } = renderHook(() => useGameStats());

    expect(result.current.level).toEqual(0);
    act(() => {
      result.current.addRemovedLines(10);
    });
    expect(result.current.level).toEqual(1);
    act(() => {
      result.current.addRemovedLines(20);
    });
    expect(result.current.level).toEqual(3);
  });

  test("speed rate", () => {
    const { result } = renderHook(() => useGameStats());

    expect(result.current.speedRate).toEqual(1.0);
    act(() => {
      result.current.addRemovedLines(10);
    });
    expect(result.current.speedRate).toEqual(1.05);
    act(() => {
      result.current.addRemovedLines(20);
    });
    expect(result.current.speedRate).toEqual(1.15);
  });
});
