import React from "react";
import { storeReducer, initialStore } from "reducers";
import PropTypes from "prop-types";
// import { setupSocket } from "store/middleware/sockets";

export const StoreContext = React.createContext();

export function StoreContextProvider({ children }) {
  const [storeState, storeDispatch] = React.useReducer(
    storeReducer,
    initialStore,
  );

  // const [dispatch] = React.useState(() => asyncMiddleware(storeDispatch));

  /* Check if we need to do it when storeState and Dispatch are 'up' */
  // React.useEffect(() => {
  //   setupSocket(storeState.socket, storeDispatch);
  // }, []);

  return (
    <StoreContext.Provider
      value={{
        state: storeState,
        dispatch: storeDispatch,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

StoreContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
};
