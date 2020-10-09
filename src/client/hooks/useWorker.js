import React from "react";

function useWorker(CustomWorker, messageHandler, errorHandler) {
  const worker = React.useRef(null);

  React.useEffect(() => {
    worker.current = new CustomWorker();
    worker.current.onmessage = messageHandler;
    worker.current.onerror = errorHandler;

    return () => {
      worker.current.terminate();
      worker.current = null;
    };
  }, []);

  return worker.current;
}

export default useWorker;
