import menu from './menu';
import createRoom from './createRoom';
import roomJoined from './Room';
import fetch_rooms from './fetchRooms';

const TetrisApp = (state = {}, action) => {
  console.log("TetrisApp")
  switch(action.type) {
  case 'MENU':
    return menu(state, action)
  case 'CREATE':
    return createRoom(state, action);
  case "FETCH_ROOMS":
    return fetch_rooms(state, action)
  case "ROOM_JOINED": // CREATE AND JOINED SAME ROUTE
    return roomJoined(state, action)
  
  default:
    return state;
  }
}

export default TetrisApp;
