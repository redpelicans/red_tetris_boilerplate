
const fetch_rooms = (state = {}, action) => {
  if (action.result.rooms.length > 0) {
    var rooms = action.result.rooms
    return Object.assign({}, state, { rooms: rooms })
  } else {
    return Object.assign({}, state, { rooms: undefined })
  }

}


export default fetch_rooms;
