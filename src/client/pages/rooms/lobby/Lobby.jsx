import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { LOBBY } from "../../../../config/actions/lobby";
import { LOBBIES } from "../../../../config/actions/lobbies";
import { setLobby } from "actions/store";
import "pages/rooms/Rooms.scss";

export default function ({ close, state, dispatch }) {
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
        close();
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
        close();
      }
    }
  }, [state.lobbiesResponse]);

  return (
    <FlexBox
      wrap="no-wrap"
      direction="col"
      height="3/5"
      width="full"
      className="justify-between"
    >
      <FlexBox
        direction="row"
        className="justify-between pt-6 pb-6 pl-6 pr-6 border-b border-black items-center"
      >
        <h1 className="text-2xl font-bold text-red-600 ">
          {state.lobby?.name}
        </h1>
        <span className="text-2xl font-bold text-red-600">
          {state.lobby?.players?.length}/{state.lobby?.maxPlayer}
        </span>
      </FlexBox>

      <FlexBox
        direction="row"
        width="full"
        className="overflow-y-scroll my-6 pl-10 pr-6"
      >
        {Object.entries(state.lobby?.players || {}).map(([key, el], index) => (
          <FlexBox
            width="full"
            wrap="no-wrap"
            className="items-center pb-4 word-breaker"
            key={`player-${key}`}
          >
            {el?.player.id !== state?.lobby?.owner?.id &&
              (el?.ready ? (
                <div className="h-4 w-4 rounded-full bg-green-500 mr-4" />
              ) : (
                <div className="h-4 w-4 rounded-full bg-red-500 mr-4" />
              ))}

            {el?.player.id === state?.lobby?.owner?.id ? (
              <div className="h-4 w-4 mr-4">
                <img src="/src/client/assets/img/crown.png" />
              </div>
            ) : (
              <div></div>
            )}
            {el?.player.id === state?.player?.id ? (
              <span className="text-green-500">{`${el?.player.name}`}</span>
            ) : (
              <span>{`${el?.player.name}`}</span>
            )}
          </FlexBox>
        ))}
      </FlexBox>

      <span className="text-red-600">{errorUnsub}</span>
      <span className="text-red-600">{errorDel}</span>
      <Buttons state={state} owner={state.lobby.owner.id === state.player.id} />
    </FlexBox>
  );
}

const Buttons = ({ state, owner }) => {
  const unsubscribeLobby = (lobbyId, playerId) => {
    state.socket.emit(LOBBY.UNSUBSCRIBE, { lobbyId, playerId });
  };

  const deleteLobby = (lobbyId, playerId) => {
    // check for ownerId?
    state.socket.emit(LOBBIES.DELETE, { lobbyId, ownerId: playerId });
  };

  return (
    <FlexBox direction="col" className="p-6">
      <FlexBox direction="row" className="justify-between">
        <button
          className="w-48% flex-shrink-0 bg-red-400 hover:bg-red-600 text-sm text-white py-1 px-2 rounded"
          type="button"
          // onClick={() => gameLaunch(state.lobby.id, state.player.id)}
        >
          {owner ? "Launch game" : "Ready"}
        </button>
        <button
          className="w-48% flex-shrink-0 bg-red-400 hover:bg-red-600 text-sm text-white py-1 px-2 rounded"
          type="button"
          onClick={() => unsubscribeLobby(state.lobby.id, state.player.id)}
        >
          Leave Lobby
        </button>
      </FlexBox>
      {owner && (
        <button
          className="flex-shrink-0 bg-red-400 hover:bg-red-600 text-sm text-white py-2 px-2 mt-2 rounded"
          type="button"
          onClick={() => deleteLobby(state.lobby.id, state.player.id)}
        >
          Delete lobby
        </button>
      )}
    </FlexBox>
  );
};
