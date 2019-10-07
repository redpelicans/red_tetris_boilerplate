const createRoom = (state = {}, action) => {
    switch (action.type) {
    case 'CREATE':
	return Object.assign({}, state, {create: action.create});
    default:
	return state
    }
}

export default createRoom;
