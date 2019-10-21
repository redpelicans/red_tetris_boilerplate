import React from 'react';
import { connect } from 'react-redux';
import { emitJoin } from '../../actions/socket'
import { isJoining, onPlayers } from '../../actions/rooms'

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
const room = ({ room, onClick }) => (
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
        <Button onClick={onClick} variant='success'>join</Button>
      </Col>
  </div>
)


const mapStateToProps = (state, ownProps) => ({
  room: ownProps.room
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    console.log("Joining the room:", ownProps.room)
    dispatch(emitJoin(ownProps.room))
    dispatch(isJoining(true, ownProps.room))
    dispatch(onPlayers())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(room);
