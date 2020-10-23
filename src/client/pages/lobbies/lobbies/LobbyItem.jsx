import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { setLobby } from "actions/store";
import { LOBBY } from "../../../../config/actions/lobby";
import { StoreContext } from "store";

const isFull = (lobby) => players.length >= maxPlayer;

export default function ({ lobby, index }) {
  const { state, dispatch } = React.useContext(StoreContext);
  const [error, setError] = React.useState("");
  const [hover, setHover] = React.useState(false);

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
    setError("");
    state.socket.emit(LOBBY.SUBSCRIBE, {
      lobbyId: lobby.id,
      playerId: state.player.id,
    });
  };

  return (
    <FlexBox
      direction="row"
      width="3/4"
      className="border border-grey-200 justify-between items-center rounded-lg shadow-lg p-3 mb-3"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <FlexBox direction="col" className="pl-8">
        <span className="text-base font-semibold">{lobby.name}</span>
        <span className="text-xs">{lobby.owner.name}</span>
      </FlexBox>

      {hover ? (
        <button onClick={() => subscribeLobby(lobby)}>Join lobby</button>
      ) : (
        <FlexBox>
          <span className="mr-2">
            {lobby.players.length}/{lobby.maxPlayer}
          </span>
          {isFull ? (
            <div className="h-5 w-5 rounded-md bg-green-500 mr-2" />
          ) : (
            <div className="h-5 w-5 rounded-md bg-red-500 mr-2" />
          )}
        </FlexBox>
      )}
    </FlexBox>
  );
}
