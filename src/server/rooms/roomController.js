import roomDb from './roomsModel';
import _ from 'lodash'
import Player from '../player/player'


class Room {
    constructor(id) { //implement a callback for array deletion
	console.log("room is created")
	this.id = id
	this.host = undefined
	this.players = {}
	this.state = true
    }

    async join(socket, data) {
	console.log("new player:", socket.id)
	try {
	    socket.join(this.id)
	    console.log(typeof socket.id)
	    var p = new Player(socket, "name")
	    this.players[socket.id] = {
		socket: socket,
		game: p
	    }
		

	    console.log("room joined!")
	    socket.emit("ROOM", { joined: true, room: data });
	    if (this.host === undefined) {
		console.log("you'r the host of the room");
		this.host = socket.id
		socket.emit("ROOM_HOST", { host: true })
	    }
	    this.updatePlayer()
	    this.start()
	} catch (err) {
	    Promise.reject(new Error("Can't join the room:", err))
	}
    }

    async quit() {
	console.log("a player quit the game:", socket.id)
    }

    start() {
	console.log("starting the game..")
	this.state = false
	const keys = Object.keys(this.players)
	for (var i = 0; i < keys.length; i++) {
	    this.players[keys[i]].game.start(function(id) {
	    	console.log("Accessing host id from Player class and userID", this.host, id)
	    }.bind(this))
	}	
    }

    updatePlayer() {
	const keys = Object.keys(this.players)
	console.log(keys)
	if (!_.isEmpty(this.players))
	    for (var i = 0; i < keys.length; i++) {
		console.log("emit")
		// remove the id of the emiter
		this.players[keys[i]].socket.emit("PLAYERS", keys)
	    }
    }
}

export default Room
