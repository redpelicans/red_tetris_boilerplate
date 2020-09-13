import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import CreatePlayer from "components/player/CreatePlayer";
import { SocketContext } from "store";
import { StoreContext } from "store";
import { grow } from "actions/store";
import { Link } from "react-router-dom";
import { timeout } from "helpers/common";
import socketIOClient from "socket.io-client";
import { initSocket } from "actions/socket";

const endpoint = "http://0.0.0.0:3004";

export default function Home() {
  // const { state, dispatch } = React.useContext(StoreContext);
  const { state, dispatch } = React.useContext(SocketContext);

  React.useEffect(() => {
    const socket = socketIOClient(endpoint);
    console.log(socket);
    dispatch(initSocket(socket));
  }, []);

  return (
    <FlexBox height="full" className="items-center justify-center">
      <CreatePlayer />
    </FlexBox>
  );
}
