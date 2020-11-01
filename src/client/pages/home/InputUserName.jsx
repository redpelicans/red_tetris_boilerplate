import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { StoreContext } from "store";
import useNavigate from "hooks/useNavigate";
import { setPlayer } from "actions/store";
import { PLAYER } from "../../../config/actions/player";
import ButtonSpecial from "components/button/ButtonSpecial";
import { useSocket } from "hooks";

export default function InputUserName() {
  const { dispatch } = React.useContext(StoreContext);
  const [playerName, setPlayerName] = React.useState("");
  const [error, setError] = React.useState("");
  const [playerState, playerEmitter] = useSocket(PLAYER.RESPONSE);

  const { navigate } = useNavigate();
  const handlePlayerName = (e) => {
    setPlayerName(e.target.value);
  };

  React.useEffect(() => {
    if (playerState.payload) {
      dispatch(setPlayer(playerState.payload));
      navigate("/rooms");
    } else {
      setError(playerState.error);
    }
  }, [playerState]);

  const createPlayer = (event) => {
    event.preventDefault();
    playerEmitter(PLAYER.CREATE, { name: playerName });
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
        <ButtonSpecial className="button-3" type="submit">
          Create player
        </ButtonSpecial>
      </form>
      <span className="text-red-600">{error}</span>
    </FlexBox>
  );
}
