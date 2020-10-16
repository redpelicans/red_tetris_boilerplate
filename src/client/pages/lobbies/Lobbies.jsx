import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { StoreContext } from "store";
import MatchmakingPlacement from "./MatchmakingPlacement";
import useNavigate from "hooks/useNavigate";
import { LOBBIES } from "../../../config/actions/lobbies";
import CreateLobby from "./CreateLobby";
import Lobby from "./Lobby";
import Lobbies2 from "./Lobbies2";
import Players from "./Players";
import Player from "./Player";
import Chat from "./Chat";

export default function Lobbies() {
  const { state, dispatch } = React.useContext(StoreContext);
  const { navigate } = useNavigate();

  React.useEffect(() => {
    if (!Object.keys(state.player).length) {
      navigate("/");
    }
    state.socket.emit(LOBBIES.SUBSCRIBE);
  }, []);

  return (
    <FlexBox height="full" width="full">
      <Player />
      <Players />
      <Chat />
      <Lobbies2 />
      <CreateLobby />
      <Lobby />
      {/* <MatchmakingPlacement state={state} dispatch={dispatch} /> */}
    </FlexBox>
  );
}
