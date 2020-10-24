import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { StoreContext } from "store";
import useNavigate from "hooks/useNavigate";
import { setPlayer, setPlayerResponse } from "actions/store";
import { PLAYER } from "../../../config/actions/player";

export default function () {
  const { state, dispatch } = React.useContext(StoreContext);
  const [playerName, setPlayerName] = React.useState("");
  const [error, setError] = React.useState("");

  const { navigate } = useNavigate();
  const handlePlayerName = (e) => {
    setPlayerName(e.target.value);
  };

  React.useEffect(() => {
    if (state.playerResponse.action === PLAYER.CREATE) {
      console.log("I got an error");
      if (state.playerResponse.type === "error") {
        console.log("There was an error with player:response");
        setError(state?.playerResponse?.reason);
      } else if (state.playerResponse.type === "success") {
        console.log("New player created :", state.playerResponse.payload);
        dispatch(setPlayer(state.playerResponse.payload));
        dispatch(setPlayerResponse({}));
        navigate("/lobbies");
      }
    }
  }, [state.playerResponse]);

  const createPlayer = (event) => {
    event.preventDefault();
    state.socket.emit(PLAYER.CREATE, { name: playerName });
  };

  return (
    <FlexBox direction="col" className="">
      <form
        className="flex items-center border-red-400 py-2"
        onSubmit={createPlayer}
      >
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mr-3 py-1 px-2 block w-full appearance-none leading-normal"
          type="text"
          placeholder="Player name"
          value={playerName}
          onChange={handlePlayerName}
        />
        <button
          className="flex-shrink-0 bg-red-400 hover:bg-red-600 text-sm text-white py-1 px-2 rounded"
          type="submit"
        >
          Create player
        </button>
      </form>
      <span className="text-red-600">{error}</span>
    </FlexBox>
  );
}
