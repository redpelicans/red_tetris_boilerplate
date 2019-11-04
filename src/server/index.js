import fs  from 'fs'
import debug from 'debug'
import connectToDatabase from './config';
import { roomsAPI } from './rooms'
import Game from './player/game'
var url = require('url');


const logerror = debug('tetris:error')
, loginfo = debug('tetris:info')

const initApp = (app, params, cb) => {
    const {host, port} = params
    const handler = (req, res) => {
	const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html'
	fs.readFile(__dirname + file, (err, data) => {
	    if (err) {
		logerror(err)
		res.writeHead(500)
		return res.end('Error loading index.html')
	    }
	    res.writeHead(200)
	    res.end(data)
	})
    }
    
    app.on('request', handler)

    app.listen({host, port}, () => {
	loginfo(`tetris listen on ${params.url}`)
	cb()
    })
}

connectToDatabase("mongodb://localhost:27017/rooms")

import Player from './player/player'
import { get } from './player/tetraminos'

const initEngine = io => {
    io.on('connection', function(socket){
	loginfo("Socket connected: " + socket.id)
	
	socket.on('action', (action) => {
	    console.log("Action:", action)
	    if(action.type === 'server/ping') {
		socket.emit('action', { type: 'pong' })
	    }
	});

	socket.on("FETCH", (data) => roomsAPI.fetch(data, socket))
	socket.on("JOIN", async function(data) {
	    var obj = await roomsAPI.join(data, socket)
	    var ctrl = (data) => {
		obj.player.controller(data)
	    }
	    var start = (data) => {
		obj.room.startGame(data, socket)
	    }

	    var leave = (data) => {
		socket.removeListener("CONTROLLER", ctrl)
		socket.removeListener("START", start)
		socket.removeListener("QUIT", leave)
		obj.room.leave(socket)
	    }
	    socket.on("CONTROLLER", ctrl)
	    socket.on("START", start)
	    socket.on("QUIT", leave)
	})

	socket.on("ROOM", function (action) {
	    switch (action.type) {
	    case 'join':
		if (action.room.id) {
		    console.log("find this room:", aciton.room.id)
		}
		/*
		** Find room by id that return player controller controller
		** Init socket.on('CONTROLLER')
		*/
	    case 'leave':
		/*
		** socket.removeListener("CONTROLLER")
		*/
	    case 'controller':
		/*
		** Or directly handle controller here ??
		*/
	    default:
		return ;
	    }
	})

	socket.on("CREATION", (data) => roomsAPI.create(data, socket))
		
	socket.on('disconnect', function() {
	    loginfo('Socket disconnected: ' + socket.id);

	})
    })
}

export function create(params){
    const promise = new Promise( (resolve, reject) => {
	const app = require('http').createServer()
	initApp(app, params, () => {
	    const io = require('socket.io')(app)
	    const stop = (cb) => {
		io.close()
		app.close( () => {
		    app.unref()
		})
		loginfo(`Engine stopped.`)
		cb()
	    }	
	    initEngine(io)
	    resolve({stop})
	})
    })
    return promise
}
