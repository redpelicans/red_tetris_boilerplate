import React from 'react';
import { connect } from 'react-redux';

import { join } from '../../actions/socket';

const Create = ({onSubmit}) => (
  <form onSubmit={(e) => onSubmit(e)}>
    <label id="room">Room's Name</label><br/>
    <input type="text" id="room" name="room" />
    <h2>Game Mode</h2>
    <input type="radio" name="mode" defaultValue="classic"/>Classic<br/>
    <input type="radio" name="mode" defaultValue="invisible"/>Invisible Piece<br/>
    <input type="Submit" defaultValue="Submit"/>
  </form>
)

const handleForm = (e) => {
  e.preventDefault();
  var room = {}
  
  room["name"] = e.target.room.value
  room["mode"] = e.target.mode.value

  console.log("room:", room)

  return room

}

const mapDispatchToProps = (dispatch, e) => ({
  onSubmit: (e) => {
    console.log("here")
    var r = handleForm(e)
    dispatch(join(r))
  }
})
export default connect(null, mapDispatchToProps)(Create);
