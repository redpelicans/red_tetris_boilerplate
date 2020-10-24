import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { MESSAGE } from "../../../../config/actions/message";
import { StoreContext } from "store";

export default function () {
  const [message, setMessage] = React.useState("");
  const { state, dispatch } = React.useContext(StoreContext);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const scrollDown = () => {
    /** You can avoid using getElementById if you can get the div rendered by Item component using refs.
     * You can look at refs forwarding and other technics to see how you can solve this */
    const divToScrollTo = document.getElementById(`lol`);
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
      state.socket.emit(MESSAGE.SEND, { message, sender });
      setMessage("");
    }
    state.socket.emit("piece:get", { nb: 2 });
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
      className="justify-between pl-6"
    >
      <FlexBox direction="col" wrap="no-wrap" width="full" height="full">
        <ul id="lol" className="overflow-y-scroll h-3/4 w-4/5">
          {state.messages.map((message, index) => {
            return (
              <li
                key={message.id}
                className={`flex flex-col mr-1 ml-1 ${
                  message.sender == state.player.name
                    ? "items-end"
                    : "items-start"
                } break-words`}
              >
                <span className="text-xs text-blue-600">{message.sender}</span>
                <span className="text-sm">{message.message}</span>
              </li>
            );
          })}
        </ul>
        <form onSubmit={submit}>
          <input
            placeholder="Type your message"
            type="text"
            value={message}
            onChange={handleMessage}
            className="w-4/5"
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 m-2 rounded"
            type="submit"
          >
            Send
          </button>
        </form>
      </FlexBox>
    </FlexBox>
  );
}
