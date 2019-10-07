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

function placeable(map, piece, map_x, map_y) {
    for(var y = 0; y < piece.shape.length; y++) {
	for(var x = 0; x < piece.shape[y].length; x++) {
	    if (piece.shape[y][x] === piece.charac) {
		if (!map[map_y + y]) {
		    return false
		} else if (map[map_y + y][map_x + x] === '.') {
		    map[map_y + y][map_x + x] = piece.shape[y][x];
		} else {
		    return false;
		}
	    }
	}	
    }
    return true;
}

function remove(map, piece, map_x, map_y) {
    for (var y = 0; y < piece.shape.length; y++) {
	
	for(var x = 0; x < piece.shape[y].length; x++) {
	    if (piece.shape[y][x] === piece.charac) {
		if (!map[map_y + y][map_x + x]) {
		    return false;
		} else if (map[map_y + y][map_x + x] === piece.charac) {
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

module.exports = {
    newMap,
    copyMap,
    showMap,
    remove,
    placeable    
}
