import React from 'react';
import { connect } from 'react-redux';
import { setMenu } from '../../actions/Menu';
import { listRoom, fetch_rooms, onJoin } from '../../actions/socket'

import Button from 'react-bootstrap/lib/Button';

const playBut = ({onClick}) => (
  <Button onClick={onClick}>Play</Button>
)

const mapStateToProps = (state, ownProps) => ({
  active: false,
  style: ownProps.style
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setMenu("play", true))
    dispatch(listRoom())
    dispatch(fetch_rooms())
    dispatch(onJoin())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(playBut);
