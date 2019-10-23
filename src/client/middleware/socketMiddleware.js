import io from 'socket.io-client';

export default function socketMiddleware() {
  const socket = io('localhost:3004');

  return ({ dispatch, state }) => next => (action) => {
    if (typeof action === 'function') {
      return next(action);
    }
    const {
      event,
      leave,
      emit,
      payload,
      handle,
      ...rest
    } = action;

    if (!event) {
      return next(action);
    }

    if (leave) {
      socket.removeListener(event);
    }

    if (emit) {
      console.log("payload:", payload)
      return socket.emit(event, payload)
    }
    
    let handleEvent = handle;
    if (typeof handleEvent === 'string') {
      handleEvent = result => dispatch({type: handle, result, ...rest})
    }

    return socket.on(event, handleEvent);
  };
}
