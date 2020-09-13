import React from "react";

function useAutoMove(func) {
  const timer = React.useRef(null);

  const stop = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
      // console.log("STOPPED", timer.current);
    }
  };

  const start = (ms) => {
    if (!timer.current) {
      stop();
      timer.current = setInterval(func, ms);
      // console.log("STARTED", timer.current);
    }
  };

  const reset = (ms) => {
    stop();
    start(ms);
  };

  return { stop, start, reset };
}

export default useAutoMove;
