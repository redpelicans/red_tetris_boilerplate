import React from "react";

function useAutoMove(func) {
  const timer = React.useRef(null);
  const state = React.useRef(0);

  React.useEffect(() => stop(), []);

  const stop = React.useCallback(() => {
    state.current = 0;
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, [func]);

  const start = React.useCallback(
    (ms) => {
      state.current = 1;
      if (!timer.current) {
        timer.current = setInterval(func, ms);
      }
    },
    [func],
  );

  return { stop, start };
}

export default useAutoMove;
