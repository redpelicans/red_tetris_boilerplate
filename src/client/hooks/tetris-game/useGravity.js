import React from "react";
import { divideBy } from "helpers/currying";
import { INTERVAL_MS } from "constants/tetris";

function useGravity(level) {
  const gravityInterval = React.useRef(INTERVAL_MS);

  React.useEffect(() => {
    const divideByThree = divideBy(3);
    let interval = INTERVAL_MS;

    for (let i = 0; i < level; i++) {
      interval = interval - divideByThree(interval);
    }

    gravityInterval.current = interval;
  }, [level]);

  return gravityInterval.current;
}

export default useGravity;
