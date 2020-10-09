import React from "react";
import { GameContext } from "store";
import { divideBy } from "helpers/currying";
import { INTERVAL_MS } from "constants/tetris";

function useGravity() {
  const { state } = React.useContext(GameContext);

  const gravityInterval = React.useMemo(() => {
    const divideByThree = divideBy(3);
    let interval = INTERVAL_MS;

    for (let i = 0; i < state.level; i++) {
      interval = interval - divideByThree(interval);
    }

    return interval;
  }, [state.level]);

  return gravityInterval;
}

export default useGravity;
