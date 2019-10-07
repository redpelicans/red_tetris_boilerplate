import { connect } from 'react-redux';
import { setMenu } from '../actions/Menu';
import  Button  from './Button'

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.menu === state.menu,
  style: ownProps.style
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setMenu(ownProps.menu))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Button);
