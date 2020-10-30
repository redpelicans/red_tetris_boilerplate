import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

export default function Button({ onClick, className, children, ...rest }) {
  return (
    <button
      {...rest}
      className={className}
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string,
};
