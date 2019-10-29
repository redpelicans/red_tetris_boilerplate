import React from 'react'
import { connect } from 'react-redux'
import { emitFetch, onPrev, onNext } from '../../actions/listing.js'

import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button'

const Pagination = ({items, next, prev}) => (
  <div>
    <Row>
      <Button onClick={() => prev(items)}variant='primary'>Prev</Button>
      <Button onClick={() => next(items)} variant='primary'>Next</Button>
    </Row>
  </div>
)


const mapStateToProps = (state) => ({
  items: state.rooms
  
})

const mapDispatchToProps = (dispatch) => ({
  next: (data) => {
    console.log(data)
    if (data.start + 5 < data.nbr) {
      console.log("increment start at +5")
      dispatch(onNext(5))
    } else {
      console.log("fetching data from server")
      dispatch(emitFetch({limit: 5, skip: data.nbr}))
    }
    
  },
  prev: (data) => {
    console.log(data)
    if (data.start > 0) {
      console.log("decrement data.start")
      dispatch(onPrev(5))
    } else {
      console.log("do nothing")
    }
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Pagination)
