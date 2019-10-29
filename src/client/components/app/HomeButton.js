import React from 'react';
import { connect } from 'react-redux';
import { setMenu } from '../../actions/Menu';
//import { listRoom, fetch_rooms, onJoin } from '../../actions/socket'
import { onCreation, onFetch, emitFetch } from '../../actions/listing'
import { setInterface } from '../../actions/menu'

import { onJoined, onQuit, onHost, onPlayers, onDisplay, emitMove } from '../../actions/room'

import Button from 'react-bootstrap/lib/Button';

const playBut = ({style, onClick}) => (
    <Button onClick={onClick}>Play</Button>
)

const mapStateToProps = (state, ownProps) => ({
  active: false,
  style: ownProps.style
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setInterface("LISTING"))
    dispatch(onCreation())
//    dispatch(listRoom())
    //    dispatch(fetch_rooms())
    dispatch(onFetch())
    dispatch(emitFetch({skip: 0, limit: 5}))
    dispatch(onJoined())
    dispatch(onHost())
    dispatch(onPlayers())
    dispatch(onDisplay())
    dispatch(onQuit())

    window.addEventListener('keydown', function (e) { // replace this event
      console.log(e.keyCode)
      var key = e.keyCode
      if (key == 38) { // UP
        dispatch(emitMove("UP"))
      } else if (key == 39) { // RIGHT
        dispatch(emitMove("RIGHT"))
      } else if (key == 40) { // DOWN
        dispatch(emitMove("DOWN"))
      } else if (key == 37) { // LEFT
        dispatch(emitMove("LEFT"))
      } else if (key == 32) { // SPACE
        dispatch(emitMove("SPACE"))
      }
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(playBut);
