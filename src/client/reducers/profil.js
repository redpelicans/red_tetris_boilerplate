const profil = (state = {}, action) => {

  switch (action.state) {
  case "NEW":
    return Object.assign({}, state, { name: action.name })
  default:
    return state
  }
}


export default profil
