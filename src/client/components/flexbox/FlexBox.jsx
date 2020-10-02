import React from "react";
import CustomTag from "components/custom-tag/CustomTag";
import PropTypes from "prop-types";

/**
 ** @param {"row"|"col"} direction
 ** @param {"wrap"|"wrap-reverse"|"no-wrap"} wrap
 ** @param {string|number} width
 ** @param {string|number} height
 ** @param {string} className
 ** @returns {JSX.Element} A div element with CSS flex
 */
export default function FlexBox({
  children,
  className = "",
  direction = "row",
  wrap = "wrap",
  height = "auto",
  width = "auto",
  ...rest
}) {
  return (
    <CustomTag
      className={`flex flex-${direction} flex-${wrap} 
        w-${width} h-${height}
        ${className}`}
      tag="div"
      {...rest}
    >
      {children}
    </CustomTag>
  );
}

FlexBox.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  direction: PropTypes.oneOf(["row", "col"]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  wrap: PropTypes.oneOf(["wrap", "wrap-reverse", "no-wrap"]),
};
