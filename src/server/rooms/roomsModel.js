const mongoose = require('mongoose');

const Schema = mongoose.Schema

const roomSchema = new Schema({
    id: String,
    title: String,
    mode: String,
    open: Boolean
});


roomSchema.statics = {
    async create(newRoom) {
	try {
	    const dupliacte = this.findOne({ id: newRoom.id })
	    if (!duplicate) {
		return new Error("room already exist")
	    }
	    const p = await newRoom.save()
	    return p.Object()
	} catch (err) {
	    return Promise.reject(err)
	}
    },

    async readOne(id) {
	try {
	    const room = await this.findOne({ id: id }).exec()
	    if (!room) {
		return new Error("room not found")
	    }
	    return room.toObject();
	} catch(err) {
	    return Promise.reject(err);
	}
    },
    
    async read(query, fields, skip, limit) {
	try {
	    const rooms = await this.find(query, fields).skip(skip).limit(limit).sort({id: 1}).exec();
	    if (!rooms.length) {
		return []
	    }
	    return rooms.map(room => room.toObject())
	} catch(err) {
	    return Promise.reject(err)
	}
    },

    async update(id, roomUpdate) {
	try {
	    
	} catch (err) {
	    return Promise.reject(err)
	}
    }
}

module.exports = {
    Rooms: mongoose.model('Rooms', roomSchema),
}
