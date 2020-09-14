import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import CreatePlayer from "components/player/CreatePlayer";
import { StoreContext } from "store";
import socketIOClient from "socket.io-client";
import { initSocket, setPlayerResponse } from "actions/store";

const endpoint = "http://0.0.0.0:3004";

export default function Home() {
  const { state, dispatch } = React.useContext(StoreContext);

  React.useEffect(() => {
    if (
      Object.keys(state.socket).length === 0 &&
      state.socket.constructor === Object
    ) {
      const socket = socketIOClient(endpoint);
      socket.on("player:response", (data) => {
        dispatch(setPlayerResponse(data.response));
      });
      dispatch(initSocket(socket));
    }
  }, []);

  return (
    <FlexBox height="full" className="items-center justify-center">
      <CreatePlayer />
    </FlexBox>
  );
}
