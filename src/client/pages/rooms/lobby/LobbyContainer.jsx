import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import Lobby from "./Lobby";
import { LOBBY } from "../../../../config/actions/lobby";
import Chat from "./Chat";

export default function ({ state, dispatch }) {
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
      className={`absolute top-0 bottom-0 right-0 bg-white shadow-lg transition-all duration-500 ease-in-out transform ${
        translate ? `translate-x-0` : `translate-x-9/10`
      }`}
    >
      <FlexBox direction="col" width="full" height="full" className="relative">
        <FlexBox
          width="10"
          height="10"
          className="absolute justify-center items-center rounded rounded-full bg-red-400 left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          onClick={() => setTranslate((e) => !e)}
        >
          {translate ? `>` : `<`}
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
            <Lobby state={state} close={close} dispatch={dispatch} />
            <Chat state={state} dispatch={dispatch} />
          </FlexBox>
        )}
      </FlexBox>
    </FlexBox>
  );
}
