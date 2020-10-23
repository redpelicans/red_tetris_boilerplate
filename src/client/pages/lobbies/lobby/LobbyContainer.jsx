import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { StoreContext } from "store";
import Lobby from "./Lobby";
import { LOBBY } from "../../../../config/actions/lobby";

export default function ({ lobby, index }) {
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

  return (
    <FlexBox
      direction="row"
      width="3.3/10"
      className={`absolute top-0 bottom-0 right-0 bg-black bg-opacity-25 transition-all duration-500 ease-in-out transform ${
        translate ? `translate-x-0` : `translate-x-9/10`
      }`}
    >
      <FlexBox
        direction="col"
        width="full"
        height="full"
        className="relative justify-center items-center"
      >
        <FlexBox
          width="10"
          height="10"
          className="absolute justify-center items-center rounded rounded-full bg-blue-500 bg-opacity-100 left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          onClick={() => setTranslate((e) => !e)}
        >
          {translate ? `>` : `<`}
        </FlexBox>
        <Lobby close={close} />
      </FlexBox>
    </FlexBox>
  );
}
