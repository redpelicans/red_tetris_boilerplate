import helpers from './helpers'
import Piece from './piece'

export default class Game {
    constructor(socket) {
	this.socket = socket
	this.map = helpers.newMap()
	this.piece = undefined
	this.x = 0
	this.y = 0

	this.malus = 0
	
    }

    getLine(i) { // error value malus
	var r = (i -1) - this.malus
	console.log(r)
	var line = [...this.map[r]]
	return line
    }
    
    add(piece) {
	console.log(piece)
	this.piece = new Piece(piece)
	this.x = Math.round((10 - piece.shape[0].length) / 2);
	this.y = 0
	
	if (helpers.placeable(this.map, this.piece, this.x, this.y)) {
	    console.log("placeable!")
	    this.socket.emit("DISPLAY", this.map)
	    return true
	} else {
	    this.socket.emit("end", null)
	    return false
	}
    }


    setMalus() {
	console.log("setMalus")
	this.malus++

	var copy = helpers.copyMap(this.map)
	
	if (this.piece)
	    helpers.remove(copy, this.piece, this.x, this.y)
		
	var a = copy[0].find(function(c) {
	    return c != '.'
	})
	if (a)
	    return false
	console.log("can set malus!")
	helpers.fillLine(copy, 20 - this.malus)
	if (this.piece) {
	    var finalMap = helpers.copyMap(copy)
	    helpers.placeable(finalMap, this.piece, this.x, this.y -1)
	    if (!helpers.placeable(copy, this.piece, this.x, this.y)) {
		console.log("Can't replace piece, game over!")
		console.log(copy)
		this.map = finalMap
	    } else {
		this.map = copy
	    }
	}

	console.log(this.map)
	this.socket.emit("DISPLAY", this.map)
	return true
    }
    
    down(instant = false) {
	if (!this.piece)
	    return false

	var copy = helpers.copyMap(this.map)
	
	if (instant === true) {
	    helpers.remove(copy, this.piece, this.x, this.y)
	    while(helpers.placeable(copy, this.piece, this.x, this.y + 1)) {
		this.y++
		this.map = helpers.copyMap(copy)
		helpers.remove(copy, this.piece, this.x, this.y)
	    }
	    this.socket.emit('DISPLAY', this.map )
	    this.piece = undefined
	    return true
	}

	if (helpers.remove(copy, this.piece, this.x, this.y)) {
	    if (helpers.placeable(copy, this.piece, this.x, this.y+1)) {
		this.y++
		this.map = copy
		this.socket.emit('DISPLAY', this.map )
		console.log("move down")
		return true
	    } else {
		console.log("can't move down piece")
		this.piece = undefined
		return false
	    }
	}
    }

    left() {
	if (!this.piece)
	    return
	var copy = helpers.copyMap(this.map)

	if (helpers.remove(copy, this.piece, this.x, this.y)) {
	    if (helpers.placeable(copy, this.piece, this.x - 1, this.y)) {
		console.log("lefteable!")
		this.x--
		this.map = copy
		console.log("LEFT");
		this.socket.emit('DISPLAY', this.map)
	    } else {
		console.log("can't move left")
	    }
	}

    }

    right() {
	if (!this.piece)
	    return
	var copy = helpers.copyMap(this.map)

	if (helpers.remove(copy, this.piece, this.x, this.y)) {
	    if (helpers.placeable(copy, this.piece, this.x + 1, this.y)) {
		console.log("lefteable!")
		this.x++
		this.map = copy
		console.log("RIGHT")
		this.socket.emit('DISPLAY', this.map)
	    } else {
		console.log("can't move right")
	    }
	}
    }

    rotate() {
	if (!this.piece)
	    return
	var copy = helpers.copyMap(this.map)

	if (helpers.remove(copy, this.piece, this.x, this.y)) {
	    this.piece.rotate()
	    if (helpers.placeable(copy, this.piece, this.x, this.y)) {
		this.map = copy

		this.socket.emit('DISPLAY', this.map)
		console.log("ROTATE")
	    } else {
		this.piece.undo();
		console.log("can't ROTATE")
	    }
	}
    }

    verify() {
	var r = helpers.fullLine(this.map, 20 - this.malus)
	
    }
}
