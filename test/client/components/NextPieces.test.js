import React from "react";
import { render, screen } from "@testing-library/react";
import "locales/i18n";
import NextPieces from "components/tetris/NextPieces";

describe("NextPieces", () => {
  test("does not renders when empty prop", () => {
    render(<NextPieces />);
    expect(screen.queryByText(/suivantes/i)).not.toBeInTheDocument();
  });

  test("renders correctly", () => {
    render(<NextPieces nextPieces={[]} />);
    expect(screen.getByText(/suivantes/i)).toBeInTheDocument();
  });
});
