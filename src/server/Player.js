const { Game, Piece, Tetraminos } = require('./game');
import  helpers from './game/helpers';

class Player1 {
    constructor(socket) {
	this.socket = socket;
    }

    start() {
	Listener()
    }

    Listener() {
	console.log("Player Listening to actions")
	this.socket.on('new', function(game) {
	    if (game.mode === 'CLASSIC' && game.player === '1PLAYER') {
		this.game = new Game(this.socket)
		this.game.start();
	    }
	}.bind(this))

	this.controller()
    }

    controller() {
	this.socket.on('controller', function(action) {
	    if (this.game) {
		if (action.type === 'pause' && this.game.launch === true) {
		    this.game.pause();
		    return ;
		} else if (action.type === 'resume' && this.game.launch === false) {
		    this.game.resume();
		} else if (action.type === 'left') {
		    this.game.left();
		} else if (action.type === 'up') {
		    this.game.rotate();
		} else if (action.type === 'right') {
		    this.game.right();
		} else if (action.type === 'down') {
		    if (this.game.down() === false) {
			this.game.verifyLine();
		    }
		} else if (action.type === 'space') {
		    this.game.down(true);
		}
		this.socket.emit('map', { ground: this.game.map });
	    } else {
		console.log("no game launched");
	    }
	}.bind(this))
    }
}


class Player {
    constructor(socket) {
	this.socket = socket;

    }

    start() {
	this.controller();
	this.gameListener();
    }

    
    gameListener() {
	this.socket.on('new', function(game) {
	    if (game.player === 'SINGLE') {
		this.game = new Game(this.socket.id, game.mode); // should pass socket instead of handling game here
	    } else {
	
	    }
	}.bind(this))
    }



    controller() {
	this.socket.on('controller', function(action) {
	    if (this.game) {
		if (action.type === 'left') {
		    this.game.left();
		} else if (action.type === 'up') {
		    this.game.rotate();
		} else if (action.type === 'right') {
		    this.game.right();
		} else if (action.type === 'down') {
		    if (this.game.down() === false) {
			this.game.verifyLine();
		    }
		} else if (action.type === 'space') {
		    this.game.down(true);
		}
		this.socket.emit('map', this.game.info());
	    }
	}.bind(this))
    }
    
    solo() {
	
	this.game = new Game(this.socket.id);

	this.socket.emit('map', this.game.info());
	var i = setInterval(function() {
	    console.log("send data to socket");
	    
	    if (this.game.down() === false) {
		if (this.game.verifyLine()) {
		    this.socket.emit('map', this.game.info());
		}
		if (this.game.add(new Piece(Tetraminos.get())) === false) {
		    this.socket.emit('game_over', this.game.info());
		    clearInterval(i);
		}
	    }
	    this.socket.emit('map', this.game.info());
	}.bind(this), 500);

	this.socket.on('controller', function(action) {
	    if (action.type === 'left') {
		this.game.left();
	    } else if (action.type === 'up') {
		this.game.rotate();
	    } else if (action.type === 'right') {
		this.game.right();
	    } else if (action.type === 'down') {
		if (this.game.down() === false) {
		    this.game.verifyLine();
		}
	    } else if (action.type === 'space') {
		this.game.down(true);
	    }
	    this.socket.emit('map', this.game.info());
	}.bind(this));


	this.socket.on('disconnect', function() {
	    console.log('diisconnect clear interval');
	    clearInterval(i);
	})
    }

}

export default Player1;
