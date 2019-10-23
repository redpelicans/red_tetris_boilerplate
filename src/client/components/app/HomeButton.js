import React from 'react';
import { connect } from 'react-redux';
import { setMenu } from '../../actions/Menu';
import { listRoom, fetch_rooms, onJoin } from '../../actions/socket'
import { onCreation, onFetch, emitFetch } from '../../actions/listing'
import { setInterface } from '../../actions/menu'

import { onJoined, onQuit, onHost, onPlayers, onDisplay } from '../../actions/room'

import Button from 'react-bootstrap/lib/Button';

const playBut = ({style, onClick}) => (
    <Button onClick={onClick}>Play</Button>
)

const mapStateToProps = (state, ownProps) => ({
  active: false,
  style: ownProps.style
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setInterface("LISTING"))
    dispatch(onCreation())
//    dispatch(listRoom())
    //    dispatch(fetch_rooms())
    dispatch(onFetch())
    dispatch(emitFetch())
    dispatch(onJoined())
    dispatch(onHost())
    dispatch(onPlayers())
    dispatch(onDisplay())
    dispatch(onQuit())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(playBut);
