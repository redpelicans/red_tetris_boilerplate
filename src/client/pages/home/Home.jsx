import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import CreatePlayer from "components/player/CreatePlayer";
import { StoreContext } from "store";
import { setupSocket } from "helpers/sockets";

export default function Home() {
  const { state, dispatch } = React.useContext(StoreContext);

  return (
    <FlexBox height="full" className="items-center justify-center">
      <CreatePlayer />
    </FlexBox>
  );
}
