import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { MESSAGE } from "../../../config/actions/message";
import "./Lobby.scss";
import { socket } from "store/middleware/sockets";

export default function Chat({ state }) {
  const [message, setMessage] = React.useState("");

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const scrollDown = () => {
    /** You can avoid using getElementById if you can get the div rendered by Item component using refs.
     * You can look at refs forwarding and other technics to see how you can solve this */
    const divToScrollTo = document.getElementById("chat");
    if (divToScrollTo) {
      divToScrollTo.scrollTop = divToScrollTo.scrollHeight;
    }
  };

  React.useEffect(() => {
    scrollDown();
  }, [state.messages]);

  const sendMessage = () => {
    if (message && message !== "") {
      const sender = state.player.name;
      const lobbyId = state?.lobby?.id;
      socket.emit(MESSAGE.SEND, { message, sender, lobbyId });
      setMessage("");
    }
    socket.emit("piece:get", { nb: 2 });
  };

  const submit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <FlexBox
      direction="col"
      wrap="no-wrap"
      height="2/5"
      width="full"
      className="justify-between"
    >
      <FlexBox
        direction="col"
        wrap="no-wrap"
        width="full"
        height="full"
        className="p-6 justify-around"
      >
        <ul
          id="chat"
          className="overflow-y-scroll hide-scroll h-3/4 w-full px-2 shadow-lg bg-grey-100 rounded"
        >
          {state.messages.map((message) => (
            <li
              key={message.id}
              className={`flex flex-col mr-1 ml-1 ${
                message.sender == state.player.name
                  ? "items-end text-right"
                  : "items-start text-left"
              } word-breaker`}
            >
              <FlexBox direction="col" className="w-4/5 mb-1">
                <span className="text-sm text-red-400">{message.sender}</span>
                <span className="text-sm">{message.message}</span>
              </FlexBox>
            </li>
          ))}
        </ul>
        <form onSubmit={submit} className="flex justify-between ">
          <input
            placeholder="Type your message"
            type="text"
            value={message}
            onChange={handleMessage}
            className="w-84% shadow-lg pl-2 bg-grey-100"
          />
          <button
            className="w-15% flex-shrink-0 bg-red-400 hover:bg-red-600 text-sm text-white py-1 px-2 rounded"
            type="submit"
          >
            Send
          </button>
        </form>
      </FlexBox>
    </FlexBox>
  );
}
