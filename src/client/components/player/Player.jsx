import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { StoreContext } from "store";
import { setLobby, setLobbiesResponse } from "actions/store";
import { List } from "components/list/List";

export default function () {
  const { state, dispatch } = React.useContext(StoreContext);

  return (
    <FlexBox direction="col">
      <span>PLAYER INFORMATIONS</span>
      <span>playerName : {state?.player?.name}</span>
      <span>playerId : {state?.player?.id}</span>
      <span>playerSocketId : {state?.player?.socketId}</span>
    </FlexBox>
  );
}
