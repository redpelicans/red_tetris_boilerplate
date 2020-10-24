import React from "react";
import { createMemoryHistory } from "history";
import { Router, MemoryRouter } from "react-router-dom";
import { renderHook, act } from "@testing-library/react-hooks";
import useNavigate from "hooks/useNavigate";

describe("useNavigate", () => {
  test("navigate correctly", () => {
    const history = createMemoryHistory();
    const wrapper = ({ children }) => (
      <MemoryRouter>
        <Router history={history}>{children}</Router>
      </MemoryRouter>
    );
    const { result } = renderHook(useNavigate, { wrapper });

    expect(history.location.pathname).not.toBe("/game");
    act(() => {
      result.current.navigate("/game");
    });
    expect(history.location.pathname).toBe("/game");
  });
});
