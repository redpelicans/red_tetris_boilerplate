import React from "react";
import PropTypes from "prop-types";

const CustomTag = React.forwardRef(({ tag: Tag, children, ...rest }, ref) => (
  <Tag ref={ref} {...rest}>
    {children}
  </Tag>
));

export default CustomTag;

CustomTag.propTypes = {
  children: PropTypes.any,
  tag: PropTypes.string.isRequired,
};
