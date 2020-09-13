function isPromise(value) {
  // console.log("isPromise value >>>", value);
  // const resolved = Promise.resolve(value);
  // console.log("isPromise resolved", resolved);
  return Promise.resolve(value) === value;
}

// TODO: test needed -- not sure it works as I thought
export default function middleware(dispatch) {
  return (action) => {
    if (isPromise(action.payload)) {
      // console.log("IS PROMISE");
      action.payload.then((v) => {
        dispatch({ type: action.type, payload: v });
      });
    } else {
      // console.log("IS NOT PROMISE");
      dispatch(action);
    }
  };
}
