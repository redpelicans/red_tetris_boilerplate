import { createEvent } from "helpers/socket";
import { validationJoinLobby } from "socket/lobby/schemas";
import { handlerJoinLobby } from "socket/lobby/handlers";
import { LOBBY } from "./../../../config/actions/lobby";

export const joinLobby = createEvent(
  LOBBY.JOIN,
  validationJoinLobby,
  handlerJoinLobby,
);
