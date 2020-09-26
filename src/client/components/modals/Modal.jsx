import React from "react";
import FlexBox from "components/flexbox/FlexBox";
import PropTypes from "prop-types";

export default function Modal({ children, className = "" }) {
  return (
    <FlexBox className="modal fixed inset-0 items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-25" onClick={close} />
      <div className={"relative " + className}>{children}</div>
    </FlexBox>
  );
}

Modal.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};
