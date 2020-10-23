import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { StoreContext } from "store";

export default function () {
  const { state, dispatch } = React.useContext(StoreContext);

  return (
    <FlexBox
      direction="col"
      className="h-1/10 p-10 bg-white bg-opacity-75 m-10 justify-between rounded-lg"
    >
      <span>PLAYER</span>
      <FlexBox direction="col">
        <span>playerName : {state?.player?.name}</span>
        <span>playerId : {state?.player?.id}</span>
        <span>playerSocketId : {state?.player?.socketId}</span>
      </FlexBox>
    </FlexBox>
  );
}
