import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { StoreContext } from "store";
import { setLobby, setLobbiesResponse } from "actions/store";
import { List } from "./List";

export default function () {
  const { state, dispatch } = React.useContext(StoreContext);

  return (
    <FlexBox
      height="6/12"
      width="full"
      className="justify-center items-center sm:w-1/3 sm:h-1/3"
    >
      <FlexBox direction="col" className="border border-black p-5 max-h-11/12">
        <span>PLAYER</span>

        <FlexBox direction="col">
          <span>playerName : {state?.player?.name}</span>
          <span>playerId : {state?.player?.id}</span>
          <span>playerSocketId : {state?.player?.socketId}</span>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
