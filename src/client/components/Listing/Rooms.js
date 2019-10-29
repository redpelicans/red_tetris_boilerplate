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

const List = ({rooms, start, style, onClick}) => {
  console.log(rooms)
  if (!rooms) {
    return (
      <div style={ListStyle}>
        <h2>No rooms available</h2>
      </div>
    )
  }
  console.log("rooms list: ", rooms)
  if (rooms["list"]) {
    var render = []
    for (var i = rooms.start; i < rooms.start + 5 && i < rooms.nbr; i++) {
      render.push({ id: i, room: rooms.list[i] })
    }
    console.log(render)
    return (
      <div style={ListStyle}>
        {render.map((v, k) => (<Card key={k} id={v.id} room={v.room}/>))}
      </div>
    )
  }
  return null
}


const mapStateToProps = (state, ownProps) => ({
  rooms: state.rooms,
  style: ownProps.style
})

export default connect(mapStateToProps, null)(List);
