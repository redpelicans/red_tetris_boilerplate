
class Room {
    constructor() {
	this.name = name;
	this.open = true;

	this.host = undefined // maybe the entire socket instead ?

	this.users = {};

//	var p = new Player(socket)

    }

    async join(socket) {
	var player, user
	console.log("Room: new player:", user);
	if (!this.open) {
	    socket.emit("unavailaible", { msg: "Room is closed"})
	    return 
	}
	var player = new Player(socket)
	this.users[user.name] = player

	socket.emit('data', { type: "user" })
	try {
	    user = await socket.on('data', function(data) {
		if (data.type === "user") {
		    return data.user
		}
	    })
	} catch (err) {
	    console.log(err);
	}
	
	this.socket.on('disconnect', function () {
	    // verify host user
//	    if this.host.id ===
	    delete this.users[user.name]
	}.bind(this))
    }

    start() {
	this.open = false
    }


    Control() {
	this.host.on("start", function() {
	    console.log("Room Game Started!");
	    if (this.open)
		this.start();
	}.bind(this))

    }
}
