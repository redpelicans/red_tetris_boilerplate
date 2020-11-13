import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "locales/i18n";
import { GameContext } from "store/layers/game";
import SoundToggler from "components/sound/SoundToggler";

describe("SoundToggler", () => {
  const playStub = jest
    .spyOn(HTMLMediaElement.prototype, "play")
    .mockImplementation(() => {});

  const pauseStub = jest
    .spyOn(HTMLMediaElement.prototype, "pause")
    .mockImplementation(() => {});

  test("renders correctly when alive", () => {
    render(
      <GameContext.Provider value={{ state: { alive: true } }}>
        <SoundToggler speedRate={1.0} />
      </GameContext.Provider>,
    );

    expect(screen.getByText(/Son allum.{1}/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/Son allum.{1}/i));

    expect(pauseStub).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/Son allum.{1}/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Son .{1}teint/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/Son .{1}teint/i));

    expect(playStub).toHaveBeenCalledTimes(2);
    expect(screen.queryByText(/Son .{1}teint/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Son allum.{1}/i)).toBeInTheDocument();
  });

  test("renders correctly when not alive", () => {
    render(
      <GameContext.Provider value={{ state: { alive: false } }}>
        <SoundToggler speedRate={1.0} />
      </GameContext.Provider>,
    );

    expect(screen.getByText(/Son allum.{1}/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/Son allum.{1}/i));

    expect(pauseStub).toHaveBeenCalledTimes(2);
    expect(screen.queryByText(/Son allum.{1}/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Son .{1}teint/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/Son .{1}teint/i));

    expect(playStub).toHaveBeenCalledTimes(3);
    expect(screen.queryByText(/Son .{1}teint/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Son allum.{1}/i)).toBeInTheDocument();
  });

  afterAll(() => {
    pauseStub.mockRestore();
    playStub.mockRestore();
  });
});
