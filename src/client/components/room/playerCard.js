import React from 'react'
import { connect } from 'react-redux'

const style = {
  width: "150px",
  height: "50px",
  backgroundColor: "violet",
  margin: "5px"
}

const Card = ({ player }) => (
  <div style={style}>
    <h2>{player}</h2>
  </div>
)


const mapStateToProps = (state, ownProps) => ({
  player: ownProps.player
})

export default connect(mapStateToProps)(Card)
