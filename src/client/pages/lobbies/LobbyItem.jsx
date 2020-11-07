import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { LOBBY } from "../../../config/actions/lobby";
import { socket } from "store/middleware/sockets";

export default function LobbyItem({ lobby, state }) {
  const [hover, setHover] = React.useState(false);

  const subscribeLobby = (lobbyId) => {
    socket.emit(LOBBY.SUBSCRIBE, {
      lobbyId,
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
        <button onClick={() => subscribeLobby(lobby.id)}>Join lobby</button>
      ) : (
        <FlexBox>
          {lobby.isPlaying && <span className="mr-6">PLAYING</span>}
          <span className="mr-2">
            {lobby.players.length}/{lobby.maxPlayer}
          </span>
          {isFull || lobby.isPlaying ? (
            <div className="status-dot bg-red-500" />
          ) : (
            <div className="status-dot bg-green-500" />
          )}
        </FlexBox>
      )}
    </FlexBox>
  );
}
