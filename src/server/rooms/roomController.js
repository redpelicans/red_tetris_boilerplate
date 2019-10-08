import _ from 'lodash'

class Room {
    constructor(id) { //implement a callback for array deletion
	console.log("room is created")
	this.id = id
	this.host = undefined
	this.players = {}
	this.state = true
    }

    async join(socket) {
	console.log("new player:", socket.id)
	try {
	    socket.join(this.id)
	    console.log(typeof socket.id)
	    this.players[socket.id] = socket
	    socket.emit("user", { type: "data" })
	    var userData = await socket.on("user", (data) => {
		console.log("data");
		
	    })
	    this.updatePlayer()
	} catch (err) {
	    Promise.reject(new Error("Can't join the room:", err))
	}
    }

    async quit() {
	console.log("a player quit the game:", socket.id)
    }

    async start() {
	console.log("starting the game..")
	this.state = false
    }

    updatePlayer() {
	console.log("ALOHA")
	const keys = Object.keys(this.players)
	return setInterval(function(){
	    if (!_.isEmpty(this.players))
		for (var i = 0; i < keys.length; i++) {
		    console.log("emit")
		    this.players[keys[i]].emit("PLAYERS", keys)
		}
	}.bind(this), 5000)
    }
}

export default Room;
