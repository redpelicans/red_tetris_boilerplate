import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

const Room = ({ room }) => {

  if (room) {
    return (
      <div>
        <h1>{room.name}</h1>
        <h3>{room.mode}</h3>
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


export default connect(mapStateToProps)(Room);
