

const roomJoined = (state = {}, action) => {
  const { result } = action;

  if (!result.joined) {
    return state;
  }
  return Object.assign({}, state, { room: result.room })
}

export default roomJoined;
