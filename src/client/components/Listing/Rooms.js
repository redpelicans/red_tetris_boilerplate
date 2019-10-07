import React from 'react';
import { connect } from 'react-redux';
import Card from './card';


const ListStyle = {
  width: "250px",
  height: "400px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "orange"
  
}

const List = ({rooms, style, onClick}) => {
  if (!rooms) {
    return (
      <div style={ListStyle}>
        <h2>No rooms available</h2>
      </div>
    )
  }
  console.log("????")
  return (
    <div style={ListStyle}>
      {rooms.map(r => (<Card room={r}/>))}
    </div>
  )
  
}


const mapStateToProps = (state, ownProps) => ({
  rooms: state.rooms,
  style: ownProps.style
})

export default connect(mapStateToProps, null)(List);
