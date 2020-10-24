import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import useWorker from "hooks/useWorker";
import { GameContextProvider } from "store/layers/game";

class MockWorker {
  constructor(stringUrl) {
    this.url = stringUrl;
    this.onmessage = () => {};
    this.onerror = () => {};
  }

  postMessage(msg) {
    this.onmessage(msg);
  }

  terminate() {}
}

describe("useWorker", () => {
  const useRefStub = jest.spyOn(React, "useRef");
  const useEffectStub = jest.spyOn(React, "useEffect");

  test("should create a new Worker", () => {
    const wrapper = ({ children }) => (
      <GameContextProvider>{children}</GameContextProvider>
    );
    renderHook(() => useWorker(MockWorker), { wrapper });

    expect(useRefStub).toHaveBeenCalled();
    expect(useEffectStub).toHaveBeenCalledTimes(3);
  });
});
