import React from 'react';
import { connect } from 'react-redux';
import { emitJoin } from '../../actions/socket'

import Card from 'react-bootstrap/lib/Card';
import Button from 'react-bootstrap/lib/Button'
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const CardStyle = {
  display: "flex",
  marginTop: "5px",
  width: "200px",
  height: "50px",
  backgroundColor: "grey",
  justifyContent: "center"
}

const room = ({ room, onClick }) => (
  <div style={CardStyle} className="rounded">
    <Row>
      <Col>
        <Row>
          <h5>{room.name}</h5>
          <h6>{room.mode}</h6>
        </Row>
      </Col>
      <Col>
        <Button onClick={onClick} variant='success'>join</Button>
      </Col>
    </Row>
  </div>
)


const mapStateToProps = (state, ownProps) => ({
  room: ownProps.room
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    console.log("Joining the room:", ownProps.room)
    dispatch(emitJoin(ownProps.room))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(room);
