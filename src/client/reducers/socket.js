import { INIT_SOCKET } from "actions/socket";

export const initialState = {
  socket: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INIT_SOCKET:
      return { ...state, socket: action.socket };
    default:
      return state;
  }
}
