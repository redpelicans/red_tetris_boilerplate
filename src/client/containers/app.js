import React from 'react'
import { connect } from 'react-redux'
import Display from '../components/Display';
import Play from '../components/app/HomeButton';
import ListingRooms from './ListingRooms';
import Room from './Room';
import Create from './Create'

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

const App = ({ menu }) => {
  if (!menu) {
    return (
      <div style={AppStyle}>
        <h1>Red Tetris</h1>
        <Play />
      </div>
    )
  }

  if (menu === 'ROOM') {
    return (<Room />)
  } else if (menu === 'LISTING') {
    return (
      <div style={AppStyle}>
        <ListingRooms />
        
      </div>
    )
  } else if (menu === 'CREATE') {
    return (
      <div style={AppStyle}>
        <Create />
      </div>
    )
  }
  return null
}

const mapStateToProps = (state) => {
  return {
    menu: state.menu,
  }
}

export default connect(mapStateToProps, null)(App);
