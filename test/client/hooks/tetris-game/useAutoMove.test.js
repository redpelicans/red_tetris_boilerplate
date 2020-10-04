import { renderHook } from "@testing-library/react-hooks";
import useAutoMove from "hooks/tetris-game/useAutoMove";

jest.useFakeTimers();

describe("useAutoMove", () => {
  const callback = jest.fn();

  test("callback must be called every seconds", () => {
    const { result } = renderHook(() => useAutoMove(callback));
    const { start, stop } = result.current;

    expect(callback).not.toHaveBeenCalled();

    start(1000);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(100);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(900);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);

    stop();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test("stop method should clear the timer", () => {
    const { result } = renderHook(() => useAutoMove(callback));
    const { start, stop } = result.current;

    expect(callback).not.toHaveBeenCalled();

    start(1000);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(100);
    expect(callback).not.toHaveBeenCalled();

    stop();
    start(1000);

    jest.advanceTimersByTime(900);
    expect(callback).not.toHaveBeenCalled();
  });

  test("call start() twice must ignore second call", () => {
    const { result } = renderHook(() => useAutoMove(callback));
    const { start, stop } = result.current;

    expect(callback).not.toHaveBeenCalled();

    start(1000);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(100);
    expect(callback).not.toHaveBeenCalled();

    start(1000);

    jest.advanceTimersByTime(900);
    expect(callback).toHaveBeenCalledTimes(1);

    stop();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
