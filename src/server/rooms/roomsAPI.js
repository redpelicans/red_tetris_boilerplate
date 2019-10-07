import { Rooms } from './roomsController';
import { Handler } from './roomsHandler';

async function fetch(data, socket) {
    try {
	var rooms = await Rooms.read({}, {}, 5, 5)
	console.log("Voici les rooms: ", rooms);
	socket.emit("FETCH_ROOMS", { rooms: [{name: "lol", mode: "CLASSIC", id: 1}, {name: "lol2", mode: "CLASSIC", id: 2}] });
    } catch (err) {
	console.log(err)
    }
}

async function join(room, socket) {
    try {
//	var room = await Rooms.readOne({ id: data.id })
	console.log("Room's info:", room)
	var ok = await Handler.join(room.id, socket)
	socket.emit("JOIN_ROOM", { joined: ok, room: room});
	
    } catch (err) {
	console.log(err)
    }
}

module.exports = {
    fetch,
    join
}
