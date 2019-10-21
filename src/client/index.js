import React from 'react'
import ReactDOM from 'react-dom'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import {storeStateMiddleWare} from './middleware/storeStateMiddleWare'
import TetrisApp from './reducers'
import App from './containers/app'


import socketMiddleware from './middleware/socketMiddleware'


const initialState = {
  menu: {
    play: true,
  },
  room: {
    name: "test",
    mode: "classic",
    host: true,
//    players: ["browntrip"],
    display: [
      ['C', '.', '.', '.', '.', '.', '.', '.', '.', 'O'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['V', '.', '.', '.', '.', '.', '.', '.', '.', 'G'],

    ],
    players: [
      {
	name: "browntrip",
	line: ['V', '.', '.', '.', '.', '.', '.', '.', '.', 'G'],
      }
    ]
  }
}

function accessRoom(location) {
    console.log(location)
    var re = new RegExp('\#(.+)')
    console.log("REGEXP:", re.exec(location)[1]);
    
}

const store = createStore(
  TetrisApp,
  initialState,
  applyMiddleware(thunk, createLogger(), socketMiddleware())
)

ReactDOM.render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('tetris'))

