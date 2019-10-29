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
	    console.log(this.users)
	    socket.on("CONTROLLER", this.Controller)
	    socket.on("START", (data) => this.startGame(data, socket))
	    socket.on("disconnect", (data) => this.playerQuit(socket))
	    socket.on("QUIT", this.playerQuit.bind(this))
	} catch (err) {
	    console.log(err)
	    socket.emit("LISTING", { state: "JOINED", err: err })
	}
    }

    playerQuit(s) {
	console.log("player quit the lobby")
	console.log("VALUE OF THIS", this)
	console.log(this.users)
	//	this.players[socket.id].stop()// WHEN EXISTING OMFG
	this.removeListener("CONTROLLER", this.Controller)
	const { id } = this;
	const { Socket } = this.client.conn;
	
	console.log("this.players in playerQuit", this.users)
//	socket.off("CONTROLLER")
	Socket.removeListener("CONTROLLER", function(data) {
	    console.log("here", socket.id)
	    if (this.users[socket.id])
		this.users[socket.id].player.controller(data)
	}.bind(this))
	socket.removeListener('START', (data) => this.startGame(data, socket))
	socket.removeListener('QUIT', (data) => this.playerQuit(socket))
	socket.emit("QUIT", {state: "QUIT"})
	delete this.users[id]

	if (this.host === id) {
	    console.log("Find another host!")
	    var newHost = _.sample(this.users)
	    console.log("new host", newHost)
	    this.host = undefined
	    if (!newHost) {
		console.log("no new host in room")
		return
	    }
	    newHost.socket.emit("HOST", { host: true })
	    this.host = newHost.socket.id
	    
	}

    }

    Controller(action) {
	console.log("here")
	if (this.users[socket.id])
	    this.users[socket.id].player.controller(action)
    }
    
    async startGame(data, socket) {
	if (this.open === true) {
	    if (socket.id === this.host) {
		console.log("this is host")
		if (data === 'START') {
		    _.map(this.users, (v, k) => {
			v.player.start(this.pieceCallback.bind(this),
				       this.mallusCallback.bind(this),
				       this.winnerCallback.bind(this)
				      )
		    })
		}
		
	    }
	}
    }

    async pieceCallback(id, nbr) {
	var p = this.pieces[nbr]
	if (!p) {
	    console.log("found anothr piece & adding to stack")
	    p = Tetraminos.get()
	    this.pieces.push(p)
	    
//	    return "new Piece!"
	}
	console.log("[GET PIECE] - ", id)
	return p
    }

    mallusCallback(id) {
	_.map(this.users, (v, k) => {
	    if (k === id)
		return
	    v.player.getMallus()
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
