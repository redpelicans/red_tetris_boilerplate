import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import useEventListener from "hooks/useEventListener";

describe("useAudio", () => {
  const callback = jest.fn();
  const useRefStub = jest
    .spyOn(React, "useRef")
    .mockImplementation(() => ({ current: null }));
  const useEffectStub = jest.spyOn(React, "useEffect");

  test("Event is added correctly", () => {
    renderHook(() => useEventListener("click", callback));

    expect(useRefStub).toHaveBeenCalled();
    expect(useEffectStub).toHaveBeenCalled();
  });
});
