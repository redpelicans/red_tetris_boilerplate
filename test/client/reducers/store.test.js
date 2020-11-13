import reducer, { initialState } from "reducers/store";
import * as actions from "actions/store";

describe("Store reducer", () => {
  test("SET_PLAYER_RESPONSE", () => {
    const action = {
      type: actions.SET_PLAYER_RESPONSE,
      playerResponse: "test",
    };
    const { playerResponse } = reducer(initialState, action);

    expect(playerResponse).toEqual("test");
  });

  test("SET_PLAYER", () => {
    const action = {
      type: actions.SET_PLAYER,
      player: "Legolas",
    };
    const { player } = reducer(initialState, action);

    expect(player).toEqual("Legolas");
  });

  test("SET_PLAYERS", () => {
    const action = {
      type: actions.SET_PLAYERS,
      players: ["Legolas", "Gimli"],
    };
    const { players } = reducer(initialState, action);

    expect(players).toEqual(["Legolas", "Gimli"]);
  });

  test("SET_LOBBIES", () => {
    const action = {
      type: actions.SET_LOBBIES,
      lobbies: ["Rohan", "Mordor"],
    };
    const { lobbies } = reducer(initialState, action);

    expect(lobbies).toEqual(["Rohan", "Mordor"]);
  });

  test("SET_LOBBY", () => {
    const action = {
      type: actions.SET_LOBBY,
      lobby: "Gondor",
    };
    const { lobby } = reducer(initialState, action);

    expect(lobby).toEqual("Gondor");
  });

  test("SET_LOBBY_RESPONSE", () => {
    const action = {
      type: actions.SET_LOBBY_RESPONSE,
      lobbyResponse: "test",
    };
    const { lobbyResponse } = reducer(initialState, action);

    expect(lobbyResponse).toEqual("test");
  });

  test("SET_LOBBIES_RESPONSE", () => {
    const action = {
      type: actions.SET_LOBBIES_RESPONSE,
      lobbiesResponse: ["test"],
    };
    const { lobbiesResponse } = reducer(initialState, action);

    expect(lobbiesResponse).toEqual(["test"]);
  });

  test("ADD_MESSAGE", () => {
    const action = {
      type: actions.ADD_MESSAGE,
      message: "hey there",
    };
    const { messages } = reducer(initialState, action);

    expect(messages).toEqual(["hey there"]);

    const { messages: tooMuchMessages } = reducer(
      { ...initialState, messages: new Array(100).fill("hey") },
      action,
    );

    expect(tooMuchMessages).toHaveLength(50);
  });

  test("RESET_MESSAGES", () => {
    const action = { type: actions.RESET_MESSAGES };
    const { messages } = reducer(
      { ...initialState, messages: new Array(100).fill("hey") },
      action,
    );

    expect(messages).toEqual([]);
  });

  test("SET_GAME_STARTED", () => {
    const action = {
      type: actions.SET_GAME_STARTED,
      game: true,
    };
    const { game } = reducer(initialState, action);

    expect(game).toEqual(true);
  });

  test("default", () => {
    const state = reducer(initialState, "NOT_VALID");
    expect(state).toEqual(initialState);
  });

  test("Type Error", () => {
    expect(() => reducer(null, null)).toThrow(TypeError);
    expect(() => reducer(initialState, null)).toThrow(TypeError);
  });
});
