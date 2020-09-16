import React from "react";

function useAutoMove(func) {
  const timer = React.useRef(null);

  React.useEffect(() => stop, []);

  const stop = React.useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, [func]);

  const start = React.useCallback(
    (ms) => {
      if (!timer.current) {
        stop();
        timer.current = setInterval(func, ms);
      }
    },
    [func],
  );

  const reset = React.useCallback(
    (ms) => {
      stop();
      start(ms);
    },
    [func],
  );

  return { stop, start, reset };
}

export default useAutoMove;
