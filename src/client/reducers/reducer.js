import menu from './menu';
import createRoom from './createRoom';
import roomJoined from './Room';
import fetch_rooms from './fetchRooms';
import room from './rooms';

const tetrisApp = (state = {}, action) => {
  console.log("TetrisApp")
  switch(action.type) {
  case 'MENU':
      return menu(state, action)
  case "LISTING":
      return listing(state, action) // NEW ONE
  case 'CREATE':
    return createRoom(state, action);
  case "FETCH_ROOMS":
    return fetch_rooms(state, action)
  case "ROOM_JOINED": // CREATE AND JOINED SAME ROUTE
    return roomJoined(state, action)
  case "ROOM":
    return room(state, action)
  default:
    return state;
  }
}

import AppInterface from './interface'
import Profil from './profil'
import listing from './listing'
import NewRoom from './room'
import Create from './create'
const TetrisApp = (state = {}, action) => {
  switch (action.type) {
  case "INTERFACE":
    return AppInterface(state, action)/*ADD SOMETHING*/
  case "PROFIL":
    return Profil(state, action)/*ADD SOMETHING*/
  case "LISTING":
    return listing(state, action)/*ADD SOMETHING*/
  case "ROOM":
    return NewRoom(state, action)/*ADD SOMETHING*/
  case "CREATE":
    return Create(state, action)
  default:
    return state
  }
}

export default TetrisApp;
