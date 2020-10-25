import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

export default function Button({ onClick, name, className, ...rest }) {
  return (
    <div
      className={className}
      onClick={() => {
        onClick;
      }}
    >
      {name}
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string,
};
