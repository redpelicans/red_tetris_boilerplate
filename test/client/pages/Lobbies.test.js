import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "locales/i18n";
import Lobbies from "pages/lobbies/Lobbies";
import { StoreContext } from "store/layers/store";
import { socket } from "store/middleware";
import { initialState as defaultStore } from "reducers/store";
import { LOBBIES } from "../../../src/config/actions/lobbies";
import { LOBBY } from "../../../src/config/actions/lobby";

describe("Lobbies", () => {
  const socketStub = jest
    .spyOn(socket, "emit")
    .mockImplementation((name, payload) => ({ action: name, payload }));
  const useEffectStub = jest.spyOn(React, "useEffect");

  test("empty Lobbies page", () => {
    render(
      <StoreContext.Provider value={{ state: defaultStore, dispatch: {} }}>
        <Lobbies />
      </StoreContext.Provider>,
    );

    expect(screen.getByText(/Aucun salon trouvé./i)).toBeInTheDocument();
    expect(useEffectStub).toHaveBeenCalled();
  });

  test("Creation Lobby Form", () => {
    render(
      <StoreContext.Provider value={{ state: defaultStore, dispatch: {} }}>
        <Lobbies />
      </StoreContext.Provider>,
    );

    expect(
      screen.queryByTestId(/overlay_create_lobby/i),
    ).not.toBeInTheDocument();
    const createLobbyBtn = screen.getByText(/Créer un salon/i);
    expect(createLobbyBtn).toBeInTheDocument();
    userEvent.click(createLobbyBtn);

    expect(screen.queryByTestId(/overlay_create_lobby/i)).toBeInTheDocument();
    const inputLobbyName = screen.getByPlaceholderText(/Nom du salon/i);
    expect(inputLobbyName).toBeInTheDocument();
    userEvent.type(inputLobbyName, "Mordor");
    userEvent.selectOptions(screen.getByRole("combobox"), "2");
    userEvent.click(screen.getByTestId(/create_new_lobby/i));

    const formResponse = socketStub.mock.calls[0];
    expect(formResponse[0]).toEqual(LOBBIES.ADD);
    expect(formResponse[1]).toHaveProperty("maxPlayer", "2");
    expect(formResponse[1]).toHaveProperty("name", "Mordor");
  });

  test("Filter Lobbies", () => {
    const customStore = {
      ...defaultStore,
      lobbies: {
        test: {
          hash: "test",
          maxPlayer: "2",
          owner: {},
          name: "Mordor",
          players: {},
        },
      },
    };
    render(
      <StoreContext.Provider value={{ state: customStore, dispatch: {} }}>
        <Lobbies />
      </StoreContext.Provider>,
    );

    const inputFilterLobbies = screen.getByPlaceholderText(
      /Rechercher un salon de jeu/i,
    );
    expect(inputFilterLobbies).toBeInTheDocument();

    expect(screen.getByText(/Mordor/i)).toBeInTheDocument();

    userEvent.type(inputFilterLobbies, "Rohan");
    expect(screen.queryByText(/Mordor/i)).not.toBeInTheDocument();

    userEvent.clear(inputFilterLobbies);
    userEvent.type(inputFilterLobbies, "Mo");
    expect(screen.queryByText(/Mordor/i)).toBeInTheDocument();
  });

  test("Join Lobby", () => {
    const customStore = {
      ...defaultStore,
      lobbies: {
        test: {
          hash: "test",
          maxPlayer: "2",
          owner: {},
          name: "Mordor",
          players: {},
        },
      },
    };
    render(
      <StoreContext.Provider value={{ state: customStore, dispatch: {} }}>
        <Lobbies />
      </StoreContext.Provider>,
    );

    const mockLobby = screen.getByText(/Mordor/i);
    expect(mockLobby).toBeInTheDocument();
    userEvent.click(mockLobby);
    const socketResponse = socketStub.mock.calls[0];
    expect(socketResponse[0]).toEqual(LOBBY.SUBSCRIBE);
  });

  afterAll(() => {
    socketStub.mockRestore();
    useEffectStub.mockRestore();
  });
});
