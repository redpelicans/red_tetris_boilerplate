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

    app.listen({host, port}, () =>{
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
	socket.on("JOIN_ROOM", (data) => roomsAPI.join(data, socket))
	socket.on("CREATION", (data) => roomsAPI.create(data, socket))

	// socket.on("START", function (data) {
	//     console.log("start")


	//     const player = new Player(socket, "Browntrip")
	//     player.start(function(id) {
	// 	return get()
	//     }, null, null)

	//     var i = setInterval(function() {
	//     	if (!player.getMalus())
	// 	    clearInterval(i)
	// 	player.get()
	//     }, 10000)
	// })
	
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
