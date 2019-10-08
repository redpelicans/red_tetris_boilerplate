import React from 'react'
import { connect } from 'react-redux';
import PlayerCard from './playerCard'

const Players = ({ players }) => {
  if (!players) {
    return (<div>No one</div>)
  }
  console.log(players)
  return (
    <div>
      {players.map(p => (
        <PlayerCard player={p}/>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    players: state.room.players
  }
}

export default connect(mapStateToProps)(Players)
