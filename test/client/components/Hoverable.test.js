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

  test("hover effect", () => {
    expect(screen.getByText(/Hello/i)).toBeInTheDocument();

    userEvent.hover(screen.getByText(/Hello/i));

    expect(screen.getByText(/World/i)).toBeInTheDocument();
    expect(screen.queryByText(/Nothing/i)).toBeNull();

    userEvent.unhover(screen.getByText(/Hello/i));

    expect(screen.getByText(/Nothing/i)).toBeInTheDocument();
    expect(screen.queryByText(/World/i)).toBeNull();
  });
});
