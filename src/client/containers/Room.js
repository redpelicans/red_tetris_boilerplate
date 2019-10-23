import React from 'react';
import { connect } from 'react-redux';

import { Display, Players, Host } from '../components/room'
import { emitQuit } from '../actions/room'

import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Button from 'react-bootstrap/lib/Button'

const AppStyle = {
  margin: "auto",
  width: "350px",
  height: "500px",
  
  display: "flex",
  flexDirection: "column",

  alignItems: "center",
  backgroundColor: 'blue'
}

const Room = ({ room, onLeave }) => {

  if (room) {
    return (
      <div>
        <Row>
          <Col>
            <div style={AppStyle}>
              <Row className="w-100"><h1>{room.name}</h1><Button onClick={onLeave} variant='danger'>Leave</Button></Row>
              {
                room.isJoining ?
                  <h2>Preparing session</h2> :
                  <Row>
                    <Host disabled={false} />
                    <Display/>
                  </Row>
              }
            </div>
          </Col>
          <Col sm={4}>
            <Players />
          </Col>
        </Row>

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
  onLeave: () => {
    console.log("quit lobby!")
    dispatch(emitQuit())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Room);
