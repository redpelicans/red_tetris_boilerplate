import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { StoreContext } from "store";

export default function () {
  const { state, dispatch } = React.useContext(StoreContext);
  const [lobby, setLobby] = React.useState({
    maxPlayer: 4,
    owner: state.playerResponse.payload,
  });

  const handleLobby = (e) => {
    const value = e.target.value;
    const property = e.target.name;
    // propre ca
    setLobby((lobby) => ({
      ...lobby,
      [property]: value,
    }));
  };

  React.useEffect(() => {
    if (state.lobbyResponse.type === "error")
      console.log("There was an error with lobbies:response");
    else if (state.lobbyResponse.type === "success") {
      console.log("New player created :", state.lobbyResponse.payload);
    }
  }, [state.lobbyResponse]);

  const createLobby = (lobby) => {
    state.socket.emit("lobbies:add", lobby);
  };

  return (
    <FlexBox direction="row" className="">
      <FlexBox direction="col" className="items-center border-teal-500 py-2">
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mb-2 mr-3 py-1 px-2 block w-full appearance-none leading-normal"
          type="text"
          name="hash"
          placeholder="Lobby hash"
          value={lobby?.hash || ""}
          onChange={handleLobby}
        />
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mb-2 mr-3 py-1 px-2 block w-full appearance-none leading-normal"
          type="text"
          name="name"
          placeholder="Lobby name"
          value={lobby?.name || ""}
          onChange={handleLobby}
        />
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mb-2 mr-3 py-1 px-2 block w-full appearance-none leading-normal"
          type="number"
          name="maxPlayer"
          placeholder="Max Players"
          value={lobby?.maxPlayer || 4}
          onChange={handleLobby}
          min="2"
          max="12"
        />
        <button
          disabled={
            !lobby?.hash?.length || !lobby?.name?.length || !lobby?.maxPlayer
          }
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
          onClick={() => {
            createLobby(lobby);
            setLobby({ maxPlayer: 4 });
          }}
        >
          Create lobby
        </button>
      </FlexBox>
    </FlexBox>
  );
}
