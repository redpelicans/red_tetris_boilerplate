import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import Lobby from "./Lobby";
import { LOBBY } from "../../../config/actions/lobby";
import Chat from "./Chat";
import { StoreContext } from "store";
import "./Lobby.scss";

export default function LobbyContainer() {
  const { state, dispatch } = React.useContext(StoreContext);
  const [translate, setTranslate] = React.useState(false);

  React.useEffect(() => {
    if (state.lobbyResponse.action === LOBBY.SUBSCRIBE) {
      if (state.lobbyResponse.type === "success") {
        open();
      }
    }
  }, [state.lobbyResponse]);

  const close = () => {
    setTranslate(false);
  };

  const open = () => {
    setTranslate(true);
  };

  const isEmpty = (obj) => Object.keys(obj).length === 0;

  return (
    <FlexBox
      direction="row"
      width="3.3/10"
      className={`modal-lobby translate-x-${translate ? "0" : "9/10"}`}
    >
      <FlexBox direction="col" width="full" height="full" className="relative">
        <FlexBox
          width="10"
          height="10"
          className="toggle"
          onClick={() => setTranslate((e) => !e)}
        >
          {translate ? ">" : "<"}
        </FlexBox>
        {isEmpty(state.lobby) ? (
          <FlexBox
            height="full"
            width="full"
            className="justify-center items-center"
          >
            <span>You don't have any lobby yet!</span>
          </FlexBox>
        ) : (
          <FlexBox height="full" width="full">
            <Lobby
              state={state}
              open={open}
              close={close}
              dispatch={dispatch}
            />
            <Chat state={state} dispatch={dispatch} />
          </FlexBox>
        )}
      </FlexBox>
    </FlexBox>
  );
}
