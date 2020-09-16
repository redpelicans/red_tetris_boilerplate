import React from "react";

function useThrottle(func, wait) {
  const waiting = React.useRef(false);

  React.useEffect(() => clearTimeout(waiting.current), [func, wait]);

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
