import { logerror, loginfo } from "utils/log";
import { nanoid } from "nanoid";
import { GROUP } from "./../../../config/actions/group";

export const handlerSendMessage = async (socket, { message, sender }) => {
  const messageObject = { id: nanoid(), message: message, sender: sender };
  socket.broadcast.to(GROUP.LOBBIES).emit("message:publish", { messageObject });
  socket.emit("message:publish", messageObject);
};
