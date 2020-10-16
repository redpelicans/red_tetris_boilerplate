import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { List } from "./List";
import { setLobby } from "actions/store";
import { LOBBY } from "../../../config/actions/lobby";
import { StoreContext } from "store";

export default function () {
  const { state, dispatch } = React.useContext(StoreContext);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (state.lobbyResponse.action === LOBBY.SUBSCRIBE) {
      if (state.lobbyResponse.type === "error") {
        console.log("There was an error with lobby:response");
        setError(state?.lobbyResponse?.reason);
      } else if (state.lobbyResponse.type === "success") {
        console.log("Lobby joined :", state.lobbyResponse.payload);
        dispatch(setLobby(state.lobbyResponse.payload));
      }
    }
  }, [state.lobbyResponse]);

  const subscribeLobby = (lobby) => {
    state.socket.emit(LOBBY.SUBSCRIBE, {
      lobbyId: lobby.id,
      playerId: state.player.id,
    });
  };

  return (
    <FlexBox
      height="6/12"
      width="full"
      className="justify-center items-center sm:w-1/3 sm:h-1/3"
    >
      <FlexBox direction="col" className="border border-black p-5 max-h-11/12">
        <span>LOBBIES</span>
        <FlexBox direction="col" className="overflow-y-scroll max-h-64">
          <List
            object={state.lobbies}
            name="lobby"
            availability={true}
            onClick={subscribeLobby}
            buttonText="Join Lobby"
          />
          <span className="text-red-600">{error}</span>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
