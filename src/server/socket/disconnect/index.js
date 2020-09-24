import { createEvent } from "helpers/socket";
import { validationOnDisconnect } from "socket/disconnect/schemas";
import { handlerOnDisconnect } from "socket/disconnect/handlers";

export const onDisconnect = createEvent(
  "disconnect",
  null,
  handlerOnDisconnect,
);
