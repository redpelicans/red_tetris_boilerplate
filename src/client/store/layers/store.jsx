import React from "react";
import { storeReducer, initialStore } from "reducers";
import { asyncMiddleware } from "../middlewares";
import PropTypes from "prop-types";
import { setupSocket } from "helpers/sockets";

export const StoreContext = React.createContext();

export function StoreContextProvider({ children }) {
  const [storeState, storeDispatch] = React.useReducer(
    storeReducer,
    initialStore,
  );

  const [dispatch] = React.useState(() => asyncMiddleware(storeDispatch));

  /* Check if we need to do it when storeState and Dispatch are 'up' */
  React.useEffect(() => {
    setupSocket(storeState.socket, dispatch);
  }, []);

  return (
    <StoreContext.Provider
      value={{
        state: storeState,
        dispatch: dispatch,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

StoreContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
