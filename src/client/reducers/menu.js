
const menu = (state = {}, action) => {
  if (!state.menu) {
    var menu = {}
    menu[action.menu] = action.bool
  } else {
    var menu = Object.assign({}, state.menu)

    menu[action.menu] = action.bool
  }
  return Object.assign({}, state, { menu })
				  
}

export default menu;
