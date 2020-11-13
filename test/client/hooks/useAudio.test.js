import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import useAudio from "hooks/useAudio";

describe("useAudio", () => {
  const pauseStub = jest
    .spyOn(window.HTMLMediaElement.prototype, "pause")
    .mockImplementation(() => {});

  const playStub = jest
    .spyOn(window.HTMLMediaElement.prototype, "play")
    .mockImplementation(() => {});

  const reactStub = jest.spyOn(React, "useEffect");
  const objectStub = jest.spyOn(Object, "entries");

  test("should toggle the playing state", () => {
    const { result } = renderHook(() => useAudio());
    const [play, pause] = result.current;

    act(() => {
      play();
    });
    expect(playStub).toHaveBeenCalled();
    expect(reactStub).toHaveBeenCalled();

    act(() => {
      pause();
    });
    expect(reactStub).toHaveBeenCalled();
  });

  test("should trigger the useEffect on options change", () => {
    const { result } = renderHook(() => useAudio());
    const [play, pause, setOptions] = result.current;

    act(() => {
      setOptions({});
    });
    expect(reactStub).toHaveBeenCalled();
    expect(objectStub).toHaveBeenCalled();
  });

  afterAll(() => {
    pauseStub.mockRestore();
    playStub.mockRestore();
    reactStub.mockRestore();
    objectStub.mockRestore();
  });
});
