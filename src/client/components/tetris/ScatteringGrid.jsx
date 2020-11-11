import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import TetrisGrid from "components/tetris/Grid";
import { StoreContext, GameContext } from "store";

export default function ScatteringGrid() {
  const { state } = React.useContext(GameContext);
  const { state: stateStore } = React.useContext(StoreContext);
  const opponents = Object.values(state.game.players || {}).filter(
    (player) => player.player.id !== stateStore.player.id,
  );

  return (
    <FlexBox
      direction="col"
      className="items-start justify-around w-5/12 space-y-8"
    >
      <FlexBox
        direction="row"
        height="full"
        className="items-end justify-around flex-1"
      >
        {opponents.slice(0, 2).map((opponent) => (
          <OpponentGrid key={opponent.player.id} opponent={opponent} />
        ))}
      </FlexBox>

      <FlexBox
        direction="row"
        height="full"
        className="items-start justify-around flex-1"
      >
        {opponents.slice(2, 4).map((opponent) => (
          <OpponentGrid key={opponent.player.id} opponent={opponent} />
        ))}
      </FlexBox>
    </FlexBox>
  );
}

const OpponentGrid = ({ opponent }) => (
  <FlexBox direction="col" className="items-center space-y-2 px-4">
    <p
      className={
        "font-semibold text-lg" + (opponent.loser ? " line-through" : "")
      }
    >
      {opponent.player.name}
    </p>

    <FlexBox direction="col" width={24} className="justify-center align-center">
      <TetrisGrid
        grid={opponent.board}
        currentPieceColor={"blocked"}
        rowHeight={2}
        colHeight={2}
      />
    </FlexBox>

    <p>{opponent.score}</p>
  </FlexBox>
);
