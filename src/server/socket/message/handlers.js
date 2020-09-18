import { logerror, loginfo } from "utils/log";
import { nanoid } from "nanoid";
import eventEmitter from "listeners";
import event from "listeners/events";

export const handlerSendMessage = async (socket, { message, sender }) => {
  const messageObject = { id: nanoid(), message: message, sender: sender };
  eventEmitter.emit(event.message.new, {
    socket,
    messageObject,
  });
};
