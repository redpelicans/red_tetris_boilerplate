
const listing = (state = {}, action) => {
    switch (action.state) {
    case "FETCH":
      // should appends multiple result
      console.log("Fetch case")
      //var obj = Object.assign({}, state.rooms)
      // if (action.result.room) {
      // 	obj.
      // }
      return Object.assign({}, state, { rooms: action.result.rooms })
    case "JOINING":
      if (action.status) {
	if (actions.status === 'error') {
	  // notify user
	} else if (action.status === 'success') {
	  // add room variable with information etc..
	}
      } else {
	var r = Object.assign({}, state.rooms)
	r[action.key]['loading'] = true; // need testing
	return Object.assign({}, state, { rooms: r/*ADD SOMETHING*/ })
      }
    case "LOADING":
      var r = Object.assign({}, state.rooms)
      r[action.id]['isLoading'] = true; // need testing
      var arr = []
      for (var i = 0; i < Object.keys(r).length; i++) {
	arr.push(r[i])
      }
      return Object.assign({}, state, { onLoad: action.id, rooms: arr });
    case "JOINED":
      if (state.onLoad === undefined) {
//	console.log("onLoad undefined")
	return state
      }
      var r = Object.assign({}, state.rooms)
      delete r[state.onLoad]['isLoading']; // need testing
      var arr = []
      for (var i = 0; i < Object.keys(r).length; i++) {
	arr.push(r[i])
      }
      if (action.result.err) {
	console.log(action.result.err)
	return Object.assign({}, state, { onLoad: undefined, rooms: arr })
      }
      
      return Object.assign({}, state, { menu: "ROOM", onLoad: undefined, rooms: arr, room: action.result.room }) // DONT LIKE DEFINITION OF MENU

    case "CREATE":
      if (action.result) {
	if (action.result.err)
	  alert(action.result.err)
	  return Object.assign({}, state, { isCreating: false })	
      }
      return Object.assign({}, state, { isCreating: action.bool })
    default:
	return state
    }
}

export default listing
