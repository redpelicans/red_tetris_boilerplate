import { createEvent } from "helpers/socket";
import { validationLobby } from "socket/lobby/schemas";
import { handlerLobby } from "socket/lobby/handlers";
import { LOBBY } from "./../../../config/actions/lobby";

export const Lobby = createEvent(LOBBY.TEST, validationLobby, handlerLobby);
