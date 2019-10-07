import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ style, active, children, onClick }) => (
  <button
    onClick={onClick}
    disabled={active}
    style={style}
  >
    {children}
  </button>
);

Button.propTypes = {
  style: PropTypes.object,
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Button;
