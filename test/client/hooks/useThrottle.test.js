import { renderHook } from "@testing-library/react-hooks";
import useThrottle from "hooks/useThrottle";

jest.useFakeTimers();

test("repeating calls to the callback must be 1 second spaced", () => {
  const callback = jest.fn();
  const { result } = renderHook(() => useThrottle(callback, 1000));

  const throttledFn = result.current;

  expect(callback).not.toHaveBeenCalled();

  throttledFn();
  expect(callback).toHaveBeenCalledTimes(1);

  jest.advanceTimersByTime(100);
  throttledFn();
  expect(callback).toHaveBeenCalledTimes(1);

  jest.advanceTimersByTime(900);
  throttledFn();
  expect(callback).toHaveBeenCalledTimes(2);
});
