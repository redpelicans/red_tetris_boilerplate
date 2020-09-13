export default function combineDispatch(...dispatchers) {
  return (action) => dispatchers.forEach((dispatch) => dispatch(action));
}
