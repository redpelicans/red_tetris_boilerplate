import React from "react";
import { createMemoryHistory } from "history";
import { Router, MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "locales/i18n";
import GameSolo from "pages/game-solo/GameSolo";
import { GameContext, GameContextProvider } from "store/layers/game";
import { socket } from "store/middleware";

describe("Home", () => {
  const pauseStub = jest
    .spyOn(window.HTMLMediaElement.prototype, "pause")
    .mockImplementation(() => {});

  const playStub = jest
    .spyOn(window.HTMLMediaElement.prototype, "play")
    .mockImplementation(() => {});

  test("renders GameSolo page", () => {
    render(
      <GameContextProvider>
        <GameSolo />
      </GameContextProvider>,
      { wrapper: MemoryRouter },
    );

    expect(screen.getByText(/Red Tetris/i)).toBeInTheDocument();
    expect(screen.getByText(/Stats/i)).toBeInTheDocument();
    expect(screen.getByText(/Score/i)).toBeInTheDocument();
    expect(screen.getByText(/Score/i)).toBeInTheDocument();
    expect(screen.getByText(/niveau/i)).toBeInTheDocument();
    expect(screen.getByText(/ligne/i)).toBeInTheDocument();
    expect(screen.getByText(/son (allum.{1}|.{1}teint)/i)).toBeInTheDocument();
  });

  test("link back to Home", () => {
    const history = createMemoryHistory();
    render(
      <GameContextProvider>
        <GameSolo />
      </GameContextProvider>,
      { wrapper: MemoryRouter },
    );

    expect(screen.getByText(/Red Tetris/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Red Tetris/i));
    expect(history.location.pathname).toBe("/");
  });

  test("Game Over", () => {
    const history = createMemoryHistory();
    render(
      <GameContext.Provider value={{ state: { alive: false } }}>
        <GameSolo />
      </GameContext.Provider>,
      { wrapper: MemoryRouter },
    );

    expect(screen.getByText(/Menu principal/i)).toBeInTheDocument();
    const gameOver = screen.getAllByText(/Partie terminée/i)[0];
    expect(gameOver).toBeInTheDocument();
    expect(screen.getByText(/Score:/i)).toBeInTheDocument();
    expect(screen.getByText(/Niveau:/i)).toBeInTheDocument();
    expect(screen.getByText(/Lignes supprimées:/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/Menu principal/i));
    expect(history.location.pathname).toBe("/");
  });

  afterAll(() => {
    pauseStub.mockRestore();
    playStub.mockRestore();
  });
});
