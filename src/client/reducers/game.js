import {
  SET_PLAYER_IS_ALIVE,
  SET_OWNER_SCORE,
  INCREASE_ROWS_REMOVED,
  SET_GAME,
  SET_SCORE,
  SET_BOARD,
  SET_LOSER,
  SET_WINNER,
  SET_PENALTY,
} from "actions/game";
import { pipe } from "helpers/functional";
import { lowerOrEqualThan, divideBy } from "helpers/currying";

export const initialState = {
  alive: true,
  level: 0,
  rowsRemoved: 0,
  score: 0,
  speedRate: 1.0,
  game: {},
  winner: {},
  penalty: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PLAYER_IS_ALIVE:
      return {
        ...state,
        alive: action.alive,
      };
    case SET_OWNER_SCORE:
      return {
        ...state,
        score: state.score + action.score,
      };
    case INCREASE_ROWS_REMOVED:
      const newRowsRemoved = state.rowsRemoved + action.increment;
      const newLevel = pipe(
        divideBy(10),
        Math.floor,
        lowerOrEqualThan(10),
      )(newRowsRemoved);

      return {
        ...state,
        rowsRemoved: newRowsRemoved,
        level: newLevel,
        speedRate: 1.0 + newLevel * 0.05,
      };
    case SET_GAME:
      return { ...state, game: action.game };
    case SET_SCORE:
      const newPlayersScore = state.game.players.map((el) => {
        if (el.player.id === action.playerId) el.score = action.score;
        return el;
      });
      return { ...state, game: { ...state.game, players: newPlayersScore } };
    case SET_BOARD:
      const newPlayersBoard = state.game.players.map((el) => {
        if (el.player.id === action.playerId) el.board = action.board;
        return el;
      });
      return { ...state, game: { ...state.game, players: newPlayersBoard } };
    case SET_LOSER:
      const newPlayersLoser = state.game.players.map((el) => {
        if (el.player.id === action.playerId) el.loser = true;
        return el;
      });
      return { ...state, game: { ...state.game, players: newPlayersLoser } };
    case SET_WINNER:
      return { ...state, winner: action.winner };
    case SET_PENALTY:
      return { ...state, penalty: action.nbLinePenalty };
    default:
      return state;
  }
}
