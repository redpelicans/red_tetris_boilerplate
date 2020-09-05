import React from "react";
import CustomTag from "components/custom-tag/CustomTag";
import PropTypes from "prop-types";

export default function FlexBox({
  children,
  className = "",
  direction = "row",
  wrap = "wrap",
  height = "auto",
  width = "auto",
}) {
  return (
    <CustomTag
      className={`flex flex-${direction} flex-${wrap} 
        w-${width} h-${height}
        ${className}`}
      tag="div"
    >
      {children}
    </CustomTag>
  );
}

FlexBox.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  direction: PropTypes.oneOf(["row", "col"]),
  height: PropTypes.string,
  width: PropTypes.string,
  wrap: PropTypes.oneOf(["wrap", "wrap-reverse", "no-wrap"]),
};
