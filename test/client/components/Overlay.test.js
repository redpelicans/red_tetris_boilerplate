import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Overlay from "components/overlay/Overlay";

describe("Overlay", () => {
  const effectStub = jest.spyOn(React, "useEffect");
  const addEvtStub = jest.spyOn(document, "addEventListener");
  const removeEvtStub = jest.spyOn(document, "removeEventListener");
  const closeMock = jest.fn();

  test("Should render correctly", () => {
    const { unmount, rerender, container } = render(
      <Overlay isOpen close={closeMock}>
        <h1>Hello Overlay</h1>
      </Overlay>,
    );

    expect(effectStub).toHaveBeenCalledTimes(1);
    expect(addEvtStub).toHaveBeenCalledTimes(1);
    expect(removeEvtStub).not.toHaveBeenCalled();
    expect(screen.getByText(/Hello Overlay/i)).toBeInTheDocument();

    fireEvent.keyDown(container, { keyCode: 95 });
    expect(closeMock).not.toHaveBeenCalled();

    fireEvent.keyDown(container, { keyCode: 27 });
    expect(closeMock).toHaveBeenCalledTimes(1);

    unmount();

    expect(removeEvtStub).toHaveBeenCalledTimes(1);

    rerender(
      <Overlay isOpen={false} close={closeMock}>
        <h1>Hello Overlay</h1>
      </Overlay>,
    );

    expect(effectStub).toHaveBeenCalledTimes(2);
    expect(addEvtStub).toHaveBeenCalledTimes(2);
    expect(screen.queryByText(/Hello Overlay/i)).not.toBeInTheDocument();
  });
});
