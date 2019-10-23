import React from 'react'
import { connect } from 'react-redux'
import { Component } from '../components/Create'
import { setInterface } from '../actions/menu'

import Button from 'react-bootstrap/lib/Button'

const Create = ({ onClick }) => {


  return (
    <div>
      <Button onClick={onClick}>Back</Button>
      <Component />
    </div>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

  onClick: () => {
    // remove isCreating if true
    console.log("GO BACK")
    dispatch(setInterface("LISTING"))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Create)
