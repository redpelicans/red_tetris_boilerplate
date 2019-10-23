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
  console.log()
  if (!rooms) {
    return (
      <div style={ListStyle}>
        <h2>No rooms available</h2>
      </div>
    )
  }
  console.log("rooms list: ", rooms)
  return (
    <div style={ListStyle}>
      {rooms.map((r, k) => (<Card key={k} id={k} room={r}/>))}
    </div>
  )
  
}


const mapStateToProps = (state, ownProps) => ({
  rooms: state.rooms,
  style: ownProps.style
})

export default connect(mapStateToProps, null)(List);
