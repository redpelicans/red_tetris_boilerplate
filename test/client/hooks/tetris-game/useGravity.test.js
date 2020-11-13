import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import useGravity from "hooks/tetris-game/useGravity";
import { INTERVAL_MS } from "constants/tetris";

describe("useGravity", () => {
  const useRefStub = jest.spyOn(React, "useRef");
  const useEffectStub = jest.spyOn(React, "useEffect");

  test("should compute the gravity time interval", () => {
    const { result } = renderHook(() => useGravity(0));

    expect(useRefStub).toHaveBeenCalled();
    expect(useEffectStub).toHaveBeenCalled();
    expect(result.current).toEqual(INTERVAL_MS);
  });

  afterAll(() => {
    useRefStub.mockRestore();
    useEffectStub.mockRestore();
  });
});
