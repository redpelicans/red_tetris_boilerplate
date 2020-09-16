import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { StoreContext } from "store";
import { useNavigation } from "helpers/navigate";

export default function () {
  const { state, dispatch } = React.useContext(StoreContext);
  const [playerName, setPlayerName] = React.useState("");
  const { navigate } = useNavigation();
  const handlePlayerName = (e) => {
    setPlayerName(e.target.value);
  };

  React.useEffect(() => {
    if (state.playerResponse.type === "error")
      console.log("There was an error with player:response");
    else if (state.playerResponse.type === "success") {
      console.log("New player created :", state.playerResponse.payload);
      // reset player:response
      navigate("lobbies");
    }
  }, [state.playerResponse]);

  const createPlayer = (playerName) => {
    state.socket.emit("player:create", { name: playerName });
  };

  return (
    <FlexBox direction="col" className="">
      <div className="flex items-center border-teal-500 py-2">
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mr-3 py-1 px-2 block w-full appearance-none leading-normal"
          type="text"
          placeholder="Player name"
          value={playerName}
          onChange={handlePlayerName}
        />
        <button
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
          onClick={() => createPlayer(playerName)}
        >
          Create player
        </button>
      </div>
    </FlexBox>
  );
}
