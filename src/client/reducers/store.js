import { initSocket } from "store/sockets/sockets";
import { deepCopy } from "helpers/functional";

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
  SET_GAME_STARTED,
  SET_SCORE,
  SET_BOARD,
  SET_PENALTY,
  SET_LOSER,
  SET_WINNER,
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
  game: {},
  winner: {},
  penalty: 0,
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
    case SET_GAME_STARTED:
      return { ...state, game: action.game };
    case SET_SCORE:
      const newGame = deepCopy(state.game);
      const newPlayers = newGame.players.map((el) => {
        if (el.player.id === action.playerId) el.score = action.score;
        return el;
      });
      newGame.players = newPlayers;
      return { ...state, game: newGame };
    case SET_BOARD:
      const newGame2 = deepCopy(state.game);
      const newPlayers2 = newGame2.players.map((el) => {
        if (el.player.id === action.playerId) el.board = action.board;
        return el;
      });
      newGame2.players = newPlayers2;
      return { ...state, game: newGame2 };
    case SET_LOSER:
      const newGame3 = deepCopy(state.game);
      const newPlayers3 = newGame3.players.map((el) => {
        if (el.player.id === action.playerId) el.loser = true;
        return el;
      });
      newGame3.players = newPlayers3;
      return { ...state, game: newGame3 };
    case SET_WINNER:
      return { ...state, winner: action.winner };
    case SET_PENALTY:
      return { ...state, penalty: action.nbLinePenalty };
    default:
      return state;
  }
}
