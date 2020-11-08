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

  return opponents.map((opponent) => (
    <FlexBox
      direction="col"
      className="items-center space-y-2"
      key={`opponent-${opponent.player.id}`}
    >
      <p className="font-semibold text-lg">{opponent.player.name}</p>

      <FlexBox
        direction="col"
        width={24}
        className="justify-center align-center"
      >
        <TetrisGrid
          grid={opponent.board}
          currentPieceColor={"blocked"}
          rowHeight={2}
          colHeight={2}
        />
      </FlexBox>

      <p>{opponent.score}</p>
    </FlexBox>
  ));
}
