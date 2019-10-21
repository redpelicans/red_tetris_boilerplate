import React from 'react'
import { connect } from 'react-redux'
import Display from '../components/Display';
import Play from '../components/app/HomeButton';
import ListingRooms from './ListingRooms';
import Room from './Room';

import Button from 'react-bootstrap/lib/Button';

const AppStyle = {
  margin: "auto",
  width: "350px",
  height: "500px",
  
  display: "flex",
  flexDirection: "column",

  alignItems: "center",
  backgroundColor: 'blue'
}

const App = ({play, room}) => {
  if (!play) {
    return (
      <div style={AppStyle}>
        <h1>Red Tetris</h1>
        <Play />
      </div>
    )
  }

  if (room) {
    return (<Room />)
  }
  return (
    <div style={AppStyle}>
      <ListingRooms />
      
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    play: state.menu,
    room: state.room
  }
}

export default connect(mapStateToProps, null)(App);
