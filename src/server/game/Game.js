const helpers = require('./helpers');
const Piece = require('./tetraminos/piece');
const Shape = require('./tetraminos/shape');

const { Tetraminos } = require('./tetraminos');
class LolGame {
    constructor(id) {
	this.id = id;
	this.map = helpers.newMap();
	this.removed = undefined;
	this.score = 0;
    }

    info() {
	var obj = {
	    ground: this.map,
	    current: this.piece,
	    deleted: this.removed
	}

	this.removed = undefined;

	return obj
    }
    
    down(instant = false) {
	console.log(`x: ${this.x}, y: ${this.y}`);
	const copy = helpers.copyMap(this.map);
	if (!this.piece) {
	    return false;
	}
	if (instant === true) {
	    var finalMap;
	    
	    helpers.remove(copy, this.piece, this.x, this.y);
	    while(helpers.placeable(copy, this.piece, this.x, this.y + 1) === true) {
		this.y++;
		this.map =  helpers.copyMap(copy);
		helpers.remove(copy, this.piece, this.x, this.y);
	    }
	    
	    console.log('===========INSTANT_DOWN=============');
	    console.log(this.map)
	    return true
	}
	
	if (helpers.remove(copy, this.piece, this.x, this.y)) {
	    if (helpers.placeable(copy, this.piece, this.x, this.y+1)) {
		this.y++;
		this.map = copy;
		console.log("===========DOWN==========");
		return true;
	    } else {
		console.log("Can't move down() the piece")
		return false;
	    }
	}
    }

    right() {
	console.log(`x: ${this.x}, y: ${this.y}`);
	const copy = helpers.copyMap(this.map);
	
	if (helpers.remove(copy, this.piece, this.x, this.y)) {
	    if (helpers.placeable(copy, this.piece, (this.x + 1), this.y)) {
		this.x++;
		this.map = copy;
		console.log("===========RIGHT==========");
		console.log(this.map)
	    } else {
		console.log("Can't move left() the piece")
	    }
	}
    }

    left() {
	console.log(`x: ${this.x}, y: ${this.y}`);
	const copy = helpers.copyMap(this.map);
	
	if (helpers.remove(copy, this.piece, this.x, this.y)) {
	    if (helpers.placeable(copy, this.piece, (this.x - 1), this.y)) {
		this.x--;
		this.map = copy;
		console.log("===========LEFT==========");
		console.log(this.map)
	    } else {
		console.log("Can't move right() the piece")
	    }
	}
    }

    rotate() {
	console.log(`x: ${this.x}, y: ${this.y}`);
	const copy = helpers.copyMap(this.map);
	if (helpers.remove(copy, this.piece, this.x, this.y)) {
	    this.piece.rotate();
	    if (helpers.placeable(copy, this.piece, this.x, this.y)) {
		this.map = copy;
		console.log("===========ROTATE==========");
	    } else {
		this.piece.undo();
		console.log("not placeable, piece need to be reset");
	    }
	}
    }

    verifyLine() {
	var removed = [];
	for(var row = this.map.length - 1; row > 0; row--) {
	    if (!this.map[row].find(full)) {
		console.log("========REMOVE LINE=========")
		removed.push(row);
		this.map.splice(row, 1);
		this.map.splice(0, 0, ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.',])
		row++;
	    }
	}
	if (removed.length === 0) {
	    return false
	}
	return true;
    }
}


function full(value) {
    return value === '.';
}



class Game {
    constructor(socket) {
	this.socket = socket;
	this.map = helpers.newMap();


	this.launch = false;
	
	this.score = 0;
	this.interval = 1000;
	this.x = 0;
	this.y = 0;
	
	this.socket.emit('map', {ground: this.map});
    }
   
    start() {
	this.launch = true;
	this.i = setInterval(function() {
	    if (this.down() === false) {
		if (this.verify()) {
		}
		console.log('new piece');
		this.add(new Piece(Tetraminos.get()));
	    }
	}.bind(this), this.interval)

    }
    
    pause(inter) {
	this.launch = false;
	clearInterval(this.i);
    }

    resume() {
	this.start();
    }
    
    add(piece) {
	this.y = 0;
	this.x = Math.round((10 - piece.shape[0].length) / 2);
	this.piece = piece;
	if (helpers.placeable(this.map, this.piece, this.x, this.y)) {
	    console.log('===========NEW PIECE=============');
	    console.log(this.map);
	    this.socket.emit('map', {ground: this.map});
	    return true;
	}
	return false;
	
    }

    
    down(instant = false) {
	console.log(`x: ${this.x}, y: ${this.y}`);
	const copy = helpers.copyMap(this.map);
	if (!this.piece) {
	    return false;
	}
	if (instant === true) {
	    var finalMap;
	    
	    helpers.remove(copy, this.piece, this.x, this.y);
	    while(helpers.placeable(copy, this.piece, this.x, this.y + 1) === true) {
		this.y++;
		this.map =  helpers.copyMap(copy);
		helpers.remove(copy, this.piece, this.x, this.y);
	    }
	    
	    console.log('===========INSTANT_DOWN=============');
	    this.socket.emit('map', {ground: this.map});
	    console.log(this.map)
	    return true
	}
	
	if (helpers.remove(copy, this.piece, this.x, this.y)) {
	    if (helpers.placeable(copy, this.piece, this.x, this.y+1)) {
		this.y++;
		this.map = copy;
		console.log("===========DOWN==========");
		this.socket.emit('map', {ground: this.map});
		return true;
	    } else {
		console.log("Can't move down() the piece")
		return false;
	    }
	}
    }

    right() {
	console.log(`x: ${this.x}, y: ${this.y}`);
	const copy = helpers.copyMap(this.map);
	
	if (helpers.remove(copy, this.piece, this.x, this.y)) {
	    if (helpers.placeable(copy, this.piece, (this.x + 1), this.y)) {
		this.x++;
		this.map = copy;
		console.log("===========RIGHT==========");
		console.log(this.map)
	    } else {
		console.log("Can't move left() the piece")
	    }
	}
    }

    left() {
	console.log(`x: ${this.x}, y: ${this.y}`);
	const copy = helpers.copyMap(this.map);
	
	if (helpers.remove(copy, this.piece, this.x, this.y)) {
	    if (helpers.placeable(copy, this.piece, (this.x - 1), this.y)) {
		this.x--;
		this.map = copy;
		console.log("===========LEFT==========");
		console.log(this.map)
	    } else {
		console.log("Can't move right() the piece")
	    }
	}
    }

    rotate() {
	console.log(`x: ${this.x}, y: ${this.y}`);
	const copy = helpers.copyMap(this.map);
	if (helpers.remove(copy, this.piece, this.x, this.y)) {
	    this.piece.rotate();
	    if (helpers.placeable(copy, this.piece, this.x, this.y)) {
		this.map = copy;
		console.log("===========ROTATE==========");
	    } else {
		this.piece.undo();
		console.log("not placeable, piece need to be reset");
	    }
	}
    }

    verify() {
	var removed = [];
	for(var row = this.map.length - 1; row > 0; row--) {
	    if (!this.map[row].find(full)) {
		console.log("========REMOVE LINE=========")
		removed.push(row);
		this.map.splice(row, 1);
		this.map.splice(0, 0, ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.',])
		row++;
	    }
	}
	if (removed.length === 0) {
	    return false
	}
	this.socket.emit('map', {ground: this.map});
	return true;
    }
}
module.exports =  Game;
