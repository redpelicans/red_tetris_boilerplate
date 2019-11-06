import { Rooms } from './roomsModel';
import Handler from './roomsHandler';
import  Player from '../player/player';

async function fetch(data, socket) {
    try {
	var rooms = await Rooms.read({}, {}, data.skip, data.limit)

	var list = await Handler.restoreRooms()
//	console.log("Voici les rooms: ", rooms);
	socket.emit("FETCH", { rooms })
    } catch (err) {
	console.log(err)
    }
}

/*
** Data : { user: {...}, room: {...}}
*/

function join(room, socket) {
    try {
	console.log("Room's info:", room)
	var r = Handler.find(room.id)
	if (!r) {
	    console.log("room dont exist, need to create it !");
	    r =  Handler.create(room, socket)
	}
	console.log("room exist, joining...");
	var player = new Player(socket)
	if (!player) {
	    return undefined
	}

	console.log("wuut")
	r.newPlayer(player)
	return { room: r, player }
    } catch (err) {
	socket.emit("JOINED", { state: "JOINED", err: err })
    }
    
}

/*
** data:{
**		user: { name, ...},
**		room: {id, name, mode, ...}
**	}
*/
async function accessRoom(data, socket) {
    try {
	console.log("Room info::", data.room)
	var room
	if (data.room.id)
	    room = Handler.find(room.id)
	else {
	    room = await Handler.create(data.room)
//	    socket.emit("CREATED", { true }) // OPTIONAL
	}
	console.log("Room existing, joining. . .")
	var player = newPlayer(socket, data.user)
	room.newPlayer(player)
	return { room, player }
    } catch (err) {
	socket.emit("JOINING", {state: "JOINED", err })
	Promise.reject(err)
    }
}

// use join function
async function newRoom(data, socket) {
    try {
	var newRoom = await Handler.create(data)
	console.log(newRoom)
	if (!newRoom) {
	    console.log("Room not created!")
	    socket.emit("CREATION", { err: "Room not created! Needs to be created and return success" })
	    return
	}
	console.log("Room created!")
	socket.emit("CREATED", { room: true})
	newRoom.newPlayer(socket)
    } catch (err) {
	console.log(err)
	socket.emit("CREATION", { err: err })
    }
    // ?? join ??
}


module.exports = {
    newRoom,
    fetch,
    join
}
