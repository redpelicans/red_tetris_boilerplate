import {
  SET_PLAYER_IS_ALIVE,
  SET_GAME,
  SET_SCORE,
  SET_BOARD,
  SET_LOSER,
  SET_WINNER,
  SET_PENALTY,
  SET_NEXT_PIECES,
} from "actions/game";

export const initialState = {
  alive: true,
  game: {},
  winner: {},
  penalty: 0,
  nextPieces: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PLAYER_IS_ALIVE:
      return {
        ...state,
        alive: action.alive,
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
    case SET_NEXT_PIECES:
      return { ...state, nextPieces: action.pieces };
    default:
      return state;
  }
}
