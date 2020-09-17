import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { StoreContext } from "store";
import { List } from "components/list/List";

export default function ({ state }) {
  return (
    <FlexBox direction="col" className="overflow-y-scroll max-h-64">
      <List object={state.players} name="player" />
    </FlexBox>
  );
}
