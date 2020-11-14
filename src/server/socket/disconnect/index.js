import { createEvent } from "socket/helpers/socket";
import { handlerOnDisconnect } from "socket/disconnect/handlers";

export const onDisconnect = createEvent(
  "disconnect",
  null,
  handlerOnDisconnect,
);
