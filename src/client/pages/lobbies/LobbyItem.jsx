import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { setLobby } from "actions/store";
import { LOBBY } from "../../../config/actions/lobby";
import useNavigate from "hooks/useNavigate";

export default function LobbyItem({ lobby, state, dispatch }) {
  const [error, setError] = React.useState("");
  const [hover, setHover] = React.useState(false);
  const { navigate } = useNavigate();

  React.useEffect(() => {
    if (state.lobbyResponse.action === LOBBY.SUBSCRIBE) {
      if (state.lobbyResponse.type === "error") {
        console.log(
          "There was an error with lobby:subscribe :",
          state.lobbyResponse.reason,
        );
        setError(state?.lobbyResponse?.reason);
      } else if (state.lobbyResponse.type === "success") {
        console.log("Lobby joined :", state.lobbyResponse.payload);
        dispatch(setLobby(state.lobbyResponse.payload));
        navigate("/rooms/id");
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

  const isFull = lobby.players.length >= lobby.maxPlayer;

  return (
    <FlexBox
      direction="row"
      className="lobby-item"
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
            <div className="status-dot bg-red-500" />
          ) : (
            <div className="status-dot bg-green-500" />
          )}
        </FlexBox>
      )}
    </FlexBox>
  );
}
