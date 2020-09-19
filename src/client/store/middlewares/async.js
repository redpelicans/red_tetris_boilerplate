function isPromise(value) {
  console.log(value);
  const resolved = Promise.resolve(value);
  console.log(resolved);
  return Promise.resolve(value) === value;
}

export default function middleware(dispatch) {
  return (action) => {
    if (isPromise(action.payload)) {
      action.payload.then((v) => {
        dispatch({ type: action.type, payload: v });
      });
    } else {
      dispatch(action);
    }
  };
}
