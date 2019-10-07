
class Handler {
    constructor() {
	this.rooms = {}
    }


    newRoom(id, hostID) {
	// create new Room
    }

    joinRoom(room, socket) {
	// join room

	console.log("Check room's id:", room)
	if (!room.id) {
	    console.log("Room's id doesn't exist, now creating...")
	}
	console.log("Check if room is exist")
	r = this.rooms[id]
	if (!r) {
	    // create new room
	}

	r.join(socket)
	
    }
}
 
