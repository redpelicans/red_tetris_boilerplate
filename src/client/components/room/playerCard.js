import React from 'react'
import { connect } from 'react-redux'

const style = {
  width: "100px",
  height: "40px",
  backgroundColor: "violet",
  margin: "5px"
}

const Card = ({ player }) => (
  <div style={style}>
    <p>{player}</p>
  </div>
)


const mapStateToProps = (state, ownProps) => ({
  player: ownProps.player
})

export default connect(mapStateToProps)(Card)
