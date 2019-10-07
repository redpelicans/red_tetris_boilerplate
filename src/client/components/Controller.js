import { connect } from 'react-redux';

const Controller = (socket, listening) => {
  console.log("?????")

  var actions = function (e) {
    console.log(e.keyCode)
    if (e.keyCode === 37) {
      // LEFT
      socket.emit('controller', {type: 'left'})
    } else if (e.keyCode === 38) {
      // UP
      socket.emit('controller', {type: 'up'})
    } else if (e.keyCode === 39) {
      // RIGHT
      socket.emit('controller', {type: 'right'})
    } else if (e.keyCode === 40) {
      // DOWN
      socket.emit('controller', {type: 'down'})
    } else if (e.keyCode === 32) {
      // SPACE
      socket.emit('controller', { type: 'space'});
    } else if (e.keyCode === 80) {
      socket.emit('controller', { type: 'pause' });
    } else if (e.keyCode === 82) {
      socket.emit('controller', { type: 'resume' });
    }
  }
  if (listening) {
    window.addEventListener('keydown', actions)
  } else {
    window.removeEventListener('keydown', actions);
  }
}

export default Controller;
