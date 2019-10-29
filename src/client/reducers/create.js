
const create = (state = {}, action) => {
  switch (action.state) {
  case "CREATING":
    return Object.assign({}, state, { isCreating: true })
  case 'CREATE':
    if (action.result.err) {
      alert(action.result.err)
      if (!action.result.room) {
	alert("No room!....")
	return Object.assign({}, state, { isCreating: false })
      }
    }
    return Object.assign({}, state, { isCreating: false })
    //    return Object.assign({}, state, { menu: "ROOM", isCreating: false, room: action.result.room })
  default:
    return state
  }
}


export default create
