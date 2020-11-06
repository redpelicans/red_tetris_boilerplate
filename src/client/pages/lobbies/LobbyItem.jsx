import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { setLobby } from "actions/store";
import { LOBBY } from "../../../config/actions/lobby";
import useNavigate from "hooks/useNavigate";
import { socket } from "store/middleware/sockets";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LobbyItem({ lobby, state, dispatch }) {
  const notify = (error) => toast.error(error);
  const [hover, setHover] = React.useState(false);
  const { navigate } = useNavigate();

  React.useEffect(() => {
    if (state.lobbyResponse.action === LOBBY.SUBSCRIBE) {
      if (state.lobbyResponse.type === "error") {
        notify(state?.lobbyResponse?.reason);
      } else if (state.lobbyResponse.type === "success") {
        dispatch(setLobby(state.lobbyResponse.payload));
        navigate("/rooms/id");
      }
    }
  }, [state.lobbyResponse]);

  const subscribeLobby = (lobby) => {
    socket.emit(LOBBY.SUBSCRIBE, {
      lobbyId: lobby.id,
      playerId: state.player.id,
    });
  };

  const isFull = lobby.players.length >= lobby.maxPlayer;

  return (
    <>
      <ToastContainer />
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
    </>
  );
}
