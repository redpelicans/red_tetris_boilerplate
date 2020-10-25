import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { StoreContext } from "store";
import useNavigate from "hooks/useNavigate";
import { LOBBIES } from "../../../config/actions/lobbies";
import LobbiesContainer from "./lobbies/LobbiesContainer";
import "./Rooms.scss";
import LobbyContainer from "./lobby/LobbyContainer";

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
    <FlexBox
      width="full"
      height="full"
      className="justify-center overflow-hidden relative"
    >
      <LobbiesContainer state={state} dispatch={dispatch} />
      <LobbyContainer state={state} dispatch={dispatch} />
    </FlexBox>
  );
}
