import { initSocket } from "store/sockets/sockets";

import {
  SET_PLAYER,
  SET_PLAYERS,
  SET_LOBBIES,
  SET_LOBBY,
  SET_LOBBY_RESPONSE,
  SET_LOBBIES_RESPONSE,
  ADD_MESSAGE,
  RESET_MESSAGES,
  SET_NEXT_PIECES,
} from "actions/store";

export const initialState = {
  socket: initSocket(),
  player: {},
  playerResponse: {},
  players: {},
  lobbies: {},
  lobbiesResponse: {},
  lobby: {},
  lobbyResponse: {},
  messages: [],
  nextPieces: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
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
    case ADD_MESSAGE:
      const allMessages = [...state.messages, action.message];
      const newMessages = allMessages.slice(
        Math.max(allMessages.length - 50, 0),
      );
      return {
        ...state,
        messages: newMessages,
      };
    case RESET_MESSAGES:
      return { ...state, messages: [] };
    case SET_NEXT_PIECES:
      return { ...state, nextPieces: [...state.nextPieces, ...action.pieces] };
    default:
      return state;
  }
}
