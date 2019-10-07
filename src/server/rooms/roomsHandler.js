
class Handler {
    constructor() {
	this.rooms = {}
    }


    async join(id, socket) {
	console.log("join rooms")
	var r = this.rooms[id];
	if (!r) {
	    console.log("room doesn't exist")
	    return false
	}
	r.join(socket)
	return true	
    }

}


module.exports = {
    Handler: new Handler()
}
