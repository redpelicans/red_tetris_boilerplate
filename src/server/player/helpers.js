function newMap() {
    var map = new Array(20);
    
    for(var i = 0; i < 20; i++) {
	map[i] = [ ".", ".", ".", ".", ".", ".", ".", ".", ".", "." ];
    }

    return map;
}

function showMap(map) {
    for (var i = 0; i < map.length; i++) {
	console.log(map[i].join(''));
    }
}

function placeable(map, piece, mapX, mapY) {
    console.log("position", mapX, mapY)
    for(var y = 0; y < piece.shape.length; y++) {
	console.log(piece.shape[y].length)
	for(var x = 0; x < piece.shape[y].length; x++) {
	    if (piece.shape[y][x] === piece.letter) {
		if (!map[mapY + y]) {
		    return false
		} else if (map[mapY + y][mapX + x] === '.') {
		    map[mapY + y][mapX + x] = piece.shape[y][x];
		    console.log("HNNNNN")
		}
	    }
	}	
    }
    return true;
}

function remove(map, piece, map_x, map_y) {
    for (var y = 0; y < piece.shape.length; y++) {
	
	for(var x = 0; x < piece.shape[y].length; x++) {
	    if (piece.shape[y][x] === piece.letter) {
		if (!map[map_y + y][map_x + x]) {
		    return false;
		} else if (map[map_y + y][map_x + x] === piece.letter) {
		map[map_y + y][map_x + x] = '.';
		}
	    }
	}
    }
    return true;
	
}

function copyMap(matrix) {
    var newMap = matrix.map(function(arr) { return arr.slice()});

    return newMap
}

function fillLine(map, pos) {

    map.splice(0, 1) // need verification if the line is empty, if not down piece and continue
    map.push(['M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M'])

}


function fullLine(map, max) {
    var remove = []
    for (var i = max - 1; i > 0; i--) {
	if (!map[i].find(full)) {
	    console.log("Removeable")
	    remove.push(i)
	}
    }
    return remove
}

function full(value) {
    return value === '.'
}


function rotateClockwise(piece) {
    var rotation = piece.shape.reverse()
    piece.shape = rotation[0].map((v, k) => (
	rotation.map(row => row[k])
    ))
}

function rotateUndo(piece) {
    var undo = helpers.copyMap(piece.shape)
    var rotation = undo[0].map((v, k) => (
	undo.map(row => row[k])
    ))
}

module.exports = {
    newMap,
    copyMap,
    showMap,
    remove,
    placeable,
    fillLine,
    fullLine,
    rotateClockwise,
    rotateUndo
    
}
