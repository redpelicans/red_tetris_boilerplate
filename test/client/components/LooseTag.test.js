import React from "react";
import { render, screen } from "@testing-library/react";
import "locales/i18n";
import LooseTag from "components/tetris/LooseTag";

describe("LooseTag", () => {
  test("renders correctly", () => {
    render(<LooseTag fontSize="md" />);

    expect(screen.getByText(/Partie/i)).toBeInTheDocument();
  });
});
