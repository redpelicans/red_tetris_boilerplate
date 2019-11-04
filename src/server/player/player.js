import Game from './game'

class Player {
    constructor(socket, name = "*******") {
	this.socket = socket
	if (!name)
	    this.name = "******"
	else
	    this.name = name

	// init controller and map
	this.nbr = 0
	this.game = new Game(socket)
	this.pause = false;
	console.log("new player:", socket.id)
    }


    get() {
	var info = {
	    name: this.name,
	    line: this.game.getLine(20)
	}

	console.log(info)
	return info
    }
    
    async controller(data) {
	if (!this.start)
	    return 
	console.log("PASS")
	if (data === 'LEFT') {
	    this.game.left()
	} else if (data === 'UP') {
	    this.game.rotate()
	} else if (data === 'RIGHT') {
	    this.game.right()
	} else if (data === 'DOWN') {
	    this.game.down()
	} else if (data === 'SPACE') {
//	    this.pause = true
	    this.game.down(true)
//	    this.pause = false
	}
    }

    // cb function for a new piece ! and for terminate the session
    async start(getPiece, sendMallus, win) {
	this.socket.on("disconnect", (data) => this.stopGame());
	this.socket.on("QUIT", (data) => this.stopGame())

	console.log("[GAME /START] - ", this.socket.id)
	this.start = true
	this.itr = setInterval(async function () {
	    if (await this.game.down() === false) {
		if (this.game.verify() !== 0)
		    sendMallus(this.socket.id)
		var p = await getPiece(this.socket.id, this.nbr)
		if (!this.game.add(p))
		    return clearInterval(itr)
		this.nbr++
	    }
    	}.bind(this), 1000);
    }
    
    stopGame() {
	if (this.itr === 0) {
	    return ;
	}
	clearInterval(this.itr)
    }

    getMalus() {
	this.pause = true;
	if (!this.game.setMalus()) {
	    clearInterval(this.itr)
	    return false
	}
	this.pause = false
	return true
    }

    async getUser(data) {
	this.name = data.user
    }
    
}


module.exports =  Player
