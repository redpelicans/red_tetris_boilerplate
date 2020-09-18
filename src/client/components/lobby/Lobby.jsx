import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { List } from "components/list/List";
import { LOBBY } from "../../../config/actions/lobby";
import { LOBBIES } from "../../../config/actions/lobbies";
import { setLobby } from "actions/store";

export default function ({ state, dispatch }) {
  const [errorUnsub, setErrorUnsub] = React.useState("");
  const [errorDel, setErrorDel] = React.useState("");

  React.useEffect(() => {
    if (state.lobbyResponse.action === LOBBY.UNSUBSCRIBE) {
      if (state.lobbyResponse.type === "error") {
        console.log("There was an error with lobby:unsubscribe");
        setErrorUnsub(state?.lobbyResponse?.reason);
      } else if (state.lobbyResponse.type === "success") {
        console.log("Unsubscribed from lobby");
        dispatch(setLobby({}));
      }
    }
  }, [state.lobbyResponse]);

  React.useEffect(() => {
    if (state.lobbiesResponse.action === LOBBIES.DELETE) {
      if (state.lobbiesResponse.type === "error") {
        console.log("There was an error with lobbies:delete");
        setErrorDel(state?.lobbiesResponse?.reason);
      } else if (state.lobbiesResponse.type === "success") {
        // check if needed or already done by publish
        console.log("Deleted lobby");
        dispatch(setLobby({}));
      }
    }
  }, [state.lobbiesResponse]);

  const unsubscribeLobby = (lobbyId, playerId) => {
    state.socket.emit(LOBBY.UNSUBSCRIBE, { lobbyId, playerId });
  };

  const deleteLobby = (lobbyId, playerId) => {
    // check for ownerId?
    state.socket.emit(LOBBIES.DELETE, { lobbyId, ownerId: playerId });
  };

  return (
    <FlexBox direction="col">
      <span>Name : {state?.lobby?.name}</span>
      <span>Id : {state?.lobby?.id}</span>
      <span>Hash : {state?.lobby?.hash}</span>
      <span>maxPlayers : {state?.lobby?.maxPlayer}</span>
      <span>Players in lobby :</span>
      <List object={state?.lobby.players} name="player" />
      <span>Owner : {state?.lobby?.owner?.name}</span>
      <FlexBox direction="row">
        <button
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 m-2 rounded"
          type="button"
          onClick={() => unsubscribeLobby(state.lobby.id, state.player.id)}
        >
          Leave Lobby
        </button>
        <button
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 m-2 rounded"
          type="button"
          onClick={() => deleteLobby(state.lobby.id, state.player.id)}
        >
          Delete lobby
        </button>
      </FlexBox>
      <span className="text-red-600">{errorUnsub}</span>
      <span className="text-red-600">{errorDel}</span>
    </FlexBox>
  );
}
