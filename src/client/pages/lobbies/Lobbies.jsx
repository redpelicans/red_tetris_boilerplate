import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { Link } from "react-router-dom";
import { StoreContext } from "store";

export default function Lobbies() {
  const { state, dispatch } = React.useContext(StoreContext);

  return (
    <FlexBox height="full" className="items-center justify-center">
      {state.playerResponse.payload ? (
        <FlexBox direction="col" className="">
          <FlexBox className="">PLAYER INFORMATIONS</FlexBox>
          <FlexBox className="">
            playerName : {state.playerResponse.payload.name}
          </FlexBox>
          <FlexBox className="">
            playerId : {state.playerResponse.payload.id}
          </FlexBox>
          <FlexBox className="">
            playerSocketId : {state.playerResponse.payload.socketId}
          </FlexBox>
        </FlexBox>
      ) : (
        <FlexBox direction="col" className="">
          <FlexBox className="">You need to create a player!</FlexBox>
          <Link to="/">Retour accueil</Link>
        </FlexBox>
      )}
    </FlexBox>
  );
}
