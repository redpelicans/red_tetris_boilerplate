import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { StoreContext } from "store";
import useNavigate from "hooks/useNavigate";
import { setPlayer, setPlayerResponse } from "actions/store";
import { PLAYER } from "../../../config/actions/player";
import ButtonSpecial from "components/button/ButtonSpecial";
import { socket, socketPlayerOn } from "store/middleware";
import { toast } from "react-toastify";

export default function InputUserName() {
  const { state, dispatch } = React.useContext(StoreContext);
  const [playerName, setPlayerName] = React.useState("");
  const { navigate } = useNavigate();
  const notify = (error) => toast.error(error);

  React.useEffect(() => {
    socketPlayerOn(dispatch);
  }, []);

  const handlePlayerName = (e) => {
    setPlayerName(e.target.value);
  };

  React.useEffect(() => {
    if (state.playerResponse.action === PLAYER.CREATE) {
      if (state.playerResponse.type === "error") {
        notify(state?.playerResponse?.reason);
      } else if (state.playerResponse.type === "success") {
        dispatch(setPlayer(state.playerResponse.payload));
        dispatch(setPlayerResponse({}));
        navigate("/rooms");
      }
    }
  }, [state.playerResponse]);

  const createPlayer = (event) => {
    event.preventDefault();
    socket.emit(PLAYER.CREATE, { name: playerName });
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
          autoFocus
        />
        <ButtonSpecial className="button-3" type="submit">
          Create player
        </ButtonSpecial>
      </form>
    </FlexBox>
  );
}
