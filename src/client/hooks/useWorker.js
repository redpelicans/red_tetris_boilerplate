import React from "react";

function useWorker(CustomWorker, messageHandler, errorHandler) {
  const worker = React.useRef(null);

  React.useEffect(() => {
    worker.current = new CustomWorker();

    return () => {
      worker.current.terminate();
      worker.current = null;
    };
  }, []);

  React.useEffect(() => {
    worker.current.onmessage = messageHandler;
  }, [messageHandler]);

  React.useEffect(() => {
    worker.current.onerror = errorHandler;
  }, [errorHandler]);

  return worker.current;
}

export default useWorker;
