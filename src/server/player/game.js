import {     newMap,
	     copyMap,
	     showMap,
	     remove,
	     placeable,
	     fillLine,
	     fullLine,
	     rotateClockwise,
	     rotateUndo
       } from './helpers'


class Game {
    constructor() {
	this.map = newMap()
	this.piece = undefined
	this.x = 0
	this.y = 0

	this.lock = false;
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
	this.piece = JSON.parse(JSON.stringify(piece))
	this.x = Math.round((10 - piece.shape[0].length) / 2);
	this.y = 0

	var cpy = copyMap(this.map)
	console.log(this.piece)
	if (placeable(cpy, this.piece, this.x, this.y)) {
	    this.map = cpy
	    showMap(this.map)
	    return true
	} else {
	    return false
	}
    }


    setMalus() {
	this.malus++
	var copy = copyMap(this.map)
	if (this.piece)
	    remove(copy, this.piece, this.x, this.y)
		
	var a = copy[0].find(function(c) {
	    return c != '.'
	})
	if (a)
	    return false
	fillLine(copy, 20 - this.malus)
	if (this.piece) {
	    var finalMap = copyMap(copy)
	    placeable(finalMap, this.piece, this.x, this.y -1)
	    if (!placeable(copy, this.piece, this.x, this.y)) {
//		console.log("Can't replace piece, game over!")
//		console.log(copy)
		this.map = finalMap
	    } else {
		this.map = copy
	    }
	}
	showMap(this.map)
	return true
    }


    place() {
	if (this.lock)
	    return 
	if (!this.piece)
	    return false
	var copy = copyMap(this.map)
	remove(copy, this.piece, this.x, this.y)
	while(placeable(copy, this.piece, this.x, this.y + 1)) {
	    this.y++
	    this.map = copyMap(copy)
	    remove(copy, this.piece, this.x, this.y)
	}
	delete this.piece
	return true
    }
    
    down(instant = false) {
	if (this.lock)
	    return
	if (!this.piece) {
	    console.log("piece is undefined")
	    return false
	}
	var copy = copyMap(this.map)
	if (remove(copy, this.piece, this.x, this.y)) {
	    if (placeable(copy, this.piece, this.x, this.y+1)) {
		this.y++
		this.map = copy
		showMap(this.map)
		return true
	    } else {
		console.log("//////can't move doown piece\\\\\\")
		showMap(this.map)
		console.log(this.piece, this.x, this.y)
		delete this.piece
		return false
	    }
	}
    }

    left() {
	if (!this.piece)
	    return
	var copy = copyMap(this.map)

	if (remove(copy, this.piece, this.x, this.y)) {
	    if (placeable(copy, this.piece, this.x - 1, this.y)) {
		console.log("lefteable!")
		this.x--
		this.map = copy
		showMap(this.map)
	    }
	}

    }

    right() {
	if (!this.piece)
	    return
	var copy = copyMap(this.map)

	if (remove(copy, this.piece, this.x, this.y)) {
	    if (placeable(copy, this.piece, this.x + 1, this.y)) {
		this.x++
		this.map = copy
		showMap(this.map)
	    }
	}
    }

    rotate() {
	if (!this.piece)
	    return
	this.lock = true;
	var copy = copyMap(this.map)
	var piece = Object.assign({}, this.piece)
	
	if (remove(copy, piece, this.x, this.y)) {
	    rotateClockwise(piece)
	    if (placeable(copy, piece, this.x, this.y)) {
		this.map = copy
		this.piece = piece
		showMap(this.map)		
	    }
	}
	this.lock = false;
    }

    verify() {
	var copy = copyMap(this.map)
	var r = fullLine(this.map, 20 - this.malus)
	if (r.length > 0) {
	    for (var i = r.length - 1; i >= 0; i--) {
		copy.splice(r[i], 1)
		copy.splice(0, 0, [ ".", ".", ".", ".", ".", ".", ".", ".", ".", "." ])
	    }
	    this.map = copy
	    showMap(this.map)
	    return r.length
	}
	return 0
    }
}


module.exports = Game
