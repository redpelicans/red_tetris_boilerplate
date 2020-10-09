import React from "react";
import { GameContext } from "store";
import * as Grid from "./grid";
import { updateGrid } from "actions/game";

function useNewGrid(cols, rows) {
  const { dispatch } = React.useContext(GameContext);

  React.useEffect(() => {
    const initGrid = Grid.create(cols, rows);
    dispatch(updateGrid(initGrid));
  }, []);
}

export default useNewGrid;
