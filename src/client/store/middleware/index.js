import socketIOClient from "socket.io-client";
import { setupSocketPlayer, removeSocketPlayer } from "store/middleware/player";
import { setupSocketRooms, removeSocketRooms } from "store/middleware/rooms";
import { setupSocketGame, removeSocketGame } from "store/middleware/game";

const host = process.env.REACT_APP_SERVER_HOST || "0.0.0.0:3004";

export const socket = socketIOClient(host);

let socketPlayer = false;
let socketRooms = false;
let socketGame = false;

export function socketPlayerOn(dispatch) {
  if (!socketPlayer) {
    setupSocketPlayer(socket, dispatch);
    socketPlayer = true;
  }
}

export function socketPlayerOff() {
  if (socketPlayer) {
    removeSocketPlayer(socket);
    socketPlayer = false;
  }
}

export function socketRoomsOn(dispatch) {
  if (!socketRooms) {
    setupSocketRooms(socket, dispatch);
    socketRooms = true;
  }
}

export function socketRoomsOff() {
  if (socketRooms) {
    removeSocketRooms(socket);
    socketRooms = false;
  }
}

export function socketGameOn(dispatch) {
  if (!socketGame) {
    setupSocketGame(socket, dispatch);
    socketGame = true;
  }
}

export function socketGameOff() {
  if (socketGame) {
    removeSocketGame(socket);
    socketGame = false;
  }
}
