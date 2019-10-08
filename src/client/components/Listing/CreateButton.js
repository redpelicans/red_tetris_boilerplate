import React from 'react';
import { connect } from 'react-redux';
import Button from '../Button';
import { setMenu } from '../../actions/Menu'

const mapStateToProps = (state, ownProps) => ({
  active: false,
  style: ownProps.style
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setMenu("create", ownProps.state))
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Button);
