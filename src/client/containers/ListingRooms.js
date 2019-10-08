import React from 'react';
import { connect } from 'react-redux';
import { CreateForm, CreateButton, List } from '../components/Listing'

const ContainerStyle = {
  
}

const Rooms = ({ create }) => {

  console.log(create)
  if (create) {
    return (
      <div>
        <CreateButton state={false}>Back</CreateButton>
        <h1>Create Room</h1>
        <CreateForm />
      </div>
    )
  }
  
  return (
    <div style={ContainerStyle}>
      <div style={{display: "inline"}}>
        Listing Room
        <CreateButton state={true}>New</CreateButton>
        <List />
      </div>

      <div>
        <h3>Control Page</h3>
      </div>
    </div>
  )
}



const mapStateToProps = (state) => {
  return {
    create: state.menu.create,
  }
}

export default connect(mapStateToProps)(Rooms);
