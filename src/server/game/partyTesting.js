const Party = require('./party');
const Piece = require('./tetraminos/piece');
const Shape = require('./tetraminos/shape');
const helpers = require('./helpers');

var party = new Party();

var piece = new Piece(Shape.RightL, 'A');

party.add(piece);

helpers.showMap(party.map)
party.down(true);
helpers.showMap(party.map)

piece = new Piece(Shape.Bar, 'B');
party.add(piece);
helpers.showMap(party.map)

party.down(true);
helpers.showMap(party.map);
party.left();
helpers.showMap(party.map);

party.left();
helpers.showMap(party.map);

party.left();
helpers.showMap(party.map);
party.down(true);
party.verifyLine();
helpers.showMap(party.map);

piece = new Piece(Shape.LeftL, 'C');
party.add(piece);
helpers.showMap(party.map);
party.right();

party.right();

party.right();
helpers.showMap(party.map);

party.down(true);
helpers.showMap(party.map);

party.verifyLine();
helpers.showMap(party.map);
