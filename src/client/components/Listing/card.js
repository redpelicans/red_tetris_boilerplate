import React from 'react';
import { connect } from 'react-redux';
import { emitJoin } from '../../actions/socket'

const CardStyle = {
  display: "flex",
  marginTop: "5px",
  width: "200px",
  height: "50px",
  backgroundColor: "grey"
}

const Card = ({ room, onClick }) => (
  <div style={CardStyle}>
      <h1>{room.name}</h1>
      <h5>{room.mode}</h5>
    <button onClick={onClick}>Join</button>
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  room: ownProps.room
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    // Join rooms
    console.log("Joining the room:", ownProps.room)
    dispatch(emitJoin(ownProps.room))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Card);
