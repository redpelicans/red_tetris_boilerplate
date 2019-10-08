import uuidv4 from 'uuid'
import Room from './roomController';

class Handler {
    constructor() {
	this.rooms = {}
    }


    async join(id, socket) {
	console.log("join rooms")
	var r = this.rooms[id];
	if (!r) {
	    console.log(uuidv4())
	    Promise.reject("room doesn't exist")
	    return false
	}
	r.join(socket)
	return true	
    }

    async create(room, socket) {

	try {
	    var id = uuidv4()
	    this.rooms[id] = new Room(id)
	    
	    if (this.rooms[id]) {
		await this.rooms[id].join(socket)
	    }
	    return room
	} catch (err) {
	    Promise.reject(err)
	}
    }
}


module.exports = {
    Handler: new Handler()
}
