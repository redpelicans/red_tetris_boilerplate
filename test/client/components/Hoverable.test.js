import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Hoverable from "components/hoverable/Hoverable";

describe("Hoverable", () => {
  render(
    <Hoverable>
      <p>Hello</p>
      <Hoverable.In>World !</Hoverable.In>
      <Hoverable.Out>Nothing !</Hoverable.Out>
    </Hoverable>,
  );

  const OutContainer = screen.queryByText(/Nothing/i);
  const InContainer = screen.queryByText(/World/i);

  test("hover effect", () => {
    expect(screen.getByText(/Hello/i)).toBeInTheDocument();

    userEvent.hover(screen.getByText(/Hello/i));

    expect(screen.getByText(/World/i)).toBeInTheDocument();
    expect(OutContainer.classList.contains("hidden")).toBe(true);
    expect(InContainer.classList.contains("hidden")).toBe(false);

    userEvent.unhover(screen.getByText(/Hello/i));

    expect(screen.getByText(/Nothing/i)).toBeInTheDocument();
    expect(InContainer.classList.contains("hidden")).toBe(true);
    expect(OutContainer.classList.contains("hidden")).toBe(false);
  });
});
