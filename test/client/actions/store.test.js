import * as actions from "actions/store";

describe("Game actions", () => {
  test("setPlayerResponse", () => {
    expect(actions.setPlayerResponse(true)).toEqual({
      type: actions.SET_PLAYER_RESPONSE,
      playerResponse: true,
    });
  });

  test("setPlayer", () => {
    expect(actions.setPlayer("Joker")).toEqual({
      type: actions.SET_PLAYER,
      player: "Joker",
    });
  });

  test("setPlayers", () => {
    expect(actions.setPlayers(["Joker", "Batman"])).toEqual({
      type: actions.SET_PLAYERS,
      players: ["Joker", "Batman"],
    });
  });

  test("setLobbies", () => {
    expect(actions.setLobbies(["Gotham", "New York"])).toEqual({
      type: actions.SET_LOBBIES,
      lobbies: ["Gotham", "New York"],
    });
  });

  test("setLobbiesResponse", () => {
    expect(actions.setLobbiesResponse(true)).toEqual({
      type: actions.SET_LOBBIES_RESPONSE,
      lobbiesResponse: true,
    });
  });

  test("setLobby", () => {
    expect(actions.setLobby("Gotham")).toEqual({
      type: actions.SET_LOBBY,
      lobby: "Gotham",
    });
  });

  test("setLobbyResponse", () => {
    expect(actions.setLobbyResponse(true)).toEqual({
      type: actions.SET_LOBBY_RESPONSE,
      lobbyResponse: true,
    });
  });

  test("addMessage", () => {
    expect(actions.addMessage("hey there")).toEqual({
      type: actions.ADD_MESSAGE,
      message: "hey there",
    });
  });

  test("resetMessages", () => {
    expect(actions.resetMessages()).toEqual({
      type: actions.RESET_MESSAGES,
    });
  });

  test("setGameStarted", () => {
    expect(actions.setGameStarted(true)).toEqual({
      type: actions.SET_GAME_STARTED,
      game: true,
    });
  });
});
