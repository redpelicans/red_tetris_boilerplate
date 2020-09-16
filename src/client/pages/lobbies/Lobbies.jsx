import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { Link } from "react-router-dom";
import { StoreContext } from "store";
import { List } from "components/player/List";
import CreateLobby from "components/player/CreateLobby";
import { useNavigation } from "helpers/navigate";

export default function Lobbies() {
  const { state, dispatch } = React.useContext(StoreContext);
  const { navigate } = useNavigation();

  React.useEffect(() => {
    // use player
    if (!Object.keys(state?.playerResponse.payload || {}).length) navigate("");
  }, []);

  React.useEffect(() => {
    console.log(state?.players);
  }, [state?.players]);

  return (
    <FlexBox height="full" width="full">
      <FlexBox
        height="6/12"
        width="full"
        className="justify-center items-center sm:w-6/12 sm:h-6/12"
      >
        <FlexBox
          direction="col"
          className="border border-black p-5 max-h-11/12"
        >
          <span>PLAYER INFORMATIONS</span>
          <span>playerName : {state?.playerResponse?.payload?.name}</span>
          <span>playerId : {state?.playerResponse?.payload?.id}</span>
          <span>
            playerSocketId : {state?.playerResponse?.payload?.socketId}
          </span>
        </FlexBox>
      </FlexBox>
      <FlexBox
        height="6/12"
        width="full"
        className="justify-center items-center sm:w-6/12 sm:h-6/12"
      >
        <FlexBox
          direction="col"
          className="border border-black p-5 max-h-11/12"
        >
          <span>PLAYERS CONNECTED</span>
          <FlexBox direction="col" className="overflow-y-scroll max-h-64">
            <List type="players" object={state} />
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <FlexBox
        height="6/12"
        width="full"
        className="justify-center items-center sm:w-6/12 sm:h-6/12"
      >
        <FlexBox
          direction="col"
          className="border border-black p-5 max-h-11/12"
        >
          <span>LOBBIES</span>
          <List type="lobbies" object={state} />
        </FlexBox>
      </FlexBox>
      <FlexBox
        height="6/12"
        width="full"
        className="justify-center items-center sm:w-6/12 sm:h-6/12"
      >
        <FlexBox
          direction="col"
          className="border border-black p-5 max-h-11/12"
        >
          <CreateLobby />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
