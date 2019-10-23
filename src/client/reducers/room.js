const room = (state = {}, action) => {
  var room = Object.assign({}, state.room)
  
  switch (action.state) {
  case "JOINED":
    if (!action.result.room)
      return state
    return Object.assign({}, state, { menu: "ROOM", room: action.result.room })
  case "START":
    room['start'] = true
    return Object.assign({}, state, { room: room/*ADD SOMETHING*/})
  case "DISPLAY":
    room['display'] = action.result
    return Object.assign({}, state, { room: room/*ADD SOMETHING*/})
  case "HOST":
    room['host'] = true
    return Object.assign({}, state, { room: room/*ADD SOMETHING*/})
  case "PLAYERS":
    room['players'] = action.result
    return Object.assign({}, state, { room: room/*ADD SOMETHING*/})
  case "QUIT":
    return Object.assign({}, state, { room: undefined, menu: "LISTING" })
  default:
    return state
  }
}


export default room
