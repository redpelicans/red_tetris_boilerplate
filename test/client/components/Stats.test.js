import React from "react";
import { render, screen } from "@testing-library/react";
import "locales/i18n";
import { GameContext } from "store/layers/game";
import * as Stats from "components/tetris/Stats";

jest.useFakeTimers();

describe("Stats", () => {
  test("Score", () => {
    render(<Stats.Score score={42} />);

    expect(screen.getByText(/Score/i)).toBeInTheDocument();
    expect(screen.getByText(/42/i)).toBeInTheDocument();
  });

  test("LinesRemoved", () => {
    render(<Stats.LinesRemoved lines={2} />);

    expect(screen.getByText(/Lignes suppr/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
  });

  test("Level", () => {
    render(<Stats.Level level={7} />);

    expect(screen.getByText(/Niveau/i)).toBeInTheDocument();
    expect(screen.getByText(/7/i)).toBeInTheDocument();
  });

  test("Timer", () => {
    render(
      <GameContext.Provider value={{ state: { alive: true } }}>
        <Stats.Timer />
      </GameContext.Provider>,
    );

    expect(screen.getByText(/00:00/i)).toBeInTheDocument();
  });
});
