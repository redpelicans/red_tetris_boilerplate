import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { setLobby, setLobbiesResponse } from "actions/store";
import { LOBBY } from "../../../config/actions/lobby";
import { LOBBIES } from "../../../config/actions/lobbies";
import useNavigate from "hooks/useNavigate";
import { socket } from "store/sockets/sockets";

export default function CreateLobby({ close, state, dispatch }) {
  const [myLobby, setMyLobby] = React.useState({
    hash: "test",
    maxPlayer: 4,
    owner: state.player,
  });
  const [error, setError] = React.useState("");
  const { navigate } = useNavigate();

  const handleLobby = (e) => {
    const value = e.target.value;
    const property = e.target.name;
    setMyLobby((myLobby) => ({
      ...myLobby,
      [property]: value,
    }));
  };
  const minPlayers = 2;
  const playersInputRange = 11;
  const playersSelection = new Array(playersInputRange).fill(0);

  React.useEffect(() => {
    if (state.lobbiesResponse.action === LOBBIES.ADD) {
      if (state.lobbiesResponse.type === "error") {
        console.log("There was an error with lobbies:response");
        setError(state?.lobbiesResponse?.reason);
      } else if (state.lobbiesResponse.type === "success") {
        console.log("New lobby created :", state.lobbiesResponse.payload);
        dispatch(setLobby(state.lobbiesResponse.payload));
        dispatch(setLobbiesResponse({}));
        // to put outside to get the new Lobby Object
        socket.emit(LOBBY.SUBSCRIBE, {
          playerId: state.player.id,
          lobbyId: state.lobbiesResponse.payload.id,
        });
        close();
        navigate("/rooms/id");
      }
    }
  }, [state.lobbiesResponse]);

  const createLobby = (myLobby) => {
    setError("");
    socket.emit(LOBBIES.ADD, myLobby);
    setMyLobby({
      maxPlayer: 4,
      owner: state.player,
    });
  };

  return (
    <div>
      <h1>Create Lobby</h1>
      <FlexBox direction="row" className="">
        <FlexBox direction="col" className="items-center border-red-400 py-2">
          <input
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mb-2 mr-3 py-1 px-2 block w-full appearance-none leading-normal"
            type="text"
            name="name"
            placeholder="Lobby name"
            value={myLobby?.name || ""}
            onChange={handleLobby}
          />
          <span className="mt-1">Max players :</span>
          <select
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mb-2 mr-3 py-1 px-2 block w-full appearance-none leading-normal"
            onChange={handleLobby}
            name="maxPlayer"
          >
            <option value={4}>Select max players</option>
            {playersSelection.map((_value, input) => {
              const inputValue = input + minPlayers;
              return (
                <option
                  value={inputValue}
                  key={input + "select players number"}
                >
                  {inputValue}
                </option>
              );
            })}
          </select>
          <button
            disabled={
              !myLobby?.hash?.length ||
              !myLobby?.name?.length ||
              !myLobby?.maxPlayer
            }
            className="flex-shrink-0 bg-red-400 hover:bg-red-600 text-sm text-white py-1 px-2 rounded mt-10"
            type="button"
            onClick={() => createLobby(myLobby)}
          >
            Create lobby
          </button>
          <span className="text-red-600">{error}</span>
        </FlexBox>
      </FlexBox>
    </div>
  );
}
