import React from "react";
import { createMemoryHistory } from "history";
import { Router, MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "locales/i18n";
import Home from "pages/home/Home";
import { StoreContextProvider } from "store/layers/store";
import { socket } from "store/middleware";

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
      <StoreContextProvider>
        <Router history={history}>
          <Home />
        </Router>
      </StoreContextProvider>,
    );

    userEvent.click(screen.getByText(/Solo/i));
    expect(history.location.pathname).toBe("/single-player[solo]/game");
  });

  test("Multi Mode - player creation", () => {
    const history = createMemoryHistory();
    jest.spyOn(socket, "emit").mockImplementation((_, payload) => {
      if (payload.name.trim().length > 0) {
        history.push("/rooms");
      }
    });
    render(
      <StoreContextProvider>
        <Router history={history}>
          <Home />
        </Router>
      </StoreContextProvider>,
    );

    expect(screen.getByText(/Multijoueur/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Multijoueur/i));
    expect(screen.queryByText(/Multijoueur/i)).not.toBeInTheDocument();

    const inputPlayerName = screen.getByPlaceholderText(/Pseudonyme/i);
    expect(inputPlayerName).toBeInTheDocument();

    const sendButton = screen.getByText(/Nouveau joueur/i);
    expect(sendButton).toBeInTheDocument();

    userEvent.click(sendButton);
    expect(history.location.pathname).toBe("/");

    userEvent.type(inputPlayerName, "Aragorn");
    userEvent.click(sendButton);
    expect(history.location.pathname).toBe("/rooms");
  });
});
