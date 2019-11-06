import Game from './game'

class Player {
    constructor(socket, name = "*******") {
	this.socket = socket
	this.name = name
	this.nbr = 0
	this.game = new Game()
	this.pause = false;
	console.log(`New player ${socket.id} ${name}`)
    }
    
    controller(data) {
	console.log(`${this.socket.id} - ${data}`)
	if (data === 'LEFT') {
	    this.game.left()
	} else if (data === 'UP') {
	    this.game.rotate()
	} else if (data === 'RIGHT') {
	    this.game.right()
	} else if (data === 'DOWN') {
	    this.game.down()
	} else if (data === 'SPACE') {
	    this.game.place()
	}
	this.socket.emit("DISPLAY", this.game.map)
    }

    // cb function for a new piece ! and for terminate the session
    start(getPiece, sendMallus, win) {
	this.socket.on("disconnect", (data) => this.stopGame());
	this.socket.on("QUIT", (data) => this.stopGame())
	console.log("[GAME START] - ", this.socket.id)
	this.itr = 0
	var marine = function () {
	       if (this.game.down() === false) {
		if (this.game.verify() !== 0)
		    sendMallus(this.socket.id)
		var p = getPiece(this.socket.id, this.nbr)
		if (!this.game.add(p))
		    return clearInterval(this.itr)
		this.nbr++
	       }
	    this.socket.emit("DISPLAY", this.game.map)
	}.bind(this)
	this.itr = setInterval(marine, 1000)
    }
    
    stopGame() {
	if (this.itr === 0)
	    return ;
	clearInterval(this.itr)
    }

    getMalus() {
	if (!this.game.setMalus()) {
	    clearInterval(this.itr)
	    return false
	}
	return true
    }    
}


module.exports =  Player
