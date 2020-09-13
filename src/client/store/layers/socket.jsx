import React from "react";
import { socketReducer, initialSocket } from "reducers";
import PropTypes from "prop-types";

export const SocketContext = React.createContext();

export function SocketContextProvider({ children }) {
  const [socketState, socketDispatch] = React.useReducer(
    socketReducer,
    initialSocket,
  );
  return (
    <SocketContext.Provider
      value={{
        state: socketState,
        dispatch: socketDispatch,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

SocketContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
