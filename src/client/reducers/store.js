import { initSocket } from "helpers/sockets";

import {
  SET_PLAYER_RESPONSE,
  SET_PLAYER,
  SET_PLAYERS,
  SET_LOBBIES,
  SET_LOBBY,
  SET_LOBBY_RESPONSE,
  SET_LOBBIES_RESPONSE,
} from "actions/store";

export const initialState = {
  socket: initSocket(),
  playerResponse: {},
  player: {},
  players: {},
  lobbies: {},
  lobby: {},
  lobbyResponse: {},
  lobbiesResponse: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PLAYER_RESPONSE:
      return { ...state, playerResponse: action.playerResponse };
    case SET_PLAYER:
      return { ...state, player: action.player };
    case SET_PLAYERS:
      return { ...state, players: action.players };
    case SET_LOBBIES:
      return { ...state, lobbies: action.lobbies };
    case SET_LOBBY:
      return { ...state, lobby: action.lobby };
    case SET_LOBBY_RESPONSE:
      return { ...state, lobbyResponse: action.lobbyResponse };
    case SET_LOBBIES_RESPONSE:
      return { ...state, lobbiesResponse: action.lobbiesResponse };
    default:
      return state;
  }
}
