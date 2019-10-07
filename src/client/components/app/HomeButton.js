import { connect } from 'react-redux';
import Button from '../Button';
import { setMenu } from '../../actions/Menu';
import { listRoom, fetch_rooms, onJoin } from '../../actions/socket'

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

export default connect(mapStateToProps, mapDispatchToProps)(Button);
