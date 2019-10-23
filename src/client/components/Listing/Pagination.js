import React from 'react'
import { connect } from 'react-redux'

import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button'

const Pagination = ({next, prev}) => (
  <div>
    <Row>
      <Button onClick={() => prev("NEED CHANGE LISTING STRUCTURE")}variant='primary'>Prev</Button>
      <Button onClick={() => next("NEED CHANGE LISTING STRUCTURE")} variant='primary'>Next</Button>
    </Row>
  </div>
)


const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch) => ({
  next: (data) => {
    console.log(data)
  },
  prev: (data) => {
    console.log(data)
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Pagination)
