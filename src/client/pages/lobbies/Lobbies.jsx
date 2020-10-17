import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { StoreContext } from "store";
// import MatchmakingPlacement from "./MatchmakingPlacement";
import useNavigate from "hooks/useNavigate";
import { LOBBIES } from "../../../config/actions/lobbies";
// import CreateLobby from "./CreateLobby";
import LobbyItem from "./LobbyItem";
import Lobby from "./Lobby";

import SearchLobby from "./SearchLobby";
import "./lobbies.scss";
// import Players from "./Players";
// import Player from "./Player";
// import Chat from "./Chat";

export default function Lobbies() {
  const { state, dispatch } = React.useContext(StoreContext);
  const { navigate } = useNavigate();
  const [lobbies, setLobbies] = React.useState(
    Object.entries(state.lobbies || {}),
  );

  React.useEffect(() => {
    if (!Object.keys(state.player).length) {
      navigate("/");
    }
    state.socket.emit(LOBBIES.SUBSCRIBE);
  }, []);

  React.useEffect(() => {
    setLobbies(Object.entries(state.lobbies || {}));
  }, [state.lobbies]);

  return (
    <FlexBox
      height="full"
      width="full"
      direction="col"
      className="pl-24 pt-8 pb-8 justify-start overflow-hidden relative"
    >
      <FlexBox direction="col" className="h-4/5">
        <SearchLobby />
        <div className="overflow-y-scroll max-h-4/5 lobby">
          {lobbies.map(([key, el], index) => {
            return <LobbyItem lobby={el} key={index} />;
          })}
        </div>
      </FlexBox>
      <FlexBox width="3/4" direction="row" className="justify-between">
        <button className="w-3/5 text-center bg-red-100 p-2 rounded-lg shadow-lg">
          <FlexBox direction="col">
            <span className="text-base">Play Game</span>
            <span className="text-xs">101 playes connected</span>
          </FlexBox>
        </button>
        <button className="text-base w-1/3 text-center bg-red-400 p-2 rounded-lg shadow-lg">
          Create Lobby
        </button>
      </FlexBox>
      <Lobby />
    </FlexBox>
  );
}
