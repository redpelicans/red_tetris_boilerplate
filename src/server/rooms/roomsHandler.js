import uuidv4 from 'uuid'
import Room from './roomsController';
import { Rooms as roomDb } from './roomsModel';
import _ from 'lodash'

const Rooms = {};

/*
** Launch at Start
*/
async function restoreRooms() {
    try {
	if (!_.isEmpty(Rooms))
	    return null;
	var all = await roomDb.read({}, {}, 0, 0)
	console.log(all.length)
	_.map(all, function (v) {
	    console.log(v)
	    var newRoom = new Room(v.id, v.name, v.mode)
	    Rooms[v.id] = newRoom
	})
	console.log("constant Rooms:", Rooms)
	return all
    } catch (err) {
	console.log(err)
	Promise.reject(err)
    }
}

async function create(room) {
    try {
	var id = uuidv4()
	var r = new Room(id, room.name, room.mode)
	Rooms[id] = r
	room["id"] = id
	var obj = await roomDb.create(room)
	return r
    } catch (err) {
	console.log("Room creation failure!...")
	Promise.reject(err)
    }
}

function find(id) {
    if (!id)
	return undefined
    return Rooms[id]
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
    deleteRoom,
    restoreRooms
}
