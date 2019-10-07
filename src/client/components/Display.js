import React from 'react'
import { connect } from 'react-redux';

const color = {
  ".": "Black",
  C: "Cyan",
  B: "Blue",
  O: "Orange",
  Y: "Yellow",
  G: "Green",
  V: "Violet",
  R: "Red"
}


const box = (c) => {
  return {
    width: "20px",
    height: "20px",
    backgroundColor: color[c]
  }
}

const styleBox = (order) => {
  return {
    width: "20px",
    height: "20px",
    backgroundColor: "black",
    order: order
  }
}

const DivLine = {
  display: "flex",
  flexDirection: "row"
}

const renderLine = (line) => {
  return <div style={DivLine}>{ line.map((v, k) => (
    <div style={box(v)}/>
  )) }</div>  
}

const Display = ({ data }) => {

  if (!data) {
    return null;
  }
  
  return (
    <div>
      {data.ground.map((v, k) => (renderLine(v)))}
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    data: state.map
  }
}


export default connect(mapStateToProps)(Display);
