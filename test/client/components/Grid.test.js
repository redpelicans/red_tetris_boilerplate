import React from "react";
import { render, screen } from "@testing-library/react";
import { CURRENT_PIECE, FREE } from "constants/tetris";

import Grid from "components/tetris/Grid";
import { GameContextProvider } from "store/layers/game";

describe("Grid", () => {
  const mockGrid = [
    [FREE, CURRENT_PIECE, FREE, FREE, FREE],
    [CURRENT_PIECE, CURRENT_PIECE, CURRENT_PIECE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
    [FREE, FREE, FREE, FREE, FREE],
    ["red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red"],
  ];

  test("Should render correctly", () => {
    render(
      <GameContextProvider>
        <Grid
          currentPieceColor="red"
          grid={mockGrid}
          rowHeight={10}
          colHeight={10}
          data-testid="grid"
        />
      </GameContextProvider>,
    );

    expect(screen.getAllByTestId("grid")[0]).toBeInTheDocument();
  });
});
