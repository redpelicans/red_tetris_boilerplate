import React from "react";

function useThrottle(func, wait) {
  const waiting = React.useRef(false);

  return React.useCallback(
    function wrapper() {
      const ctx = this;

      if (!waiting.current) {
        Reflect.apply(func, ctx, arguments);
        waiting.current = true;
        setTimeout(() => (waiting.current = false), wait);
      }
    },
    [func, wait],
  );
}

export default useThrottle;
