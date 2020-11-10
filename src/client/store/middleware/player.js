import {
  PLAYER
} from "../../../config/actions/player";


import {
  setPlayerResponse,
} from "actions/store";

export function setupSocketPlayer(socket, dispatch) {
  socket.on(PLAYER.RESPONSE, (data) => {
    dispatch(setPlayerResponse(data));
  });
}

export function removeSocketPlayer(socket) {
  socket.off(PLAYER.RESPONSE);
}
