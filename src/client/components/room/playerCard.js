import React from 'react'
import { connect } from 'react-redux'

import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  
  width: "110px",
  height: "55px",
  backgroundColor: "grey",
  margin: "5px",
  paddingTop:"5px"
}

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

const lineStyle = {
  display: "flex",
  flexDirection: "row"
}

const render = (line) => {
  return <div style={lineStyle}>{ line.map((v, k) => (
    <div style={box(v)}/>
  ))}</div>
}

const box = (c) => {
  return {
    width: "10px",
    height: "10px",
    backgroundColor: color[c]
  }
}

const Card = ({ player }) => (
  <div style={style}>
    <h6>{player.name}</h6>
    <div>
      {render(player.line)}
    </div>
  </div>
)


const mapStateToProps = (state, ownProps) => ({
  player: ownProps.player
})

export default connect(mapStateToProps)(Card)
