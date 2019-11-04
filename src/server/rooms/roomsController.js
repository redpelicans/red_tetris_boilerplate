import roomDb from './roomsModel';
import _ from 'lodash'
import Player from '../player/player'
import Tetraminos from '../player/tetraminos'

class Lobby {
    constructor(id, name, mode) {
	this.id = id
	this.name = name
	this.mode = mode
	
	this.host = undefined
	this.users = {}
	this.open = true
	this.pieces = []
    }

    newPlayer(socket, user) {
	console.log("New combattant: ", user)
	try {
	    
	    var player = new Player(socket, user)
	    socket.emit("JOINED", { state: "JOINED", room: { id: this.id, name: this.name, mode: this.mode } })
	    this.users[socket.id] = {
		player,
		socket
	    }
	    
	    if (this.host === undefined) {
		this.host = socket.id
		console.log(this.host);
		socket.emit("HOST", { host: true })
	    } else {
		console.log('already an host!')
		socket.emit("HOST", { host: false })
	    }
	    return player;
	} catch (err) {
	    console.log(err)
	    socket.emit("LISTING", { state: "JOINED", err: err })
	}
    }

    leave(socket) {
	console.log("user (", socket.id, ") leaving room...")
	delete this.users[socket.id]
	socket.emit("QUIT", { state: "QUIT" })
	
	if (socket.id === this.host) {
	    console.log("need new host")
	    this.host = undefined
	    var newHost = _.sample(this.users)
	    if (!newHost) {
		return
	    }
	    newHost.socket.emit("HOST", { host: true })
	    this.host = newHost.socket.id
	}
    }
    
    async startGame(data, socket) {
	if (this.open === true) {
	    if (socket.id === this.host) {
		console.log("this is lhost")
		_.map(this.users, (v, k) => {
		    v.player.start(this.pieceCallback.bind(this),
				   this.mallusCallback.bind(this),
				   this.winnerCallback.bind(this)
				  )
		})
	    }
	    
	}
    }

    async pieceCallback(id, nbr) {
	var p = this.pieces[nbr]
	if (!p) {
	    console.log("found anothr piece & adding to stack")
	    p = Tetraminos.get()
	    this.pieces.push(p)
	}
	console.log("[GET PIECE] - ", id)
	return p
    }

    mallusCallback(id) {
	_.map(this.users, (v, k) => {
	    if (k === id)
		return
	    v.player.getMalus()
	})
    }

    winnerCallback(id) {
	_.map(this.users, (v, k) => {
	    if (k === id)
		return
	    v.player.stopGame()
	})
    }
}

module.exports = Lobby
