import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { SocketContext } from "store";

export default function () {
  const { state, dispatch } = React.useContext(SocketContext);
  const [playerName, setPlayerName] = React.useState("");
  const handlePlayerName = (e) => {
    setPlayerName(e.target.value);
  };

  return (
    <FlexBox direction="col" className="">
      <div class="flex items-center border-teal-500 py-2">
        <input
          class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mr-3 py-1 px-2 block w-full appearance-none leading-normal"
          type="text"
          placeholder="Player name"
          value={playerName}
          onChange={handlePlayerName}
        />
        <button
          class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
        >
          Create player
        </button>
      </div>
    </FlexBox>
  );
}
