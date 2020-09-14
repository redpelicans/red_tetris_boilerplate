import { INIT_SOCKET, SET_PLAYER_RESPONSE } from "actions/store";

export const initialState = {
  socket: {},
  playerResponse: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INIT_SOCKET:
      return { ...state, socket: action.socket };
    case SET_PLAYER_RESPONSE:
      return { ...state, playerResponse: action.playerResponse };
    default:
      return state;
  }
}
