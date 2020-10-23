import React from "react";

export default function useSubscribe(socketDomain, actionToCheck) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    socket.on("lobby:response", (data) => {
      if (data.action === "lobby:add") {
      }
      // if (data.action === 'lobby:delete') {

      // }
    });

    return () => socket.off(action);
  }, []);

  return [state.success.reason, state.error.reason];
}

const initialState = {
  success: {
    action: null,
    reason: null,
    payload: null,
  },
  error: {
    action: null,
    reason: null,
    payload: null,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "success":
      return { ...state };
    case "error":
      return { ...state };
    default:
      return state;
  }
}
