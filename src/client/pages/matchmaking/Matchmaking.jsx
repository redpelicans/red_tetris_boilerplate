import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { Link } from "react-router-dom";
import { StoreContext } from "store";
import { List } from "components/list/List";
import CreateLobby from "components/lobby/CreateLobby";
import Lobby from "components/lobby/Lobby";
import Lobbies from "components/lobbies/Lobbies";
import Players from "components/players/Players";
import Player from "components/player/Player";

import { useNavigation } from "helpers/navigate";

export default function Matchmaking() {
  const { state, dispatch } = React.useContext(StoreContext);
  const { navigate } = useNavigation();

  React.useEffect(() => {
    if (!Object.keys(state?.player || {}).length) navigate("");
    state.socket.emit("lobbies:subscribe");
  }, []);

  // React.useEffect(() => {
  //   console.log(state?.players);
  // }, [state?.players]);

  return (
    <FlexBox height="full" width="full">
      <FlexBox
        height="6/12"
        width="full"
        className="justify-center items-center sm:w-1/3 sm:h-1/3"
      >
        <FlexBox
          direction="col"
          className="border border-black p-5 max-h-11/12"
        >
          <Player />
        </FlexBox>
      </FlexBox>
      <FlexBox
        height="6/12"
        width="full"
        className="justify-center items-center sm:w-1/3 sm:h-1/3"
      >
        <FlexBox
          direction="col"
          className="border border-black p-5 max-h-11/12"
        >
          <span>PLAYERS CONNECTED</span>
          <Players />
        </FlexBox>
      </FlexBox>
      <FlexBox
        height="6/12"
        width="full"
        className="justify-center items-center sm:w-1/3 sm:h-1/3"
      >
        <FlexBox
          direction="col"
          className="border border-black p-5 max-h-11/12"
        >
          <span>CHAT</span>
        </FlexBox>
      </FlexBox>
      <FlexBox
        height="6/12"
        width="full"
        className="justify-center items-center sm:w-1/3 sm:h-1/3"
      >
        <FlexBox
          direction="col"
          className="border border-black p-5 max-h-11/12"
        >
          <span>LOBBIES</span>
          <Lobbies />
        </FlexBox>
      </FlexBox>
      <FlexBox
        height="6/12"
        width="full"
        className="justify-center items-center sm:w-1/3 sm:h-1/3"
      >
        <FlexBox
          direction="col"
          className="border border-black p-5 max-h-11/12"
        >
          <span>CREATE LOBBY</span>
          <CreateLobby />
        </FlexBox>
      </FlexBox>
      <FlexBox
        height="6/12"
        width="full"
        className="justify-center items-center sm:w-1/3 sm:h-1/3"
      >
        <FlexBox
          direction="col"
          className="border border-black p-5 max-h-11/12"
        >
          <Lobby />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
