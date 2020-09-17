import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import { List } from "components/list/List";

export default function ({ state }) {
  return (
    <FlexBox direction="col">
      <span>Name : {state?.lobby?.name}</span>
      <span>Id : {state?.lobby?.id}</span>
      <span>Hash : {state?.lobby?.hash}</span>
      <span>maxPlayers : {state?.lobby?.maxPlayer}</span>
      <span>Players in lobby :</span>
      <List object={state?.lobby.players} name="player" />
      <span>Owner : {state?.lobby?.owner?.name}</span>
      <FlexBox direction="row">
        <button
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 m-2 rounded"
          type="button"
        >
          Leave Lobby
        </button>
        <button
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 m-2 rounded"
          type="button"
        >
          Delete lobby
        </button>
      </FlexBox>
    </FlexBox>
  );
}
