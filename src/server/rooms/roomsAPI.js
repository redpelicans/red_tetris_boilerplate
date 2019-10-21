import { Rooms } from './roomsModel';
import Handler from './roomsHandler';


async function fetch(data, socket) {
    try {
	var rooms = await Rooms.read({}, {}, 0, 5)
	console.log("Voici les rooms: ", rooms);
	socket.emit("FETCH_ROOMS", { rooms: rooms })
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
	if (!room.create) {
	    var r = await Handler.find(room.id)
	    if (!r) {
		console.log("room dont exist");
		socket.emit("ROOM", { state: "JOINING", joined: false, err: "room doesn't exist"})
		return
	    }
	    console.log("room exist, joining...");
	    r.join(socket, room)

	} else {
	    var r = await Handler.create(room)
	    console.log(r)
	    if (!r) {
		console.log("Room not created..")
		socket.emit("ROOM", { state: "JOINING", joined: false, err: "room not created!" })
		return
	    }
	    console.log("Room created, joining...", r.id)
	    r.join(socket, room)
	}
    } catch (err) {
	console.log(err);
    }
    
}

module.exports = {
    fetch,
    join
}
