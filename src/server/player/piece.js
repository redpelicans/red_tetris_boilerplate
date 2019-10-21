import helpers from './helpers'

class Piece {
    
    constructor(tetraminos) {
	this.shape = tetraminos.shape;
	this.charac = tetraminos.letter;
    }
    

    rotate() {
	var rotation = this.shape.reverse()
	this.shape = rotation[0].map((column, index) => (
	    rotation.map(row => row[index])
	));
	

    }

    undo() {
	var undo = helpers.copyMap(this.shape);
	console.log(undo);
	var rotation = undo[0].map((column, index) => (
	    undo.map(row => row[index])
	));

	this.shape = rotation.reverse();
    }
}


function find(arr) {
    console.log(arr);
    for (var i = 0; i < arr.length; i++) {
	if (arr[i] !== '.') {
	    console.log(arr[i]);
	    return arr[i]
	}
    }
    return null;
}
module.exports = Piece;
