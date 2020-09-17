import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { StoreContext } from "store";
import { setLobby, setLobbiesResponse } from "actions/store";
import { List } from "components/list/List";

export default function () {
  const { state, dispatch } = React.useContext(StoreContext);
  const [message, setMessage] = React.useState("");

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
      state.socket.emit("message:send", { message, sender });
      setMessage("");
    }
  };

  const submit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <FlexBox direction="col" width="full">
      <ul id="lol" className="overflow-y-scroll max-h-64 max-w-100 min-h-12">
        {state.messages.map((message, index) => {
          return (
            <li key={message.id}>
              <div className="text-xs text-blue-600 ">{message.sender}</div>
              <div className="text-sm ">{message.message}</div>
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
        ></input>
        <button
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 m-2 rounded"
          type="submit"
        >
          Send
        </button>
      </form>
    </FlexBox>
  );
}
