// import React from "react";
// // import io from "socket.io-client";
// import reducer, { initialState } from "./reducer";

// // const endpoint = "http://0.0.0.0:3004";
// // const socket = io(endpoint);

// function useSocket(action) {
//   const [state, dispatch] = React.useReducer(reducer, initialState);

//   React.useEffect(() => {
//     socket.on(action, (response) => dispatch(response));

//     return () => socket.off(action);
//   }, []);

//   return [state, (...rest) => socket.emit(...rest)];
// }

// export default useSocket;
