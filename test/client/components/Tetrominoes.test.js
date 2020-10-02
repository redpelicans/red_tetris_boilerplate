import React from "react";
import { render, screen } from "@testing-library/react";

import Tetrominoes from "components/tetrominoes/Tetrominoes";

describe("Tetrominoes", () => {
  test("null case", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    render(
      <Tetrominoes shape="invalid-shape" color="red" data-testid="tetromino" />,
    );

    expect(screen.queryByTestId(/tetromino/i)).toBeNull();
  });

  test("valid case", () => {
    render(<Tetrominoes shape="L" color="red" data-testid="tetromino" />);
    expect(screen.getByTestId("tetromino")).toBeInTheDocument();
  });

  test("O shape", () => {
    render(<Tetrominoes shape="O" color="red" data-testid="tetromino" />);
    expect(screen.getByTestId("tetromino")).toBeInTheDocument();
  });

  test("T shape", () => {
    render(<Tetrominoes shape="T" color="red" data-testid="tetromino" />);
    expect(screen.getByTestId("tetromino")).toBeInTheDocument();
  });

  test("I shape", () => {
    render(<Tetrominoes shape="I" color="red" data-testid="tetromino" />);
    expect(screen.getByTestId("tetromino")).toBeInTheDocument();
  });

  test("S shape", () => {
    render(<Tetrominoes shape="S" color="red" data-testid="tetromino" />);
    expect(screen.getByTestId("tetromino")).toBeInTheDocument();
  });

  test("Z shape", () => {
    render(<Tetrominoes shape="Z" color="red" data-testid="tetromino" />);
    expect(screen.getByTestId("tetromino")).toBeInTheDocument();
  });

  test("J shape", () => {
    render(<Tetrominoes shape="J" color="red" data-testid="tetromino" />);
    expect(screen.getByTestId("tetromino")).toBeInTheDocument();
  });
});
