import React from 'react';
import { connect } from 'react-redux';
import { CreateButton, List, Pagination } from '../components/Listing'
import { setInterface } from '../actions/menu'

import Button from 'react-bootstrap/lib/Button'


const ContainerStyle = {
  
}

const Rooms = ({ Create }) => {  
  return (
    <div style={ContainerStyle}>
      <div style={{display: "inline"}}>
        <h4 className="text-light">Listing Room</h4>

        <Button onClick={Create} variant="dark">New</Button>
        <List />
      </div>

      <div>
        <Pagination />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
//    create: state.create,
  }
}

const mapDispatchToProps = (dispatch) => ({
  Create: () => {
    dispatch(setInterface("CREATE"))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
