import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { ListLobby } from "pages/lobbies/save/ListLobby";
import { LOBBY } from "../../../../config/actions/lobby";
import { LOBBIES } from "../../../../config/actions/lobbies";
import { setLobby } from "actions/store";
import { StoreContext } from "store";
import Chat from "./Chat";
import Player from "./Player";

export default function ({ close }) {
  const { state, dispatch } = React.useContext(StoreContext);
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

  const isEmpty = (obj) => Object.keys(obj).length === 0;

  return isEmpty(state.lobby) ? (
    <span>You don't have any lobby yet :(</span>
  ) : (
    <FlexBox height="full" width="full" className="justify-center items-center">
      <Player />
      <FlexBox
        direction="col"
        className="h-2/5 p-10 bg-white bg-opacity-75 m-10 justify-between rounded-lg"
      >
        <h1>Lobby</h1>
        <span>Name : {state.lobby?.name}</span>
        {/* <span>Id : {state.lobby?.id}</span> */}
        {/* <span>Hash : {state.lobby?.hash}</span> */}
        <span>
          maxPlayers : {state.lobby?.players?.length}/{state.lobby?.maxPlayer}
        </span>
        {/* <span>Players in lobby :</span> */}
        <FlexBox direction="row" className="max-h-1/4 overflow-y-scroll">
          {Object.entries(state.lobby?.players || {}).map(
            ([key, el], index) => (
              <FlexBox className="w-full" key={`player-${key}`}>
                <span className="mr-2">{`${index + 1} : ${el?.player.name} : ${
                  el?.ready
                } `}</span>
                {el.ready ? (
                  <div className="h-4 w-4 rounded-md bg-green-500 mr-2" />
                ) : (
                  <div className="h-4 w-4 rounded-md bg-red-500 mr-2" />
                )}
              </FlexBox>
            ),
          )}
        </FlexBox>
        <span>Owner : {state.lobby?.owner?.name}</span>

        <span className="text-red-600">{errorUnsub}</span>
        <span className="text-red-600">{errorDel}</span>
        <Buttons
          state={state}
          owner={state.lobby.owner.id === state.player.id}
        />
      </FlexBox>
      <Chat />
    </FlexBox>
  );
}

const Buttons = ({ state, owner }) => {
  // const gameLaunch = ({lobbyId, playerId}) => {
  //   owner ? launchGame() : ready();
  // }
  const unsubscribeLobby = (lobbyId, playerId) => {
    state.socket.emit(LOBBY.UNSUBSCRIBE, { lobbyId, playerId });
  };

  const deleteLobby = (lobbyId, playerId) => {
    // check for ownerId?
    state.socket.emit(LOBBIES.DELETE, { lobbyId, ownerId: playerId });
  };

  return (
    <>
      <FlexBox direction={owner ? "row" : "col"} className="justify-between">
        <button
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 m-2 rounded"
          type="button"
          onClick={() => unsubscribeLobby(state.lobby.id, state.player.id)}
        >
          Leave Lobby
        </button>
        {owner && (
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 m-2 rounded"
            type="button"
            onClick={() => deleteLobby(state.lobby.id, state.player.id)}
          >
            Delete lobby
          </button>
        )}
      </FlexBox>
      <button
        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 m-2 rounded"
        type="button"
        // onClick={() => gameLaunch(state.lobby.id, state.player.id)}
      >
        {owner ? "Launch game" : "Ready"}
      </button>
    </>
  );
};
