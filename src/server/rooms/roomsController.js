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
	this.players = {}
	this.open = true
	this.pieces = []
    }

    async newPlayer(socket, user) {
	console.log("New combattant: ", user)
	try {
	    
	    var player = new Player(socket, user)
	    socket.emit("JOINED", { state: "JOINED", room: { id: this.id, name: this.name, mode: this.mode } })
	    this.players[socket.id] = {
		player: player,
		piece: 0
	    }
	    
	    if (this.host === undefined) {
		this.host = socket.id
		socket.emit("HOST", null)
	    }
	    socket.on("START", (data) => this.startGame(data, socket))
	    socket.on("disconnect", (data) => this.playerQuit(socket))
	    socket.on("QUIT", (data) => this.playerQuit(socket))
	} catch (err) {
	    console.log(err)
	    socket.emit("LISTING", { state: "JOINED", err: err })
	}
    }

    async playerQuit(socket) {
	console.log("player quit the lobby")
//	this.players[socket.id].stop()// WHEN EXISTING OMFG
	delete this.players[socket.id]
	if (this.host === socket.id) {
	    console.log("Find another host!")
	}
	socket.removeListener('START', (data) => this.startGame(data, socket))
	socket.removeListener('QUIT', (data) => this.playerQuit(socket))
	socket.emit("QUIT", {state: "QUIT"})
	    
    }

    async startGame(data, socket) {
	if (this.open === true) {
	    if (socket.id === this.host) {
		console.log("this is host")
		if (data === 'START') {
		    _.map(this.players, (v, k) => {
			v.player.start(this.pieceCallback.bind(this),
				       this.mallusCallback.bind(this))
		    })
		    // var keys = Object.keys(this.players)
		    // for (var i = 0; i < keys.length; i++) {
		    // 	this.players[keys[i]].game.start()
		    // }
		}
		
	    }
	}
    }

    pieceCallback(id, nbr) {
	console.log("player's id", this.id, "piece nbr: ", nbr)
	
	var p = this.pieces[nbr]
	if (!p) {
	    console.log("found anothr piece & adding to stack")
	    p = Tetraminos.get()
	    this.pieces.push(p)
	    
//	    return "new Piece!"
	}
	return p
    }

    mallusCallback(id) {
	_.map(this.players, (v, k) => {
	    if (k === id)
		return
	    v.player.getMallus()
	})
    }

    winnerCallback(id) {
	_.map(this.players, (v, k) => {
	    if (k === id)
		return
	    v.player.stopGame()
	})
    }
}

export default Lobby
