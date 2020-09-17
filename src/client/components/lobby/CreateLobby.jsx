import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { setLobby, setLobbiesResponse } from "actions/store";
import { LOBBY } from "../../../config/actions/lobby";
import { LOBBIES } from "../../../config/actions/lobbies";

export default function ({ state, dispatch }) {
  const [myLobby, setMyLobby] = React.useState({
    maxPlayer: 4,
    owner: state.player,
  });
  const [error, setError] = React.useState("");

  const handleLobby = (e) => {
    const value = e.target.value;
    const property = e.target.name;
    setMyLobby((myLobby) => ({
      ...myLobby,
      [property]: value,
    }));
  };

  React.useEffect(() => {
    if (state.lobbiesResponse.type === "error") {
      console.log("There was an error with lobbies:response");
      setError(state?.lobbiesResponse?.reason);
    } else if (state.lobbiesResponse.type === "success") {
      console.log("New lobby created :", state.lobbiesResponse.payload);
      dispatch(setLobby(state.lobbiesResponse.payload));
      dispatch(setLobbiesResponse({}));
      // to put outside to get the new Lobby Object
      state.socket.emit(LOBBY.SUBSCRIBE, {
        playerId: state.player.id,
        lobbyId: state.lobbiesResponse.payload.id,
      });
    }
  }, [state.lobbiesResponse]);

  const createLobby = (myLobby) => {
    console.log(myLobby);
    state.socket.emit(LOBBIES.ADD, myLobby);
  };

  return (
    <FlexBox direction="row" className="">
      <FlexBox direction="col" className="items-center border-teal-500 py-2">
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mb-2 mr-3 py-1 px-2 block w-full appearance-none leading-normal"
          type="text"
          name="hash"
          placeholder="Lobby hash"
          value={myLobby?.hash || ""}
          onChange={handleLobby}
        />
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mb-2 mr-3 py-1 px-2 block w-full appearance-none leading-normal"
          type="text"
          name="name"
          placeholder="Lobby name"
          value={myLobby?.name || ""}
          onChange={handleLobby}
        />
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mb-2 mr-3 py-1 px-2 block w-full appearance-none leading-normal"
          type="number"
          name="maxPlayer"
          placeholder="Max Players"
          value={myLobby?.maxPlayer || 4}
          onChange={handleLobby}
          min="2"
          max="12"
        />
        <button
          disabled={
            !myLobby?.hash?.length ||
            !myLobby?.name?.length ||
            !myLobby?.maxPlayer
          }
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
          onClick={() => {
            createLobby(myLobby);
            setMyLobby({ maxPlayer: 4 });
          }}
        >
          Create lobby
        </button>
        <span className="text-red-600">{error}</span>
      </FlexBox>
    </FlexBox>
  );
}
