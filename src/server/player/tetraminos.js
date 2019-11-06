
const shape = {
    Bar: {
	shape: [
	    ['.', '.', '.', '.'],
	    ['C', 'C', 'C', 'C'],
	    ['.', '.', '.', '.'],
	    ['.', '.', '.', '.']
	],
	letter: 'C'
    },

    LeftL:{
	shape: [
	    ['B', '.', '.'],
	    ['B', 'B', 'B'],
	    ['.', '.', '.']
	],
	letter: 'B'
    },

    RightL: {
	shape: [
	    ['.', '.', 'O'],
	    ['O', 'O', 'O'],
	    ['.', '.', '.']
	],
	letter: 'O'
    },

    Cube: {
	shape: [
	    ['Y', 'Y'],
	    ['Y', 'Y'],
	],
	letter: 'Y'
    },

    RightZ: {
	shape: [
	    ['.', 'G', 'G'],
	    ['G', 'G', '.'],
	    ['.', '.', '.']
	],
	letter: 'G'
    },

    TShape: {
	shape: [
	    ['.', 'V', '.'],
	    ['V', 'V', 'V'],
	    ['.', '.', '.']
	],
	letter: 'V'
    },

    LeftZ: {
	shape: [
	    ['R', 'R', '.'],
	    ['.', 'R', 'R'],
	    ['.', '.', '.']
	],
	letter: 'R'
    }
}

const keys = Object.keys(shape)

function get () {
    var i =  Math.floor(Math.random() * Math.floor(7));

    return Object.assign({}, shape[keys[i]]);
}

module.exports = get
