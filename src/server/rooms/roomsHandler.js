import uuidv4 from 'uuid'
import Room from './roomController';
import { Rooms as roomDb } from './roomsModel';

const Rooms = {};

async function create(room) {
    try {
	var id = uuidv4()
	var r = new Room(id)
	Rooms[id] = r
	room["id"] = id
	var obj = await roomDb.create(room)
	return r
    } catch (err) {
	console.log("Room creation failure!...")
	Promise.reject(err)
    }
}

async function find(id) {
    var r = Rooms[id]
    if (!r) {
	console.log("Room doesn't exist")
	return new Error("Room doesn't exist")
    }

    return r
}

function deleteRoom(id) {
    console.log("deleting room:", id)
    if (!Rooms[id]) {
	return new Error("Room doesn't exist")
    }
    delete Rooms[id]
    console.log("room deleted")
    return null
}

module.exports = {
    create,
    find,
    deleteRoom
}
