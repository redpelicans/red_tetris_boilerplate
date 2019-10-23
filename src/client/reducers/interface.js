const AppInterface = (state = {}, action) => {
  switch (action.state) {
  case "MENU":
    return Object.assign({}, state, { menu: action.menu })/*ADD SOMETHING*/
  case "CREATE":
    if (!action.bool) {
      var obj = Object.assign({}, state)
      delete obj.create
      return obj
    }
    return Object.assign({}, state, { create: action.bool })
  default:
    return state
  }
}

export default AppInterface
