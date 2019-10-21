import React from 'react'
import { connect } from 'react-redux'
import { startGame, emitStart, onDisplay, emitMove, onPlayers } from '../../actions/room'
import Button from 'react-bootstrap/lib/Button'

const host = ({ host, start, onClick }) => {
  if (!host) {
    return null
  }
  
  return (
    <div>
      <Button onClick={onClick} disabled={start == true ? true : false }>Start</Button>
    </div>
    
  )
}


const mapStateToProps = (state, ownProps) => ({
  host: state.room.host,
  start: state.room.start
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(emitStart())
    dispatch(onDisplay())
    dispatch(onPlayers())
    window.addEventListener('keydown', function (e) {
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

    dispatch(startGame(true))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(host)
