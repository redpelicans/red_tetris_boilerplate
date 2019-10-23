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
	this.controller()
	this.pause = false;
	this.socket.on("INFO", (data) => this.getUser(data))
    }


    get() {
	var info = {
	    name: this.name,
	    line: this.game.getLine(20)
	}

	console.log(info)
	return info
    }
    
    controller() {
	this.socket.on('CONTROLLER', function(action) {
	    if (!this.start) {
		return 
	    }

	    if (this.pause)
		return
	    if (action === 'LEFT') {
		this.game.left()
	    } else if (action === 'UP') {
		this.game.rotate()
	    } else if (action === 'RIGHT') {
		this.game.right()
	    } else if (action === 'DOWN') {
		this.game.down()
	    } else if (action === 'SPACE') {
		this.pause = true
		this.game.down(true)
		this.pause = false
	    }
	}.bind(this))
    }

    // cb function for a new piece ! and for terminate the session
    start(getPiece, sendMallus, win) {
	console.log("start")
	this.start = true
	this.itr = setInterval(function () {
	    if (!this.pause) {
		if (this.game.piece === undefined) {
		    var p = getPiece(this.socket.id, this.nbr)
		    if (!this.game.add(p)) {
			return clearInterval(this.itr);
		    } else {
			this.nbr++
		    }
		    
		} else if (this.game.down() == false) {
		    console.log("need new piece")
		}
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


export default Player
