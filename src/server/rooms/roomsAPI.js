import { Rooms } from './roomsModel';
import Handler from './roomsHandler';


async function fetch(data, socket) {
    try {
	var rooms = await Rooms.read({}, {}, data.skip, data.limit)

	var list = await Handler.restoreRooms()
//	console.log("ALL rooms:", list)
//	console.log(data)
	console.log("Voici les rooms: ", rooms);
	socket.emit("FETCH", { rooms })
    } catch (err) {
	console.log(err)
    }
}

/*
** Data : { user: {...}, room: {...}}
*/

async function join(room, socket) {
    try {
//	var room = await Rooms.readOne({ id: data.id })
	console.log("Room's info:", room)
	var r = await Handler.find(room.id)
	console.log(r)
	if (!r) {
	    console.log("room dont exist, need to create it !");
//	    socket.emit("LISTING", { state: "JOINED", err: "room doesn't exist, need to be created"})
	    r = await Handler.create(room, socket)
	}
	console.log("room exist, joining...");
	var player = r.newPlayer(socket)
	if (!player) {
	    return undefined
	}
	return { room: r, player }
//	socket.emit("JOINED", { room: true })
    } catch (err) {
//	console.log(err);
	socket.emit("JOINED", { state: "JOINED", err: err })
    }
    
}


async function create(data, socket) {
    console.log("HELLLO", data)
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
    fetch,
    join,
    create
}
