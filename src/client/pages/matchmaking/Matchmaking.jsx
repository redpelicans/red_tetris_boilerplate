import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { StoreContext } from "store";
import MatchmakingPlacement from "components/matchmaking/MatchmakingPlacement";
import useNavigate from "hooks/useNavigate";
import { LOBBIES } from "../../../config/actions/lobbies";

export default function Matchmaking() {
  const { state, dispatch } = React.useContext(StoreContext);
  const { navigate } = useNavigate();

  React.useEffect(() => {
    if (!Object.keys(state.player).length) {
      navigate("/");
    }
    state.socket.emit(LOBBIES.SUBSCRIBE);
  }, []);

  return (
    <FlexBox height="full" width="full">
      <MatchmakingPlacement state={state} dispatch={dispatch} />
    </FlexBox>
  );
}
