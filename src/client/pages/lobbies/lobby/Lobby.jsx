import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { LOBBY } from "../../../../config/actions/lobby";
import { LOBBIES } from "../../../../config/actions/lobbies";
import { setLobby } from "actions/store";
import { StoreContext } from "store";
import Chat from "./Chat";

export default function ({ close }) {
  const { state, dispatch } = React.useContext(StoreContext);
  const [errorUnsub, setErrorUnsub] = React.useState("");
  const [errorDel, setErrorDel] = React.useState("");

  // const [success, error] = useSubscribe("lobby:response", LOBBY.UNSUBSCRIBE);
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
    <FlexBox height="full" width="full" className="justify-center items-center">
      <span>You don't have any lobby yet!</span>
    </FlexBox>
  ) : (
    <FlexBox height="full" width="full" className="">
      <LobbyComponent
        state={state}
        errorUnsub={errorUnsub}
        errorDel={errorDel}
      />
      <Chat />
    </FlexBox>
  );
}

const LobbyComponent = ({ state, errorUnsub, errorDel }) => {
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
        // wrap=""
        // height="1/4"
        // className="max-h-1/4 overflow-y-scroll my-6 pl-10 pr-6"
        className="overflow-y-scroll my-6 pl-10 pr-6"
      >
        {Object.entries(state.lobby?.players || {}).map(([key, el], index) => (
          <FlexBox
            width="full"
            className="items-center pb-4"
            key={`player-${key}`}
          >
            {el?.ready ? (
              <div className="h-4 w-4 rounded-md bg-green-500 mr-6" />
            ) : (
              <div className="h-4 w-4 rounded-md bg-red-500 mr-6" />
            )}
            <span>{`${el?.player.name}`}</span>
          </FlexBox>
        ))}
      </FlexBox>
      {/* <span>Owner : {state.lobby?.owner?.name}</span> */}

      <span className="text-red-600">{errorUnsub}</span>
      <span className="text-red-600">{errorDel}</span>
      <Buttons state={state} owner={state.lobby.owner.id === state.player.id} />
    </FlexBox>
  );
};

const Buttons = ({ state, owner }) => {
  const unsubscribeLobby = (lobbyId, playerId) => {
    state.socket.emit(LOBBY.UNSUBSCRIBE, { lobbyId, playerId });
  };

  const deleteLobby = (lobbyId, playerId) => {
    // check for ownerId?
    state.socket.emit(LOBBIES.DELETE, { lobbyId, ownerId: playerId });
  };

  return (
    <FlexBox direction="col">
      <FlexBox direction="row" className="justify-around">
        <button
          className="w-2/5 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
          // onClick={() => gameLaunch(state.lobby.id, state.player.id)}
        >
          {owner ? "Launch game" : "Ready"}
        </button>
        <button
          className="w-2/5 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
          onClick={() => unsubscribeLobby(state.lobby.id, state.player.id)}
        >
          Leave Lobby
        </button>
      </FlexBox>
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
  );
};
