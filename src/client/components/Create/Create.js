import React from 'react';
import { connect } from 'react-redux';

import { emitJoin } from '../../actions/socket';
import { isJoining, onPlayers } from '../../actions/rooms';
// import { isCreating } from '../../actions/listing'
import { isCreating, onCreation, emitCreate } from '../../actions/create'

import Button from 'react-bootstrap/lib/Button'

const Create = ({ isCreating, onSubmit, user}) => (
  <form onSubmit={(e) => onSubmit(e, user)}>
    <label id="room">Room's Name</label><br/>
    <input type="text" id="room" name="room" />
    <h2>Game Mode</h2>
    <input type="radio" name="mode" defaultValue="classic"/>Classic<br/>
    <input type="radio" name="mode" defaultValue="invisible"/>Invisible Piece<br/>
    { isCreating ? <Button disabled>Creating...</Button> :
      <Button type="Submit" defaultValue="Submit">Create</Button>
    }
  </form>
)

const handleForm = (e) => {
  e.preventDefault();
  var room = { }

  room["name"] = e.target.room.value
  room["mode"] = e.target.mode.value

  console.log("room:", room)

  return room

}

const mapStateToProps = (state) => ({
  isCreating: state.isCreating,
  user: state.user
  
})
const mapDispatchToProps = (dispatch, e) => ({
  onSubmit: (e, user) => {
    console.log("here")
    var room = handleForm(e)
    var data = {
      user,
      room
    }
    dispatch(isCreating())
    dispatch(onCreation())
    console.log(data)
    dispatch(emitCreate(data))
    
//    dispatch(isJoining(true, r))
//    dispatch(emitJoin(r))
    // dispatch(onPlayers())
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Create);
