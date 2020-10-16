import React from "react";
import { createMemoryHistory } from "history";
import { Router, MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Home from "pages/home/Home";

describe("Home", () => {
  test("renders Home page", () => {
    render(<Home />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Red Tetris/i)).toBeInTheDocument();
    expect(screen.getByText(/Solo/i)).toBeInTheDocument();
    expect(screen.getByText(/Multijoueur/i)).toBeInTheDocument();
  });

  test("navigation link on Solo Mode", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Home />
      </Router>,
    );

    userEvent.click(screen.getByText(/Solo/i));
    expect(history.location.pathname).toBe("/game");
  });

  test.skip("navigation link on Multi Mode", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Home />
      </Router>,
    );

    userEvent.click(screen.getByText(/Multijoueur/i));
    expect(history.location.pathname).toBe("/game");
  });
});
