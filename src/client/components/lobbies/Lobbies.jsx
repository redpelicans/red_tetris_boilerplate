import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { StoreContext } from "store";
import { setLobby, setLobbiesResponse } from "actions/store";
import { List } from "components/list/List";

export default function () {
  const { state, dispatch } = React.useContext(StoreContext);

  return (
    <FlexBox direction="col" className="overflow-y-scroll max-h-64">
      <List object={state.lobbies} name="lobby" />
    </FlexBox>
  );
}
