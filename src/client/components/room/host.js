import React from 'react'
import { connect } from 'react-redux'
import { startGame, emitStart, onDisplay, emitMove, onPlayers } from '../../actions/room'
import Button from 'react-bootstrap/lib/Button'

const host = ({ host, start, onClick }) => {
  console.log("YOOOOOe", host)
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
    dispatch(startGame(true))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(host)
