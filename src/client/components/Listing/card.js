import React from 'react';
import { connect } from 'react-redux';
import { emitJoin } from '../../actions/socket'
import { isJoining, onPlayers } from '../../actions/rooms'
import { onLoading, onJoined } from '../../actions/listing'

import Card from 'react-bootstrap/lib/Card';
import Button from 'react-bootstrap/lib/Button'
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const CardStyle = {
  display: "flex",
  marginTop: "5px",
  width: "245px",
  height: "50px",
  backgroundColor: "grey",
  justifyContent: "center"
}

const colStyle = {
  align: "center"
}
const room = ({ rooms, id, onClick }) => {
  var room = rooms[id]
  if (room) {
    return (
      <div style={CardStyle} className="rounded shadow">
        <Col className=''>
          <Row>
            <p>{room.name}</p>
          </Row>
          <Row>
            {room.mode}
          </Row>
        </Col>
        <Col sm={4} className='m-auto'>
          {room.isLoading ?
           <Button disabled={true}>Loading...</Button> : <Button onClick={onClick} variant='success'>join</Button>
          }
        </Col>
      </div>
    )
  }
  return null
}



const mapStateToProps = (state, ownProps) => ({
  rooms: state.rooms,
  id: ownProps.id
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    console.log("Jeoining the room:", ownProps.room, ownProps.id)
    dispatch(onLoading(ownProps.id))
    dispatch(onJoined())
    dispatch(emitJoin(ownProps.room))
    // dispatch(isJoining(true, ownProps.room))
    // dispatch(onPlayers())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(room);
