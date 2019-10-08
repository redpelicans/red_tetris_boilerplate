import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { Players } from '../components/room'

const Room = ({ room }) => {

  if (room) {
    return (
      <div>
        <h1>{room.name}</h1>
        <h3>{room.mode}</h3>
        {room.isJoining ? <h2>Preparing session</h2> : null}
        <Players />
      </div>
    )
  }
  return null
}

const mapStateToProps = (state) => {
  return {
    room: state.room
  }
}

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps)(Room);
