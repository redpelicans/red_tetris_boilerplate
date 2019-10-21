
const room = (state = {}, action) => {
  var obj = Object.assign({}, state.room)
  console.log("YUP:", obj)


  switch (action.state) {
  case "IS_JOINING":
    var room = Object.assign({}, action.room)
    room["isJoining"] = true
    return Object.assign({}, state, {room: room })
  case "JOINED":
    delete obj["isJoining"]
    obj["joined"] = true
    return Object.assign({}, state, { room: obj })
  case "PLAYERS":
    obj["players"] = action.result
    
    return Object.assign({}, state, { room: obj })
  case "DISPLAY":
    obj["display"] = action.result
//    console.log(action.result)
    return Object.assign({}, state, {room: obj})
  case "START":
    obj["start"] = action.start
    return Object.assign({}, state, { room: obj })
  default:
    return state
  }
}

export default room;
