import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import TetrisGrid from "components/tetris/Grid";
import { StoreContext } from "store";

export default function ScatteringGrid() {
  const { state } = React.useContext(StoreContext);
  const opponents = Object.values(state.game.players || {}).filter(
    (player) => player.player.id !== state.player.id,
  );

  return opponents.map((opponent) => (
    <FlexBox
      direction="col"
      className="items-center"
      key={`opponent-${opponent.player.id}`}
    >
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
    </FlexBox>
  ));
}
